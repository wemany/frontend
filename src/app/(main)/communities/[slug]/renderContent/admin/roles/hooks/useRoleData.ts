import { useState } from "react";

export const useRoleData = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogDeleteOpen, setIsDialogDeleteOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoleData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleCloseDeleteDialog = (open: boolean) => {
    setIsDialogDeleteOpen(open);
  };

  return {
    isLoading,
    isDialogOpen,
    isDialogDeleteOpen,
    fetchRoleData,
    setIsDialogOpen,
    setIsDialogDeleteOpen,
    handleCloseDialog,
    handleCloseDeleteDialog,
  };
};
