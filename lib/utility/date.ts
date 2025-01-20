function getDaysInMonth(year: number, month: number): Date[] {
  const result: Date[] = [];
  // Determine how many days are in this month (by creating a date on "month+1, day=0")
  // which effectively is "the last day of the current month".
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Build an array of Date objects for each day of the month
  for (let day = 1; day <= lastDay; day++) {
    // Use Date.UTC to ensure the time is set to 00:00:00.000 in UTC
    result.push(new Date(Date.UTC(year, month, day)));
  }
  return result;
}

function getWeekdayName(date: Date): string {
  return date.toLocaleString("default", { weekday: "short" });
}

export { getWeekdayName, getDaysInMonth };

export function formatDate(date: Date) {
  const dayOfMonth = date.getDate();
  const monthIndex = date.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let ordinalSuffix;

  // Handle special cases for 11, 12, 13
  if (dayOfMonth >= 11 && dayOfMonth <= 13) {
    ordinalSuffix = "th";
  } else {
    // Handle typical patterns (1 -> 'st', 2 -> 'nd', 3 -> 'rd', else 'th')
    switch (dayOfMonth % 10) {
      case 1:
        ordinalSuffix = "st";
        break;
      case 2:
        ordinalSuffix = "nd";
        break;
      case 3:
        ordinalSuffix = "rd";
        break;
      default:
        ordinalSuffix = "th";
    }
  }

  return `${dayOfMonth}${ordinalSuffix} of ${months[monthIndex]}`;
}
