import { useState } from "react";
import { MdArrowDropDown, MdCameraAlt, MdDelete } from "react-icons/md";
import { Button, Image } from "./index";
import { toast } from "react-toastify";
import { baseUrl } from "../config";

function Input({ classNames, events, data, ...props }) {
  const [dropdownFlag, setDropwdownFlag] = useState(false);
  const [multiSelectInputValue, setMultiSelectInputValue] = useState("");

  const inputs = {
    checkbox: <input type="checkbox" name={props?.name} value={props?.value} />, // label
    radio: <input type="radio" name={props?.name} value={props?.value} />, // label
    select: (
      <div className={`${props?.containerClassNames} relative flex my-3`}>
        {props?.leftIcon || ""}
        <select name={props?.name} className={classNames}>
          {props?.options}
        </select>
      </div>
    ), // label, icon
    password: (
      <div className={"w-full flex flex-col"}>
        <label
          className={`${props?.labelClassNames} flex items-center text-base font-medium`}
          htmlFor={props?.name}
        >
          {props?.label}
        </label>
        <div
          className={`${props?.containerClassNames} flex items-center w-full my-3 bg-background overflow-hidden rounded-md`}
        >
          {props?.rightIcon}
          <input
            ref={props?.refs}
            type="password"
            required={props?.required}
            name={props?.name || ""}
            value={props?.value || ""}
            className={`${classNames} w-full h-full font-medium flex-1 text-base placeholder:text-base placeholder:font-normal font-sm outline-none bg-[transparent] lg:py-3 lg:text-xl `}
            placeholder={props?.placeholder || "جستجو ..."}
            autoComplete="off"
            onChange={(e) =>
              events ? events["onChange"](e.target.name, e.target.value) : {}
            }
            onFocus={(e) => (events["onFocus"] ? events["onFocus"](e) : {})}
            onBlur={(e) => (events["onBlur"] ? events["onBlur"](e) : {})}
          />
          {props?.leftIcon}
        </div>
      </div>
    ), // label, icon
    text: (
      <div className={"w-full flex flex-col"}>
        <label
          className={`${props?.labelClassNames} flex items-center text-base font-medium`}
          htmlFor={props?.name}
        >
          {props?.label}
        </label>
        <div
          className={`${props?.containerClassNames} flex items-center w-full my-3 bg-background overflow-hidden rounded-md`}
        >
          {props?.rightIcon}
          <input
            ref={props?.refs}
            required={props?.required}
            type="text"
            name={props?.name || ""}
            value={props?.value || ""}
            className={`${classNames} w-full h-full font-medium flex-1 text-base placeholder:text-base placeholder:font-normal placeholder:text-black font-sm outline-none bg-[transparent] lg:py-3 lg:text-xl `}
            placeholder={props?.placeholder}
            autoComplete="off"
            onChange={(e) =>
              events ? events["onChange"](e.target.name, e.target.value) : {}
            }
            onFocus={(e) => (events["onFocus"] ? events["onFocus"](e) : {})}
            onBlur={(e) => (events["onBlur"] ? events["onBlur"](e) : {})}
          />
          {props?.leftIcon}
        </div>
      </div>
    ), // label, icon
    textarea: (
      <div
        className={`${props?.containerClassNames} w-full flex flex-col rounded-md`}
      >
        <label
          className={`${props?.labelClassNames} flex items-center text-base font-medium`}
          for={props?.name}
        >
          {props?.label}
        </label>
        <textarea
          rows={props?.rows}
          value={props?.value}
          placeholder={props?.placeholder}
          name={props?.name}
          onChange={(e) =>
            events ? events["onChange"](e.target.name, e.target.value) : {}
          }
          onFocus={(e) => (events["onFocus"] ? events["onFocus"](e) : {})}
          onBlur={(e) => (events["onBlur"] ? events["onBlur"](e) : {})}
          className={`${classNames} w-full my-3 outline-none border border-solid border-borderColor rounded-md text-base`}
        />
      </div>
    ),
    radio: (
      <input
        type="radio"
        name={props?.name}
        className={`${classNames} overflow-hidden w-4  text-blue-600 !bg-black border-gray-300 focus:ring-blue-500 focus:ring-2 rounded-full`}
        key={props?.key}
        checked={props?.checked}
        onChange={(e) =>
          events ? events["onChange"](e.target.name, e.target.value) : {}
        }
        onClick={(e) =>
          events ? events["onClick"](e.target.name, e.target.value) : {}
        }
      />
    ),
    uploadFile: (
      <div
        className={`${classNames} flex-center-center bg-gray-300 rounded-full overflow-hidden w-16 h-16 relative`}
      >
        <input
          type="file"
          className="w-full h-full opacity-0 absolute left-0 top-0 cursor-pointer"
          name={props?.name}
          onChange={(e) => {
            let file = e.target.files[0];
            let validExtensions = props?.validFileTypes?.length
              ? props?.validFileTypes
              : ["image/jpeg", "image/jpg", "image/png"];
            if (validExtensions.includes(file?.type)) {
              events["onChange"](file);
            } else {
              toast.error("فرمت فایل انتخابی قابل پذیرش نیست.");
            }
          }}
        />
        {data?.fileId ? (
          <Image
            src={baseUrl + `/files/${data?.fileId}`}
            classNames="w-full h-full"
          />
        ) : props?.src ? (
          <Image
            src={URL.createObjectURL(props?.src)}
            classNames="w-full h-full"
          />
        ) : (
          <MdCameraAlt size="30%" color="white" />
        )}
      </div>
    ),
    multiSelect: (
      <div className="w-full">
        <div className="flex flex-col items-center relative">
          <div className="w-full  svelte-1l8159u">
            <div className="flex border rounded svelte-1l8159u">
              <div className="flex flex-auto flex-wrap">
                <div className="flex gap-2">
                  {props?.selectedList?.map((tag, index) => (
                    <Button
                      key={"selected-cat-" + index}
                      title={tag?.name}
                      classNames="!w-fit rounded-full"
                      icon={<MdDelete size="0.5rem" color="black" />}
                      events={{
                        onSubmit: () => events["pop"](tag),
                      }}
                    />
                  ))}
                </div>
                <div className="flex-1">
                  <Input
                    classNames="px-4 !my-0"
                    containerClassNames="!p-0 !my-0 bg-transparent"
                    type="text"
                    name={props?.name}
                    value={multiSelectInputValue}
                    placeholder={props?.placeholder}
                    events={{
                      onChange: (name, value) =>
                        setMultiSelectInputValue(value),
                    }}
                  />
                </div>
              </div>
              <Button
                icon={
                  <MdArrowDropDown
                    size="2rem"
                    color="white"
                    className={`${dropdownFlag} ? "rotate-180" : ""`}
                  />
                }
                classNames="!border-r border-white border-solid"
                events={{ onSubmit: () => setDropwdownFlag(!dropdownFlag) }}
              />
            </div>
          </div>
          {dropdownFlag ? (
            <div
              className={`${props?.optionContainerClassNames} absolute shadow top-100 bg-gray-900 z-40 w-full lef-0 rounded max-h-select overflow-y-auto svelte-5uyqqj`}
            >
              <div className="flex flex-col w-full">
                {props?.options
                  ?.filter((option) =>
                    option?.name?.includes(multiSelectInputValue)
                  )
                  ?.map((option, index) => (
                    <div
                      key={"option-" + index}
                      className={`${props?.option?.classNames} cursor-pointer w-full border-gray-600 border-b`}
                      onClick={() => events["onSelect"](option)}
                    >
                      <div className="w-full items-center flex">
                        <div className="mx-2 leading-6 ">{option?.name}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    ),
  };
  const textarea = props?.type === "textarea";
  return inputs[props?.type];
}

export default Input;
