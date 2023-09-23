import { useState, useEffect } from "react";
import { Button, Input } from "../components";
import { MdArrowDropDown } from "react-icons/md";

export const Information = ({ data, events }) => {
  const {
    templateLoading,
    uploadLoading,
    formData,
    isEditPage,
    activeUserID,
    uploadFileID,
  } = data;
  const {
    setDialog,
    updateTemplate,
    createTemplate,
    updateFormData,
    uploadFile,
    changeRoute,
  } = events;
  const [formSections, setFormSections] = useState({
    backgroundImage: true,
    information: true,
    ui: true,
  });
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
            type="textarea"
            name="description"
            value={formData?.about?.description}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["about"]: { ...formData?.about, [name]: value },
                }),
            }}
            rows={5}
            classNames="py-5 border-b border-solid border-gray-500 text-white !w-full !bg-transparent !px-3 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"یک توضیح مختصر راجع به فروشگاه ..."}
            label="توضیحات فروشگاه"
            containerClassNames="!bg-transparent !w-full md:my-0 overflow-hidden rounded-none"
            labelClassNames="text-gray-200 text-sm"
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
            type="textarea"
            name="address"
            value={formData?.about?.address}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["about"]: { ...formData?.about, [name]: value },
                }),
            }}
            rows={4}
            classNames="py-5 border-b border-solid border-gray-500 text-white !w-full !bg-transparent !px-3 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"آدرس محل کسب و کار خود را وارد کنید ..."}
            label="آدرس محل کسب و کار"
            containerClassNames="!bg-transparent !w-full md:my-0 overflow-hidden rounded-none"
            labelClassNames="text-gray-200 text-sm"
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
          <Input
            type="text"
            name="telegram"
            value={formData?.about?.telegram}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["about"]: { ...formData?.about, [name]: value },
                }),
            }}
            inputMode="numeric"
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"آیدی تلگرام خود را وارد کنید ..."}
            label="آیدی تلگرام"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-sm"
          />
        </>
      ) : null}
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
      {console.log(uploadFileID, formData)}
      {formSections?.backgroundImage ? (
        <div className="flex flex-col gap-5">
          <p
            className={`text-sm font-medium ${
              formData?.backgroundFileId ? "text-blue-400" : "text-gray-300"
            } `}
          >
            {formData?.backgroundFileId
              ? "برای تغییر عکس ضربه بزنید."
              : "لطفا یک عکس را برای ویترین فروشگاه انتخاب کنید."}
          </p>
          <Input
            type="uploadFile"
            fileId={uploadFileID || formData?.backgroundFileId}
            src={file}
            events={{
              onChange: (file) => setFile(file),
            }}
            name="backgroundImage"
            classNames="bg-opacity-20 !w-[180px] !h-[320px] rounded-md bg-gray-400 cursor-pointer"
          />
        </div>
      ) : null}
      <div
        className="flex items-center gap-4 w-full cursor-pointer"
        onClick={() =>
          setFormSections({
            ...formSections,
            ["ui"]: !formSections?.ui,
          })
        }
      >
        <MdArrowDropDown
          size="2rem"
          color="rgb(250, 204, 21)"
          className={`${formSections?.ui ? "rotate-180" : ""}`}
        />
        <strong className="text-base font-medium text-yellow-400">
          {"ویرایش اطلاعات ظاهری برنامه"}
        </strong>
        <span className="flex-1 h-0.5 bg-gray-700"></span>
      </div>
      {formSections?.ui ? (
        <>
          <Input
            type="text"
            name="buttonOfVitrine"
            value={formData?.ui?.buttonOfVitrine}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["ui"]: { ...formData?.ui, [name]: value },
                }),
            }}
            inputMode="text"
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"کلمه یا متن خود را وارد کنید ..."}
            label="دکمه ویترین"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-sm"
          />
          <Input
            type="text"
            name="buttonOfAbout"
            value={formData?.ui?.buttonOfAbout}
            events={{
              onChange: (name, value) =>
                updateFormData({
                  ...formData,
                  ["ui"]: { ...formData?.ui, [name]: value },
                }),
            }}
            inputMode="text"
            classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
            placeholder={"کلمه یا متن خود را وارد کنید ..."}
            label="دکمه درباره ما"
            containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
            labelClassNames="text-gray-200 mb-1 text-sm"
          />
        </>
      ) : null}

      <Button
        classNames="!w-1/2 mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
        type="contained"
        primary="primary"
        loading={templateLoading || uploadLoading}
        title={isEditPage ? "اعمال مشخصات" : "ایجاد فروشگاه"}
        events={{
          onSubmit: (e) => {
            if (isEditPage) {
              updateTemplate(
                {
                  ...formData,
                  ["backgroundFileId"]:
                    uploadFileID || formData?.backgroundFileId,
                },
                () => changeRoute("templates")
              );
            } else {
              createTemplate(
                {
                  ...formData,
                  ["ownerId"]: activeUserID,
                  ["backgroundFileId"]: uploadFileID,
                },
                () => changeRoute("templates")
              );
            }
          },
        }}
      />
    </form>
  );
};

export default Information;
