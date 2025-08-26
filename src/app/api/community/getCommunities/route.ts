import { ApiComunities } from "@/app/(main)/communities/types/communties";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = req.nextUrl.searchParams.get("page");
  const limit = req.nextUrl.searchParams.get("limit");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL_COMMUNITIES}/api/community?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result: ApiComunities = await response.json();
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
