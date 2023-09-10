import { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Navbar, Button, Loading, Tab, Input } from "../components";
import { MdChevronLeft } from "react-icons/md";
import { users } from "../redux/actions";

export const CreateUser = ({ createUser, loading, type, events }) => {
  const [formLoading, setFormLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // if (type === "edit" && template?._id !== templateID) {
    //   getAdminTemplates({ id: templateID });
    // }
  }, []);
  const isEditPage = type === "edit";

  return (
    <div className="flex-col flex-center-center flex-1 max-w-full max-h-full h-full overflow-y-scroll ">
      {isEditPage ? (
        <Navbar
          classNames="text-white min-h-[54px] !bg-gray-900"
          leading={<span></span>}
          actions={[
            <Button
              icon={<MdChevronLeft size={"2.5rem"} />}
              events={{ onSubmit: () => events["changeRoute"]("users") }}
              className="text-white cursor-pointer"
            />,
          ]}
        />
      ) : null}
      <form
        className="flex-1  flex-center-center flex-col my-10 gap-8 max-w-[500px] w-full px-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          type="text"
          name="username"
          value={formValues?.name}
          events={{
            onChange: (name, value) =>
              setFormValues({ ...formValues, ["username"]: value }),
          }}
          classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
          placeholder="@username"
          label="نام کاربری"
          containerClassNames="ltr !bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
          labelClassNames="text-gray-200 mb-1 text-sm"
        />
        <Input
          type="text"
          name="password"
          value={formValues?.password}
          events={{
            onChange: (name, value) =>
              setFormValues({ ...formValues, ["password"]: value }),
          }}
          classNames="text-white !w-full !bg-transparent !px-4 !text-sm placeholder:text-sm placeholder:text-gray-400"
          placeholder="!@fdf#dfdf"
          label="رمز عبور"
          containerClassNames="ltr !bg-transparent !w-full md:my-0 border-b border-solid border-gray-500 overflow-hidden rounded-none pb-3 md:pb-1"
          labelClassNames="text-gray-200 mb-1 text-sm"
        />
        <Button
          classNames="!w-1/2 mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
          type="contained"
          primary="primary"
          loading={formLoading || loading}
          title="ایجاد کاربر"
          events={{
            onSubmit: (e) => {
              setFormLoading(true);
              createUser(formValues);
              setTimeout(() => {
                setFormLoading(false);
              }, 1500);
            },
          }}
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.users.loading,
});

const mapDispatchToProps = {
  createUser: users.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
