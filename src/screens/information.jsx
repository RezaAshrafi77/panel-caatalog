import { useState, useEffect } from "react";
import { Button, Input } from "../components";

export const Information = ({ data, events }) => {
  const { templateLoading, template, isEditPage } = data;
  const { setDialog, updateTemplate, createTemplate } = events;

  const [formLoading, setFormLoading] = useState(false);
  const [formValues, setFormValues] = useState(template);

  return (
    <form
      className={`flex flex-col gap-8 lg:max-w-[500px] py-7 ${
        isEditPage ? "" : "px-6"
      }`}
      onSubmit={(e) => e.preventDefault()}
    >
      <Input
        type="text"
        name="name"
        value={formValues?.name}
        events={{
          onChange: (name, value) =>
            setFormValues({
              ...formValues,
              ["name"]: value,
              ["about"]: { ...formValues?.about, ["title"]: value },
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
        value={formValues?.about?.description}
        events={{
          onChange: (name, value) =>
            setFormValues({
              ...formValues,
              ["about"]: { ...formValues?.about, [name]: value },
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
        value={formValues?.about?.cellphone}
        events={{
          onChange: (name, value) =>
            setFormValues({
              ...formValues,
              ["about"]: { ...formValues?.about, [name]: value },
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
        value={formValues?.about?.phone}
        events={{
          onChange: (name, value) =>
            setFormValues({
              ...formValues,
              ["about"]: { ...formValues?.about, [name]: value },
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
        value={formValues?.about?.instagram}
        events={{
          onChange: (name, value) =>
            setFormValues({
              ...formValues,
              ["about"]: { ...formValues?.about, [name]: value },
            }),
        }}
        inputMode="numeric"
        classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
        placeholder={"آیدی اینستاگرام خود را وارد کنید ..."}
        label="آیدی اینستاگرام"
        containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
        labelClassNames="text-gray-200 mb-1 text-sm"
      />
      <Button
        classNames="!w-1/2 mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
        type="contained"
        primary="primary"
        loading={formLoading}
        title={isEditPage ? "اعمال مشخصات" : "ایجاد فروشگاه"}
        events={{
          onSubmit: (e) => {
            setFormLoading(true);
            if (isEditPage) {
              updateTemplate(formValues);
            } else {
              createTemplate(formValues);
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
