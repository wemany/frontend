import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken || session.error) {
    return NextResponse.json(
      { message: session?.error || "Authentication required." },
      { status: 401 }
    );
  }

  const { slug: alias } = await params;
  const accessToken = session.accessToken;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL_COMMUNITIES}/api/community/${alias}/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();
    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { message: "Session expired. Please log in again." },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { message: data.message || "Error getting community." },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error: unknown) {
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
