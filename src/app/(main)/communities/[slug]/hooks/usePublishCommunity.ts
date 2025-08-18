"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";

export const usePublishCommunity = () => {
  const [isPublishing, setIsPublishing] = useState(false);
  const { mutate } = useSWRConfig();

  const handleAction = async (
    communityId: string,
    publish: boolean,
    slug: string
  ) => {
    try {
      setIsPublishing(true);
      const response = await fetch(`/api/community/${communityId}/publish`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publish }),
      });
      const result = await response.json();

      if (!response.ok) {
        console.error("Error Publishing community:", result);
        throw new Error(result.message || "Failed to Publish community");
      }
      mutate(`/api/community/getCommunity/${slug}`);

      setIsPublishing(false);

      return result;
    } catch (error) {
      setIsPublishing(false);
      console.error("Caught error Publishing community:", error);
      throw error;
    }
  };
  return {
    isPublishing,
    handleAction,
  };
};
