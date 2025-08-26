import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL_PROFILE}/api/profile`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const result = await response.json();
    console.log({ result });
    return NextResponse.json(result);
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
