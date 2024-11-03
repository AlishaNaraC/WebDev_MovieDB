const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const jwt = require('jsonwebtoken');
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require('bcrypt');
const passport = require("passport");
// const passportSetup = require("./passport")
const authRoute = require("./auth");
const multer = require('multer');
const path = require('path');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


// middleware
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json());
app.use(cookieParser());
app.use(cookieSession({
    name: "session",
    keys: ["nara"],
    maxAge: 24*60*60*100,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoute);

const storage = multer.diskStorage({
    destination: './uploads', // Set the upload directory
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
});
  
const upload = multer({ storage });
app.use("/uploads", express.static("uploads"));

// ROUTES
// get all movie
app.get("/movies", async(req,res) =>
    {
        try {
            const allMovie = await pool.query(
            `SELECT d.*, STRING_AGG(DISTINCT g.genres, ', ') AS genres
             FROM dramas d
             JOIN genre_drama gd ON d.drama_id = gd.drama_id
             JOIN genres g ON gd.genre_id = g.genre_id
             GROUP BY d.drama_id
             ORDER BY d.title ASC`);
            res.json(allMovie.rows);
        } catch (err) {
            console.error(err.message);
        }
    }
);

// get a movie
app.get("/movie/:id", async(req,res) =>
    {
        try {
            const {id} = req.params;
            const movie = await pool.query( 
                `SELECT d.*,
                    STRING_AGG(DISTINCT g.genres, ', ') AS genres,
                    STRING_AGG(DISTINCT a.availability, ', ') AS avail
                FROM dramas d
                JOIN genre_drama gd ON d.drama_id = gd.drama_id
                JOIN genres g ON gd.genre_id = g.genre_id
                LEFT JOIN avail_drama ad ON d.drama_id = ad.drama_id
                LEFT JOIN availability a ON ad.avail_id = a.avail_id
                WHERE d.drama_id = $1
                GROUP BY d.drama_id`, 
            [id]);

            const actors = await pool.query(
                `SELECT a.actor_name, a.actor_poster
                FROM actors a
                JOIN actor_drama ad ON a.actor_id = ad.actor_id
                WHERE ad.drama_id = $1`,
                [id]
            );

            const movieDetails = {
                ...movie.rows[0],
                actors: actors.rows.map(actor => ({
                    name: actor.actor_name,
                    poster: actor.actor_poster
                }))
            };
            res.json(movieDetails);
        } catch (err) {
            console.error(err.message);
        }        
});

app.get("/search", async (req, res) => {
    try {
        const {
            country,
            year,
            genre,
            status,
            availability,
            award,
            sortedBy,
            query
        } = req.query;

        let searchQuery = `
            SELECT d.*, 
                c.country,  
                (SELECT STRING_AGG(DISTINCT g.genres, ', ')
                 FROM genre_drama gd
                 JOIN genres g ON gd.genre_id = g.genre_id
                 WHERE gd.drama_id = d.drama_id) AS genres,
                (SELECT STRING_AGG(DISTINCT a.availability, ', ')
                 FROM avail_drama ad
                 LEFT JOIN availability a ON ad.avail_id = a.avail_id
                 WHERE ad.drama_id = d.drama_id) AS avail
            FROM dramas d
            JOIN countries c ON d.country = c.country_id
            WHERE 1=1
        `;

        const queryParams = [];
        let paramIndex = 1;

        const addFilter = (condition, value) => {
            if (value) {
                searchQuery += ` AND ${condition}`;
                queryParams.push(value);
                paramIndex++;
            }
        };

        if (query) {
            searchQuery += ` AND (LOWER(d.title) LIKE LOWER($${paramIndex})`;
            queryParams.push(`%${query}%`);
            paramIndex++;

            searchQuery += ` OR EXISTS (
                SELECT 1 
                FROM actor_drama ad 
                JOIN actors a ON ad.actor_id = a.actor_id 
                WHERE ad.drama_id = d.drama_id AND LOWER(a.actor_name) LIKE LOWER($${paramIndex})
            )`;
            queryParams.push(`%${query}%`);
            paramIndex++;
            searchQuery += `)`;
        }

        addFilter(`c.country = $${paramIndex}`, country);
        addFilter(`d.release_d = $${paramIndex}`, year);
        if (genre) {
            searchQuery += `
                AND EXISTS (
                    SELECT 1 FROM genre_drama gd 
                    JOIN genres g ON gd.genre_id = g.genre_id 
                    WHERE gd.drama_id = d.drama_id AND g.genres = $${paramIndex}
                )`;
            queryParams.push(genre);
            paramIndex++;
        }
        addFilter(`d.status = $${paramIndex}`, status);
        if (availability) {
            searchQuery += `
                AND EXISTS (
                    SELECT 1 FROM avail_drama ad 
                    LEFT JOIN availability a ON ad.avail_id = a.avail_id 
                    WHERE ad.drama_id = d.drama_id AND a.availability = $${paramIndex}
                )`;
            queryParams.push(availability);
            paramIndex++;
        }

        if (award) {
            searchQuery += `
                AND EXISTS (
                    SELECT 1 FROM award_drama ad
                    JOIN awards w ON ad.award_id = w.award_id
                    WHERE ad.drama_id = d.drama_id AND w.award = $${paramIndex}
                )`;
            queryParams.push(award);
            paramIndex++;
        }

        // Apply sorting
        const sortingMap = {
            Alphabet: "d.title ASC",
            Rating: "d.rating DESC",
            Year: "d.release_d DESC",
            Views: "d.tviews DESC"
        };
        searchQuery += ` ORDER BY ${sortingMap[sortedBy] || "d.title ASC"}`;

        const searchResult = await pool.query(searchQuery, queryParams);
        res.json(searchResult.rows);
    } catch (error) {
        console.error("Error searching and filtering movies:", err.message);
        res.status(500).send("Server error");
    }
});

// register new user
app.post("/register", async (req, res) => {
    let role = 'Writer'; // Default role
    let status = 'Active';
    try {
        const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);

        await pool.query(
            `INSERT INTO users (username, email, password, role, created_at, status) VALUES ($1, $2, $3, $4, $5, $6)`,
            [req.body.username, req.body.email, hashedPassword, role, new Date(), status]
        );

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        // Send an error response
        res.status(500).json({ error: 'Registration failed' });
    }
});

// login user
app.post("/login", async (req, res) =>{
    try {
        const login = await pool.query(`SELECT * FROM users WHERE username = $1`,
            [req.body.username]
        );
        
        if (login.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = login.rows[0];
        if (user.status === 'Suspended') {
            return res.status(403).json({ message: 'Your account has been suspended.' });
        }
        
        const validPassword = await bcrypt.compare(req.body.password, login.rows[0].password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        const { username, role } = login.rows[0];
        const token = jwt.sign({ username, role }, 'jwt-secret-key', { expiresIn: '1d' });
        res.cookie('token', token); 
        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Login failed, please try again' })
    }
});

// Login with google
app.post('/google-auth', async (req, res) => {
    const { token } = req.body;
    let role = 'Writer';
    let status = 'Active';
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,  // Ensure this matches
        });
        const payload = ticket.getPayload();
        const userId = payload.sub;
        const email = payload.email;
        const name = payload.name;

        const userQuery = 'SELECT * FROM users WHERE google_id = $1 OR email = $2';
        const userResult = await pool.query(userQuery, [userId, email]);

        let user;

        if (userResult.rows.length > 0) {
            user = userResult.rows[0];
        } else {
            const insertQuery = 'INSERT INTO users (google_id, email, username, role, created_at, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const newUser = await pool.query(insertQuery, [userId, email, name, role, new Date(), status]);
            user = newUser.rows[0];
        }

        const jwtToken = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET, 
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: "Google Sign-In successful",
            token: jwtToken,
            user: { name, email }
        });
    } catch (error) {
        console.error('Google Token Verification Error:', error);
        res.status(401).json({ error: "Invalid Google token" });
    }
});

