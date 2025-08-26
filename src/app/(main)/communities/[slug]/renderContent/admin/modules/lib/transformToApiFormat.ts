import { CreateModuleForm } from "./schema/module.schema";

export const transformToApiFormat = (
  formData: CreateModuleForm,
  communityId?: string
) => {
  return {
    community_id: communityId,
    module_name: formData.name,
    description: formData.description,
    role_required_id: formData.role_required,
    banner_url: formData.banner,
    is_active: formData.is_active,
  };
};
