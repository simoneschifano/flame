export const getCleanedUpClassNames = (classNames) =>
  classNames.filter(Boolean).join(" ").trim();
