import { Control, UseFormReturn } from "react-hook-form";
import { CreateModuleForm } from "../lib/schema/module.schema";
import { Role } from "../../roles/types/role.type";

export interface Module {
  id: string;
  community_id: string;
  module_name: string;
  description: string;
  banner_url: string | null;
  role_required_id: string[];
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  index: string;
}

export interface ApiResponseModule {
  modules: Module[];
  plans?: [];
}

export interface CreateModuleModalProps {
  open: boolean;
  roles: Role[];
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateModuleForm) => void | Promise<void>;
  moduleToEdit?: Module | null;
}

export interface ModalFormProps {
  form: UseFormReturn<CreateModuleForm>;
  roles: Role[];
  isEditing: boolean;
  onSubmit: (data: CreateModuleForm) => void | Promise<void>;
}

export type FormControl = Control<CreateModuleForm>;

export interface ModuleFieldProps {
  control: FormControl;
  error?: string;
}
