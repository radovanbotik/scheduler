import { Controls } from "@/components/views/CalendarDataLayer/controls/Controls";

export default async function Layout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams?: Promise<{ date?: string }>;
}>) {
  const dateParam = (await searchParams)?.date;
  const currentDate = dateParam ? new Date(dateParam) : new Date();

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-0">
      <Controls serverDate={currentDate} />
      {children}
    </div>
  );
}
