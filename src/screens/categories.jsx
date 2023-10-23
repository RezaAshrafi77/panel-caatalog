import { useState } from "react";
import { MdAddBusiness, MdChevronLeft } from "react-icons/md";

import { Button, Navbar, Loading, Input } from "../components";

export const Categories = ({ data, events }) => {
  const { categories } = data;
  const {
    changeRoute,
    getAdminCategories,
    deleteAdminCategory,
    createAdminCategory,
  } = events;
  const [formValues, setFormValues] = useState({
    name: "",
  });

  return (
    <div className="flex flex-1 flex-col max-w-full max-h-full h-full overflow-hidden">
      <Navbar
        classNames="text-white min-h-[54px] !bg-gray-900"
        leading={<div></div>}
        actions={[
          <Button
            icon={<MdChevronLeft size={"2.5rem"} />}
            events={{
              onSubmit: () =>
                isSuperAdmin ? changeRoute("users") : changeRoute("report"),
            }}
            className="text-white cursor-pointer"
          />,
        ]}
      />
      <div className="flex-1 flex flex-col flex-center-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAdminCategory(
              { name: formValues?.name },
              getAdminCategories()
            );
          }}
          className="flex flex-col max-w-[400px] w-full mb-8"
        >
          <Input
            type="text"
            events={{
              onChange: (name, value) =>
                setFormValues({ ...formValues, name: value }),
            }}
            value={formValues?.name}
            inputMode="text"
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"کلمه یا متن خود را وارد کنید ..."}
            label="نام دسته بندی"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-300 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-2 text-lg"
          />
        </form>
        <div className="flex flex-wrap justify-center max-w-[400px] gap-2">
          {categories?.map((cat, index) => (
            <Button
              title={cat?.name}
              key={"cat" + index}
              classNames="bg-white bg-opacity-20 font-medium text-white !w-fit px-4 h-[30px] text-xs"
              events={{
                onSubmit: () =>
                  deleteAdminCategory({ id: cat?._id }, getAdminCategories()),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
