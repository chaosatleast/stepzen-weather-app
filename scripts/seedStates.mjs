import "../envconfig.mjs";
import parseCSV from "./parseCSV.mjs";

export async function seedStates(client) {
  const dropTable = await client.sql`DROP TABLE IF EXISTS states CASCADE;`;

  const createTable = await client.sql`CREATE TABLE IF NOT EXISTS states (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  country_id INTEGER REFERENCES countries(id),
  country_code VARCHAR(10),
  state_code VARCHAR(10),
  latitude TEXT,
  longitude TEXT
);`;


  const states = await parseCSV("public/csv/states.csv");

  const promises = states.map(async (state) => {
    return client.sql` 
    INSERT INTO states (
      id,
      name,
      country_id,
      country_code,
      state_code,
      latitude,
      longitude
    ) VALUES (
      ${state.id},
      ${state.name},
      ${state.country_id},
      ${state.country_code},
      ${state.state_code},
      ${state.latitude},
      ${state.longitude}
    )
    ON CONFLICT (id) DO NOTHING;
    ;`;
  });

  const results = await Promise.all(promises);

  console.log(
    "---- States table seeded.Results length: " + results.length + "----"
  );

  return {
    dropTable,
    createTable,
    results,
  };
}
