

export const GetFullYear = (date: string) => {
  if (!date) return null;
  return new Date(date).getFullYear()
}

export const parseRunTime = (time: number | undefined) => {
  if (!time) return null;

  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
};

export const parseJoinDate = (date: Date, locale?: string) => {
  const formater = Intl.DateTimeFormat(locale || "en", {
    dateStyle: "long",
  })
  return formater.format(date)
} 