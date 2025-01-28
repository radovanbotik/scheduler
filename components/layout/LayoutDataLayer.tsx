import { prisma } from "@/prisma/prisma";
import { User } from "@prisma/client";
import { ClientLayout } from "./ClientLayout";

const AUTH_ID = "cm6gavqul0000vz2kcmv9q3la";

async function getUser(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        user_id: id,
      },
    });
    if (!user) {
      throw new Error(`User with ID ${id} not found.`);
    }
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default async function LayoutDataLayer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser(AUTH_ID);

  if (!user) return <>redirect somewhere</>;

  return (
    <>
      <ClientLayout user={user}>{children}</ClientLayout>
    </>
  );
}
