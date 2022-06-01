import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Dropdown from "../../components/dropdown/Dropdown";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ImageUpload from "../../components/uploadimage/ImageUpload";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Option from "../../components/dropdown/Option";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import slugify from "slugify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Toggle from "../../components/toggle/Toggle";
import DashboardHeading from "../dashboard/DashboardHeading";
import { postStatus } from "../../utils/constants";

const PostAddNewStyles = styled.div``;
const schema = yup
  .object({
    title: yup.string().required("Enter your title"),
    slug: yup.string("Enter your slug"),
    author: yup.string("Enter author"),
    status: yup.mixed().oneOf([1, 2, 3]).required("Please choose form status"),
  })
  .required();
const PostAddNew = () => {
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      author: "",
      status: 1,
      category: {},
      user: {},
      image_name: "",
      image_url: "",
      hot: false,
    },
  });

  //   const { handleDelete, handleUploadImage, handleGetImage, progress, url } =
  //     useFirebaseImage(setValue, getValues);
  const storage = getStorage();

  const [user] = useAuth();
  const [categories, setCategories] = useState([]);
  const [placeholder, setPlaceholder] = useState("Please choose your category");
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");
  const [on, setOn] = useState(false);
  const navigate = useNavigate();

  const handleUploadImage = (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressBar =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressBar);

        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
          setValue("image_url", downloadURL);
        });
      }
    );
  };

  const handleGetImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const handleDelete = () => {
    const desertRef = ref(storage, "images/" + getValues("image_name"));

    deleteObject(desertRef)
      .then(() => {
        setUrl("");
        setProgress(0);
        console.log("succes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddPost = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(cloneValues.title || cloneValues.slug, {
      lower: true,
    });
    cloneValues.author = cloneValues?.user?.username || cloneValues.author;
    try {
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...cloneValues,
        hot: on,
        userId: user.uid,
        timeStamp: serverTimestamp(),
      });
      toast.success("New post succesfully uploaded", {
        pauseOnHover: false,
        autoClose: 500,
      });

      setUrl("");
      setPlaceholder("Please choose your category");
      setProgress(0);
      setOn(false);

      console.log(cloneValues);
    } catch (error) {
      console.log(error);
    } finally {
      reset({
        title: "",
        slug: "",
        author: "",
        status: 1,
        category: {},
        image_name: "",
        image_url: "",
        hot: false,
      });
    }
  };

  const handleToggle = () => {
    setOn(!on);
  };

  useEffect(() => {
    const errorContain = Object.values(errors);
    toast.error(errorContain[0]?.message, {
      pauseOnHover: false,
      autoClose: 500,
    });
  }, [errors]);

  useEffect(() => {
    async function getCategories() {
      const result = [];
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        result.push({ id: doc.id, ...doc.data() });
      });
      setCategories(result);
    }
    getCategories();
  }, []);

  useEffect(() => {
    if (!user) return;
    async function getUserDetail() {
      const colRef = doc(db, "users", user.uid);
      const singleDoc = await getDoc(colRef);
      console.log(singleDoc.data());
      setValue("user", {
        id: user.uid,
        ...singleDoc.data(),
      });
    }
    getUserDetail();
  }, [user]);

  const handleSelectCategory = (item) => {
    setPlaceholder(item.name);
    const categoryId = item.id;

    async function getCategoryDetail() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);

      setValue("category", {
        id: singleDoc.id,
        ...singleDoc.data(),
      });
    }
    getCategoryDetail();
  };

  const watchStatus = watch("status");

  return (
    <PostAddNewStyles>
      <DashboardHeading title="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddPost)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label htmlFor="author">Author</Label>
            <Input
              control={control}
              placeholder="Find the author"
              type="text"
              name="author"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="category">Category</Label>
            <Dropdown placeholder={placeholder}>
              {categories &&
                categories.length > 0 &&
                categories.map((item) => {
                  return (
                    <Option
                      key={item.id}
                      onClick={() => handleSelectCategory(item)}
                    >
                      {item.name}
                    </Option>
                  );
                })}
            </Dropdown>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label htmlFor="image">Image</Label>
            <ImageUpload
              handleDelete={handleDelete}
              image={url}
              progress={progress}
              className="h-[200px]"
              onChange={handleGetImage}
            ></ImageUpload>
          </Field>
          <div className="flex flex-col gap-5">
            <Field>
              <Label htmlFor="status">Status</Label>
              <div className="flex items-center gap-x-5">
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.APPROVED}
                  value={postStatus.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.PENDING}
                  value={postStatus.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  name="status"
                  control={control}
                  checked={Number(watchStatus) === postStatus.REJECTED}
                  value={postStatus.REJECTED}
                >
                  Reject
                </Radio>
              </div>
            </Field>
            <Field>
              <Label htmlFor="hot">Hot</Label>
              <Toggle on={on} onClick={handleToggle}></Toggle>
            </Field>
          </div>
        </div>
        <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
