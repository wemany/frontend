import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ communityId: string }> }
) {
  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  const { communityId } = await params;

  const body = await req.json();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL_COMMUNITIES}/api/roles/${communityId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server responded with an error status:", response.status);
      console.error("Server error response body:", errorText);
    }

    const result = await response.json();
    return NextResponse.json(result);
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
