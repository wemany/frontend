import { useState } from "react";
import { useSWRConfig } from "swr";
import { CreateModuleForm } from "../lib/schema/module.schema";
import { Module } from "../types/module.type";
import { updateModule } from "../lib/api";

export const useUpdateModule = (communityId: string) => {
  const [openModal, setOpenModal] = useState(false);
  const [moduleToEdit, setModuleToEdit] = useState<Module | null>(null);
  const { mutate } = useSWRConfig();

  const handleEditClick = (module: Module) => {
    setModuleToEdit(module);
    setOpenModal(true);
  };

  const handleSubmitUpdate = async (
    formData: CreateModuleForm,
    callbacks?: { onComplete: () => void; onError: () => void }
  ) => {
    if (!moduleToEdit) return;

    try {
      await updateModule(moduleToEdit.id, communityId, formData);
      mutate(`/api/modules/${communityId}/getModules`);
      callbacks?.onComplete();
    } catch (error) {
      console.error("Error updating module:", error);
      callbacks?.onError();
    }
  };

  return {
    openModal,
    moduleToEdit,
    setOpenModal,
    handleEditClick,
    handleSubmitUpdate,
  };
};
