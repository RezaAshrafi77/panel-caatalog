import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { Report, Templates, CreateTemplate, EditUI, Part } from "./index";
import { Image, Navbar, Sidebar } from "~/components";
import { baseUrl } from "../config";

export const Home = ({ template, ...props }) => {
  const navigation = useNavigate();
  const [activeRoute, setActiveRoute] = useState("report");
  const [activePart, setActivePart] = useState(null);
  const [templateID, setTemplateID] = useState(null);

  const content = {
    report: <Report />,
    templates: (
      <Templates
        events={{
          changeRoute: (route, ID) => {
            setTemplateID(ID);
            setActiveRoute(route);
          },
        }}
      />
    ),
    editTemplate: (
      <CreateTemplate
        type="edit"
        templateID={templateID}
        events={{
          changeRoute: (route) => setActiveRoute(route),
          changeActivePart: (part) => setActivePart(part),
        }}
      />
    ),
    editPart: (
      <Part
        part={activePart}
        type="edit"
        events={{
          changeRoute: (route) => setActiveRoute(route),
          changeActivePart: (part) => setActivePart(part),
        }}
      />
    ),
    createTemplate: <CreateTemplate />,
    editUI: <EditUI />,
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row max-w-full max-h-full h-full overflow-hidden bg-gray-800 text-background">
      <Navbar
        classNames="md:hidden !fixed !pt-8 !text-white backdrop-blur-sm"
        logo={<Image src="/icons/logo.svg" classNames="w-10 rounded-md" />}
      />
      <Sidebar
        activeRoute={activeRoute}
        data={{
          categories: template,
        }}
        events={{
          onChangeRoute: (val) => setActiveRoute(val),
        }}
      />
      {content[activeRoute]}
    </div>
  );
};

const mapStateToProps = (state) => ({
  template: state.template.template,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
