import { useSWRConfig } from "swr";
import { CreateRoleForm } from "../lib/schema/role.schema";
import { createRole } from "../lib/api";

export const useCreateRole = (communityId: string) => {
  const { mutate } = useSWRConfig();

  const roleKey = `/api/role/getRoles/${communityId}`;

  const handleSubmitModule = async (
    formData: CreateRoleForm,
    callbacks?: { onComplete: () => void; onError: () => void }
  ) => {
    try {
      await createRole(formData, communityId);
      mutate(roleKey);
      callbacks?.onComplete();
    } catch (error) {
      console.error("Error creating module:", error);
      callbacks?.onError();
    }
  };

  return {
    handleSubmitModule,
  };
};
