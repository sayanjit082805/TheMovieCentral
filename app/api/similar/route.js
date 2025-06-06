'use server';
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const movieId = searchParams.get("id");
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  if (!movieId) {
    return NextResponse.json({ error: "No movie id provided" }, { status: 400 });
  }

  try {
    const tmdbRes = await fetch(
       `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`
    );
    if (!tmdbRes.ok) {
      return NextResponse.json({ error: "TMDB fetch failed" }, { status: 500 });
    }
    const similar = await tmdbRes.json();
    return NextResponse.json({ similar });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}