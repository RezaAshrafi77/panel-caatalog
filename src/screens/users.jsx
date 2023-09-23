import { MdChevronRight, MdEdit, MdPersonAdd, MdZoomIn } from "react-icons/md";

import { Table, Button, Loading, Navbar } from "../components";
import { adminsUsersTheads } from "../shared/data";
import { TbTrash } from "react-icons/tb";

export const Users = ({ events, data }) => {
  const { users, loading, superAdminID } = data;
  const { deleteUser, setDialog, changeRoute } = events;

  return (
    <div className="flex flex-1 border-green-600 flex-col max-w-full max-h-full h-full overflow-scroll">
      <Navbar
        classNames="min-w-full text-white min-h-[54px] !bg-gray-900"
        leading={
          <Button
            classNames="md:hidden"
            icon={<MdChevronRight color="#e1e1e1" size="2.5rem" />}
            events={{
              onSubmit: () => changeRoute("report"),
            }}
          />
        }
        actions={[
          loading ? (
            <Loading />
          ) : (
            <Button
              icon={<MdPersonAdd color="rgb(22, 163, 74)" size="1.65rem" />}
              title="افزودن کاربر"
              classNames="!text-green-600 flex-row-reverse !gap-2 border border-solid border-green-600 gap-2 !font-medium rounded-md py-0 !max-h-[38px] cursor-pointer text-white !w-fit px-3 text-sm"
              events={{
                onSubmit: () => changeRoute("createUser"),
              }}
            />
          ),
        ]}
      />
      <div className="flex-1 flex flex-col md:px-6 overflow-x-scroll">
        <Table
          cols={3}
          classNames="my-5 px-4 w-[600px] md:w-auto "
          data={{
            theads: adminsUsersTheads,
          }}
          renderBody={users?.map((row, index) => (
            <div
              className={`grid-cols-3 grid text-white`}
              key={"table-row-" + index}
            >
              <div
                className="text-center my-1 py-2 md:text-sm"
                key={"user-" + 1}
              >
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
              <div
                className="text-center my-1 py-2 md:text-sm"
                key={"user-" + 2}
              >
                {row["username"]}
              </div>
              <div
                className="text-center my-1 py-2 md:text-sm"
                key={"user-" + 3}
              >
                {row["_id"]}
              </div>
              <div
                className="text-center my-1 py-2 md:text-sm"
                key={"user-" + 4}
              ></div>
            </div>
          ))}
        />
      </div>
    </div>
  );
};

export default Users;
