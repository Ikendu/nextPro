import { NextResponse } from "next/server";
import { limiter } from "../config/limiter";

export async function GET() {
  const remaining = await limiter.removeTokens(1);

  return NextResponse.json({ message: "route says hi", Remaining: remaining });
}
