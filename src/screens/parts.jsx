import { useState } from "react";

import { Button, Product } from "../components";
import { MdAdd, MdArrowDropDown } from "react-icons/md";

export const Parts = ({ events, data }) => {
  const { template, loading, categories } = data;
  const [catsDropdowns, setCatsDropdowns] = useState({
    ...categories?.map((x, index) => {
      index: false;
    }),
  });

  return (
    <div className="flex flex-1 flex-col">
      <ul className="flex flex-col pt-6">
        {categories?.map((category, index) => (
          <li
            className="flex flex-col w-full mt-6 mb-2"
            key={"parts-categories-" + index}
          >
            <div
              className="flex items-center gap-4 w-full cursor-pointer"
              onClick={() =>
                setCatsDropdowns({
                  ...catsDropdowns,
                  [index]: !catsDropdowns[index],
                })
              }
            >
              <MdArrowDropDown
                size="2rem"
                color="rgb(250, 204, 21)"
                className={`${catsDropdowns[index] ? "rotate-180" : ""}`}
              />
              <strong
                className="text-base font-light text-yellow-300"
                key={"cat" + index}
              >
                {category?.name}
              </strong>
              <span className="flex-1 h-[1px] bg-gray-700"></span>
            </div>
            {catsDropdowns[index] ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:grid-cols-6 md:gap-6 l2xl:grid-cols-7 pb-0 pt-6">
                {template?.parts
                  ?.filter((part) =>
                    part?.categoryIds?.find(
                      (cat) => cat?.name === category?.name
                    )
                  )
                  .map((part, index) => (
                    <Product
                      classNames={`max-h-[30vw] min-h-[30vw] lg:max-h-[12vw] lg:min-h-[12vw] 2xl:max-h-[14vw] 2xl:min-h-[14vw] cursor-pointer`}
                      data={part}
                      key={"vitrin-items-" + index}
                      style={"square"}
                      events={{
                        onClick: () => {
                          events["changeActivePart"](part);
                          events["changeRoute"]("editPart");
                        },
                      }}
                    />
                  ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Parts;
