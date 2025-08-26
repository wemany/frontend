import {
  EditCommunityForm,
  editCommunitySchema,
} from "@/app/(main)/profile/lib/schema/community.schema";
import { EditCommunityDialogProps } from "@/app/(main)/profile/types/community.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useFormEditCommunity = ({
  open,
  communityData,
  onSave,
  onOpenChange,
}: EditCommunityDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<EditCommunityForm>({
    resolver: zodResolver(editCommunitySchema),
    defaultValues: {
      name: communityData.name,
      description: communityData.description,
      banner: communityData.banner || "",
      logo: communityData.logo || "",
    },
    mode: "onTouched",
  });

  const handleSave = async (data: EditCommunityForm) => {
    setIsLoading(true);
    setError(null);

    try {
      await onSave(data);
      onOpenChange(false);
      form.reset(data); // Actualizar los valores por defecto
    } catch (error) {
      console.error("Error saving community:", error);
      setError(
        error instanceof Error ? error.message : "Error al guardar los cambios"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      onOpenChange(false);
      setError(null);
      // Resetear a los valores originales
      form.reset({
        name: communityData.name,
        description: communityData.description,
        banner: communityData.banner || "",
        logo: communityData.logo || "",
      });
    }
  };

  const handleBannerChange = (value: string) => {
    form.setValue("banner", value, { shouldTouch: true, shouldValidate: true });
  };

  const handleBannerRemove = () => {
    form.setValue("banner", "", { shouldTouch: true, shouldValidate: true });
  };

  const handleLogoChange = (value: string) => {
    form.setValue("logo", value, { shouldTouch: true, shouldValidate: true });
  };

  const handleLogoRemove = () => {
    form.setValue("logo", "", { shouldTouch: true, shouldValidate: true });
  };

  return {
    open,
    form,
    isLoading,
    error,
    handleClose,
    handleBannerChange,
    handleBannerRemove,
    handleLogoChange,
    handleLogoRemove,
    handleSave,
  };
};
