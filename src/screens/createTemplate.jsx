import { useState, useEffect } from "react";

import { Navbar, Button, Loading, Tab, Input } from "../components";
import { MdAdd, MdChevronLeft } from "react-icons/md";

import { Parts, Information } from "./index";
import { templateFormDataBuilder } from "../shared/data";

export const CreateTemplate = ({ data, events }) => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    isEditPage,
    template,
    templateLoading,
    activeUserID,
    isSuperAdmin,
    categories,
    uploadFileID,
    uploadLoading,
  } = data;
  const {
    createTemplate,
    updateTemplate,
    changeRoute,
    changeActivePart,
    setDialog,
    uploadFile,
  } = events;

  const [templateFormData, setTemplateFormData] = useState(
    templateFormDataBuilder(
      isSuperAdmin
        ? { ...template, ["ownerId"]: activeUserID }
        : { ...template },
      isEditPage ? "update" : "create"
    )
  );

  return (
    <div className="flex flex-col flex-1 max-w-full max-h-full h-full overflow-y-scroll select-none">
      {isEditPage ? (
        <Navbar
          classNames="text-white !min-h-[70px] !bg-gray-900"
          leading={<strong>{template?.name}</strong>}
          actions={[
            activeTab === 0 ? (
              <Button
                icon={<MdAdd size="1.75rem" className="text-green-600" />}
                events={{
                  onSubmit: () => changeRoute("createPart"),
                }}
                title="افزودن محصول"
                classNames="!text-green-600 flex-row-reverse !gap-2 border border-solid border-green-600 gap-2 !font-medium rounded-md py-0 !max-h-[35px] cursor-pointer text-white !w-fit px-3 text-sm"
              />
            ) : null,
            <Button
              icon={<MdChevronLeft size={"2.75rem"} />}
              events={{ onSubmit: () => changeRoute("templates") }}
              className="text-white cursor-pointer"
            />,
          ]}
        />
      ) : null}
      {isEditPage ? (
        <Tab
          events={{ changeTab: (index) => setActiveTab(index) }}
          data={{ activeTab, tabs: ["لیست محصولات", "ویرایش مشخصات"] }}
          classNames="sticky top-[70px] z-10"
        />
      ) : null}
      {isEditPage ? (
        <div className="flex-1 px-6 py-5 flex">
          {activeTab === 0 ? (
            <Parts
              events={{
                changeRoute,
                changeActivePart,
                updateTemplate,
              }}
              data={{
                template,
                categories,
                loading: templateLoading,
              }}
            />
          ) : (
            <Information
              events={{
                updateTemplate,
                setDialog,
                uploadFile,
                updateFormData: (obj) => setTemplateFormData(obj),
              }}
              data={{
                uploadFileID,
                formData: templateFormData,
                templateLoading,
                uploadLoading,
                isEditPage,
              }}
            />
          )}
        </div>
      ) : (
        <div className="flex flex-col flex-1">
          <Navbar
            classNames="text-white min-h-[54px] !bg-gray-900"
            leading={<strong></strong>}
            actions={[
              <Button
                icon={<MdChevronLeft size={"2.5rem"} />}
                events={{ onSubmit: () => changeRoute("templates") }}
                className="text-white cursor-pointer"
              />,
            ]}
          />
          <Information
            data={{
              formData: templateFormData,
              templateLoading,
              activeUserID,
              uploadLoading,
              uploadFileID,
            }}
            events={{
              createTemplate,
              changeRoute,
              updateFormData: (obj) => setTemplateFormData(obj),
              uploadFile,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CreateTemplate;
