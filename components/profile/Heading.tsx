import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Avatar } from "../shared/Avatar";
import { User } from "@prisma/client";

type THeading = Pick<
  User,
  "firstName" | "lastName" | "jobRole" | "profilePicture" | "workEmail"
>;

export default function Heading({
  firstName,
  lastName,
  jobRole,
  workEmail,
  profilePicture,
}: THeading) {
  return (
    <div className="w-full border-b border-vodafone-gray-200 pb-5 md:flex md:items-center md:justify-between md:space-x-5">
      <div className="flex items-center space-x-5">
        <div className="shrink-0">
          <Avatar className="size-16" />
          {/* <div className="relative">
            <img
              alt=""
              src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
              className="size-16 rounded-full"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-full shadow-inner"
            />
          </div> */}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{firstName}</h1>
          <p className="text-sm font-medium text-gray-500">
            {workEmail}
            {/* Applied for{" "}
            <a href="#" className="text-gray-900">
              Front End Developer
            </a>{" "}
            on <time dateTime="2020-08-25">August 25, 2020</time> */}
          </p>
        </div>
      </div>
    </div>
  );
}
