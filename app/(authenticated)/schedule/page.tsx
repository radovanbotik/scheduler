import { Table } from "@/components/scheduler/Table";
import { CalendarDataLayer } from "@/components/views/CalendarDataLayer/CalendarDataLayer";
import MonthView from "@/components/views/MonthView";

export default function page() {
  return (
    <div className="//lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        {/* <Table /> */}

        <CalendarDataLayer />
      </div>
    </div>
  );
}
