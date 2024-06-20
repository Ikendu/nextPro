import { NextResponse } from "next/server";
import { limiter } from "../config/limiter";

// use request to get the origin of the reques... optional
export async function GET(request: Request) {
  const remaining = await limiter.removeTokens(1);

  // get the origin of request
  const origin = request.headers.get("origin");
  if (remaining < 0) {
    //using the new NextResponse is optional
    //you can just display the message in console or as a response json
    return new NextResponse(null, {
      status: 403,
      statusText: `Too many request`,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Content-Type": "text/plain",
      },
    });
  }

  return NextResponse.json({ message: "route says hi", Remaining: remaining });
}
