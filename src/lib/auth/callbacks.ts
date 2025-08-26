import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: token.refreshToken }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to refresh token with backend.");
    }

    const newDecodedAccessTokenPayload = JSON.parse(
      Buffer.from(data.accessToken.split(".")[1], "base64").toString()
    );
    token.accessToken = data.accessToken;
    token.refreshToken = data.refreshToken;
    token.accessTokenExpires = newDecodedAccessTokenPayload.exp;
    token.error = undefined;
  } catch (error) {
    console.error("Error during token refresh:", error);
    token.error = "RefreshAccessTokenError";
  }
  return token;
}

export async function jwtCallback({
  token,
  user,
}: {
  token: JWT;
  user?: User;
}): Promise<JWT> {
  if (user) {
    token.id = user.id;
    token.full_name = user.full_name as string;
    token.email = user.email as string;
    token.avatar = user.avatar;
    token.communities = user.communities;
    token.accessToken = user.accessToken;
    token.refreshToken = user.refreshToken;
    token.accessTokenExpires = user.exp;
    token.error = undefined;

    return token;
  }

  const currentTime = Math.floor(Date.now() / 1000);

  if (!token.accessTokenExpires && token.accessToken) {
    try {
      const decoded = JSON.parse(
        Buffer.from(token.accessToken.split(".")[1], "base64").toString()
      );
      token.accessTokenExpires = decoded.exp;
    } catch (e) {
      console.error(
        "JWT Callback: Could not decode existing accessToken for exp",
        e
      );
      token.error = "RefreshAccessTokenError"; // Invalidate session if we can't even decode existing token
      return token;
    }
  }

  if (
    token.accessToken &&
    token.accessTokenExpires &&
    currentTime > (token.accessTokenExpires as number) - 60 &&
    token.error !== "RefreshAccessTokenError"
  ) {
    const newToken = await refreshAccessToken(token);
    return newToken;
  }

  return token;
}

export async function sessionCallback({
  session,
  token,
}: {
  session: Session;
  token: JWT;
  user?: User;
}): Promise<Session> {
  session.user.id = token.id;
  session.user.name = token.full_name;
  session.user.email = token.email;
  session.user.avatar = token.avatar;
  session.user.communities = token.communities;
  session.accessToken = token.accessToken as string;
  session.error = token.error;
  return session;
}
