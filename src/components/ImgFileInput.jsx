import React, { useState } from "react";
import { MdCameraAlt } from "react-icons/md";
import { baseUrl } from "../config";
import Image from "./Image";

const ImgFileInput = ({ setFile, classNames, ...props }) => {
  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = () => {};

  const dropHandler = (e) => {
    e.preventDefault();
    let file = e.dataTransfer.files[0];
    setFile(e.dataTransfer.files[0]);
    let fileType = e.dataTransfer.files[0].type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
    } else {
      //error message alert
    }
  };

  const changeFileHandler = () => {
    let file = document.querySelector(`#${props?.name}`).files[0];
    setFile(file);
    let fileType = file.type;
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"];
    if (validExtensions.includes(fileType)) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);
    } else {
      //error message alert
    }
  };
  return (
    <div
      className={`${classNames} flex-center-center bg-gray-300 rounded-full overflow-hidden w-16 h-16 relative`}
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={dragLeaveHandler}
      onDrop={(e) => dropHandler(e)}
    >
      <input
        type="file"
        className="w-full h-full opacity-0 absolute left-0 top-0 cursor-pointer"
        name={props?.name}
        onChange={changeFileHandler}
        id={props?.name}
      />
      {props?.fileId ? (
        <Image
          src={baseUrl + `/files/${props?.fileId}`}
          classNames="w-full h-full"
        />
      ) : (
        props?.icon || <MdCameraAlt size="30%" color="white" />
      )}
    </div>
  );
};

export default ImgFileInput;
