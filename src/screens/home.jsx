import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import {
  Report,
  Templates,
  CreateTemplate,
  //actions
  CreateUser,
  Part,
  Users,
} from "./index";
import { Image, Navbar, Sidebar } from "~/components";
import { dialog, template, users } from "../redux/actions";

export const Home = ({
  admin,
  template,
  users,
  templates,
  // actions
  getUsers,
  deleteUser,
  setDialog,
  getAdminsTemplates,
  getCustomersTemplates,
  createTemplate,
  updateTemplate,
  getAdminTemplates,
  // loading
  usersLoading,
  templateLoading,
}) => {
  const [route, setRoute] = useState("report");
  const [activePart, setActivePart] = useState(null);
  const [activeTemplateID, setActiveTemplateID] = useState(null);
  const [activeUserID, setActiveUserID] = useState(null);
  const isSuperAdmin = admin?.roles?.find((item) => item === "ADMIN");

  const sidebarRoutes = [
    {
      title: "گزارشات",
      name: "report",
    },
    isSuperAdmin
      ? {
          title: "لیست مشتریان",
          name: "users",
        }
      : null,
    !isSuperAdmin
      ? {
          title: "فروشگاه‌ها",
          name: "templates",
        }
      : null,
  ];

  useEffect(() => {
    // Call admin APIs
    if (isSuperAdmin) {
      getUsers();
    }
    // cll customer APIs
    else {
      getCustomersTemplates();
    }
  }, []);

  useEffect(() => {
    switch (route) {
      case "users":
        if (activeUserID) {
          getAdminsTemplates({ ownerId: userId });
        }else{
          getAdminsTemplates();
        }
      case "editUser":
    }
  }, [route, activeUserID]);

  useEffect(() => {
    if (route === "editTemplate" && template?._id !== activeTemplateID) {
      getAdminTemplates({ id: activeTemplateID });
    }
  }, [activeTemplateID, route, template]);

  // Pages
  const content = {
    report: <Report />,
    users: (
      <Users
        data={{
          users,
          isSuperAdmin,
          loading: usersLoading,
        }}
        events={{
          changeRoute: (route, ID) => {
            setActiveUserID(ID);
            setRoute(route);
          },
          deleteUser,
          setDialog,
        }}
      />
    ),
    templates: (
      <Templates
        data={{
          isSuperAdmin,
          templates,
        }}
        events={{
          changeRoute: (route, ID) => {
            setActiveTemplateID(ID);
            setRoute(route);
          },
          getAdminsTemplates,
          getCustomersTemplates,
        }}
      />
    ),
    editTemplate: (
      <CreateTemplate
        data={{
          isEditPage: true,
          template,
          templateLoading,
          isSuperAdmin,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          changeActivePart: (part) => setActivePart(part),
          setDialog,
          updateTemplate,
        }}
      />
    ),
    createTemplate: (
      <CreateTemplate
        data={{ isSuperAdmin, templateLoading }}
        events={{
          createTemplate,
          setDialog,
          setActiveTemplateID,
          changeRoute: (route) => setRoute(route),
        }}
      />
    ),
    editPart: (
      <Part
        part={activePart}
        type="edit"
        events={{
          changeRoute: (route) => setRoute(route),
          changeActivePart: (part) => setActivePart(part),
        }}
      />
    ),
    createUser: (
      <CreateUser
        data={{
          loading: usersLoading,
        }}
      />
    ),
    editUser: (
      <CreateUser
        type="edit"
        events={{
          changeRoute: (route) => setRoute(route),
        }}
      />
    ),
  };

  return (
    <div className="flex flex-1 flex-col md:flex-row max-w-full max-h-full h-full overflow-hidden bg-gray-800 text-background">
      <Navbar
        classNames="md:hidden !fixed !pt-8 !text-white backdrop-blur-sm"
        logo={<Image src="/icons/logo.svg" classNames="w-10 rounded-md" />}
      />
      <Sidebar
        activeRoute={route}
        events={{
          onChangeRoute: (val) => setRoute(val),
        }}
        data={{
          admin,
        }}
        routes={sidebarRoutes}
      />
      {content[route]}
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin: state.auth.status,
  userInfo: state.users.userInfo,
  template: state.template.template,
  templates: state.template.templates,
  users: state.users.users,
  // loadings
  usersLoading: state.users.loading,
  templateLoading: state.template.loading,
});

const mapDispatchToProps = {
  getUsers: users.list,
  deleteUser: users.del,
  setDialog: dialog.set,
  getAdminsTemplates: template.getAdminsTemplates,
  getCustomersTemplates: template.getCustomersTemplates,
  updateTemplate: template.updateTemplate,
  getAdminTemplates: template.getAdminTemplates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
