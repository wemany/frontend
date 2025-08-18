import "../globals.css";
import { getServerSession } from "next-auth";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "../Providers";
import { authOptions } from "@/lib/auth/authOptions";
import { UserCommunitiesProvider } from "@/context/UserCommunitiesContext";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <Providers session={session}>
      <UserCommunitiesProvider>
        {session ?
          <div className="flex min-w-full">
            {children}
          </div>
          :
          <>
            <Navbar />
            <div>
              {children}
            </div>
          </>
        }
      </UserCommunitiesProvider>
    </Providers>
  );
}
