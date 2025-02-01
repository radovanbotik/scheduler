import SectionHeader from "@/components/dashboard/SectionHeader";
import Table from "@/components/dashboard/Table";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-8">
      <SectionHeader />
      {children}
      <Table />
    </div>
  );
}
