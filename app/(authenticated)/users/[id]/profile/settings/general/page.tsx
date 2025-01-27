export default function page() {
  return (
    <main className="//lg:py-20 px-4 py-6 sm:px-6 lg:flex-auto lg:px-0">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm/6 text-gray-500">
            Your teammates can see this information
          </p>

          <dl className="mt-6 divide-y divide-vodafone-gray-100 border-t border-vodafone-gray-200 text-sm/6">
            <div className="py-6 sm:flex">
              <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                Full name
              </dt>
              <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div className="text-gray-900">Rado Botik</div>
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
                <div className="text-gray-900">rado@work.com</div>
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
                <div className="text-gray-900">
                  Technical Support Specialist
                </div>
                <button
                  type="button"
                  className="font-semibold text-vodafone-600 hover:text-vodafone-500"
                >
                  Update
                </button>
              </dd>
            </div>
          </dl>
        </div>

        <div>
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
              <div className="font-medium text-gray-900">rado@personal.com</div>
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
        </div>
      </div>
    </main>
  );
}
