"use server";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("query");
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${name}&api_key=${apiKey}`
    );
    if (!tmdbRes.ok) {
      return NextResponse.json({ error: "TMDB fetch failed" }, { status: 500 });
    }
    const results = await tmdbRes.json();
    return NextResponse.json({ results });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
