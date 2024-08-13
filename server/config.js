import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Create a connection using the environment variables
const connection = await mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
});

// Initialize default data
async function initializeDefaultData() {
    try {
        // Check if any banners exist
        const [rows] = await connection.query('SELECT COUNT(*) AS count FROM banner');
        const count = rows[0].count;

        if (count === 0) {
            // Define a default banner
            const defaultBanner = {
                banner_desc: 'Hey do you wanna see my resume..!',
                banner_timer: 15,
                banner_link: 'https://tonybhaskar.github.io/Resume/',
                is_visible: true
            };

            // Insert the default banner into the database
            await connection.query('INSERT INTO banner (banner_desc, banner_timer, banner_link, is_visible) VALUES (?, ?, ?, ?)', [
                defaultBanner.banner_desc,
                defaultBanner.banner_timer,
                defaultBanner.banner_link,
                defaultBanner.is_visible
            ]);
        }
    } catch (error) {
        console.error('Error initializing default data:', error);
        throw error;
    }
}

// Call the function to initialize default data
initializeDefaultData().catch(err => console.error('Initialization failed:', err));

// Get entire banner data
export async function getBanners() {
    try {
        const [rows] = await connection.query('SELECT * FROM banner WHERE id = 1');
        return rows;
    } catch (error) {
        console.error('Error fetching banners:', error);
        throw error; // Rethrow to handle it in the calling function
    }
}

// Get single banner data by ID
export async function getBanner(id) {
    try {
        const [rows] = await connection.query('SELECT * FROM banner WHERE id = ?', [id]);
        return rows[0]; // Return the first row
    } catch (error) {
        console.error('Error fetching banner:', error);
        throw error; // Rethrow to handle it in the calling function
    }
}

// Create banner data and return the newly created banner
export async function createBanner(banner_desc, banner_timer, banner_link, is_visible = true) {
    try {
        // Insert the new banner
        const [result] = await connection.query('INSERT INTO banner (banner_desc, banner_timer, banner_link) VALUES (?, ?, ?)', [banner_desc, banner_timer, banner_link]);
        const insertId = result.insertId;

        // Fetch and return the newly created banner
        const newBanner = await getBanner(insertId);
        return newBanner;
    } catch (error) {
        console.error('Error creating banner:', error);
        throw error; // Rethrow to handle it in the calling function
    }
}


// Update banner data and return the updated banner
export async function updateBanner(id, banner_desc, banner_timer, banner_link, is_visible) {
    try {
        // Update the existing banner
        await connection.query(
            'UPDATE banner SET banner_desc = ?, banner_timer = ?, banner_link = ?, is_visible = ? WHERE id = ?',
            [banner_desc, banner_timer, banner_link, is_visible, id]
        );

        // Fetch and return the updated banner
        const updatedBanner = await getBanner(id);
        return updatedBanner;
    } catch (error) {
        console.error('Error updating banner:', error);
        throw error; // Rethrow to handle it in the calling function
    }
}
