import { getPlaiceholder } from "plaiceholder";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const imageUrl = searchParams.get("imageUrl");
  if (!imageUrl) {
    return Response.json({ error: "No imageUrl" }, { status: 400 });
  }

  try {
    const buffer = await fetch(imageUrl).then(r => r.arrayBuffer());
    const { base64 } = await getPlaiceholder(Buffer.from(buffer));
    return Response.json({ blurDataURL: base64 });
  } catch (e) {
    return Response.json({ blurDataURL: null }, { status: 200 });
  }
}