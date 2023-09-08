import React from "react";
import Button from "./Button";

export default function Tab({ data, events, classNames }) {
  return (
    <div className={`${classNames} w-full flex bg-gray-900 text-white`}>
      {data?.tabs?.map((tab, index) => (
        <Button
          title={tab}
          key={"edit-tab-" + index}
          classNames={`text-sm ${
            data?.activeTab === index ? "bg-gray-800" : ""
          } w-full`}
          events={{
            onSubmit: () => events["changeTab"](index),
          }}
        />
      ))}
    </div>
  );
}
