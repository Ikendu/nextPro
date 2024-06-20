import { NextResponse } from "next/server";

const API_KEY: string = process.env.DATA_API_KEY as string;
const DATA_SOURCE_URL = `https://jsonplaceholder.typicode.com/todos`;

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf(`/`) + 1);

  const resp = await fetch(`${DATA_SOURCE_URL}/${id}`);

  const todoData: Todo = await resp.json();
  if (!todoData.id) {
    return NextResponse.json({
      Message: `No todo with ${id} found in database`,
    });
  }
  return NextResponse.json(todoData);
}
