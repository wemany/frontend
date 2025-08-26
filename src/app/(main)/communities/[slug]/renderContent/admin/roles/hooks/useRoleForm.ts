import { useFieldArray, useForm } from "react-hook-form";
import {
  CreateRoleForm,
  createRoleSchema,
  RoleHitoForm,
} from "../lib/schema/role.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const DEFAULT_HITOS: RoleHitoForm = {
  plugin: "",
  name: "",
  operator: ">=",
  value: 0,
};

const DEFAULT_VALUES: CreateRoleForm = {
  name: "",
  description: "",
  color: "",
  icon: "",
  hitos: [DEFAULT_HITOS],
};

export function useRoleForm() {
  const form = useForm<CreateRoleForm>({
    resolver: zodResolver(createRoleSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { watch } = form;

  const watchedValues = watch();

  const resetForm = () => {
    form.reset(DEFAULT_VALUES);
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "hitos",
  });

  const addHito = () => {
    append({ name: "", value: 0, plugin: "", operator: ">=" });
  };

  const removeHito = (index: number) => {
    remove(index);
  };

  const updateHito = (index: number, field: string, value: string | number) => {
    const currentMilestones = form.getValues("hitos") || [];
    const updatedMilestones = [...currentMilestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };
    form.setValue("hitos", updatedMilestones, {
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const isFormValid = () => {
    return form.formState.isValid;
  };

  return {
    form,
    fields,
    watchedValues,
    isFormValid,
    resetForm,
    addHito,
    removeHito,
    updateHito,
  };
}
