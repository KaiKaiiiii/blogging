import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import Button from "../../components/button/Button";
import LabelStatus from "../../components/label/LabelStatus";
import Table from "../../components/table/Table";
import { db } from "../../firebase/firebaseConfig";
import DashboardHeading from "../dashboard/DashboardHeading";
import Swal from "sweetalert2";
import { debounce } from "lodash";
const CategoryManage = () => {
  const [categoryDetail, setCategoryDetail] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const newRef = searchName
        ? query(
            colRef,
            where(
              "name",
              "==",
              `${searchName.charAt(0).toUpperCase()}${searchName.slice(1)}`
            )
          )
        : colRef;
      onSnapshot(newRef, (snapshot) => {
        let result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setCategoryDetail(result);
      });
    }
    getData();
  }, [searchName]);

  const handleDelete = (categoryId) => {
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
        await deleteDoc(doc(db, "categories", categoryId));
      }
    });
  };

  const handleSearch = debounce((e) => {
    setSearchName(e.target.value);
  }, 500);
  return (
    <div>
      <DashboardHeading title="Categories" desc="Manage your category">
        <div className="">
          <Button type="button" kind="primary" to="/manage/add-category">
            Create category
          </Button>
          <input
            type="text"
            placeholder="Search category name"
            className="mt-5 p-3 border-2 border-gray-300  rounded-md outline-none"
            onChange={handleSearch}
          />
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categoryDetail &&
            categoryDetail.length > 0 &&
            categoryDetail.map((category) => {
              return (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <span className="italic text-gray-500">
                      {category.slug}
                    </span>
                  </td>
                  <td>
                    {category.status === 1 ? (
                      <LabelStatus type="success">Approved</LabelStatus>
                    ) : (
                      <LabelStatus type="warning">Unapproved</LabelStatus>
                    )}
                  </td>
                  <td className="flex gap-2 items-center justify-center">
                    <ActionView></ActionView>
                    <ActionEdit
                      to={`/manage/edit-category/${category.id}`}
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDelete(category.id)}
                    ></ActionDelete>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryManage;
