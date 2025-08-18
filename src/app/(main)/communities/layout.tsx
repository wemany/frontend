import "../../globals.css";
import CommunityLayoutContent from "./CommunityLayoutContent";

export default function CommunityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CommunityLayoutContent>
      {children}
    </CommunityLayoutContent>
  )
}
