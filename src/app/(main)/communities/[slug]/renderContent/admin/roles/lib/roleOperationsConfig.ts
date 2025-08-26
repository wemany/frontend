import {
  Search,
  Unlink,
  Trash2,
  Zap,
  CircleDashed,
  Sparkles,
  UsersRound,
} from "lucide-react";

export const createSteps = [
  {
    id: 1,
    text: "Creando la estructura del rol",
    icon: UsersRound,
    duration: 800,
  },
  { id: 2, text: "Asignando permisos", icon: CircleDashed, duration: 1000 },
  { id: 3, text: "Guardando configuración", icon: Sparkles, duration: 600 },
];

export const updateSteps = [
  {
    id: 1,
    text: "Actualizado la estructura del rol",
    icon: UsersRound,
    duration: 800,
  },
  { id: 2, text: "Actualizando permisos", icon: CircleDashed, duration: 1000 },
  { id: 3, text: "Guardando configuración", icon: Sparkles, duration: 600 },
];

export const deleteSteps = [
  { id: 1, text: "Buscando referencias", icon: Search, duration: 700 },
  { id: 2, text: "Desvinculando dependencias", icon: Unlink, duration: 900 },
  {
    id: 3,
    text: "Eliminando permisos del rol",
    icon: Trash2,
    duration: 1200,
  },
  { id: 4, text: "Limpiando registros", icon: Zap, duration: 600 },
];

export const operationProps = {
  create: {
    title: "Creando nuevo Rol",
    description: "Estamos configurando y guardando el nuevo rol.",
    completionTitle: "¡Rol Creado!",
    completionDescription: "El nuevo rol se ha creado correctamente.",
    errorTitle: "Error al Crear",
    errorDescription:
      "Hubo un problema al crear el rol. Por favor, intenta de nuevo.",
    steps: createSteps,
  },
  update: {
    title: "Actualizando Rol",
    description: "Estamos guardando los cambios del rol.",
    completionTitle: "¡Rol Actualizado!",
    completionDescription: "Los cambios se han guardado correctamente.",
    errorTitle: "Error al Actualizar",
    errorDescription:
      "Hubo un problema al guardar los cambios del rol. Por favor, intenta de nuevo.",
    steps: updateSteps,
  },
  delete: {
    title: "Eliminando Rol",
    description: "Estamos procesando la eliminación del rol y sus datos.",
    completionTitle: "¡Rol Eliminado!",
    completionDescription: "El rol se ha eliminado correctamente.",
    errorTitle: "Error al Eliminar",
    errorDescription:
      "Hubo un problema al eliminar el rol. Por favor, intenta de nuevo.",
    steps: deleteSteps,
  },
};
