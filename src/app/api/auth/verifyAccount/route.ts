import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json({ errors: "Token not found" }, { status: 400 });
    }

    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/verify-account?token=${token}`;

    const sendTokenToServer = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await sendTokenToServer.json();

    if (!sendTokenToServer.ok) {
      return NextResponse.json(
        { message: data.message || "Error verify account" },
        { status: sendTokenToServer.status }
      );
    }

    return NextResponse.json({ message: data.message });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(
        { message: error.message || "Something went wrong" },
        { status: 500 }
      );
    } else {
      console.error("An unexpected error occurred:", error);
      return NextResponse.json(
        { message: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
