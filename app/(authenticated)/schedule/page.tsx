import { Table } from "@/components/scheduler/Table";
import MonthView from "@/components/views/MonthView";

export default function page() {
  return (
    <div className="//lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        {/* <Table /> */}
        <MonthView />
      </div>
    </div>
  );
}
