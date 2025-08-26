import { forgotPasswordSchema } from "@/app/auth/lib/schema/forgotPassword.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validationData = forgotPasswordSchema.safeParse(body);

    if (!validationData.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validationData.error.issues,
        },
        { status: 400 }
      );
    }

    const { email } = validationData.data;
    const sendDataToServer = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/recover-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );
    const data = await sendDataToServer.json();

    if (!sendDataToServer.ok) {
      return NextResponse.json(
        { message: data.error || "Error sending email" },
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
