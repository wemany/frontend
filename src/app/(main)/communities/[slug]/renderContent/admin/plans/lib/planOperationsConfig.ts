import { Box, Link, Play, Search, Unlink, Trash2, Zap } from "lucide-react";

export const createSteps = [
  { id: 1, text: "Preparando el esquema del plan", icon: Box, duration: 900 },
  { id: 2, text: "Configurando dependencias", icon: Link, duration: 1100 },
  { id: 3, text: "Inicializando el plan", icon: Play, duration: 700 },
];

export const updateSteps = [
  {
    id: 1,
    text: "Actualizando el esquema del plan",
    icon: Box,
    duration: 800,
  },
  { id: 2, text: "Actualizando dependencias", icon: Link, duration: 1000 },
  { id: 3, text: "Inicializando el plan", icon: Play, duration: 600 },
];

export const deleteSteps = [
  { id: 1, text: "Buscando referencias", icon: Search, duration: 700 },
  { id: 2, text: "Desvinculando dependencias", icon: Unlink, duration: 900 },
  {
    id: 3,
    text: "Eliminando archivos del plan",
    icon: Trash2,
    duration: 1200,
  },
  { id: 4, text: "Limpiando registros", icon: Zap, duration: 600 },
];

export const operationProps = {
  create: {
    title: "Creando nuevo Plan",
    description: "Estamos configurando y guardando el nuevo plan.",
    completionTitle: "¡Plan Creado!",
    completionDescription: "El nuevo plan se ha creado correctamente.",
    errorTitle: "Error al Crear",
    errorDescription:
      "Hubo un problema al crear el plan. Por favor, intenta de nuevo.",
    steps: createSteps,
  },
  update: {
    title: "Actualizando Plan",
    description: "Estamos guardando los cambios del plan.",
    completionTitle: "¡Plan Actualizado!",
    completionDescription: "Los cambios se han guardado correctamente.",
    errorTitle: "Error al Actualizar",
    errorDescription:
      "Hubo un problema al guardar los cambios del plan. Por favor, intenta de nuevo.",
    steps: updateSteps,
  },
  delete: {
    title: "Eliminando Plan",
    description: "Estamos procesando la eliminación del plan y sus datos.",
    completionTitle: "¡Plan Eliminado!",
    completionDescription: "El plan se ha eliminado correctamente.",
    errorTitle: "Error al Eliminar",
    errorDescription:
      "Hubo un problema al eliminar el plan. Por favor, intenta de nuevo.",
    steps: deleteSteps,
  },
};
