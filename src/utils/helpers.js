export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
    style: "currency",
    currency: "INR",
  }).format((number / 100) * 60.5);
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  if (type === "colors") {
    // colors ke bhi array h is liye isko flat karenge
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
