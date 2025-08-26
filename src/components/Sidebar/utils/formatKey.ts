export const formatKey = (key: string) => {
  // Reemplaza los guiones bajos con espacios y elimina la palabra "count"
  const formatted = key.replace(/_/g, " ").replace("count", "");
  // Capitaliza la primera letra de cada palabra
  return formatted.replace(/\b\w/g, (char) => char.toUpperCase()).trim();
};
