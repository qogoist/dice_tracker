// This is abit of a hack but it works 😁
// Converts the date to local time in swedish format as it is similar to ISO but with timezone offset already added.
export const getLocalISOString = (): string => {
  return new Date().toLocaleString("sv").replace(" ", "T");
};
