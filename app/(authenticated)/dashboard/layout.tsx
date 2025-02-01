import SectionHeader from "@/components/dashboard/SectionHeader";
import Table from "@/components/dashboard/Table";

export default async function layout({
  children,
  searchParams,
}: Readonly<{
  children: React.ReactNode;
  searchParams?: Promise<{ date?: string }>;
}>) {
  return (
    <div className="space-y-8">
      <SectionHeader />
      {children}
      <Table />
    </div>
  );
}
