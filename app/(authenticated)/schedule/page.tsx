import { CalendarDataLayer } from "@/components/views/CalendarDataLayer/CalendarDataLayer";

export default async function page({
  searchParams,
}: {
  searchParams?: Promise<{ date?: string }>;
}) {
  const dateParam = (await searchParams)?.date;
  const currentDate = dateParam ? new Date(dateParam) : new Date();

  console.log(currentDate);

  return (
    <div className="//lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        {/* <Table /> */}

        <CalendarDataLayer currentDate={currentDate} />
      </div>
    </div>
  );
}
