import fs from 'fs';
import copyFrom from 'pg-copy-streams/copy-from.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import "../envconfig.mjs"

// Resolve the current module’s directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Construct the path to the CSV file
const citiesFilePath = path.join(__dirname, '../public/csv/cities.csv');


export async function seedCities(client) {

   // Create the table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS cities (
        id INT PRIMARY KEY,
        name VARCHAR(255),
        state_id INTEGER REFERENCES states(id),
        country_id INTEGER REFERENCES countries(id),
        latitude TEXT,
        longitude TEXT,
        wikiDataId TEXT
      );
    `);

    // Prepare the COPY query
    const copyQuery = `
      COPY cities (
        id,
        name,
        state_id,
        country_id,
        latitude,
        longitude,
        wikiDataId
      ) FROM STDIN WITH CSV HEADER;
    `;

    // Create a read stream for the CSV file
    const citiesFileStream = fs.createReadStream(citiesFilePath);

    // Execute the COPY command using pg-copy-streams
    const copyStream = client.query(copyFrom(copyQuery));
    citiesFileStream.pipe(copyStream);


    console.log('---- Cities table seeded ----'); 
}