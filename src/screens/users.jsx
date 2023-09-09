import { useState, useEffect } from "react";
import { MdAddBusiness, MdZoomIn } from "react-icons/md";

import { connect } from "react-redux";
import { users } from "../redux/actions";
import { Table, Button } from "../components";
import { adminsUsersTheads } from "../shared/data";

export const Users = ({ user, getUsers, users, events }) => {
  useEffect(() => {
    getUsers();
  }, []);
  const isAdmin = user?.roles?.find((item) => item === "ADMIN");

  return (
    <div className="flex flex-1 flex-col max-w-full max-h-full h-full overflow-hidden px-4 py-6">
      {isAdmin ? (
        <Button
          icon={<MdAddBusiness color="white" size="1.5rem" />}
          classNames="bg-green-600 gap-2 !font-medium rounded-md py-2 cursor-pointer text-white !w-fit px-3 text-sm"
          events={{
            onSubmit: () => events["changeRoute"]("createTemplate"),
          }}
        />
      ) : null}
      <Table
        cols={5}
        classNames="my-5"
        data={{
          theads: adminsUsersTheads,
        }}
        // renderBody={users?.map((row, index) => (
        //   <div
        //     className={`grid-cols-5 grid text-white`}
        //     key={"table-row-" + index}
        //   >
        //     {["watch", ...Object?.keys(row)]?.map((key, index) => (
        //       <div className={`text-center my-1 py-4 md:text-sm`} key={index}>
        //         {key === "createdAt" || key === "expiredAt"
        //           ? row[key]?.split("T")[0]
        //           : row[key]}
        //         {key === "watch" ? (
        //           <div className="flex items-center text- gap-1">
        //             <span className="text-lg">{index + 1 + "."}</span>
        //             <Button
        //               className="m-auto cursor-pointer"
        //               icon={
        //                 <MdZoomIn className="text-green-500" size="1.5rem" />
        //               }
        //               events={{
        //                 onSubmit: () =>
        //                   events["changeRoute"]("editTemplate", row["_id"]),
        //               }}
        //             />
        //           </div>
        //         ) : (
        //           ""
        //         )}
        //       </div>
        //     ))}
        //   </div>
        // ))}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.templates,
  user: state.auth.status,
});

const mapDispatchToProps = {
  getUsers: users.list,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
