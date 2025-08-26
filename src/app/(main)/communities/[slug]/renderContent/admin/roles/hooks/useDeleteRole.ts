import { useState } from "react";
import { Role } from "../types/role.type";
import { useSWRConfig } from "swr";
import { deleteRole } from "../lib/api";

export const useDeleteRole = (
  communityId: string,
  setIsDialogDeleteOpen: (value: boolean) => void
) => {
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);
  const { mutate } = useSWRConfig();

  const roleKey = `/api/role/getRoles/${communityId}`;

  const handleDeleteClick = (role: Role) => {
    setRoleToDelete(role);
    setIsDialogDeleteOpen(true);
  };

  const handleConfirmDelete = async (callbacks?: {
    onComplete: () => void;
    onError: () => void;
  }) => {
    if (roleToDelete) {
      try {
        await deleteRole(roleToDelete.role_id);
        setIsDialogDeleteOpen(false);
        setRoleToDelete(null);
        mutate(roleKey);
        callbacks?.onComplete();
      } catch (error) {
        console.error("Error deleting role:", error);
        callbacks?.onError();
      }
    }
  };

  return {
    roleToDelete,
    handleDeleteClick,
    handleConfirmDelete,
    setIsDialogDeleteOpen,
    setRoleToDelete,
  };
};
