import useWSR from "swr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CommunityData } from "../types/community";

const fetcher = async (url: string) => {
  const response = await fetch(url);

  const result = await response.json();

  if (!response.ok) {
    console.error("Error getting community: ", result.message);
    throw new Error(result.message);
  }
  return result;
};

export const useCommunityMembership = ({ slug }: { slug: string }) => {
  const { data: session, status } = useSession();
  const [isMember, setIsMember] = useState(false);
  const [communityId, setCommunityId] = useState("");
  const router = useRouter();

  const { data, error, isLoading, mutate } = useWSR<CommunityData>(
    slug && status === "authenticated"
      ? `/api/community/getCommunity/${slug}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      onSuccess: (responseData) => {
        if (responseData) {
          setIsMember(responseData.isMember);
          setCommunityId(responseData.community.communityId);
        }
      },
      onError: (err) => {
        if (
          err.status === 401 ||
          session?.error === "RefreshAccessTokenError"
        ) {
          router.push("/auth/login");
        } else {
          console.error("Error al cargar la comunidad:", err);
        }
      },
    }
  );

  return {
    isLoading,
    data,
    isMember,
    communityId,
    error,
    mutate,
  };
};
