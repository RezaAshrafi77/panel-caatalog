import React from "react";
import { connect } from "react-redux";

import { Button } from "./index";
import { dialog } from "../redux/actions";

function Dialog({ classNames, events, data, ...props }) {
  return props?.open ? (
    <React.Fragment>
      <div
        onClick={() => props?.reset()}
        className="z-40 w-full h-full fixed right-0 top-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm backdrop-invert-0"
      ></div>
      <div className="z-50 w-2/3 md:max-w-[400px] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-3xl overflow-hidden bg-gray-900 text-white border border-gray-600 shadow-md">
        <b className="p-6 md:p-6 block font-medium w-full ">
          {props?.title}
        </b>
        <div className="flex flex-col gap-[4vh] w-full p-[4vw] md:p-8">
          {props?.description ? (
            <p className="text-base">{props?.description}</p>
          ) : null}
          <div className="flex items-center gap-4 justify-between">
            <Button
              title={props?.confirmTitle}
              events={{
                onSubmit: () => {
                  props?.confirm();
                  props?.reset();
                },
              }}
              classNames="bg-primary text-white max-h-[40px]"
            />
            <Button
              title={props?.cancelTitle}
              events={{
                onSubmit: () => props?.reset(),
              }}
              classNames="border border-solid border-gray-700 text-white max-h-[40px]"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  ) : null;
}

const mapStateToProps = (state) => ({
  open: state.dialog.open,
  title: state.dialog.title,
  description: state.dialog.description,
  cancelTitle: state.dialog.cancelTitle,
  confirmTitle: state.dialog.confirmTitle,
  confirm: state.dialog.confirm,
});

const mapActionsToProps = {
  reset: dialog.reset,
};

export default connect(mapStateToProps, mapActionsToProps)(Dialog);
