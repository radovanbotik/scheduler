"use client";

import { useState } from "react";
import { Dialog, DialogPanel, Field, Label, Switch } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import {
  BellIcon,
  CreditCardIcon,
  CubeIcon,
  FingerPrintIcon,
  UserCircleIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utility/cn";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Invoices", href: "#" },
  { name: "Clients", href: "#" },
  { name: "Expenses", href: "#" },
];
const secondaryNavigation = [
  { name: "General", href: "#", icon: UserCircleIcon, current: true },
  { name: "Security", href: "#", icon: FingerPrintIcon, current: false },
  { name: "Notifications", href: "#", icon: BellIcon, current: false },
];

export default function page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [automaticTimezoneEnabled, setAutomaticTimezoneEnabled] =
    useState(true);

  return (
    <div className="//lg:mt-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-0">
        <h2 className="text-balance font-semibold tracking-tight text-gray-900 sm:text-2xl">
          Profile settings
        </h2>

        <div className="//lg:px-8 mx-auto mt-10 lg:flex lg:gap-x-16">
          {/* <h1 className="sr-only">General Settings</h1> */}

          <aside className="//lg:py-20 flex overflow-x-auto border-b border-vodafone-gray-900/5 py-6 lg:block lg:w-64 lg:flex-none lg:border-0">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
              <ul
                role="list"
                className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col"
              >
                {secondaryNavigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className={cn(
                        item.current
                          ? "bg-gray-50 text-vodafone-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-vodafone-600",
                        "group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm/6 font-semibold",
                      )}
                    >
                      <item.icon
                        aria-hidden="true"
                        className={cn(
                          item.current
                            ? "text-vodafone-600"
                            : "text-gray-400 group-hover:text-vodafone-600",
                          "size-6 shrink-0",
                        )}
                      />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="//lg:py-20 px-4 py-6 sm:px-6 lg:flex-auto lg:px-0">
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
              <div>
                <h2 className="text-base/7 font-semibold text-gray-900">
                  Profile
                </h2>
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
                    <div className="font-medium text-gray-900">
                      rado@personal.com
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
              </div>

              {/* <div>
              <h2 className="text-base/7 font-semibold text-gray-900">
                Language and dates
              </h2>
              <p className="mt-1 text-sm/6 text-gray-500">
                Choose what language and date format to use throughout your
                account.
              </p>

              <dl className="mt-6 divide-y divide-vodafone-gray-100 border-t border-vodafone-gray-200 text-sm/6">
                <div className="py-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Language
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">English</div>
                    <button
                      type="button"
                      className="text-vodafone-600 hover:text-vodafone-500 font-semibold"
                    >
                      Update
                    </button>
                  </dd>
                </div>
                <div className="py-6 sm:flex">
                  <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
                    Date format
                  </dt>
                  <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                    <div className="text-gray-900">DD-MM-YYYY</div>
                    <button
                      type="button"
                      className="text-vodafone-600 hover:text-vodafone-500 font-semibold"
                    >
                      Update
                    </button>
                  </dd>
                </div>
                <Field className="flex pt-6">
                  <Label
                    as="dt"
                    passive
                    className="flex-none pr-6 font-medium text-gray-900 sm:w-64"
                  >
                    Automatic timezone
                  </Label>
                  <dd className="flex flex-auto items-center justify-end">
                    <Switch
                      checked={automaticTimezoneEnabled}
                      onChange={setAutomaticTimezoneEnabled}
                      className="focus-visible:outline-vodafone-600 data-[checked]:bg-vodafone-600 group flex w-8 cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-vodafone-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                      <span
                        aria-hidden="true"
                        className="size-4 transform rounded-full bg-white shadow-sm ring-1 ring-vodafone-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                      />
                    </Switch>
                  </dd>
                </Field>
              </dl>
            </div> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
