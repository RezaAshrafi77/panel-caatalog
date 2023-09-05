import React from "react";

import { Image } from "../components";

export default function Sidebar({ classNames, data, events, ...props }) {
  return (
    <div
      className={`hidden shadow-product h-full w-1/4 max-w-[280px] bg-gray-900 text-gray-300 divide-y divide-gray-600 md:flex flex-col ${classNames}`}
    >
      {props?.userStatus ? (
        <div
          className={`flex flex-col px-4 py-6 ${props?.userStatusClassNames}`}
        >
          <div className="flex gap-4 items-center">
            <Image classNames="w-16 h-16 rounded-full bg-gray-700" />
            <span className="font-medium">{"نام ادمین"}</span>
          </div>
        </div>
      ) : null}
      <ul
        className={`flex flex-col divide-y divide-gray-600 ${props?.routesClassNames}`}
      >
        {props?.routes?.map((route, index) => (
          <li
            onClick={() => events["onChangeRoute"](route?.name)}
            className={`${
              props?.activeRoute === route?.name ? "text-green-400 !text-base" : ""
            } cursor-pointer flex justify-between px-4 py-4 text-sm font-medium`}
            key={`sidebar-routes-${index}`}
          >
            {route?.title}
          </li>
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
      name: "home",
    },
    {
      title: "مشتریان",
      name: "templates",
    },
    {
      title: "ویرایش ظاهر",
      name: "editUI",
    },
  ],
};
