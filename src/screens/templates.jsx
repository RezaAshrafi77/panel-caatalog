import { MdAddBusiness, MdChevronLeft, MdZoomIn } from "react-icons/md";
import { TbTrash } from "react-icons/tb";

import { Table, Button, Navbar, Loading } from "../components";
import { adminsTemplatesTheads } from "../shared/data";

export const Templates = ({ data, events }) => {
  const { isSuperAdmin, templates, loading, activeUserID } = data;
  const { changeRoute, setDialog, deleteTemplate } = events;

  return (
    <div className="flex flex-1 flex-col max-w-full max-h-full h-full overflow-hidden">
      {isSuperAdmin ? (
        <Navbar
          classNames="text-white min-h-[54px] !bg-gray-900"
          leading={
            loading ? (
              <Loading />
            ) : (
              <Button
                icon={<MdAddBusiness color="rgb(22, 163, 74)" size="1.65rem" />}
                title="افزودن کسب و کار"
                classNames="!text-green-600 flex-row-reverse !gap-2 border border-solid border-green-600 gap-2 !font-medium rounded-md py-0 max-h-[38px] cursor-pointer text-white !w-fit px-3 text-sm"
                events={{
                  onSubmit: () => changeRoute("createTemplate"),
                }}
              />
            )
          }
          actions={[
            <Button
              icon={<MdChevronLeft size={"2.5rem"} />}
              events={{ onSubmit: () => changeRoute("users") }}
              className="text-white cursor-pointer"
            />,
          ]}
        />
      ) : null}
      {templates?.length === 0 && !loading ? (
        <div className="flex-center-center flex-1 text-yellow-400">
          <span>هیچ کسب و کاری یافت نشد.</span>
        </div>
      ) : (
        <div className="flex flex-col flex-1 px-4 py-6">
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
                  <div
                    className={`text-center my-1 py-4 md:text-sm`}
                    key={index}
                  >
                    {key === "createdAt" || key === "expiredAt"
                      ? row[key]?.split("T")[0]
                      : row[key]}
                    {key === "watch" ? (
                      <div className="flex items-center justify-around text- gap-1">
                        <Button
                          className="cursor-pointer"
                          icon={
                            <MdZoomIn
                              className="text-green-500"
                              size="1.5rem"
                            />
                          }
                          events={{
                            onSubmit: () =>
                              changeRoute("editTemplate", row["_id"]),
                          }}
                        />
                        <Button
                          icon={
                            <TbTrash size={"1.5rem"} className="text-red-600" />
                          }
                          events={{
                            onSubmit: () =>
                              setDialog({
                                title: "کسب و کار حذف شود؟",
                                confirmTitle: "بله",
                                cancelTitle: "فعلا نه",
                                confirm: () => {
                                  deleteTemplate({ id: row["_id"] });
                                },
                              }),
                          }}
                          className="cursor-pointer !w-fit"
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
      )}
    </div>
  );
};

export default Templates;
