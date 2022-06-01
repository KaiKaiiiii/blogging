import React from "react";
import Button from "../../components/button/Button";
import DashboardHeading from "../dashboard/DashboardHeading";
import UserTable from "./UserTable";

const UserManage = () => {
  return (
    <div>
      <DashboardHeading title="Users" desc="Manage your user">
        <Button type="button" to="/manage/add-user">
          Add new user
        </Button>
      </DashboardHeading>

      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;
