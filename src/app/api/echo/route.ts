import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // sending static params
  //   const name = searchParams.get(`name`);
  //   const message = searchParams.get(`message`);

  //   sending dynamic params
  const obj = Object.fromEntries(searchParams.entries());
  return NextResponse.json(obj);
}
