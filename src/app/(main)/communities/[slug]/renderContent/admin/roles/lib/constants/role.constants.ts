import {
  Crown,
  Eye,
  Settings,
  Shield,
  Star,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

export const ROLE_COLORS = [
  {
    value: "purple",
    label: "Morado",
    class: "bg-purple-500 text-purple-400 border-purple-500",
  },
  {
    value: "blue",
    label: "Azul",
    class: "bg-blue-500 text-blue-400 border-blue-500",
  },
  {
    value: "green",
    label: "Verde",
    class: "bg-green-500 text-green-400 border-green-500",
  },
  {
    value: "yellow",
    label: "Amarillo",
    class: "bg-yellow-500 text-yellow-400 border-yellow-500",
  },
  {
    value: "red",
    label: "Rojo",
    class: "bg-red-500 text-red-400 border-red-500",
  },
  {
    value: "pink",
    label: "Rosa",
    class: "bg-pink-500 text-pink-400 border-pink-500",
  },
  {
    value: "indigo",
    label: "Índigo",
    class: "bg-indigo-500 text-indigo-400 border-indigo-500",
  },
  {
    value: "teal",
    label: "Verde azulado",
    class: "bg-teal-500 text-teal-400 border-teal-500",
  },
  {
    value: "orange",
    label: "Naranja",
    class: "bg-orange-500 text-orange-400 border-orange-500",
  },
  {
    value: "cyan",
    label: "Cian",
    class: "bg-cyan-500 text-cyan-400 border-cyan-500",
  },
  {
    value: "emerald",
    label: "Esmeralda",
    class: "bg-emerald-500 text-emerald-400 border-emerald-500",
  },
  {
    value: "rose",
    label: "Rosa intenso",
    class: "bg-rose-500 text-rose-400 border-rose-500",
  },
];

export const ROLE_ICONS = [
  { value: "crown", label: "Corona", icon: Crown },
  { value: "shield", label: "Escudo", icon: Shield },
  { value: "star", label: "Estrella", icon: Star },
  { value: "zap", label: "Rayo", icon: Zap },
  { value: "users", label: "Usuarios", icon: Users },
  { value: "settings", label: "Configuración", icon: Settings },
  { value: "usercheck", label: "Usuario Verificado", icon: UserCheck },
  { value: "eye", label: "Ojo", icon: Eye },
];

export const PERMISSIONS = [
  {
    value: "manage_members",
    label: "Gestionar miembros",
    description: "Invitar, expulsar y gestionar usuarios",
  },
  {
    value: "moderate_content",
    label: "Moderar contenido",
    description: "Eliminar posts y comentarios inapropiados",
  },
  {
    value: "manage_events",
    label: "Gestionar eventos",
    description: "Crear y administrar eventos de la comunidad",
  },
  {
    value: "view_analytics",
    label: "Ver analíticas",
    description: "Acceso a estadísticas de la comunidad",
  },
  {
    value: "send_announcements",
    label: "Enviar anuncios",
    description: "Publicar anuncios para todos los miembros",
  },
  {
    value: "manage_roles",
    label: "Gestionar roles",
    description: "Crear y asignar roles a otros miembros",
  },
];

export const HITOS_LENGTH = {
  MIN: 1,
  MAX: 10,
} as const;
