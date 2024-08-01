import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryId = searchParams.get("countryId");
  const stateId = searchParams.get("stateId");

  if (!countryId) {
    return NextResponse.json(
      { error: "Please provide a countryId params in the request" },
      { status: 400 }
    );
  }

  if (!stateId) {
    return NextResponse.json(
      { error: "Please provide a stateId params in the request" },
      { status: 400 }
    );
  }

  try {
    const cities =
      await sql`SELECT * FROM cities WHERE country_id = ${countryId} AND state_id = ${stateId};`;

    return NextResponse.json({ cities }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
