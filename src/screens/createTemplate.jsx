import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Navbar, Button, Loading, Tab } from "../components";
import { MdChevronLeft } from "react-icons/md";
import { template } from "../redux/actions";

import { Parts, Information } from "./index";

export const CreateTemplate = ({
  template,
  getAdminTemplate,
  templateID,
  loading,
  type,
  events,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (type === "edit" && template?._id !== templateID) {
      getAdminTemplate({ id: templateID });
    }
  }, []);
  return (
    <div className="flex flex-col flex-1 max-w-full max-h-full h-full overflow-y-scroll ">
      {type === "edit" ? (
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
      <Tab
        events={{ changeTab: (index) => setActiveTab(index) }}
        data={{ activeTab, tabs: ["لیست محصولات", "ویرایش مشخصات"] }}
        classNames="sticky top-[54px] z-10"
      />
      <div className="flex-1 px-6 py-5">
        {activeTab === 0 ? (
          <Parts
            events={{
              changeRoute: events["changeRoute"],
              changeActivePart: events["changeActivePart"]
            }}
          />
        ) : (
          <Information />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  template: state.template.template,
  loading: state.template.loading,
});

const mapDispatchToProps = {
  getAdminTemplate: template.getAdminTemplate,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemplate);
