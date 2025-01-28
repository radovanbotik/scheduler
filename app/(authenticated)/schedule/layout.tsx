"use server";
import { Controls } from "@/components/views/CalendarDataLayer/controls/Controls";
import { TeamViewSkeleton } from "@/components/views/CalendarDataLayer/team-view/TeamViewSketeleton";
import { Suspense } from "react";

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
      <Suspense>
        <Controls serverDate={currentDate} />
      </Suspense>
      <Suspense fallback={<TeamViewSkeleton currentDate={currentDate} />}>
        {children}
      </Suspense>
    </div>
  );
}
