import { useState } from "react";
import { useSWRConfig } from "swr";
import { CreateModuleForm } from "../lib/schema/module.schema";
import { createModule } from "../lib/api";

export const useCreateModule = (communityId: string) => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate } = useSWRConfig();

  const modulesKey = `/api/modules/${communityId}/getModules`;

  const handleSubmitModule = async (
    formData: CreateModuleForm,
    callbacks?: { onComplete: () => void; onError: () => void }
  ) => {
    try {
      await createModule(formData, communityId);
      mutate(modulesKey);
      // mutate(`/api/roles/${communityId}`);
      callbacks?.onComplete();
    } catch (error) {
      console.error("Error creating module:", error);
      callbacks?.onError();
    }
  };

  return {
    openModal,
    setOpenModal,
    handleSubmitModule,
  };
};
