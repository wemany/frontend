const formatSubscriberCount = (count: number) => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count;
};

const formatPrice = (price: string | null, isRecurring: boolean) => {
  if (!price) return null;
  const formattedPrice = `$${price}`;
  return isRecurring ? `${formattedPrice}/month` : formattedPrice;
};

export { formatSubscriberCount, formatPrice };
