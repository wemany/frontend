import { useState } from "react";
import { useSWRConfig } from "swr";

export const usePublishModule = () => {
  const [openModal, setOpenModal] = useState(false);
  const { mutate } = useSWRConfig();

  const handlePublishModule = async (
    moduleId: string,
    callbacks?: { onComplete: () => void; onError: () => void }
  ) => {
    try {
      mutate(`/api/modules/${moduleId}/publish`);
      callbacks?.onComplete();
    } catch (error) {
      console.error("Error updating module:", error);
      callbacks?.onError();
    }
  };

  return {
    openModal,
    setOpenModal,
    handlePublishModule,
  };
};
