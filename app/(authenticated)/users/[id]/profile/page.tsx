import DescriptionList from "@/components/profile/DescriptionList";
import Heading from "@/components/profile/Heading";
import { prisma } from "@/prisma/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const user = await prisma.user.findUnique({
    where: {
      user_id: id,
    },
  });

  if (!user)
    return (
      <div className="//lg:mt-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-0">USER UNAVAILABLE</div>
      </div>
    );

  return (
    <div className="//lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        <Heading username={user.username} role={user.user_role} />
        <DescriptionList />
      </div>
    </div>
  );
}
