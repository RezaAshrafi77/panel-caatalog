import { Loading, Product } from "../components";

export const Parts = ({ events, data }) => {
  const { template, loading, categories } = data;

  console.log(template);

  return (
    <div className="flex flex-1 flex-col">
      {template?.allPartCategories?.length ? (
        <ul className="flex flex-col pt-6">
          {template?.allPartCategories
            ?.sort((cat1, cat2) => cat1?.name - cat2?.name)
            ?.map((category, index) => (
              <li
                className="flex flex-col w-full mt-6 mb-2"
                key={"parts-categories-" + index}
              >
                <div className="flex items-center gap-4 w-full cursor-pointer">
                  <strong
                    className="text-base font-light text-yellow-300"
                    key={"cat" + index}
                  >
                    {category?.name}
                  </strong>
                  <span className="flex-1 h-[1px] bg-gray-700"></span>
                </div>
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
              </li>
            ))}
        </ul>
      ) : (
        <div className="flex-1 flex-center-center">
          {loading ? (
            <Loading />
          ) : (
            <p className="text-yellow-400">هیچ محصولی یافت نشد!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Parts;
