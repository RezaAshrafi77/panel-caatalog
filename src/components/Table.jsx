import React from "react";

export default function Table({ data, classNames, events, ...props }) {
  return (
    <div
      className={`bg-transparent w-full ${classNames}`}
    >
      <div className={`${"grid-cols-" + props?.cols} grid mb-6`}>
        {data?.theads?.map((value, index) => (
          <div
            className={`text-backgroundText text-center py-4 font-medium md:text-base border-b border-solid border-b-gray-600`}
            key={index}
          >
            {value}
          </div>
        ))}
      </div>
      {props?.renderBody}
    </div>
  );
}
