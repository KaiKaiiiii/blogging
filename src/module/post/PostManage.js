import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ActionDelete from "../../components/action/ActionDelete";
import ActionEdit from "../../components/action/ActionEdit";
import ActionView from "../../components/action/ActionView";
import Button from "../../components/button/Button";
import Pagination from "../../components/pagination/Pagination";
import Table from "../../components/table/Table";
import { db } from "../../firebase/firebaseConfig";
import DashboardHeading from "../dashboard/DashboardHeading";

const PostManage = () => {
  const [posts, setPosts] = useState([]);

  const handleDelete = (postId) => {
    const docRef = doc(db, "posts", postId);
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
        await deleteDoc(docRef);
      }
    });
  };
  const renderPost = (post) => {
    return (
      <tr key={post?.id} className="border-b-2 border-b-slate-200 ">
        <td title={post?.id}>{`${post?.id.slice(0, 5)}...`}</td>
        <td>
          <div className="flex items-center gap-x-3">
            <img
              src={post?.image_url}
              alt=""
              className="w-[66px] h-[55px] rounded object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{post?.title}</h3>
              <time className="text-sm text-gray-500">
                Date:
                {new Date(post?.timeStamp?.seconds * 1000).toLocaleDateString(
                  "vi-VI"
                )}
              </time>
            </div>
          </div>
        </td>
        <td>
          <span className="text-gray-500">{post?.category?.name}</span>
        </td>
        <td>
          <span className="text-gray-500">
            {post?.user?.fullname || post?.author}
          </span>
        </td>
        <td>
          <div className="flex items-center gap-x-3 text-gray-500">
            <ActionView to={`/${post.slug}`}></ActionView>
            <ActionEdit to={`/manage/edit-post/${post.id}`}></ActionEdit>
            <ActionDelete onClick={() => handleDelete(post.id)}></ActionDelete>
          </div>
        </td>
      </tr>
    );
  };
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      onSnapshot(colRef, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
          setPosts(result);
        });
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <DashboardHeading title="Manage Post">
        <Button type="button" to="/manage/add-post">
          Add Post
        </Button>
      </DashboardHeading>
      <div className="mb-10 flex justify-end">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts && posts.length > 0 && posts.map((post) => renderPost(post))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostManage;
