import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { Report, Templates, CreateTemplate, EditUI } from "./index";
import { Image, Navbar, Sidebar } from "~/components";
import { baseUrl } from "../config";

export const Home = ({ template, ...props }) => {
  const navigation = useNavigate();
  const [activeRoute, setActiveRoute] = useState("report");

  const content = {
    report: <Report />,
    templates: <Templates />,
    createTemplate: <CreateTemplate />,
    editUI: <EditUI />
  };

  useEffect(() => {
    console.log(activeRoute);
  }, [activeRoute]);
  return (
    <div className="flex flex-1 flex-col md:flex-row max-w-full max-h-full h-full overflow-hidden">
      <Navbar
        classNames="md:hidden !fixed !pt-8 !text-white backdrop-blur-sm"
        logo={<Image src="/icons/logo.svg" classNames="w-10 rounded-md" />}
      />
      <Sidebar
        activeRoute={activeRoute}
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