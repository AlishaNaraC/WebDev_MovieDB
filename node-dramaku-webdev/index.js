const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

// ROUTES
// get all movie
app.get("/movies", async(req,res) =>
    {
        try {
            const allMovie = await pool.query(
            `SELECT d.*,
                    STRING_AGG(DISTINCT g.genres, ', ') AS genres
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

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});