"use server";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
    );
    if (!tmdbRes.ok) {
      return NextResponse.json({ error: "TMDB fetch failed" }, { status: 500 });
    }
    const genre = await tmdbRes.json();
    return NextResponse.json({ genre });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
