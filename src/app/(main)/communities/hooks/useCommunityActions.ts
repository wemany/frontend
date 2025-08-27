import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const useCommunityActions = () => {
  const [isJoiningLeaving, setIsJoiningLeaving] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleAction = async (
    url: string,
    actionName: string,
    planId?: string
  ) => {
    setIsJoiningLeaving(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
        }),
      });

      if (
        response.status === 401 ||
        session?.error === "RefreshAccessTokenError"
      ) {
        router.push("/auth/login");
        return null;
      }

      const result = await response.json();
      console.log({ result });
      if (response.ok) {
        return result;
      } else {
        console.error(`Error ${actionName} community:`, result);
        throw new Error(result.message || `Failed to ${actionName} community`);
      }
    } catch (error) {
      console.error(`Caught error ${actionName} community:`, error);
      throw error;
    } finally {
      setIsJoiningLeaving(false);
    }
  };

  const joinCommunity = async (communityId: string, planId: string) => {
    const url = `/api/community/${communityId}/subscribe`;
    return handleAction(url, "joining", planId);
  };

  const leaveCommunity = async (communityId: string) => {
    const url = `/api/community/${communityId}/cancel`;
    return handleAction(url, "leaving");
  };

  return {
    isJoiningLeaving,
    joinCommunity,
    leaveCommunity,
  };
};
