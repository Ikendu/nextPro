import { NextResponse } from "next/server";

const DATA_SOURCE_URL = `https://jsonplaceholder.typicode.com/todos`;
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET() {
  const resp = await fetch(DATA_SOURCE_URL);

  const todos: Todo[] = await resp.json();

  return NextResponse.json(todos);
}

export async function DELETE(request: Request) {
  const { id }: Partial<Todo> = await request.json();

  // check for id
  if (!id) return NextResponse.json({ Message: `Togo id required` });

  // delete the togo from the api source
  const resp = fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: `DELETE`,
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
  });
  console.log(`Deleted`, resp);
  return NextResponse.json({ Message: `Todo ${id} Deleted` });
}
