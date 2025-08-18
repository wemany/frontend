import { useState } from "react";
import { useSWRConfig } from "swr";
import { Role } from "../types/role.type";
import { CreateRoleForm } from "../lib/schema/role.schema";
import { updateRole } from "../lib/api";

export const useUpdateRole = (
  communityId: string,
  setOpenModal: (value: boolean) => void
) => {
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);
  const { mutate } = useSWRConfig();

  const roleKey = `/api/role/getRoles/${communityId}`;

  const handleEditClick = (role: Role) => {
    setRoleToEdit(role);
    setOpenModal(true);
  };

  const handleSubmitUpdate = async (
    formData: CreateRoleForm,
    callback?: { onComplete: () => void; onError: () => void }
  ) => {
    if (!roleToEdit) return;

    try {
      await updateRole(roleToEdit.role_id, communityId, formData);
      mutate(roleKey);
      callback?.onComplete();
    } catch (error) {
      console.error("Error updating role:", error);
      callback?.onError();
    }
  };
  return {
    roleToEdit,
    setOpenModal,
    handleEditClick,
    handleSubmitUpdate,
  };
};
