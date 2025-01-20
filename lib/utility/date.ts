function getDaysInMonth(year: number, month: number): Date[] {
  const result: Date[] = [];
  // Determine how many days are in this month (by creating a date on "month+1, day=0")
  // which effectively is "the last day of the current month".
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Build an array of Date objects for each day of the month
  for (let day = 1; day <= lastDay; day++) {
    result.push(new Date(year, month, day));
  }
  return result;
}

function getWeekdayName(date: Date): string {
  return date.toLocaleString("default", { weekday: "short" });
}

export { getWeekdayName, getDaysInMonth };
