import { Fragment, useState, useEffect } from "react";
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
  roles,
} from "../redux/actions";
import { Button } from "../components";
import Categories from "./categories";

export const Home = ({
  admin,
  template,
  userInfo,
  users,
  templates,
  categories,
  uploadFileID,
  roles,
  // actions
  getUsers,
  getUserInfo,
  deleteUser,
  setDialog,
  addRole,
  removeRole,
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
  getRoles,
  adminDeletePart,
  customerDeletePart,
  createAdminCategory,
  deleteAdminCategory,
  // loading
  usersLoading,
  templateLoading,
  uploadLoading,
  rolesLoading,
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
        {
          title: "دسته بندی ها",
          name: "categories",
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
      classNames="text-red-600 !text-lg md:text-sm !w-fit px-4"
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
        getCustomersTemplates({ ownerId: admin?._id });
      }
    } else if (route === "editUser") {
      if (activeUserID !== userInfo?._id) {
        getUserInfo({ id: activeUserID });
      }
      if (!roles?.length) {
        getRoles();
      }
    } else if (route === "editTemplate") {
      if (template?._id !== activeTemplateID) {
        getAdminTemplates({ id: activeTemplateID });
        getAdminCategories();
      }
    } else if (route === "editPart") {
    } else if (route === "categories") {
      if (!categories?.length) {
        getAdminCategories();
      }
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
    roles,
  ]);

  // Pages
  const content = {
    report: (
      <Report
        data={{
          sidebarCallToActions,
          sidebarRoutes,
          activeRoute: route,
          admin,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
        }}
      />
    ),
    categories: (
      <Categories
        data={{
          categories,
        }}
        events={{
          createAdminCategory,
          deleteAdminCategory,
          getAdminCategories,
          changeRoute: (route) => setRoute(route),
        }}
      />
    ),
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
          getAdminTemplates: () =>
            getAdminsTemplates({ ownerId: activeUserID }),
          deleteTemplate,
          setDialog,
        }}
      />
    ),
    editTemplate: (
      <CreateTemplate
        key={
          "edit-template-" + (template ? template?.updatedAt : "template-name")
        }
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
          template,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          changeActivePart: (part) => setActivePart(part),
          setDialog,
          adminPartUpdate,
          customerPartUpdate,
          adminPartCreate,
          customerPartCreate,
          uploadFile,
          adminDeletePart,
          customerDeletePart,
          refreshTemplate: () => getAdminTemplates({ id: activeTemplateID }),
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
          template,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          changeActivePart: (part) => setActivePart(part),
          setDialog,
          adminPartUpdate,
          customerPartUpdate,
          adminPartCreate,
          customerPartCreate,
          uploadFile,
          refreshTemplate: () => getAdminTemplates({ id: activeTemplateID }),
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
          usersLoading,
          rolesLoading,
          userInfo,
          roles,
        }}
        events={{
          changeRoute: (route) => setRoute(route),
          createUser,
          updateUser: updateUserAdmin,
          uploadFileID,
          addRole,
          removeRole,
        }}
      />
    ) : null,
  };

  console.log(route);

  return (
    <div className="flex flex-1 flex-col md:flex-row max-w-full max-h-full h-full overflow-hidden bg-gray-800 text-background">
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
  roles: state.roles.list,
  // loadings
  usersLoading: state.users.loading,
  templateLoading: state.template.loading,
  uploadLoading: state.file.loading,
  rolesLoading: state.roles.loading,
});

const mapDispatchToProps = {
  // admin
  getUsers: users.list,
  getUserInfo: users.adminInfo,
  deleteUser: users.del,
  createUser: users.create,
  addRole: users.addRole,
  removeRole: users.removeRole,
  updateUserAdmin: users.adminUpdate,
  getAdminsTemplates: template.getAdminsTemplates,
  getAdminTemplates: template.getAdminTemplates,
  createTemplate: template.create,
  adminUpdateTemplate: template.adminUpdateTemplate,
  adminPartCreate: part.adminPartCreate,
  deleteTemplate: template.del,
  getAdminCategories: category.getAdminCategories,
  adminPartUpdate: part.adminPartUpdate,
  getRoles: roles.list,
  adminDeletePart: part.adminDeletePart,
  createAdminCategory: category.createAdminCategory,
  deleteAdminCategory: category.deleteAdminCategory,
  // customer
  updateTemplate: template.updateTemplate,
  customerPartUpdate: part.customerPartUpdate,
  getCustomersTemplates: template.getCustomersTemplates,
  customerPartCreate: part.customerPartCreate,
  customerDeletePart: part.customerDeletePart,
  // global
  uploadFile: file.upload,
  setDialog: dialog.set,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
