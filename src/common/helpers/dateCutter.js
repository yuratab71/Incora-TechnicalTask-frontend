const dateStringCutter = (string) => {
  if (!string) return "";
  return string.split(" ").splice(0, 5).join(" ");
};

export default dateStringCutter;
