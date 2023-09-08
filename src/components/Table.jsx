import React from "react";

export default function Table({ data, classNames, events, ...props }) {
  return (
    <div className={`${classNames} bg-transparent`}>
      <div className="grid grid-cols-5">
        {data?.theads?.map((value, index) => (
          <div
            className={`ct-${
              index === 0 ? null : index
            } transition text-backgroundText text-center py-4 bg-transparent font-bold lg:text-sm xl:text-base`}
            onMouseOver={() =>
              index > 0 ? hoverOnColumn("ct-" + index, "over") : {}
            }
            onMouseLeave={() =>
              index > 0 ? hoverOnColumn("ct-" + index, "leave") : {}
            }
            key={index}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

const hoverOnColumn = (className, type) => {
  if (type === "over") {
    let list;
    list = document.getElementsByClassName(className);
    for (var i = 0; i < list.length; ++i) {
      list[i].classList.add("primary-color");
    }
  }
  if (type === "leave") {
    let list;
    list = document.getElementsByClassName(className);
    for (var i = 0; i < list.length; ++i) {
      list[i].classList.remove("primary-color");
    }
  }
};