// get all countries
app.get("/countries", async (req, res) => {
    try {
        const countries = await pool.query("SELECT * FROM countries ORDER BY country ASC");
        res.json(countries.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Add a new country
app.post("/countries", async (req, res) => {
    try {
        const { country } = req.body;
        const result = await pool.query(
            "INSERT INTO countries (country) VALUES ($1) RETURNING *",
            [country]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error adding country:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Update a country
app.put("/countries/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { country } = req.body;
        const result = await pool.query(
            "UPDATE countries SET country = $1 WHERE country_id = $2 RETURNING *",
            [country, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Country not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating country:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete a country
app.delete("/countries/:id", async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { id } = req.params;
        
        // Delete the country
        const deleteResult = await client.query(
            "DELETE FROM countries WHERE country_id = $1 RETURNING *",
            [id]
        );
        
        if (deleteResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: "Country not found" });
        }
        
        // Get the current max country_id
        const maxIdResult = await client.query("SELECT MAX(country_id) FROM countries");
        const maxId = maxIdResult.rows[0].max || 0;
        
        // Reset the sequence to the current max id
        await client.query(`SELECT setval('countries_country_id_seq', $1, true)`, [maxId]);
        
        await client.query('COMMIT');
        res.json({ message: "Country deleted successfully", deletedCountry: deleteResult.rows[0] });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error deleting country:", err.message);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
});

// Get all awards
app.get("/awards", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM awards ORDER BY award ASC");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching awards:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Add a new award
app.post("/awards", async (req, res) => {
    const client = await pool.connect();
    try {
        const { awards } = req.body;
        
        // Validate the input
        if (!awards || awards.trim() === '') {
            return res.status(400).json({ error: "Award name cannot be empty" });
        }

        await client.query('BEGIN');
        
        // Get the next value from the sequence
        const seqResult = await client.query("SELECT nextval('awards_award_id_seq')");
        const nextId = seqResult.rows[0].nextval;
        
        const result = await client.query(
            "INSERT INTO awards (award_id, award) VALUES ($1, $2) RETURNING *",
            [nextId, awards.trim()]
        );
        
        await client.query('COMMIT');
        res.status(201).json(result.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error adding award:", err.message);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
});

// Update an award
app.put("/awards/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { awards } = req.body;

        // Validate the input
        if (!awards || awards.trim() === '') {
            return res.status(400).json({ error: "Award name cannot be empty" });
        }

        const result = await pool.query(
            "UPDATE awards SET award = $1 WHERE award_id = $2 RETURNING *",
            [awards.trim(), id]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Award not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating award:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete an award
app.delete("/awards/:id", async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const { id } = req.params;
        
        // Delete the award
        const deleteResult = await client.query(
            "DELETE FROM awards WHERE award_id = $1 RETURNING *",
            [id]
        );
        
        if (deleteResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: "Award not found" });
        }
        
        // Get the current max award_id
        const maxIdResult = await client.query("SELECT MAX(award_id) FROM awards");
        const maxId = maxIdResult.rows[0].max || 0;
        
        // Reset the sequence to the current max id
        await client.query(`SELECT setval('awards_award_id_seq', $1, true)`, [maxId]);
        
        await client.query('COMMIT');
        res.json({ message: "Award deleted successfully", deletedAward: deleteResult.rows[0] });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error deleting award:", err.message);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
});

// Get all genres 
app.get("/genres", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM genres ORDER BY genres ASC");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching genres:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Add a new genre
app.post("/genres", async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        // Get the next value from the sequence
        const seqResult = await client.query("SELECT nextval('genres_genre_id_seq')");
        const nextId = seqResult.rows[0].nextval;
        
        const { genres } = req.body;
        const result = await client.query(
            "INSERT INTO genres (genre_id, genres) VALUES ($1, $2) RETURNING *",
            [nextId, genres]
        );
        
        await client.query('COMMIT');
        res.status(201).json(result.rows[0]);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error adding genre:", err.message);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
});

// Update a genre
app.put("/genres/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { genres } = req.body;
        const result = await pool.query(
            "UPDATE genres SET genres = $1 WHERE genre_id = $2 RETURNING *",
            [genres, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Genre not found" });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error updating genre:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Delete a genre
app.delete("/genres/:id", async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        
        const { id } = req.params;
        
        // Delete the genre
        const deleteResult = await client.query(
            "DELETE FROM genres WHERE genre_id = $1 RETURNING *",
            [id]
        );
        
        if (deleteResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ error: "Genre not found" });
        }
        
        // Get the current max genre_id
        const maxIdResult = await client.query("SELECT MAX(genre_id) FROM genres");
        const maxId = maxIdResult.rows[0].max || 0;
        
        // Reset the sequence to the current max id
        await client.query(`SELECT setval('genres_genre_id_seq', $1, true)`, [maxId]);
        
        await client.query('COMMIT');
        res.json({ message: "Genre deleted successfully", deletedGenre: deleteResult.rows[0] });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error deleting genre:", err.message);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
});

// get all actors
app.get("/actors", async(req,res) =>{
    try {
        const allActors = await pool.query(
        `SELECT a.*, c.country
            FROM actors a
            JOIN countries c ON c.country_id = a.country
            ORDER BY a.actor_name ASC`
        );
        res.json(allActors.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// add new actor
app.post("/actors", upload.single('actorPoster'), async(req, res) =>{
    try {
        const {selectedCountry, actorName, birthDate} = req.body;
        const actorPoster = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null;

        const existingActor = await pool.query(
            'SELECT * FROM actors WHERE actor_name = $1 AND country = $2 AND birth_date = $3',
            [actorName, selectedCountry, birthDate]
        );

        if (existingActor.rows.length > 0) {
            return res.status(400).json("An actor with the same name, country, and birth date already exists.");
        }

        const seqResult = await pool.query("SELECT nextval('actors_actor_id_seq')");
        const nextId = seqResult.rows[0].nextval;

        const addactor = await pool.query(
            `INSERT INTO actors (actor_id, country, actor_name, birth_date, actor_poster) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [nextId, selectedCountry, actorName, birthDate, actorPoster]
        );   
        res.json(addactor);     
    } catch (err) {
        console.error(err.message);
    }
});

// update an actor
app.put("/actors/:actor_id", async (req, res) => {
    const { actor_id } = req.params;
    const { actor_name, birth_date } = req.body;
  
    try {
      const updatedActor = await pool.query(
        'UPDATE actors SET actor_name = $1, birth_date=$2 WHERE actor_id = $3 RETURNING *',
        [actor_name, birth_date, actor_id]
      );
  
      if (updatedActor.rows.length === 0) {
        return res.status(404).json({ error: 'Actor not found' });
      }
  
      res.json(updatedActor.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    }
});

// delete actor
app.delete("/actors/:id", async(req, res) =>{
    const {id} = req.params;
    try {
        const delActors = await pool.query(
            `DELETE FROM actors
            WHERE actor_id = $1`,
            [id]
        );
        res.status(200).json({ message: "Actor deleted successfully" });
    } catch (err) {
        console.error(err.message);
    }
});

// add review/comment
app.post("/reviews", async(req, res) =>{
    let approve = 'Unapproved'; // Default approval
    try {
        const {username, id, rating, comment} = req.body;

        const existingReview = await pool.query(
            'SELECT * FROM comments WHERE username = $1 AND drama_id = $2',
            [username, id]
        );
    
        if (existingReview.rows.length > 0) {
            return res.status(400).json({ error: "You have already submitted a review for this movie." });
        }

        const addreview = await pool.query(
            `INSERT INTO comments (username, drama_id, rate, comment, approval) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [username, id, rating, comment, approve]
        ); 
        
        const avgResult = await pool.query(
            `SELECT AVG(rate) AS avg_rating FROM comments WHERE drama_id = $1`,
            [id]
        );
        const avgRating = parseFloat(avgResult.rows[0].avg_rating).toFixed(1);

        await pool.query(
            `UPDATE dramas SET rating = $1 WHERE drama_id = $2`,
            [avgRating, id]
        );
        res.status(201).json(addreview.rows[0]);     
    } catch (err) {
        console.error(err.message);
    }
});

// get all review
app.get("/reviews", async(req,res) =>{
    try {
        const allReviews = await pool.query(
        `SELECT c.*, d.title
            FROM comments c
            JOIN dramas d ON d.drama_id = c.drama_id
            ORDER BY c.created_at ASC`
        );
        res.json(allReviews.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get all review in a movie
app.get("/reviews/:id", async(req,res) =>{
    const {id} = req.params;
    try {
        const allReviews = await pool.query(
        `SELECT c.*
            FROM comments c
            JOIN dramas d ON d.drama_id = c.drama_id
            WHERE c.drama_id = $1
            ORDER BY c.created_at ASC`,
        [id]);
        res.json(allReviews.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// delete review/comment
app.delete("/reviews/:id", async(req, res) =>{
    const {id} = req.params;
    try {
        const reviewResult = await pool.query(
            `SELECT drama_id FROM comments WHERE comment_id = $1`,
            [id]
        );

        if (reviewResult.rows.length === 0) {
            return res.status(404).json({ error: "Review not found" });
        }
        const dramaId = reviewResult.rows[0].drama_id;

        // Delete the review
        await pool.query(
            `DELETE FROM comments WHERE comment_id = $1`,
            [id]
        );

        const avgResult = await pool.query(
            `SELECT AVG(rate) AS avg_rating FROM comments WHERE drama_id = $1`,
            [dramaId]
        );
        const avgRating = avgResult.rows[0].avg_rating ? parseFloat(avgResult.rows[0].avg_rating).toFixed(1) : "0.0";

        await pool.query(
            `UPDATE dramas SET rating = $1 WHERE drama_id = $2`,
            [avgRating, dramaId]
        );
        res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        console.error(err.message);
    }
});

// update approval review
app.put("/reviews/:id/approve", async (req,res)=>{
    try {
        const{id} = req.params;
        const{approval} = req.body;
        const updateApproval = await pool.query(
            `UPDATE comments SET approval = $1 
            WHERE comment_id = $2
            RETURNING *`,
        [approval, id]);
        res.json(updateApproval.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to update approval status" });
    }
});

// get all users
app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT user_id, username, email, role, TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at, status FROM users ORDER BY username ASC");
        res.json(allUsers.rows);
    } catch (err) {
        console.error("Error fetching all users:", err.message);
        res.status(500).send("Server error");
    }
});

// get a user
app.get("/users/:username", async (req, res) => {
    const {username} = req.params;
    try {
        const aUser = await pool.query(
            `SELECT user_id, username, email, role, TO_CHAR(created_at, 'YYYY-MM-DD') AS created_at, status 
            FROM users 
            WHERE username=$1`,
        [username]);
        res.json(aUser.rows[0]);
    } catch (err) {
        console.error("Error fetching all users:", err.message);
        res.status(500).send("Server error");
    }
});

// update user status
app.put("/users/:id/status", async (req,res)=>{
    try {
        const{id} = req.params;
        const{status} = req.body;
        const updateStatus = await pool.query(
            `UPDATE users SET status = $1 
            WHERE user_id = $2
            RETURNING *`,
        [status, id]);
        res.json(updateStatus.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Failed to update user status" });
    }
});

// delete review/comment
app.delete("/users/:id", async(req, res) =>{
    const {id} = req.params;
    // console.log("Attempting to delete user with ID:", id);
    try {
        const delUser = await pool.query(
            `DELETE FROM users
            WHERE user_id = $1`,
            [id]
        );
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        console.error(err.message);
    }
});

// Get all years
app.get("/filters/years", async (req, res) => {
    try {
        const years = await pool.query("SELECT DISTINCT release_d FROM dramas ORDER BY release_d DESC");
        res.json(years.rows);
    } catch (err) {
        console.error("Error fetching years:", err.message);
        res.status(500).send("Server error");
    }
});

// Get all status
app.get("/filters/status", async (req, res) => {
    try {
        const status = await pool.query("SELECT DISTINCT status FROM dramas ORDER BY status ASC");
        res.json(status.rows);
    } catch (err) {
        console.error("Error fetching status:", err.message);
        res.status(500).send("Server error");
    }
});

// Get all availability
app.get("/filters/availability", async (req, res) => {
    try {
        const availability = await pool.query("SELECT availability FROM availability ORDER BY availability ASC");
        res.json(availability.rows);
    } catch (err) {
        console.error("Error fetching availability:", err.message);
        res.status(500).send("Server error");
    }
});

// Get all actors
app.get("/actors", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM actors ORDER BY actor_name ASC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching actors:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Add new drama
app.post("/movies", async(req,res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const { 
            title, 
            altTitle,
            release_d,
            country,
            synopsis,
            availability,
            genres,
            actors,
            trailer,
            awards 
        } = req.body;

        // Validate required fields
        if (!title || !release_d || !country || !synopsis || !trailer || !availability) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        // Insert drama
        const dramaResult = await client.query(
            `INSERT INTO dramas (
                title, alt_title, release_d, country, synopsis, 
                trailer, status, rating, tviews
            ) VALUES ($1, $2, $3, $4, $5, $6, 'Ongoing', 0, 0) 
            RETURNING drama_id`,
            [title, altTitle, release_d, country, synopsis, trailer]
        );

        const dramaId = dramaResult.rows[0].drama_id;

        // Insert genre relationships
        if (genres && genres.length > 0) {
            const genreValues = genres.map((_, index) => 
                `($1, $${index + 2})`
            ).join(', ');
            const genreParams = [dramaId, ...genres];
            await client.query(
                `INSERT INTO genre_drama (drama_id, genre_id) VALUES ${genreValues}`,
                genreParams
            );
        }

        // Insert actor relationships
        if (actors && actors.length > 0) {
            const actorValues = actors.map((_, index) => 
                `($1, $${index + 2})`
            ).join(', ');
            const actorParams = [dramaId, ...actors];
            await client.query(
                `INSERT INTO actor_drama (drama_id, actor_id) VALUES ${actorValues}`,
                actorParams
            );
        }

        // Insert availability relationships
        if (availability && availability.length > 0) {
            const availValues = availability.map((_, index) => 
                `($1, $${index + 2})`
            ).join(', ');
            const availParams = [dramaId, ...availability];
            await client.query(
                `INSERT INTO avail_drama (drama_id, avail_id) VALUES ${availValues}`,
                availParams
            );
        }

        // Insert award relationships
        if (awards && awards.length > 0) {
            const awardValues = awards.map((_, index) => 
                `($1, $${index + 2})`
            ).join(', ');
            const awardParams = [dramaId, ...awards];
            await client.query(
                `INSERT INTO award_drama (drama_id, award_id) VALUES ${awardValues}`,
                awardParams
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ message: "Drama added successfully", drama_id: dramaId });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error adding drama:", err.message);
        res.status(500).json({ error: "Server error: " + err.message });
    } finally {
        client.release();
    }
});

// Modify the pending dramas endpoint
app.get("/api/dramas/pending", async (req, res) => {
    try {
        const { page = 1, limit = 10, filter = 'all' } = req.query;
        const offset = (page - 1) * limit;

        let query = `
            SELECT 
                d.drama_id as id,
                d.title,
                d.synopsis,
                d.status,
                COALESCE(u.username, 'Anonymous') as contributor,
                STRING_AGG(DISTINCT g.genres, ', ') as genres,
                STRING_AGG(DISTINCT a.actor_name, ', ') as actors
            FROM dramas d
            LEFT JOIN users u ON d.contributor_id = u.user_id
            LEFT JOIN genre_drama gd ON d.drama_id = gd.drama_id
            LEFT JOIN genres g ON gd.genre_id = g.genre_id
            LEFT JOIN actor_drama ad ON d.drama_id = ad.drama_id
            LEFT JOIN actors a ON ad.actor_id = a.actor_id
            WHERE 1=1
            ${filter === 'approved' ? "AND d.status = 'Approved'" : 
              filter === 'unapproved' ? "AND d.status = 'Pending'" : ''}
            GROUP BY d.drama_id, d.title, d.synopsis, d.status, u.username
            ORDER BY d.drama_id DESC
            LIMIT $1 OFFSET $2
        `;

        const [dramas, countResult] = await Promise.all([
            pool.query(query, [limit, offset]),
            pool.query(`
                SELECT COUNT(DISTINCT d.drama_id) 
                FROM dramas d
                WHERE 1=1 
                ${filter === 'approved' ? "AND d.status = 'Approved'" : 
                  filter === 'unapproved' ? "AND d.status = 'Pending'" : ''}
            `)
        ]);

        // Add isSelected property to each drama
        const dramasWithSelection = dramas.rows.map(drama => ({
            ...drama,
            isSelected: false
        }));

        res.json({
            dramas: dramasWithSelection,
            total: parseInt(countResult.rows[0].count)
        });
    } catch (err) {
        console.error("Error fetching pending dramas:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Add endpoint for approving dramas
app.patch("/api/dramas/:id/approve", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            "UPDATE dramas SET status = 'Approved' WHERE drama_id = $1",
            [id]
        );
        res.json({ message: "Drama approved successfully" });
    } catch (err) {
        console.error("Error approving drama:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Add endpoint for bulk approving dramas
app.patch("/api/dramas/bulk-approve", async (req, res) => {
    try {
        const { dramaIds } = req.body;
        await pool.query(
            "UPDATE dramas SET status = 'Approved' WHERE drama_id = ANY($1::int[])",
            [dramaIds]
        );
        res.json({ message: "Dramas approved successfully" });
    } catch (err) {
        console.error("Error bulk approving dramas:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
