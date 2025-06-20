export const useClipboard = () => {
  const copy = (value: string) => navigator.clipboard.writeText(value);

  return { copy };
};
