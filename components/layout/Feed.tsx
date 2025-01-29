import { cn } from "@/lib/utility/cn";
import {
  CheckIcon,
  HandThumbUpIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

const timeline = [
  {
    id: 3,
    content: "New schedule has been published",
    target: "Admin",
    href: "#",
    date: "Sep 28",
    datetime: "2020-09-28",
    icon: CheckIcon,
    iconBackground: "bg-green-500",
  },
  {
    id: 2,
    content: "Schedule was approved",
    target: "Team Leader",
    href: "#",
    date: "Sep 22",
    datetime: "2020-09-22",
    icon: HandThumbUpIcon,
    iconBackground: "bg-blue-500",
  },

  {
    id: 1,
    content: "New schedule has been created",
    target: "Admin",
    href: "#",
    date: "Sep 20",
    datetime: "2020-09-20",
    icon: UserIcon,
    iconBackground: "bg-gray-400",
  },
  //   {
  //     id: 4,
  //     content: "Advanced to interview by",
  //     target: "Bethany Blake",
  //     href: "#",
  //     date: "Sep 30",
  //     datetime: "2020-09-30",
  //     icon: HandThumbUpIcon,
  //     iconBackground: "bg-blue-500",
  //   },
  //   {
  //     id: 5,
  //     content: "Completed interview with",
  //     target: "Katherine Snyder",
  //     href: "#",
  //     date: "Oct 4",
  //     datetime: "2020-10-04",
  //     icon: CheckIcon,
  //     iconBackground: "bg-green-500",
  //   },
];

export default function Example() {
  return (
    <div className="flow-root rounded-md bg-vodafone-gray-50 px-8 py-4">
      <h2 className="pb-4 text-lg font-bold">Activity feed</h2>

      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={cn(
                      event.iconBackground,
                      "flex size-6 items-center justify-center rounded-full ring-8 ring-white",
                    )}
                  >
                    <event.icon
                      aria-hidden="true"
                      className="size-4 text-white"
                    />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.content}{" "}
                      <a
                        href={event.href}
                        className="font-medium text-gray-900"
                      >
                        {event.target}
                      </a>
                    </p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
