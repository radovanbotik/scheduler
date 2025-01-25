export function getShiftColor(shiftId: string) {
  return SHIFT_COLORS[shiftId] ?? "";
}

const SHIFT_COLORS: Record<string, string> = {
  earlyMorning: "text-orange-300",
  morning: "text-sky-300",
  standardDay: "text-green-300",
  afternoon: "text-yellow-300",
  night: "text-stone-300",
};

// shift.id === "earlyMorning" &&
//                             "bg-orange-100 text-orange-500 group-hover:bg-orange-200 group-hover:text-orange-600",
//                           shift.id === "morning" &&
//                             "bg-sky-100 text-sky-500 group-hover:bg-sky-200 group-hover:text-sky-600",
//                           shift.id === "standardDay" &&
//                             "bg-green-100 text-green-500 group-hover:bg-green-200 group-hover:text-green-600",
//                           shift.id === "afternoon" &&
//                             "bg-yellow-100 text-yellow-500 group-hover:bg-yellow-200 group-hover:text-yellow-600",
//                           shift.id === "night" &&
//                             "bg-stone-100 text-stone-500 group-hover:bg-stone-200 group-hover:text-stone-600",
