const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES

// Get all movies
app.get("/movies", async (req, res) => {
    try {
        const allMovies = await pool.query(`
            SELECT d.*, 
            (SELECT STRING_AGG(DISTINCT g.genres, ', ') 
             FROM genre_drama gd 
             JOIN genres g ON gd.genre_id = g.genre_id 
             WHERE gd.drama_id = d.drama_id) AS genres
            FROM dramas d;
        `);
        res.json(allMovies.rows);
    } catch (err) {
        console.error("Error fetching movies:", err.message);
        res.status(500).send("Server error");
    }
});

// Get a specific movie by ID
app.get("/movie/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await pool.query(
            `SELECT d.*, 
                (SELECT STRING_AGG(DISTINCT g.genres, ', ')
                 FROM genre_drama gd
                 JOIN genres g ON gd.genre_id = g.genre_id
                 WHERE gd.drama_id = d.drama_id) AS genres,
                (SELECT STRING_AGG(DISTINCT a.availability, ', ')
                 FROM avail_drama ad
                 LEFT JOIN availability a ON ad.avail_id = a.avail_id
                 WHERE ad.drama_id = d.drama_id) AS avail
             FROM dramas d
             WHERE d.drama_id = $1;`,
            [id]
        );

        const actors = await pool.query(
            `SELECT a.actor_name, a.actor_poster
             FROM actors a
             JOIN actor_drama ad ON a.actor_id = ad.actor_id
             WHERE ad.drama_id = $1;`,
            [id]
        );

        const movieDetails = {
            ...movie.rows[0],
            actors: actors.rows.map(actor => ({
                name: actor.actor_name,
                poster: actor.actor_poster,
            })),
        };

        res.json(movieDetails);
    } catch (err) {
        console.error("Error fetching movie:", err.message);
        res.status(500).send("Server error");
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

        // Apply search if a query is provided
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

        // Apply filters
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
    } catch (err) {
        console.error("Error searching and filtering movies:", err.message);
        res.status(500).send("Server error");
    }
});

// Get all countries
app.get("/countries", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM countries ORDER BY country ASC");
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching countries:", err.message);
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
app.post("/movies", async (req, res) => {
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
        if (genres.length > 0) {
            const genreValues = genres.map(genreId => 
                `(${dramaId}, ${genreId})`
            ).join(', ');
            await client.query(
                `INSERT INTO genre_drama (drama_id, genre_id) VALUES ${genreValues}`
            );
        }

        // Insert actor relationships
        if (actors.length > 0) {
            const actorValues = actors.map(actorId => 
                `(${dramaId}, ${actorId})`
            ).join(', ');
            await client.query(
                `INSERT INTO actor_drama (drama_id, actor_id) VALUES ${actorValues}`
            );
        }

        // Insert availability relationships
        if (availability.length > 0) {
            const availValues = availability.map(availId => 
                `(${dramaId}, ${availId})`
            ).join(', ');
            await client.query(
                `INSERT INTO avail_drama (drama_id, avail_id) VALUES ${availValues}`
            );
        }

        // Insert award relationships
        if (awards.length > 0) {
            const awardValues = awards.map(awardId => 
                `(${dramaId}, ${awardId})`
            ).join(', ');
            await client.query(
                `INSERT INTO award_drama (drama_id, award_id) VALUES ${awardValues}`
            );
        }

        await client.query('COMMIT');
        res.status(201).json({ message: "Drama added successfully", drama_id: dramaId });
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Error adding drama:", err.message);
        res.status(500).json({ error: "Server error" });
    } finally {
        client.release();
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
