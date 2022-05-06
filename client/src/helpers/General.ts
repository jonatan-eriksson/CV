export const yearMonth = (date: string | undefined) => {
  if (!date)
    return "";

  const d = new Date(date);
  const dateFormat = d.toLocaleDateString('default', { year: 'numeric', month: 'long' });
  return dateFormat;
}

export const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] =>
  obj[key];

export const setProperty = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
  obj[key] = value;
}
