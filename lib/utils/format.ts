const longDateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(date: string) {
  return longDateFormatter.format(new Date(date));
}

export function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}
