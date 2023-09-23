import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Navbar, Image, Drawer } from "../components";
import { MdMenu, MdPerson } from "react-icons/md";

export const Report = ({ data, events, props }) => {
  const { admin, sidebarRoutes, sidebarCallToActions, activeRoute } = data;
  const { changeRoute } = events;
  const [drawerToggle, setDrawerToggle] = useState(false);

  return (
    <div className="flex flex-1 flex-col md:flex-row max-w-full max-h-full h-full overflow-hidden pt-32 md:pt-12">
      <Navbar
        classNames="md:hidden !fixed !pt-8 !text-white backdrop-blur-sm"
        logo={<Image src="/icons/logo.svg" classNames="w-10 rounded-md" />}
        leading={
          <Button
            icon={<MdMenu size="3rem" color="#e1e1e1" />}
            classNames="md:hidden"
            events={{ onSubmit: () => setDrawerToggle(true) }}
          />
        }
      />
      <Drawer
        key={"home-drawer"}
        open={drawerToggle}
        direction="right"
        size="75%"
        events={{
          onClose: () => setDrawerToggle(false),
        }}
      >
        <div className="relative flex-1 flex flex-col px-[5vw] bg-black bg-opacity-70 backdrop-blur-md">
          {admin ? (
            <div className={`flex flex-col px-4 py-6`}>
              <div className="flex gap-4 items-center">
                <Image
                  icon={<MdPerson size="2rem" color="white" />}
                  classNames="w-16 h-16 rounded-full bg-gray-700"
                />
                <span className="font-medium">{admin?.username}</span>
              </div>
            </div>
          ) : null}
          <ul className={`flex flex-col divide-y divide-gray-600`}>
            {sidebarRoutes?.map((route, index) => (
              <li
                onClick={() => changeRoute(route.name)}
                className={`transition-all cursor-pointer flex justify-between px-4 text-lg md:text-sm font-medium ${
                  activeRoute === route.name
                    ? "text-primary !text-base py-6"
                    : "py-5 hover:text-gray-400"
                }`}
                key={`sidebar-routes-${index}`}
              >
                {route.title}
              </li>
            ))}
          </ul>
          <ul className={`flex flex-col divide-y mt-auto mb-4 divide-gray-600`}>
            {sidebarCallToActions?.map((button, index) => (
              <Fragment key={"call-to-actions-" + index}>{button}</Fragment>
            ))}
          </ul>
        </div>
      </Drawer>
      <div className="flex-1 flex flex-col px-6">report</div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Report);
