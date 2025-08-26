export const PUBLIC_AUTH_ROUTES = ["/auth/login", "/auth/register"];

export const PUBLIC_BASE_ROUTES = ["/", "/communities", "/products"];

export const PROTECTED_SPECIFIC_ROUTES = [
  "/dashboard",
  "/settings",
  "/profile",
  /^\/communities\/[a-zA-Z0-9_-]+(\/.*)?$/,
];

export const PROTECTED_ROLES_ROUTES = {
  admin: [/^\/admin(\/.*)?$/],
};
