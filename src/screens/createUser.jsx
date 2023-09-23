import { useState, useEffect } from "react";

import { Navbar, Button, Input } from "../components";
import { MdChevronLeft } from "react-icons/md";
import { toast } from "react-toastify";

export const CreateUser = ({ data, events }) => {
  const { isEditPage, userInfo, loading, uploadFileID } = data;
  const { updateUser, createUser, changeRoute, uploadFile } = events;
  const [formLoading, setFormLoading] = useState(false);

  const [formValues, setFormValues] = useState(userInfo);
  const [pass2, setPass2] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  useEffect(() => {
    if (uploadFileID) {
      if (isEditPage) {
        updateUser({ ...formValues, backgroundFileId: uploadFileID });
      } else {
        createUser({
          ...formValues,
        });
      }
    }
  }, [uploadFileID, formValues]);

  const formHandler = () => {
    console.log(formValues);
    if (!formValues?.username) {
      toast.error("نام کاربری مورد نظر خود را وارد کنید.");
      return;
    }
    if (formValues?.username?.length < 6) {
      toast.error("نام کاربری میبایست دارای حداقل 6 کاراکتر باشد.");
      return;
    }
    if (formValues?.password?.length < 8) {
      toast.error("رمز عبور میبایست دارای حداقل ۸ کاراکتر باشد.");
      return;
    }
    if (formValues?.password !== formValues?.pass2) {
      if (isEditPage) {
        updateUser(formValues, () => changeRoute("users"));
      } else {
        createUser(formValues, () => changeRoute("users"));
      }
    } else {
      toast.error("تکرار رمز عبور صحیح نیست.");
      return;
    }
  };

  return (
    <div className="flex-col flex-center-center flex-1 max-w-full max-h-full h-full overflow-y-scroll ">
      <Navbar
        classNames="text-white min-h-[54px] !bg-gray-900"
        leading={<span></span>}
        actions={[
          <Button
            icon={<MdChevronLeft size={"2.5rem"} />}
            events={{ onSubmit: () => changeRoute("users") }}
            className="text-white cursor-pointer"
          />,
        ]}
      />
      <form
        className="flex-1  flex-center-center flex-col my-10 gap-8 max-w-[500px] w-full px-6"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* <Input
          type="uploadFile"
          classNames="w-28 h-28 rounded-full mb-6 bg-opacity-20"
          data={{
            fileId: uploadFileID || formValues?.picFileId,
          }}
          events={{
            onChange: (file) => setFile(file),
          }}
        /> */}
        <Input
          type="text"
          name="username"
          value={formValues?.username}
          events={{
            onChange: (name, value) =>
              setFormValues({ ...formValues, ["username"]: value }),
          }}
          classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
          placeholder="@username"
          label="نام کاربری"
          containerClassNames="ltr !bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
          labelClassNames="text-gray-200 mt-1 text-sm"
        />
        <Input
          type="password"
          name="password"
          value={formValues?.password}
          events={{
            onChange: (name, value) =>
              setFormValues({ ...formValues, ["password"]: value }),
          }}
          classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
          placeholder="Type user password ..."
          label="رمز عبور"
          containerClassNames="ltr !bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
          labelClassNames="text-gray-200 mt-1 text-sm"
        />
        <Input
          type="password"
          name="pass2"
          value={pass2}
          events={{
            onChange: (name, value) => setPass2(value),
          }}
          classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
          placeholder="Repeat password ..."
          label="تکرار رمز عبور"
          containerClassNames="ltr !bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
          labelClassNames="text-gray-200 mt-1 text-sm"
        />
        <Button
          classNames="!w-1/2 mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
          type="contained"
          primary="primary"
          loading={formLoading || loading}
          title={isEditPage ? "ویرایش کاربر" : "ایجاد کاربر"}
          events={{
            onSubmit: (e) => {
              setFormLoading(true);
              formHandler();
              setTimeout(() => {
                setFormLoading(false);
              }, 1500);
            },
          }}
        />
      </form>
    </div>
  );
};

export default CreateUser;
