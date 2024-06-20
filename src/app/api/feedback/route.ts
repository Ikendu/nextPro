import { NextResponse } from "next/server";

type Feedback = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const result: Feedback = await request.json();
  console.log(`THE RESULT`, result);
  return NextResponse.json(result);
}
