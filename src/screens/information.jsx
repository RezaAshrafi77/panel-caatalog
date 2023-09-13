import { useState, useEffect } from "react";
import { Button, ImgFileInput, Input } from "../components";
import { MdArrowDropDown } from "react-icons/md";

export const Information = ({ data, events }) => {
  const { templateLoading, formData, isEditPage, activeUserID } = data;
  const {
    setDialog,
    updateTemplate,
    createTemplate,
    updateFormData,
    uploadFile,
  } = events;
  const [formSections, setFormSections] = useState({
    backgroundImage: true,
    information: true,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (file) {
      uploadFile(file);
    }
  }, [file]);

  return (
    <form
      className={`flex flex-col gap-8 lg:max-w-[500px] lg:min-w-[500px] lg:mx-auto py-7 ${
        isEditPage ? "" : "px-6"
      }`}
      onSubmit={(e) => e.preventDefault()}
    >
      <div
        className="flex items-center gap-4 w-full cursor-pointer"
        onClick={() =>
          setFormSections({
            ...formSections,
            ["backgroundImage"]: !formSections?.backgroundImage,
          })
        }
      >
        <MdArrowDropDown
          size="2rem"
          color="rgb(250, 204, 21)"
          className={`${formSections?.backgroundImage ? "rotate-180" : ""}`}
        />
        <strong className="text-base font-medium text-yellow-400">
          {"عکس فروشگاه"}
        </strong>
        <span className="flex-1 h-0.5 bg-gray-700"></span>
      </div>
      {formSections?.backgroundImage ? (
        <ImgFileInput
          setFile={setFile}
          name="backgroundImage"
          classNames="w-24 h-32 rounded-md bg-gray-400"
        />
      ) : null}
      <p className="text-sm text-gray-300 mb-[-8px]">
        {!file ? "لطفا یک عکس را برای ویترین فروشگاه انتخاب کنید." : file?.name}
      </p>
      <div
        className="flex items-center gap-4 w-full cursor-pointer"
        onClick={() =>
          setFormSections({
            ...formSections,
            ["information"]: !formSections?.information,
          })
        }
      >
        <MdArrowDropDown
          size="2rem"
          color="rgb(250, 204, 21)"
          className={`${formSections?.information ? "rotate-180" : ""}`}
        />
        <strong className="text-base font-medium text-yellow-400">
          {"فرم اطلاعات"}
        </strong>
        <span className="flex-1 h-0.5 bg-gray-700"></span>
      </div>
      {formSections?.information ? (
        <>
          <Input
            type="text"
            name="name"
            value={formData?.name}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["name"]: value,
                  ["about"]: { ...formData?.about, ["title"]: value },
                }),
            }}
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"نام فروشگاه یا برند را وارد کنید ..."}
            label="عنوان فروشگاه"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-sm"
          />
          <Input
            type="text"
            name="description"
            value={formData?.about?.description}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["about"]: { ...formData?.about, [name]: value },
                }),
            }}
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"یک توضیح مختصر راجع به فروشگاه ..."}
            label="توضیحات فروشگاه"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-sm"
          />
          <Input
            type="text"
            name="cellphone"
            value={formData?.about?.cellphone}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["about"]: { ...formData?.about, [name]: value },
                }),
            }}
            inputMode="numeric"
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"شماره موبایل خود را وارد کنید ..."}
            label="شماره موبایل"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-sm"
          />
          <Input
            type="text"
            name="phone"
            value={formData?.about?.phone}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["about"]: { ...formData?.about, [name]: value },
                }),
            }}
            inputMode="numeric"
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"شماره تلفن خود را وارد کنید ..."}
            label="شماره تلفن"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-sm"
          />
          <Input
            type="text"
            name="instagram"
            value={formData?.about?.instagram}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["about"]: { ...formData?.about, [name]: value },
                }),
            }}
            inputMode="numeric"
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"آیدی اینستاگرام خود را وارد کنید ..."}
            label="آیدی اینستاگرام"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-sm"
          />
        </>
      ) : null}

      <Button
        classNames="!w-1/2 mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
        type="contained"
        primary="primary"
        loading={templateLoading || formLoading}
        title={isEditPage ? "اعمال مشخصات" : "ایجاد فروشگاه"}
        events={{
          onSubmit: (e) => {
            setFormLoading(true);
            if (isEditPage) {
              updateTemplate(formData);
            } else {
              createTemplate({ ...formData, ["ownerId"]: activeUserID });
            }
            setTimeout(() => {
              setFormLoading(false);
            }, 1500);
          },
        }}
      />
    </form>
  );
};

export default Information;
