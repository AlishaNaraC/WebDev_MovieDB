const express = require("express");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const jwt = require('jsonwebtoken');
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require('bcrypt');
const passport = require("passport");
const passportSetup = require("./passport")
const authRoute = require("./auth");
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
             GROUP BY d.drama_id`);
            res.json(allMovie.rows);
        } catch (err) {
            console.error(err.message);
        }
    }
)

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
    }
)

// Search movies by title or actor
app.get("/search", async(req, res) => {
    try {
        const { query } = req.query;
        const searchResult = await pool.query(
            `SELECT d.*, 
                    STRING_AGG(DISTINCT g.genres, ', ') AS genres 
             FROM dramas d
             JOIN genre_drama gd ON d.drama_id = gd.drama_id
             JOIN genres g ON gd.genre_id = g.genre_id
             JOIN actor_drama ad ON d.drama_id = ad.drama_id
             JOIN actors a ON ad.actor_id = a.actor_id
             WHERE LOWER(d.title) LIKE LOWER($1) OR LOWER(a.actor_name) LIKE LOWER($1)
             GROUP BY d.drama_id`,
            [`%${query}%`] // Add wildcards for partial matching
        );
        
        res.json(searchResult.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// register new user
app.post("/register", async (req, res) => {
    let role = 'Writer'; // Default role
    try {
        const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);

        await pool.query(
            `INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)`,
            [req.body.username, req.body.email, hashedPassword, role]
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

app.post('/google-auth', async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,  // Ensure this matches
        });
        const payload = ticket.getPayload();
        console.log('Payload:', payload);

        const userId = payload.sub;
        const email = payload.email;
        const name = payload.name;

        const userQuery = 'SELECT * FROM users WHERE google_id = $1 OR email = $2';
        const userResult = await pool.query(userQuery, [userId, email]);

        let user;

        if (userResult.rows.length > 0) {
            user = userResult.rows[0];
        } else {
            const insertQuery = 'INSERT INTO users (google_id, email, username) VALUES ($1, $2, $3) RETURNING *';
            const newUser = await pool.query(insertQuery, [userId, email, name]);
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
        console.error('Google Token Verification Error:', error); // Log error for debugging
        res.status(401).json({ error: "Invalid Google token" });
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});