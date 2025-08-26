import { loginResponseSchema } from "@/app/auth/lib/schema/LoginResponse.schema";
import { User } from "next-auth";
import { ZodError } from "zod";

export const credentialsProvider = {
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials: Record<string, string> | undefined) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Authentication failed.");
      }

      const data = loginResponseSchema.parse(result);
      let infoUser: User | undefined;

      if (data.accessToken) {
        try {
          infoUser = JSON.parse(
            Buffer.from(data.accessToken.split(".")[1], "base64").toString()
          );
        } catch (decodeError) {
          console.error("Error decoding access token:", decodeError);
          throw new Error("Invalid access token.");
        }
      } else {
        throw new Error("No access token received from backend.");
      }
      if (infoUser) {
        return {
          id: infoUser.id,
          full_name: infoUser.full_name,
          email: credentials?.email,
          avatar: infoUser.avatar,
          communities: data.communities,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          exp: infoUser.exp,
        };
      }
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.error(
          "Error de validación de esquema en authorize:",
          error.errors.map((e) => e.message).join(", ")
        );
        throw new Error(
          "Error de validación: " +
            error.errors.map((e) => e.message).join(", ")
        );
      }
      if (error instanceof Error) {
        console.error("Error en authorize:", error.message);
        throw new Error(error.message);
      }
      console.error("unknown error in authorize:", error);
      throw new Error("An unexpected error occurred during login.");
    }
    return null;
  },
};
