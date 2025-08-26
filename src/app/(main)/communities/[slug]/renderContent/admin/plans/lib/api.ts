import { TransformedData } from "@/app/(main)/profile/types/api.types";
import { CreatePlanForm } from "./schema/plan.schema";

const transformToApiFormat = (
  formData: CreatePlanForm,
  communityId?: string,
  communityData?: TransformedData | null
) => {
  const currencyData = communityData?.currencies.find(
    (currency) => currency.value === formData.currency
  );

  return {
    community_id: communityId,
    name: formData.name,
    description: formData.description,
    color: formData.color,
    benefits: formData.benefits,
    price: formData.price,
    currency_id: currencyData?.id,
    role_required_id: formData.role,
    duration_unit: formData.duration_unit,
    duration_value: formData.duration_value,
    is_recurring: formData.is_recurring,
  };
};

export const createPlan = async (
  formData: CreatePlanForm,
  communityId: string,
  communityData?: TransformedData | null
) => {
  const apiPayload = transformToApiFormat(formData, communityId, communityData);
  console.log({ apiPayload });
  const response = await fetch("/api/plans/createPlan", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiPayload),
  });
  const result = await response.json();
  console.log({ result });
  if (!response.ok) {
    console.error("❌ Error al crear el plan:", result.errors);
    throw new Error(result.message || `Server error: ${response.status}`);
  }

  console.log({ result });
  return result;
};

export const deletePlan = async (planId: string) => {
  const response = await fetch(`/api/plans/deletePlan/${planId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    console.error("❌ Error al eliminar el módulo:", result.message);
    throw new Error(result.message || `Server error: ${response.status}`);
  }
  return result;
};

export const updatePlan = async (
  planId: string,
  communityId: string,
  formData: CreatePlanForm,
  communityData?: TransformedData | null
) => {
  const currencyData = communityData?.currencies.find(
    (currency) => currency.value === formData.currency
  );
  const apiPayload = {
    id: planId,
    community_id: communityId,
    name: formData.name,
    description: formData.description,
    color: formData.color,
    benefits: formData.benefits,
    price: Number(formData.price),
    currency_id: currencyData?.id,
    role_required_id: formData.role,
    duration_unit: formData.duration_unit,
    duration_value: formData.duration_value,
    is_recurring: formData.is_recurring,
  };
  console.log(formData, apiPayload);
  const response = await fetch(`/api/plans/updatePlan`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiPayload),
  });
  const result = await response.json();
  console.log({ result });
  if (!response.ok) {
    console.error("❌ Error al editart el módulo:", result.message);
    throw new Error(result.message || `Server error: ${response.status}`);
  }
  return result;
};
