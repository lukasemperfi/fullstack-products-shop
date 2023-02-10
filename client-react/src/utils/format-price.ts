export const formatPrice = (number: number, currency = "USD") => {
  const formattedPrice = number.toLocaleString("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  });
  return formattedPrice;
};
