import { NextResponse } from "next/server";

const DATA_SOURCE_URL = `https://jsonplaceholder.typicode.com/todos`;

export async function GET() {
  const resp = await fetch(DATA_SOURCE_URL);

  const todos: Todo[] = await resp.json();

  return NextResponse.json(todos);
}
