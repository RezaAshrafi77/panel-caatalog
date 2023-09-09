import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Navbar, Button, Loading, Tab, Input } from "../components";
import { MdChevronLeft } from "react-icons/md";
import { template } from "../redux/actions";

import { Parts, Information } from "./index";

export const CreateTemplate = ({
  template,
  getAdminTemplates,
  createTemplate,
  templateID,
  loading,
  type,
  events,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [formLoading, setFormLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    backgroundFileId: "",
    backgroundColor: "",
    ord: null,
    parts: [],
    about: {
      title: "",
      description: "",
      logoFileId: "",
      address: "",
      location: "",
      phone: "",
      cellphone: "",
      email: "",
      telegram: "",
      instagram: "",
      twitter: "",
    },
    ui: {
      buttonOfVitrine: "",
      buttonOfAbout: "",
      textOfPartDesc: "",
    },
    ownerId: "",
  });

  useEffect(() => {
    if (type === "edit" && template?._id !== templateID) {
      getAdminTemplates({ id: templateID });
    }
  }, []);
  const isEditPage = type === "edit";

  return (
    <div className="flex flex-col flex-1 max-w-full max-h-full h-full overflow-y-scroll ">
      {isEditPage ? (
        <Navbar
          classNames="text-white min-h-[54px] !bg-gray-900"
          leading={<strong>{template?.name}</strong>}
          actions={[
            <Button
              icon={<MdChevronLeft size={"2.5rem"} />}
              events={{ onSubmit: () => events["changeRoute"]("templates") }}
              className="text-white cursor-pointer"
            />,
          ]}
        />
      ) : null}
      {isEditPage ? (
        <Tab
          events={{ changeTab: (index) => setActiveTab(index) }}
          data={{ activeTab, tabs: ["لیست محصولات", "ویرایش مشخصات"] }}
          classNames="sticky top-[54px] z-10"
        />
      ) : null}
      {isEditPage ? (
        <div className="flex-1 px-6 py-5">
          {activeTab === 0 ? (
            <Parts
              events={{
                changeRoute: events["changeRoute"],
                changeActivePart: events["changeActivePart"],
              }}
            />
          ) : (
            <Information />
          )}
        </div>
      ) : (
        <div className="flex-1 px-6 py-5">
          <form
            className="flex flex-col my-10 gap-8 max-w-[500px] w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="text"
              name="name"
              value={formValues?.name}
              events={{
                onChange: (name, value) =>
                  events["changeActivePart"]({ ...part, ["title"]: value }),
              }}
              classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
              placeholder="dfd"
              label="عنوان مغازه"
              containerClassNames="!bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
              labelClassNames="text-gray-200 mb-1 text-sm"
            />
            <Button
              classNames="!w-1/2 mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
              type="contained"
              primary="primary"
              loading={formLoading}
              title="ارسال"
              events={{
                onSubmit: (e) => {
                  setFormLoading(true);
                  createTemplate(formValues);
                  setTimeout(() => {
                    setFormLoading(false);
                  }, 1500);
                },
              }}
            />
          </form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  template: state.template.template,
  loading: state.template.loading,
});

const mapDispatchToProps = {
  getAdminTemplates: template.getAdminTemplates,
  createTemplate: template.createTemplate,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemplate);
