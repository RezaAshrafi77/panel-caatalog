import { useState, useEffect } from "react";

import { Navbar, Button, Input } from "../components";
import { MdArrowDropDown, MdChevronLeft, MdRemove } from "react-icons/md";
import { toast } from "react-toastify";

export const AddRole = ({ data, events }) => {
  const [role, setRole] = useState("");
  const { roles, usersLoading, userInfo } = data;
  const { addRole, removeRole, changeRoute } = events;

  return (
    <form
      className="flex-1  flex-center-center flex-col my-10 gap-8 max-w-[500px] w-full px-6"
      onSubmit={(e) => e.preventDefault()}
    >
      <strong className="text-yellow-400 w-full">نفش‌های فعال:</strong>
      {userInfo?.roles?.length ? (
        <ul className="flex flex-col w-full list-disc">
          {userInfo?.roles?.map((role, index) => (
            <li className="text-green-500" key={"user-active-role" + index}>
              {role}
            </li>
          ))}
        </ul>
      ) : (
        <span className="text-red-400 w-full -mt-6">
          هیچ نفش فعالی یافت نشد.
        </span>
      )}
      <Input
        classNames="w-full text-gray-300 text-sm bg-gray-900 py-2 px-2 cursor-pointer outline-none"
        containerClassNames="bg-gray-900 w-full flex-row-reverse py-2"
        leftIcon={
          <MdArrowDropDown
            className="absolute left-2 top-1/2 -translate-y-1/2"
            size="1.5rem"
            color="white"
          />
        }
        events={{
          onChange: (val) => setRole(val),
        }}
        type="select"
        options={[{ name: "لیست نقش‌ها" }, ...roles]?.map((role, index) => (
          <option className="py-2" key={"role" + index}>
            {role?.name}
          </option>
        ))}
      />
      <div className="flex justify-between w-full gap-4">
        <Button
          classNames="!w-1/2 mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
          type="contained"
          primary="primary"
          loading={usersLoading}
          title={"افزودن نقش"}
          events={{
            onSubmit: (e) => {
              if (role) {
                addRole(
                  {
                    userId: userInfo?._id,
                    roleId: roles?.find((rolee) => rolee?.name === role)["_id"],
                  },
                  changeRoute("users")
                );
              } else {
                toast.info("ابتدا یک نفش راانتخاب کنید.");
              }
            },
          }}
        />
        <Button
          classNames="!w-1/2 mt-4 text-primary border border-solid !border-primary !rounded-full md:!max-h-[45px] text-sm"
          type="outline"
          primary="primary"
          loading={usersLoading}
          title={"حذف نقش"}
          events={{
            onSubmit: (e) => {
              if (role) {
                removeRole(
                  {
                    userId: userInfo?._id,
                    roleId: roles?.find((rolee) => rolee?.name === role)["_id"],
                  },
                  changeRoute("users")
                );
              } else {
                toast.info("ابتدا یک نفش راانتخاب کنید.");
              }
            },
          }}
        />
      </div>
    </form>
  );
};

export default AddRole;
