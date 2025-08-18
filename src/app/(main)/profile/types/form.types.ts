import type { Control, FieldPath } from "react-hook-form";
import { CreateCommunityForm } from "../lib/schema/community.schema";

export type FormControl = Control<CreateCommunityForm>;

export type FormFieldName = FieldPath<CreateCommunityForm>;

export interface FormFieldProps<T extends FormFieldName> {
  control: FormControl;
  name: T;
}
