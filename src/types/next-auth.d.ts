import { Community } from "@/components/Sidebar/types/community";
import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    error?: "RefreshAccessTokenError";
    user: {
      id: string;
      full_name: string;
      email: string;
      communities: Record<string, Community>;
      avatar: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    full_name: string;
    avatar: string | null;
    communities: Record<string, Community>;
    accessToken: string;
    refreshToken: string;
    exp: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    full_name: string;
    email: string;
    avatar: string | null;
    communities: Record<string, Community>;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires: number;
    error?: "RefreshAccessTokenError";
  }
}
