import { EditCommunityData } from "@/app/(main)/profile/types/community.types";
import { mutate } from "swr";

export const useUpdateCommunity = ({
  communityId,
}: {
  communityId: string;
}) => {
  const handleSaveChanges = async (
    updatedData: EditCommunityData,
    slug: string
  ) => {
    try {
      const response = await fetch(`/api/community/${communityId}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();

      if (!response.ok) {
        console.error("Error Publishing community:", result);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      mutate(`/api/community/getCommunity/${slug}`);
    } catch (error) {
      console.error("❌ Error updating community:", error);
      throw error;
    }
  };

  return { handleSaveChanges };
};
