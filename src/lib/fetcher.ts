export const fetcher = async (url: string) => {
  const response = await fetch(url);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
  }
  return result;
};
