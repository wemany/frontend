import { resetPasswordSchema } from "@/app/auth/lib/schema/resetPassword.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationData = resetPasswordSchema.safeParse(body);

    if (!validationData.success) {
      return NextResponse.json(
        { message: "Validation Error", errors: validationData.error.errors },
        { status: 400 }
      );
    }
    const { password, token } = validationData.data;

    const sendDataToServer = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/update-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      }
    );

    const data = await sendDataToServer.json();
    if (!sendDataToServer.ok) {
      return NextResponse.json(
        { errors: data.errors || "Error updating password" },
        { status: sendDataToServer.status }
      );
    }

    return NextResponse.json(data);
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
