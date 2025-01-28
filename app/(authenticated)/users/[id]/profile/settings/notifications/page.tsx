import { prisma } from "@/prisma/prisma";

export default async function page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const id = (await params).id;

  const user = await prisma.user.findUnique({
    where: {
      user_id: id,
    },
  });

  console.log(user);

  return (
    <main className="sm:px-6 lg:flex-auto">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base/7 font-semibold text-gray-900">
            Notifications
          </h2>
          <p className="mt-1 text-sm/6 text-gray-500">
            This is only visible to you
          </p>

          {/* <dl className="mt-6 divide-y divide-vodafone-gray-100 border-t border-vodafone-gray-200 text-sm/6">
            <div className="py-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Full name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="capitalize text-gray-900">
                  {user?.firstName} {user?.lastName}
                </div>
                <button
                  type="button"
                  className="font-semibold text-vodafone-600 hover:text-vodafone-500"
                >
                  Update
                </button>
              </dd>
            </div>
            <div className="py-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Email address
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{user?.workEmail}</div>
                <button
                  type="button"
                  className="font-semibold text-vodafone-600 hover:text-vodafone-500"
                >
                  Update
                </button>
              </dd>
            </div>
            <div className="py-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Title
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">{user?.jobRole}</div>
                <button
                  type="button"
                  className="font-semibold text-vodafone-600 hover:text-vodafone-500"
                >
                  Update
                </button>
              </dd>
            </div>
          </dl> */}
        </div>

        {/* 2FA in future */}

        {/* <div>
          <h2 className="text-base/7 font-semibold text-gray-900">
            Personal email address
          </h2>
          <p className="mt-1 text-sm/6 text-gray-500">
            Add personal email to your account.
          </p>

          <ul
            role="list"
            className="mt-6 divide-y divide-vodafone-gray-100 border-t border-vodafone-gray-200 text-sm/6"
          >
            <li className="flex justify-between gap-x-6 py-6">
              <div className="font-medium text-gray-900">
                {user?.personalEmail}
              </div>
              <button
                type="button"
                className="font-semibold text-vodafone-600 hover:text-vodafone-500"
              >
                Update
              </button>
            </li>
          </ul>

          <div className="flex border-t border-vodafone-gray-100 pt-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-vodafone-600 hover:text-vodafone-500"
            >
              <span aria-hidden="true">+</span> Add another email
            </button>
          </div>
        </div> */}
      </div>
    </main>
  );
}
