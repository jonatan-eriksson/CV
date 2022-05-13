export const yearMonth = (date: string | undefined) => {
  if (!date)
    return "";

  const d = new Date(date);
  const dateFormat = d.toLocaleDateString('default', { year: 'numeric', month: 'long' });
  return dateFormat;
}

export const yearMonthNumeric = (date: string | undefined) => {
  if (!date)
    return "";

  const d = new Date(date);
  const dateFormat = d.toLocaleDateString('default', { year: 'numeric', month: 'numeric' });
  return dateFormat;
}

export const dateInputToDate = (dateInput : string) => {
  if(!dateInput)
    return null;
  const splitDate = dateInput.split("-");

  const year = parseInt(splitDate[0]);
  const month = (parseInt(splitDate[1]) - 1) || 0;
  const date = parseInt(splitDate[2]) || 1;

  console.log(year, month, date)
  return new Date(Date.UTC(year, month, date));
}

export const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] =>
  obj[key];

export const setProperty = <T, K extends keyof T>(obj: T, key: K, value: T[K]) => {
  obj[key] = value;
}
