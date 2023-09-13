import { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Report,
  Templates,
  CreateTemplate,
  CreateUser,
  Part,
  Users,
} from "./index";
import { Image, Navbar, Sidebar, Loading } from "~/components";
import { category, dialog, file, template, users } from "../redux/actions";

export const Home = ({
  admin,
  template,
  userInfo,
  users,
  templates,
  categories,
  // actions
  getUsers,
  getUserInfo,
  deleteUser,
  setDialog,
  getAdminsTemplates,
  getCustomersTemplates,
  createTemplate,
  updateTemplate,
  adminUpdateTemplate,
  getAdminTemplates,
  updateUserAdmin,
  createUser,
  uploadFile,
  getAdminCategories,
  // loading
  usersLoading,
  templateLoading,
}) => {
  const [route, setRoute] = useState("report");
  const [activePart, setActivePart] = useState(null);
  const [activeTemplateID, setActiveTemplateID] = useState(null);
  const [activeUserID, setActiveUserID] = useState(null);
  const [globalLoading, setGlobalLoading] = useState(false);
  const isSuperAdmin = admin?.roles?.find((item) => item === "ADMIN");

  const sidebarRoutes = isSuperAdmin
    ? [
        {
          title: "گزارشات",
          name: "report",
        },
        {
          title: "لیست مشتریان",
          name: "users",
        },
      ]
    : [
        {
          title: "گزارشات",
          name: "report",
        },
        {
          title: "فروشگاه‌ها",
          name: "templates",
        },
      ];

  // useEffect(() => {
  //   setGlobalLoading(true);
  //   setTimeout(() => {
  //     setGlobalLoading(false);
  //   }, 1500);
  // }, [route]);
  useEffect(() => {
    if (route === "users") {
      if (isSuperAdmin) {
        if (!users?.length) {
          getUsers();
        }
      }
    } else if (route === "templates") {
      if (isSuperAdmin) {
        if (activeUserID) {
          getAdminsTemplates({ ownerId: activeUserID });
        } else {
          getAdminsTemplates();
        }
      } else {
        getCustomersTemplates();
      }
    } else if (route === "editUser") {
      if (activeUserID !== userInfo?._id) {
        getUserInfo({ id: activeUserID });
      }
    } else if (route === "editTemplate") {
      if (template?._id !== activeTemplateID) {
        getAdminTemplates({ id: activeTemplateID });
        getAdminCategories();

      }
    } else if (route === "editPart") {
    }
  }, [route, users, userInfo, activeUserID, template, activeTemplateID]);

  // Pages
  const content = {
    report: <Report />,
    users: isSuperAdmin ? (
      <Users
        data={{
          users,
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
    ) : null,
    templates: (
      <Templates
        data={{
          isSuperAdmin,
          templates,
          loading: templateLoading,
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
        key={"edit-template-" + (template ? template["name"] : "template-name")}
        data={{
          isEditPage: true,
          template,
          templateLoading,
          isSuperAdmin,
          activeUserID,
          categories,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          changeActivePart: (part) => setActivePart(part),
          setDialog,
          updateTemplate: isSuperAdmin ? adminUpdateTemplate : updateTemplate,
        }}
      />
    ),
    createTemplate: isSuperAdmin ? (
      <CreateTemplate
        data={{ templateLoading, activeUserID }}
        events={{
          createTemplate,
          setDialog,
          uploadFile,
          setActiveTemplateID,
          changeRoute: (route) => setRoute(route),
        }}
      />
    ) : null,
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
    createUser: isSuperAdmin ? (
      <CreateUser
        key={"create-user" + usersLoading}
        data={{
          loading: usersLoading,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          createUser,
        }}
      />
    ) : null,
    editUser: isSuperAdmin ? (
      <CreateUser
        key={"edit-user" + usersLoading}
        data={{
          isEditPage: true,
          userInfo,
          loading: usersLoading,
        }}
        userInfo={userInfo}
        events={{
          changeRoute: (route) => setRoute(route),
          createUser,
          updateUser: updateUserAdmin,
        }}
      />
    ) : null,
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
      {globalLoading ? (
        <div className="flex-1 flex-center-center">
          <Loading />
        </div>
      ) : (
        content[route]
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin: state.auth.status,
  userInfo: state.users.userInfo,
  template: state.template.template,
  templates: state.template.templates,
  users: state.users.users,
  categories: state.category.categories,
  // loadings
  usersLoading: state.users.loading,
  templateLoading: state.template.loading,
});

const mapDispatchToProps = {
  getUsers: users.list,
  getUserInfo: users.adminInfo,
  deleteUser: users.del,
  createUser: users.create,
  updateUserAdmin: users.adminUpdate,
  setDialog: dialog.set,
  getAdminsTemplates: template.getAdminsTemplates,
  getCustomersTemplates: template.getCustomersTemplates,
  getAdminTemplates: template.getAdminTemplates,
  createTemplate: template.create,
  adminUpdateTemplate: template.adminUpdateTemplate,
  updateTemplate: template.updateTemplate,
  uploadFile: file.upload,
  getAdminCategories: category.getAdminCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
