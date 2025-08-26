import { Control, UseFormReturn } from "react-hook-form";
import { CreateRoleForm, RoleHitoForm } from "../lib/schema/role.schema";

export interface CreateRoleModalProps {
  open: boolean;
  roleToEdit?: Role | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateRoleForm) => void | Promise<void>;
}

export interface ModalFormProps {
  form: UseFormReturn<CreateRoleForm>;
  roleFormHandlers: RoleFormHandlers;
  isEditing: boolean;
  isFormValid: () => boolean;
  onSubmit: (data: CreateRoleForm) => void | Promise<void>;
}

export interface RoleFormHandlers {
  addHito: () => void;
  removeHito: (index: number) => void;
  updateHito: (index: number, field: HitoKey, value: HitoValue) => void;
}

export type FormControl = Control<CreateRoleForm>;
export type HitoValue = string | number;
export type HitoKey = keyof RoleHitoForm;

export interface RoleFieldProps {
  control: FormControl;
  error?: string;
}

export interface HitoFieldProps {
  control: FormControl;
  onAddHito: () => void;
  onRemoveHito: (hitoIndex: number) => void;
  updateHito: (index: number, field: string, value: string | number) => void;
  getHitosValues: () => HitoItem[];
  error?: string;
}

export interface HitoItem {
  name: string;
  value: number;
  plugin: string;
  operator: ">" | ">=" | "<" | "<=" | "=";
}

export interface Role {
  role_id: string;
  role_name: string;
  description: string;
  color: string;
  requirement_json: {
    hitos: HitoItem[];
  };
  members: number;
  icon?: string;
}

export interface EditRoleData {
  id?: string;
  name?: string;
  description?: string;
  color?: string;
}
