import { useState } from "react";
import { MdAccountCircle, MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import { Image, Navbar, Input, Button } from "~/components";
import { loginBG } from "../shared/ui";
import { auth, users } from "../redux/actions";
import { toast } from "react-toastify";

export const Login = ({ admin, signup, login, loading, ...props }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const submitForm = () => {
    const { username, password } = formValues;
    if (!username) {
      toast.error("نام کاربری وارد نشده است.");
      return;
    }
    if (!password) {
      toast.error("رمز عبور وارد نشده است.");
      return;
    }
    login({
      username,
      password,
    });
  };
  return (
    <div className="flex-center-center flex-1 max-w-full max-h-full h-full overflow-hidden relative">
      <Image
        src={loginBG}
        classNames="fixed w-full h-full left-0 top-0 object-cover"
      />
      <div className="flex flex-col justify-between md:justify-evenly text-black lg:justify-between items-center px-[8vw] md:px-6 md:py-12 md:max-w-[50vh] bg-white w-full h-full md:max-h-[85vh] z-10 md:rounded-xl md:shadow-xl overflow-y-scroll md:overflow-hidden">
        <div className="w-full flex flex-col my-auto items-center gap-[10vh] md:gap-10">
          <strong className="font-bold text-3xl md:mb-10 overflow-hidden">
            {"Login"}
          </strong>
          <form
            className="w-full flex flex-col md:max-w-[90%] gap-[4vh] md:gap-[4vh]"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="text"
              name="username"
              value={formValues?.username}
              events={{
                onChange: (name, value) =>
                  setFormValues({ ...formValues, username: value }),
              }}
              classNames="!w-full ltr !px-4 !text-sm placeholder:text-sm placeholder:text-opacity-50 placeholder:text-gray-600"
              placeholder="Type your username"
              label="Username"
              containerClassNames="!w-full md:my-0 border-b border-solid border-gray-400 overflow-hidden rounded-none pb-3 md:pb-1"
              leftIcon={<MdAccountCircle size="1.5rem" color="#bbb" />}
              labelClassNames="ltr text-gray-500 text-sm"
            />
            <Input
              type="password"
              name="password"
              value={formValues?.password}
              events={{
                onChange: (name, value) =>
                  setFormValues({ ...formValues, password: value }),
              }}
              classNames="!w-full ltr !px-4 !text-sm placeholder:text-sm placeholder:text-opacity-50"
              placeholder="Type your password"
              label="Password"
              containerClassNames="!w-full md:my-0 border-b border-solid border-gray-400 overflow-hidden rounded-none pb-3 md:pb-1"
              leftIcon={<MdLockOutline size="1.5rem" color="#bbb" />}
              labelClassNames="ltr text-gray-500 text-sm"
            />
            <Button
              classNames="w-full mt-4 text-white !bg-primary !rounded-full md:!max-h-[45px] text-sm"
              type="contained"
              primary="primary"
              loading={loading}
              title={"LOGIN"}
              events={{
                onSubmit: (e) => {
                  submitForm();
                },
              }}
            />
          </form>
        </div>
        <div className="flex flex-row-reverse gap-2 text-sm text-gray-500">
          Powered by <Image src="/icons/logo.svg" classNames="w-5" />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin: state.auth.status,
  loading: state.auth.loading,
});

const mapDispatchToProps = {
  login: auth.login,
  signup: users.create,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
