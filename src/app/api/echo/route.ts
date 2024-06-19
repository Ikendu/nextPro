import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const name = searchParams.get(`name`);
  const message = searchParams.get(`message`);

  return NextResponse.json({ name, message });
}
