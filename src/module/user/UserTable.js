import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { db } from "../../firebase/firebaseConfig";
import { userRole, userStatus } from "../../utils/constants";

const UserTable = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
          setUserList(results);
        });
      });
    }

    fetchData();
  }, []);

  const handleDeleteUser = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        await deleteDoc(doc(db, "users", userId));
      }
    });
  };

  const renderUser = (user) => {
    return (
      <tr key={user.id} className="whitespace-nowrap">
        <td title={user?.id}>{`${user.id.slice(0, 5)}...`}</td>
        <td>
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt=""
              className="w-10 h-10 rounded-lg object-cover "
            />
            <div className="flex flex-col ">
              <span>{user?.fullname}</span>
              <time className="text-gray-500 text-sm opacity-50 ">
                {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                  "vi-VI"
                )}
              </time>
            </div>
          </div>
        </td>
        <td>{user?.username}</td>
        <td title={user?.email}>{`${user?.email.slice(0, 5)}...`}</td>
        <td>{renderStatus(Number(user.status))}</td>
        <td>{renderRole(Number(user?.role))}</td>
        <td className="flex gap-2 items-center justify-center">
          <ActionEdit to={`/manage/edit-user/${user.id}`}></ActionEdit>
          <ActionDelete
            onClick={() => handleDeleteUser(user.id)}
          ></ActionDelete>
        </td>
      </tr>
    );
  };

  const renderRole = (role) => {
    switch (role) {
      case userRole.ADMIN:
        return "Admin";
      case userRole.MOD:
        return "Moderator";
      case userRole.USER:
        return "User";

      default:
        break;
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case userStatus.ACTIVE:
        return <LabelStatus type="success">Actived</LabelStatus>;

      case userStatus.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;

      case userStatus.BAN:
        return <LabelStatus type="danger">Banned</LabelStatus>;

      default:
        break;
    }
  };

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Info</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList &&
            userList.length > 0 &&
            userList.map((user) => renderUser(user))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
