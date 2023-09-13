import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

// redux-actions
// import { setMode } from "~/states/slices/Device";

//components
import { Home, Splash, NotFound, Login } from "./screens";
import { checkDevice } from "./utils/funcs";
import { Dialog } from "./components";
// import { MenuFullLayer } from "~/components";

let splashInterval;
export const Router = ({ admin }) => {
  const [splashDuration, setSplashDuration] = useState(3);
  // const [device, setDevice] = useState("mobile");

  useEffect(() => {
    // get data
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });

    // check device width
    // setDevice(checkDevice());
    // window.addEventListener("resize", () => {
    //   setDevice(checkDevice());
    // });
  }, []);

  useEffect(() => {
    splashInterval = setInterval(() => {
      setSplashDuration(splashDuration - 1);
    }, 1000);
    if (splashDuration === 0) {
      clearInterval(splashInterval);
    }
    return () => clearInterval(splashInterval);
  }, [splashDuration]);

  return (
    <div className={`dark h-full`}>
      <div
        className={`flex flex-col h-full w-full rtl overflow-x-hidden bg-background text-textColor lg:py-0`}
      >
        {/* {menuFullLayer ? <MenuFullLayer /> : null} */}
        <Dialog />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                splashDuration ? <Splash /> : admin ? <Home /> : <Login />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin: state.auth.status,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
