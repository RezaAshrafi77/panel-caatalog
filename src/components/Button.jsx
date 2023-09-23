import React from "react";

import Loading from "./Loading";

export default function Button({ events, data, classNames, ...props }) {
  let buttonStyle =
    props?.icon && !props?.title
      ? {}
      : { border: "", color: "", backgroundColor: "" };
  let className = `rounded-md ${
    props?.loading ? "cursor-wait" : "cursor-pointer"
  } hover:opacity-80 max-h-[54px] h-[7vh]  w-full transition-all text-base font-medium gap-[3vw] flex items-center justify-center`;
  className = props?.icon && !props?.title
    ? `flex justify-center items-center ${
        props?.loading ? "cursor-wait" : "cursor-pointer"
      }`
    : className;
  if (props?.type === "outlined") {
    buttonStyle = {
      border: `2px solid var(--${props?.color})`,
      color: `var(--${props?.color})`,
      backgroundColor: "#ffffff00",
    };
  } else if (props?.type === "text") {
    buttonStyle = {
      border: "0px",
      color: `var(--${props?.color})`,
      backgroundColor: "#ffffff00",
    };
  } else if (props?.type === "contained") {
    buttonStyle = {
      border: "0px",
      color: `#ffffff`,
      backgroundColor: `var(--${props?.color})`,
    };
  }

  return (
    <button
      onClick={(e) => (!props?.loading ? events["onSubmit"](e) : {})}
      className={className + " " + classNames}
      style={buttonStyle}
      key={props?.key}
      {...props}
    >
      {props?.loading ? (
        <Loading />
      ) : (
        <>
          {props?.title}
          {props?.icon}
        </>
      )}
    </button>
  );
}
