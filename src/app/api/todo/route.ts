import { NextResponse } from "next/server";

const DATA_SOURCE_URL = `https://jsonplaceholder.typicode.com/todos`;
const API_KEY: string = process.env.DATA_API_KEY as string;

export async function GET(request: Request) {
  const origin = request.headers.get("origin");
  console.log(`Origin`, origin);

  const resp = await fetch(DATA_SOURCE_URL);

  const todos: Todo[] = await resp.json();

  return new NextResponse(JSON.stringify(todos), {
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Content-Type": "application/json",
    },
  });
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

export async function POST(request: Request) {
  const { userId, title }: Partial<Todo> = await request.json();
  if (!userId || !title) {
    return NextResponse.json({ Message: `Required data not found` });
  }
  const resp = await fetch(DATA_SOURCE_URL, {
    method: `POST`,
    headers: {
      "Content-Type": "application/json",
      "API-Key": API_KEY,
    },
    body: JSON.stringify({ userId, title, completed: false }),
  });
  const newTodo: Todo = await resp.json();
  return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
  const { id, userId, title, completed }: Todo = await request.json();

  if (!id || !userId || !title || typeof completed !== "boolean") {
    return NextResponse.json({ Message: `Required updates not complete` });
  }

  const resp = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: `PUT`,
    headers: {
      "Content-Type": "application/json",
      "API-key": API_KEY,
    },
    body: JSON.stringify({ userId, title, completed }),
  });
  const updatedTodo = await resp.json();
  return NextResponse.json(updatedTodo);
}
