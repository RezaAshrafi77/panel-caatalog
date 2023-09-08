import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Product } from "../components";
import { category } from "../redux/actions";

export const Parts = ({
  getAdminCategories,
  categories,
  template,
  events,
  loading,
}) => {
  useEffect(() => {
    getAdminCategories();
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <ul className="flex flex-col">
        {categories?.map((category, index) => (
          <li className="flex flex-col w-full my-4">
            <div className="flex items-center gap-4 w-full">
              <strong
                className="text-base font-medium text-gray-300"
                key={"cat" + index}
              >
                {category?.name}
              </strong>
              <span className="flex-1 h-0.5 bg-gray-700"></span>
            </div>
            <div className="grid md:grid-cols-6 lg:grid-cols-6 md:gap-4 l2xl:grid-cols-7 py-7">
              {template?.parts
                ?.filter((part) =>
                  part?.categoryIds?.find((cat) => cat?.name === category?.name)
                )
                .map((part, index) => (
                  <Product
                    classNames={`lg:max-h-[12vw] lg:min-h-[12vw] 2xl:max-h-[14vw] 2xl:min-h-[14vw]`}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  template: state.template.template,
  categories: state.category.categories,
  loading: state.template.loading,
});

const mapDispatchToProps = {
  getAdminCategories: category.getAdminCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Parts);
