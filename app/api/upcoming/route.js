"use server";
import getDate from "@/lib/date";
import { NextResponse } from "next/server";

const date = getDate();

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  try {
    const tmdbRes = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.gte=${date}&primary_release_date.lte=2025-12-31&sort_by=popularity.desc`
    );
    if (!tmdbRes.ok) {
      return NextResponse.json({ error: "TMDB fetch failed" }, { status: 500 });
    }
    const upcoming = await tmdbRes.json();
    return NextResponse.json({ upcoming });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
