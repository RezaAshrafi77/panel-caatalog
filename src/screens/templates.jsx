import { useState, useEffect } from "react";
import { MdZoomIn } from "react-icons/md";

import { connect } from "react-redux";
import { template } from "../redux/actions";
import { Table, Button } from "../components";
import { adminsTemplatesTheads } from "../shared/data";

export const Templates = ({ getAdminsTemplates, templates }) => {
  useEffect(() => {
    getAdminsTemplates();
  }, []);

  return (
    <div className="flex flex-1 flex-col md:flex-row max-w-full max-h-full h-full overflow-hidden px-4">
      <Table
        cols={5}
        classNames="my-5"
        data={{
          theads: adminsTemplatesTheads,
        }}
        renderBody={templates?.map((row, index) => (
          <div
            className={`grid-cols-5 grid text-white`}
            key={"table-row-" + index}
          >
            {["watch", ...Object?.keys(row)]?.map((key, index) => (
              <div className={`text-center my-1 py-4 md:text-sm`} key={index}>
                {key === "createdAt" || key === "expiredAt"
                  ? row[key]?.split("T")[0]
                  : row[key]}
                {key === "watch" ? (
                  <div className="flex items-center text- gap-1">
                    <span className="text-lg">{index + 1 + "."}</span>
                    <Button
                      className="m-auto cursor-pointer"
                      icon={
                        <MdZoomIn className="text-green-500" size="1.5rem" />
                      }
                      events={{ onSubmit: () => {} }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ))}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  templates: state.template.templates,
});

const mapDispatchToProps = {
  getAdminsTemplates: template.getAdminsTemplates,
};

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
