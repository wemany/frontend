import { CreatePlanForm } from "./schema/plan.schema";

const transformToApiFormat = (
  formData: CreatePlanForm,
  communityId?: string
) => {
  return {
    // name: formData.name,
    // description: formData.description,
    // ...
    // role_id: formData.roleId,
    ...formData,
    community_id: communityId,
  };
};

export const createPlan = async (
  formData: CreatePlanForm,
  communityId: string
) => {
  const apiPayload = transformToApiFormat(formData, communityId);
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

// export const updateModule = async (
//   moduleId: string,
//   communityId: string,
//   formData: CreatePlanForm
// ) => {
//   const apiPayload = {
//     module_name: formData.name,
//     description: formData.description,
//     role_required_id: formData.role_required,
//     is_active: formData.is_active,
//   };
//   const response = await fetch(
//     `/api/modules/updateModule/${moduleId}/${communityId}`,
//     {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(apiPayload),
//     }
//   );
//   const result = await response.json();
//   if (!response.ok) {
//     console.error("❌ Error al eliminar el módulo:", result.message);
//     throw new Error(result.message || `Server error: ${response.status}`);
//   }
//   return result;
// };
