import { Box, Link, Play, Search, Unlink, Trash2, Zap } from "lucide-react";

export const createSteps = [
  { id: 1, text: "Preparando el esquema del módulo", icon: Box, duration: 900 },
  { id: 2, text: "Configurando dependencias", icon: Link, duration: 1100 },
  { id: 3, text: "Inicializando el módulo", icon: Play, duration: 700 },
];

export const updateSteps = [
  {
    id: 1,
    text: "Actualziando el esquema del módulo",
    icon: Box,
    duration: 800,
  },
  { id: 2, text: "Actualizando dependencias", icon: Link, duration: 1000 },
  { id: 3, text: "Inicializando el módulo", icon: Play, duration: 600 },
];

export const deleteSteps = [
  { id: 1, text: "Buscando referencias", icon: Search, duration: 700 },
  { id: 2, text: "Desvinculando dependencias", icon: Unlink, duration: 900 },
  {
    id: 3,
    text: "Eliminando archivos del módulo",
    icon: Trash2,
    duration: 1200,
  },
  { id: 4, text: "Limpiando registros", icon: Zap, duration: 600 },
];

export const operationProps = {
  create: {
    title: "Creando nuevo Módulo",
    description: "Estamos configurando y guardando el nuevo módulo.",
    completionTitle: "¡Módulo Creado!",
    completionDescription: "El nuevo módulo se ha creado correctamente.",
    errorTitle: "Error al Crear",
    errorDescription:
      "Hubo un problema al crear el módulo. Por favor, intenta de nuevo.",
    steps: createSteps,
  },
  update: {
    title: "Actualizando Módulo",
    description: "Estamos guardando los cambios del módulo.",
    completionTitle: "¡Módulo Actualizado!",
    completionDescription: "Los cambios se han guardado correctamente.",
    errorTitle: "Error al Actualizar",
    errorDescription:
      "Hubo un problema al guardar los cambios del módulo. Por favor, intenta de nuevo.",
    steps: updateSteps,
  },
  delete: {
    title: "Eliminando Módulo",
    description: "Estamos procesando la eliminación del módulo y sus datos.",
    completionTitle: "¡Módulo Eliminado!",
    completionDescription: "El módulo se ha eliminado correctamente.",
    errorTitle: "Error al Eliminar",
    errorDescription:
      "Hubo un problema al eliminar el módulo. Por favor, intenta de nuevo.",
    steps: deleteSteps,
  },
};
