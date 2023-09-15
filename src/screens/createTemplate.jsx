import { useState, useEffect } from "react";

import { Navbar, Button, Loading, Tab, Input } from "../components";
import { MdChevronLeft } from "react-icons/md";

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
          classNames="text-white min-h-[54px] !bg-gray-900"
          leading={<strong>{template?.name}</strong>}
          actions={[
            <Button
              icon={<MdChevronLeft size={"2.5rem"} />}
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
        <div className="flex-1 px-6 py-5">
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
                formData: templateFormData,
                templateLoading,
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
            data={{ formData: templateFormData, templateLoading, activeUserID }}
            events={{
              createTemplate,
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
