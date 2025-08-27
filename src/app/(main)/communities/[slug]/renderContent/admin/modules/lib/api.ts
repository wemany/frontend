import { CreateModuleForm } from "./schema/module.schema";
import { transformToApiFormat } from "./transformToApiFormat";

export const createModule = async (
  formData: CreateModuleForm,
  communityId: string
) => {
  const apiPayload = transformToApiFormat(formData, communityId);
  const response = await fetch("/api/modules/moduleCreate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiPayload),
  });
  const result = await response.json();
  if (!response.ok) {
    console.error("❌ Error al crear el módulo:", result.errors);
    throw new Error(result.message || `Server error: ${response.status}`);
  }

  return result;
};

export const deleteModule = async (moduleId: string, communityId: string) => {
  const response = await fetch(
    `/api/modules/deleteModule/${moduleId}/${communityId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const result = await response.json();

  if (!response.ok) {
    console.error("❌ Error al eliminar el módulo:", result.message);
    throw new Error(result.message || `Server error: ${response.status}`);
  }
  return result;
};

export const updateModule = async (
  moduleId: string,
  communityId: string,
  formData: CreateModuleForm
) => {
  const apiPayload = {
    module_name: formData.name,
    banner_url: formData.banner,
    description: formData.description,
    role_required_id: formData.role_required,
    is_active: formData.is_active,
  };
  const response = await fetch(
    `/api/modules/updateModule/${moduleId}/${communityId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    }
  );
  const result = await response.json();
  console.log({ result });
  if (!response.ok) {
    console.error("❌ Error al eliminar el módulo:", result.message);
    throw new Error(result.message || `Server error: ${response.status}`);
  }
  return result;
};

export const updateModuleOrder = async (
  communityId: string,
  { arg }: { arg: { id: string; index: number }[] }
) => {
  const response = await fetch(`/api/modules/${communityId}/hierarchy`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });

  const result = await response.json();
  if (!response.ok) {
    console.error(
      "❌ Error al actualizar el orden de los módulos:",
      result.message
    );
    throw new Error(result.message || `Server error: ${response.status}`);
  }
  return result;
};

export const publishModule = async (
  moduleId: string,
  communityId: string,
  formData: CreateModuleForm
) => {
  const apiPayload = {
    module_name: formData.name,
    banner_url: formData.banner,
    description: formData.description,
    role_required_id: formData.role_required,
    is_active: formData.is_active,
  };
  const response = await fetch(
    `/api/modules/updateModule/${moduleId}/${communityId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    }
  );
  const result = await response.json();
  if (!response.ok) {
    console.error("❌ Error al eliminar el módulo:", result.message);
    throw new Error(result.message || `Server error: ${response.status}`);
  }
  return result;
};
