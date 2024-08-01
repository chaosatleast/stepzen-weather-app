import { db } from "@vercel/postgres";
import { seedCountries } from "./seedCountries.mjs";
import { seedStates } from "./seedStates.mjs";
import { seedCities } from "./seedCities.mjs";

async function main() {
  const client = await db.connect();
  try {
    // await seedCountries(client);
    // await seedStates(client);
    await seedCities(client);
  } catch (error) {
    console.error(error);
  } finally {
    client.release();
  }
}

main();
