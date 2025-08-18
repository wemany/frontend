import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

export interface InputFieldProps<TFormValues extends FieldValues> {
  id: Path<TFormValues>;
  type: string;
  isSubmitting: boolean;
  placeholder: string;
  iconSrc: string;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
}

export interface CheckboxFieldProps<TFormValues extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: Path<TFormValues>;
  errors: FieldErrors<TFormValues>;
  children?: React.ReactNode;
  register: UseFormRegister<TFormValues>;
}

export interface PasswordInputProps<TFormValues extends FieldValues> {
  id: Path<TFormValues>;
  name: Path<TFormValues>;
  placeholder: string;
  isSubmitting: boolean;
  errors: FieldErrors<TFormValues>;
  register: UseFormRegister<TFormValues>;
  watch: UseFormWatch<TFormValues>;
}
