import express, {Request, type Response} from 'express';
import {Pool} from 'pg'; //Import the pg libraray
import {nanoid} from 'nanoid'; // <-- NEW: For generating short codes
import validUrl from 'valid-url'; // <-- NEW: For checking if a URL is real
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

// --- DATABASE CONNECTION ---
// This is the connection pool. It manages multiple connections efficiently.
const pool = new Pool({
    user: 'postgres', // Default postgres user
    host: 'db', 
    database: 'postgres', // We'll use the default 'postgres' database for now
    password: 'mysecretpassword', // The password we set in the docker command
    port: 5432, // The port we exposed in the docker command
});

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors()); // <-- NEW: Use cors

// This allows our server to accept JSON data in requests
app.use(express.json());

// --- NEW: Handle favicon.ico requests ---
// This stops the browser from making a confusing /favicon.ico request
app.get('/favicon.ico', (req: Request, res: Response) => {
  res.status(204).end(); // 204 No Content
});

// --- 1. SHORTEN A NEW URL ---
app.post('/shorten', async (req: Request, res: Response) => {
    const { longUrl }  = req.body; // Get the long URL from the request body

    // --- Validation ---
    if (!validUrl.isUri(longUrl)) {
        return res.status(400).json({ error: 'Invalid URL provided' });
    }

    const shortCode = nanoid(6); // Generate a 6-character short code

    let client;
    try {
        client = await pool.connect();
        const result = await pool.query(
            'INSERT INTO urls (long_url, short_code) VALUES ($1, $2) RETURNING *', 
        [longUrl, shortCode]
        );
        client.release();

        const shortUrl = `http://localhost:${port}/${shortCode}`;
        res.status(201).json({
            message: 'URL shortened successfully!',
            shortUrl: shortUrl,
            data: result.rows[0],
        });
    } catch (error) {
        console.error('Error saving to database:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// --- 2. REDIRECT TO THE ORIGINAL URL ---
app.get('/:shortCode', async (req: Request, res: Response) => {
    const { shortCode } = req.params; // Get the short code from the URL

    // --- NEW DEBUG LINE ---
  console.log(`GET request received for shortCode: [${shortCode}]`); 
  // --- END NEW DEBUG LINE ---

    let client; // --- Use a client connection ---
    try {
        // Get a connection from the pool
        client = await pool.connect();

        // Run the query
        //const result = await pool.query('SELECT long_url FROM urls WHERE short_code = $1', [shortCode]);
        const query = 'SELECT long_url FROM urls WHERE short_code = $1';
        const result = await client.query(query, [shortCode]);

        // Release the connection
        client.release();


        //DEbug line 
        console.log(`Database query found ${result.rows.length} matching rows.`);


        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        const longUrl = result.rows[0].long_url;

        //Debug line NEw
        console.log(`Redirecting to: ${longUrl}`);

        res.redirect(longUrl); // <-- This redirects the user.
        } catch (error) {
            // If we have a client, release it on error
            if (client) {
                client.release();
            }
            console.error('Error retrieving from database:', error);
            res.status(500).json({ error: 'Server error' });
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});