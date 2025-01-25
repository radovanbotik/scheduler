type TPattern = {
  pattern_id: number;
  name: string;
  start_time: string; // Store time as string (e.g., "06:00")
  end_time: string; // Store time as string (e.g., "15:00:00")
};

export const shiftPatterns: TPattern[] = [
  {
    pattern_id: 1,
    name: "Morning",
    start_time: "06:00",
    end_time: "15:00",
  },
  {
    pattern_id: 2,
    name: "Early Day",
    start_time: "07:00",
    end_time: "16:00",
  },
  {
    pattern_id: 3,
    name: "Standard Day",
    start_time: "09:00",
    end_time: "18:00",
  },
  {
    pattern_id: 4,
    name: "Evening",
    start_time: "13:00",
    end_time: "22:00",
  },
  {
    pattern_id: 5,
    name: "Night",
    start_time: "21:30",
    end_time: "06:30",
  },
];

async function getShifts() {
  try {
    const response = await fetch("/api/shiftpatterns");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
