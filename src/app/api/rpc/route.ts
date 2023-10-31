import { NextResponse } from "next/server";
import { serverEnv } from "@/env/server.mjs";

export async function POST(req: Request) {
  try {
    const requestBody = await req.json();
    const res = await fetch(serverEnv.ALCHEMY_RPC_URL, {
      method: "POST",
      headers: {
        ...req.headers,
        "Content-Type": "application/json", // ensure the content type is set to JSON
      },
      body: JSON.stringify(requestBody),
    });

    if (!res.ok) {
      console.error("Response error:", res.statusText);
      return new NextResponse(res.statusText, { status: res.status });
    }

    const responseBody = await res.json();
    console.log({ responseBody });

    return NextResponse.json(responseBody);
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      console.error("Error:", error.message);
      return new NextResponse(error.message as BodyInit, { status: 500 });
    } else {
      console.error("Error:", error);
      return new NextResponse(error as BodyInit, { status: 500 });
    }
  }
}
