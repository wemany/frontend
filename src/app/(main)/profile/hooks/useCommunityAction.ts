import { useState } from "react";
import { CreateCommunityForm } from "../lib/schema/community.schema";
import { TransformedData } from "../types/api.types";
import { useRouter } from "next/navigation";

export const useCommunityActions = (
  setIsDialogOpen: (open: boolean) => void
) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [hasCreationError, setHasCreationError] = useState<string | null>(null);
  const [communityName, setCommunityName] = useState("");

  const [lastFormData, setLastFormData] = useState<CreateCommunityForm | null>(
    null
  );
  const [lastCommunityData, setLastCommunityData] =
    useState<TransformedData | null>(null);

  const transformToApiFormat = (
    formData: CreateCommunityForm,
    communityData: TransformedData
  ) => {
    // Encontrar los IDs correspondientes usando los valores del formulario
    const categoryData = communityData.categories.find(
      (cat) => cat.value === formData.category
    );
    const languageData = communityData.languages.find(
      (lang) => lang.value === formData.language
    );

    return {
      name: formData.name,
      description: formData.description,
      category_id: categoryData?.id || null,
      language_id: languageData?.id || null,
      is_public: formData.isPublic,
      tags: formData.tags,
      plans: formData.plans.map((plan) => {
        const currencyData = communityData.currencies.find(
          (curr) => curr.value === plan.currency
        );
        return {
          name: plan.name,
          description: plan.description,
          duration_unit: plan.duration_unit == "none" ? "" : plan.duration_unit,
          duration_value:
            plan.duration_unit == "none" ? 0 : plan.duration_value,
          is_recurring: plan.is_recurring,
          price: plan.price,
          currency_id: currencyData?.id || null,
          color: plan.color,
          benefits: plan.benefits.filter(
            (benefit: string) => benefit.trim() !== ""
          ),
        };
      }),
      banner_base64: formData.banner || null,
      logo_base64: formData.logo || null,
    };
  };

  const handleCreateCommunity = async (
    formData: CreateCommunityForm,
    data: TransformedData
  ): Promise<void> => {
    if (!data) {
      console.error("Community data not available");
      return;
    }
    setLastFormData(formData);
    setLastCommunityData(data);

    setIsDialogOpen(false);
    setCommunityName(formData.name);
    setIsCreating(true);
    setIsLoading(true);
    setHasCreationError(null);
    const apiPayload = transformToApiFormat(formData, data);
    console.log("API Payload:", apiPayload);
    try {
      const response = await fetch("/api/community/communityCreate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      const result = await response.json();
      console.log({ result, message: result.message });
      if (result.message === "La comunidad ya existe") {
        setHasCreationError("La comunidad ya existe.");
        return;
      }
      console.log(result.community.alias);
      router.push(`/communities/${result.community.alias}`);
    } catch (error) {
      console.error("Error creating community:", error);
      if (!hasCreationError) {
        setHasCreationError(
          "Ocurrió un error inesperado. Por favor, intenta de nuevo."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreationComplete = () => {
    setIsCreating(false);
    // setIsDialogOpen(false);
  };

  const handleCreationError = () => {
    console.error("Manejo de error: Intentar de nuevo o cerrar.");
    setIsLoading(false);
    setHasCreationError("Manejo de error: Intentar de nuevo.");
    if (lastFormData && lastCommunityData) {
      setIsDialogOpen(true);
    }
  };

  return {
    isLoading,
    isCreating,
    communityName,
    hasCreationError,
    lastFormData,
    handleCreateCommunity,
    handleCreationComplete,
    handleCreationError,
  };
};
