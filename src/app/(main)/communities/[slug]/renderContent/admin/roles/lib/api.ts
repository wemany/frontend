import { CreateRoleForm } from "./schema/role.schema";

const transformToApiFormat = (
  formData: CreateRoleForm,
  communityId?: string
) => {
  return {
    community_id: communityId,
    role_name: formData.name,
    description: formData.description,
    icon: formData.icon,
    color: formData.color,
    requirement_json: {
      hitos: formData.hitos,
    },
  };
};

export const createRole = async (
  formData: CreateRoleForm,
  communityId: string
) => {
  const apiPayload = transformToApiFormat(formData, communityId);
  const response = await fetch("/api/role/roleCreate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiPayload),
  });
  const result = await response.json();
  console.log({ result });
  if (!response.ok) {
    console.error("❌ Error al crear el rol:", result.errors);
    throw new Error(result.message || `Server error: ${response.status}`);
  }

  return result;
};

export const deleteRole = async (roleId: string) => {
  const response = await fetch(`/api/role/deleteRole/${roleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();

  if (!response.ok) {
    console.error("❌ Error al eliminar el rol:", result.message);
    throw new Error(result.message || `Server error: ${response.status}`);
  }
  return result;
};

export const updateRole = async (
  roleId: string,
  communityId: string,
  formData: CreateRoleForm
) => {
  const apiPayload = {
    role_id: roleId,
    role_name: formData.name,
    description: formData.description,
    color: formData.color,
    requirement_json: {
      hitos: formData.hitos,
    },
  };
  const response = await fetch(`/api/role/updateRole/${communityId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(apiPayload),
  });
  const result = await response.json();
  if (!response.ok) {
    console.error("❌ Error al eliminar el rol:", result.message);
    throw new Error(result.message || `Server error: ${response.status}`);
  }
  return result;
};
