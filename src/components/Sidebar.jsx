import React from "react";

import { Image } from "../components";
import { MdPerson } from "react-icons/md";

export default function Sidebar({ classNames, data, events, ...props }) {
  return (
    <div
      className={`hidden md:flex flex-col shadow-product h-full w-1/4 max-w-[280px] bg-gray-900 text-gray-300 divide-y divide-gray-600 ${classNames} border-l border-l-gray-600`}
    >
      {data?.admin ? (
        <div
          className={`flex flex-col px-4 py-6 ${props?.userStatusClassNames}`}
        >
          <div className="flex gap-4 items-center">
            <Image
              icon={<MdPerson size="2rem" color="white" />}
              classNames="w-16 h-16 rounded-full bg-gray-700"
            />
            <span className="font-medium">{data?.admin?.username}</span>
          </div>
        </div>
      ) : null}
      <ul
        className={`flex flex-col divide-y divide-gray-600 ${props?.routesClassNames}`}
      >
        {props?.routes?.map((route, index) => (
          <li
            onClick={() => events["onChangeRoute"](route?.name)}
            className={`transition-all cursor-pointer flex justify-between px-4 text-sm font-medium ${
              props?.activeRoute === route?.name
                ? "text-primary !text-base py-6"
                : "py-5 hover:text-gray-400"
            }`}
            key={`sidebar-routes-${index}`}
          >
            {route?.title}
          </li>
        ))}
      </ul>
      <ul
        className={`flex flex-col divide-y mt-auto divide-gray-600 ${props?.actionsClassNames}`}
      >
        {props?.callToActions?.map((button, index) => (
          <React.Fragment key={"call-to-actions-" + index}>
            {button}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

Sidebar.defaultProps = {
  userStatus: true,
  classNames: "",
  userStatusClassNames: "",
  routes: [
    {
      title: "صفحه اصلی",
      name: "report",
    },
    {
      title: "لیست کاربران",
      name: "users",
    },
    {
      title: "فروشگاه‌ها",
      name: "templates",
    },
  ],
};
