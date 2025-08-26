import { useState } from "react";
import { useSWRConfig } from "swr";
import { Module } from "../types/module.type";
import { deleteModule } from "../lib/api";

export const useDeleteModule = (communityId: string) => {
  const [moduleToDelete, setModuleToDelete] = useState<Module | null>(null);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const { mutate } = useSWRConfig();

  const modulesKey = `/api/modules/${communityId}/getModules`;

  const handleDeleteClick = (module: Module) => {
    setModuleToDelete(module);
    setIsDialogDeleteOpen(true);
  };

  const handleConfirmDelete = async (callbacks?: {
    onComplete: () => void;
    onError: () => void;
  }) => {
    if (moduleToDelete) {
      try {
        await deleteModule(moduleToDelete.id, communityId);
        setIsDialogDeleteOpen(false);
        setModuleToDelete(null);
        mutate(modulesKey);
        callbacks?.onComplete();
      } catch (error) {
        console.error("Error deleting module:", error);
        callbacks?.onError();
      }
    }
  };

  return {
    isDialogDeleteOpen,
    moduleToDelete,
    setIsDialogDeleteOpen,
    setModuleToDelete,
    handleDeleteClick,
    handleConfirmDelete,
  };
};
