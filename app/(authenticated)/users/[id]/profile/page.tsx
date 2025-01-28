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

  console.log(user);

  if (!user)
    return (
      <div className="//lg:mt-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-0">USER UNAVAILABLE</div>
      </div>
    );

  return (
    <div className="//lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        <Heading
          firstName={user.firstName}
          lastName={user.lastName}
          jobRole={user.jobRole}
          profilePicture={user.profilePicture}
          workEmail={user.workEmail}
        />
        <DescriptionList {...user} />
      </div>
    </div>
  );
}
