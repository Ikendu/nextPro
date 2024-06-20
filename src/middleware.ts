import { NextResponse } from "next/server";

// middleware applies to every request on the webpage
// we can limit were the middleware is applied with the config object

export default function (request: Request) {
  // using regex to test and avoid the use of config
  //   const regex = new RegExp("/api/*");
  //   if (regex.test(request.url)) {
  //   ...everything goes here
  //   }
  console.log(`Middleware`);
  console.log(request.url);
  console.log(request.method);
  const origin = request.headers.get("origin");
  console.log(origin);
  return NextResponse.next();
}

// To limit our middleware only to pages in the api
export const config = {
  matcher: ["/api/:path*", "/feedback/:path*"],
};
