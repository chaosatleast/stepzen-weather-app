import "../envconfig.mjs";
import parseCSV from "./parseCSV.mjs";

export async function seedCountries(client) {
  const dropTable = await client.sql`DROP TABLE IF EXISTS countries CASCADE;`;

  const createTable = await client.sql` CREATE TABLE IF NOT EXISTS countries (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    iso3 VARCHAR(10),
    iso2 VARCHAR(10),
    numeric_code VARCHAR(20),
    phone_code VARCHAR(20),
    currency VARCHAR(255),
    currency_name VARCHAR(255),
    currency_symbol VARCHAR(10),
    tld TEXT,
    native VARCHAR(255),
    timezones TEXT,
    latitude TEXT,
    longitude TEXT,
    emoji VARCHAR(20)
);`;

  const countries = await parseCSV("public/csv/countries.csv");

  const promises = countries.map(async (country) => {
    return client.sql` 
    INSERT INTO countries (
      id,
      name,
      iso3,
      iso2,
      numeric_code,
      phone_code,
      currency,
      currency_name,
      currency_symbol,
      tld,
      native,
      timezones,
      latitude,
      longitude,
      emoji
    ) VALUES (
      ${country.id},
      ${country.name},
      ${country.iso3},
      ${country.iso2},
      ${country.numeric_code},
      ${country.phone_code},
      ${country.currency},
      ${country.currency_name},
      ${country.currency_symbol},
      ${country.tld},
      ${country.native},
      ${country.timezones},
      ${country.latitude},
      ${country.longitude},
      ${country.emoji}
    )
    ON CONFLICT (id) DO NOTHING;
    ;`;
  });

  const results = await Promise.all(promises);

  console.log(
    "---- Countries table seeded.Results length: " + results.length + "----"
  );

  return {
    dropTable,
    createTable,
    results,
  };
}
