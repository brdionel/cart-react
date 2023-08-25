export const truncateString = (text, limit = 100) => {
  if (text.length > 100) {
    return text.slice(0, limit).concat("...");
  }
  return text;
};

export const isMobile = () => {
  return window.innerWidth < 576;
};
