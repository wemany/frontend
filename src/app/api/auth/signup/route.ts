import { signupSchema } from "@/app/auth/lib/schema/signup.schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationData = signupSchema.safeParse(body);

    if (!validationData.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validationData.error.issues,
        },
        { status: 400 }
      );
    }

    const { fullName, email, phone, password } = validationData.data;

    const sendDataToServer = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: fullName,
          email,
          phone,
          password,
        }),
      }
    );

    const data = await sendDataToServer.json();

    if (!sendDataToServer.ok) {
      return NextResponse.json(
        { message: data.message || "Registration failed" },
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
