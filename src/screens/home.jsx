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
import {
  category,
  dialog,
  file,
  template,
  users,
  part,
} from "../redux/actions";
import { Button } from "../components";

export const Home = ({
  admin,
  template,
  userInfo,
  users,
  templates,
  categories,
  uploadFileID,
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
  adminPartUpdate,
  customerPartUpdate,
  adminPartCreate,
  customerPartCreate,
  deleteTemplate,
  // loading
  usersLoading,
  templateLoading,
  uploadLoading,
}) => {
  const [route, setRoute] = useState("report");
  const [activePart, setActivePart] = useState(null);
  const [activeTemplateID, setActiveTemplateID] = useState(null);
  const [activeUserID, setActiveUserID] = useState(null);
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
  const sidebarCallToActions = [
    <Button
      title="خروج"
      classNames="text-red-600 !w-fit px-4"
      events={{
        onSubmit: () => {
          localStorage.clear();
          location.reload();
        },
      }}
    />,
  ];

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
          getAdminsTemplates({ ownerId: admin?._id });
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
  }, [
    route,
    users,
    uploadFileID,
    admin,
    userInfo,
    activeUserID,
    template,
    activeTemplateID,
  ]);

  // Pages
  const content = {
    report: <Report />,
    users: isSuperAdmin ? (
      <Users
        data={{
          users,
          superAdminID: admin?._id,
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
          deleteTemplate,
          setDialog,
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
          uploadLoading,
          isSuperAdmin,
          activeUserID,
          categories,
          uploadFileID,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          changeActivePart: (part) => setActivePart(part),
          setDialog,
          uploadFile,
          updateTemplate: isSuperAdmin ? adminUpdateTemplate : updateTemplate,
        }}
      />
    ),
    createTemplate: isSuperAdmin ? (
      <CreateTemplate
        data={{
          templateLoading,
          activeUserID,
          uploadFileID,
          template,
          templateLoading,
          uploadLoading,
          activeUserID,
        }}
        events={{
          createTemplate,
          uploadLoading,
          setDialog,
          uploadFile,
          setActiveTemplateID,
          changeRoute: (route) => setRoute(route),
        }}
      />
    ) : null,
    editPart: (
      <Part
        data={{
          isSuperAdmin,
          uploadFileID,
          uploadLoading,
          templateLoading,
          categories,
          part: activePart,
          isEditPage: true,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          changeActivePart: (part) => setActivePart(part),
          setDialog,
          adminPartUpdate,
          customerPartUpdate,
          adminPartCreate,
          customerPartCreate,
        }}
      />
    ),
    createPart: (
      <Part
        data={{
          isSuperAdmin,
          uploadFileID,
          uploadLoading,
          templateLoading,
          categories,
          part: activePart,
          isEditPage: true,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          changeActivePart: (part) => setActivePart(part),
          setDialog,
          adminPartUpdate,
          customerPartUpdate,
          adminPartCreate,
          customerPartCreate,
        }}
      />
    ),
    createUser: isSuperAdmin ? (
      <CreateUser
        key={"create-user" + usersLoading}
        data={{
          loading: usersLoading,
          uploadFileID,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          createUser,
          uploadFile,
        }}
      />
    ) : null,
    editUser: isSuperAdmin ? (
      <CreateUser
        key={"edit-user" + usersLoading}
        data={{
          isEditPage: true,
          userInfo,
          uploadFileID,
          loading: usersLoading,
          userInfo,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          createUser,
          updateUser: updateUserAdmin,
          uploadFileID,
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
        callToActions={sidebarCallToActions}
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
  categories: state.category.categories,
  uploadFileID: state.file.id,
  // loadings
  usersLoading: state.users.loading,
  templateLoading: state.template.loading,
  uploadLoading: state.file.loading,
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
  adminPartUpdate: part.adminPartUpdate,
  customerPartUpdate: part.customerPartUpdate,
  adminPartCreate: part.adminPartCreate,
  customerPartCreate: part.customerPartCreate,
  deleteTemplate: template.del
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
