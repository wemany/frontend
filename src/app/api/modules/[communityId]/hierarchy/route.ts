import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ communityId: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || !session.accessToken || session.error) {
    return NextResponse.json(
      { message: session?.error || "Authentication required." },
      { status: 401 }
    );
  }

  const accessToken = session.accessToken;
  const { communityId } = await params;

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL_MODULES}/api/learning/modules/${communityId}/hierarchy`;

  const body = await req.json();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ body }),
      cache: "no-store",
    });
    const data = await response.json();
    return NextResponse.json(data);
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
