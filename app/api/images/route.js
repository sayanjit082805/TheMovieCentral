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
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}&include_image_language=en,null`,
    );
    if (!tmdbRes.ok) {
      return NextResponse.json({ error: "TMDB fetch failed" }, { status: 500 });
    }
    const images = await tmdbRes.json();
    return NextResponse.json({ images });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}