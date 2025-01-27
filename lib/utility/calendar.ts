import {
  addMonths,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addDays,
  subDays,
  isSameMonth,
  format,
  getDay,
  subMonths,
  isToday,
  isThisMonth,
  formatISO,
  isSameDay,
} from "date-fns";

export function getCalendarDays(date: Date) {
  const TILES = 42;

  const startOfMonthDate = startOfMonth(date);
  const endOfMonthDate = endOfMonth(date);

  // day of week for first day (0 = Sunday ... 6 = Saturday)
  const firstDayPosition = getDay(startOfMonthDate);
  // how many days to fill from previous month
  const daysFromPreviousMonth = (firstDayPosition + 6) % 7;
  // how many days we'll need from the next month to make up TILES
  const daysInCurrentMonth = eachDayOfInterval({
    start: startOfMonthDate,
    end: endOfMonthDate,
  });
  const daysFromNextMonth =
    TILES - daysInCurrentMonth.length - daysFromPreviousMonth;

  // get the actual first date to display
  const startOfCalendar = subDays(startOfMonthDate, daysFromPreviousMonth);
  // get the actual last date to display
  const endOfCalendar = addDays(endOfMonthDate, daysFromNextMonth);

  // final array of 42 days
  return eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });
}
