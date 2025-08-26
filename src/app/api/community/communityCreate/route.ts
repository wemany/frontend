import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  const body = await req.json();
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL_COMMUNITIES}/api/community`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );
    const result = await response.json();

    console.log({ result });
    return NextResponse.json(result);
  } catch (error: unknown) {
    console.log({ error });
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json(
        { message: error.message || "Something went wrong" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
