import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryId = searchParams.get("countryId");

  if (!countryId) {
    return NextResponse.json(
      { error: "Please provide a countryId params in the request" },
      { status: 400 }
    );
  }

  try {
    const states =
      await sql`SELECT * FROM states WHERE country_id = ${countryId};`;

    return NextResponse.json({ states }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
