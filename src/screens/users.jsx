import { useState, useEffect } from "react";
import { MdEdit, MdPersonAdd, MdZoomIn } from "react-icons/md";

import { connect } from "react-redux";
import { dialog, users } from "../redux/actions";
import { Table, Button, Loading } from "../components";
import { adminsUsersTheads } from "../shared/data";
import { TbTrash } from "react-icons/tb";

export const Users = ({ events, data }) => {
  const { users, isSuperAdmin, loading } = data;
  const { deleteUser, setDialog, changeRoute } = events;

  return !loading ? (
    <div className="flex flex-1 flex-col max-w-full max-h-full h-full overflow-hidden px-4 py-6">
      {isSuperAdmin ? (
        <Button
          icon={<MdPersonAdd color="white" size="1.5rem" />}
          classNames="bg-green-600 gap-2 !font-medium rounded-md py-2 cursor-pointer text-white !w-fit px-3 text-sm"
          events={{
            onSubmit: () => changeRoute("createUser"),
          }}
        />
      ) : null}
      <Table
        cols={3}
        classNames="my-5"
        data={{
          theads: adminsUsersTheads,
        }}
        renderBody={users?.map((row, index) => (
          <div
            className={`grid-cols-3 grid text-white`}
            key={"table-row-" + index}
          >
            <div className="text-center my-1 py-4 md:text-sm" key={"user-" + 1}>
              <div className="flex items-center justify-around gap-6">
                <Button
                  className="cursor-pointer "
                  icon={<MdZoomIn className="text-green-500" size="1.5rem" />}
                  events={{
                    onSubmit: () => changeRoute("templates", row["_id"]),
                  }}
                />
                <Button
                  className="cursor-pointer "
                  icon={<MdEdit className="text-orange-400" size="1.5rem" />}
                  events={{
                    onSubmit: () => changeRoute("editUser", row["_id"]),
                  }}
                />
                <Button
                  icon={<TbTrash size={"1.5rem"} className="text-red-600" />}
                  events={{
                    onSubmit: () =>
                      setDialog({
                        title: "مشتری حذف شود؟",
                        confirmTitle: "بله",
                        cancelTitle: "فعلا نه",
                        confirm: () => {
                          deleteUser({ id: row["_id"] });
                        },
                      }),
                  }}
                  className="cursor-pointer !w-fit"
                />
              </div>
            </div>
            <div className="text-center my-1 py-4 md:text-sm" key={"user-" + 2}>
              {row["username"]}
            </div>
            <div className="text-center my-1 py-4 md:text-sm" key={"user-" + 3}>
              {row["_id"]}
            </div>
            <div
              className="text-center my-1 py-4 md:text-sm"
              key={"user-" + 4}
            ></div>
          </div>
        ))}
      />
    </div>
  ) : (
    <div className="flex-center-center flex-1">
      <Loading />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setDialog: dialog.set,
  deleteUser: users.del,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
