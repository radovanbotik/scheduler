import {
  BookmarkSquareIcon,
  CalendarDaysIcon,
  ArrowDownTrayIcon,
  EnvelopeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Feed from "./Feed";

const resources = [
  {
    name: "My Requests",
    description: "Track request progress.",
    href: "#",
    icon: DocumentTextIcon,
  },
  {
    name: "Download Schedule",
    description: "Obtain a copy of your current schedule.",
    href: "#",
    icon: ArrowDownTrayIcon,
  },

  {
    name: "Email Schedule",
    description: "Receive your current schedule via email.",
    href: "#",
    icon: EnvelopeIcon,
  },

  {
    name: "Guides & Resources",
    description: "Access helpful guides and learning materials.",
    href: "#",
    icon: BookmarkSquareIcon,
  },
  {
    name: "Events",
    description: "View upcoming scheduled events and meetups.",
    href: "#",
    icon: CalendarDaysIcon,
  },
];
const recentPosts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    date: "Mar 5, 2023",
    datetime: "2023-03-05",
  },
  {
    id: 2,
    title:
      "How to use search engine optimization to drive traffic to your site",
    href: "#",
    date: "Feb 25, 2023",
    datetime: "2023-02-25",
  },
  {
    id: 3,
    title: "Improve your customer experience",
    href: "#",
    date: "Feb 21, 2023",
    datetime: "2023-02-21",
  },
];

export default function Aside() {
  return (
    <div className="//overflow-hidden //space-y-4 //divide-y //divide-vodafone-gray-100 //justify-between //justify-end //pt-4 flex h-full flex-col pb-16 text-sm/6">
      {/* <Feed /> */}
      <div className="h-fit">
        {resources.map((item) => (
          <div
            key={item.name}
            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
          >
            <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
              <item.icon
                aria-hidden="true"
                className="size-6 text-gray-600 group-hover:text-indigo-600"
              />
            </div>
            <div>
              <a href={item.href} className="font-semibold text-gray-900">
                {item.name}
                <span className="absolute inset-0" />
              </a>
              <p className="mt-1 text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
