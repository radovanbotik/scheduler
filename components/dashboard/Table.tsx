const schedules = [
  {
    id: 1,
    name: "January",
    description: "January 1st - january 31st",
    days: "31",
    status: "Available",
  },
  {
    id: 2,
    name: "February",
    description: "January 1st - january 31st",
    days: "28",
    status: "Pending",
  },
  {
    id: 3,
    name: "March",
    description: "January 1st - january 31st",
    days: "31",
    status: "$100.00",
  },
  // More schedules...
];

export default function Table() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Invoice</h1>
          <p className="mt-2 text-sm text-gray-700">
            For work completed from{" "}
            <time dateTime="2022-08-01">August 1, 2022</time> to{" "}
            <time dateTime="2022-08-31">August 31, 2022</time>.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Print
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 flow-root sm:mx-0">
        <table className="min-w-full">
          <colgroup>
            <col className="w-full sm:w-1/2" />
            <col className="sm:w-1/6" />
            <col className="sm:w-1/6" />
            <col className="sm:w-1/6" />
          </colgroup>
          <thead className="border-b border-gray-300 text-gray-900">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                Project
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Days
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-right text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Status
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-0"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id} className="border-b border-gray-200">
                <td className="max-w-0 py-3 pl-4 pr-3 text-sm sm:pl-0">
                  <div className="font-medium text-gray-900">
                    {schedule.name}
                  </div>
                  {/* <div className="mt-1 truncate text-gray-500">
                    {schedule.description}
                  </div> */}
                </td>
                <td className="hidden px-3 py-3 text-right text-sm text-gray-500 sm:table-cell">
                  {schedule.days}
                </td>
                <td className="hidden px-3 py-3 text-right text-sm text-gray-500 sm:table-cell">
                  <span className="-mr-2 inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    Active
                  </span>
                </td>
                <td className="py-3 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0">
                  <button
                    type="button"
                    disabled={false}
                    className="-mr-2.5 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                  >
                    Download<span className="sr-only">Download</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
