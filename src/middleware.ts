import { NextResponse } from "next/server";

// middleware applies to every request on the webpage
// we can limit were the middleware is applied with the config object

const allowedOption =
  process.env.NODE_ENV === "production"
    ? [`https://vercel.myapp.com`, `https://wearedoinggreat.com`] // list for production
    : [`http://localhost:3000`, `http://localhost:5173`]; // list for development

export default function (request: Request) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOption.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: `Origin not allowed`,
      headers: { "Content-Type": "text/plain" },
    });
  }
  // using regex to test and avoid the use of config
  //   const regex = new RegExp("/api/*");
  //   if (regex.test(request.url)) {
  //   ...everything goes here
  //   }
  console.log(`Middleware`);
  console.log(request.url);
  console.log(request.method);

  console.log(origin);
  return NextResponse.next();
}

// To limit our middleware only to pages in the api
export const config = {
  matcher: ["/api/:path*", "/feedback/:path*"],
};
