import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import ImageUpload from "../../components/uploadimage/ImageUpload";
import { db } from "../../firebase/firebaseConfig";
import { userRole, userStatus } from "../../utils/constants";
import DashboardHeading from "../dashboard/DashboardHeading";

const UserEdit = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      status: 1,
      role: 3,
      image_name: "",
      avatar: "",
      createdAt: new Date(),
    },
  });

  const handleEditUser = async (values) => {
    const cloneValues = { ...values };
    try {
      await updateDoc(doc(db, "users", userId), {
        ...cloneValues,
      });
      toast.success("Successfully update user");
    } catch (error) {
      console.log(error);
    }
  };

  const watchStatus = watch("status");
  const watchRole = watch("role");

  useEffect(() => {
    async function getData() {
      const colRef = doc(db, "users", userId);
      const singleDoc = await getDoc(colRef);
      setUser(singleDoc?.data());
    }
    getData();
  }, [userId]);

  useEffect(() => {
    reset({
      ...user,
    });
    setUrl(getValues("avatar"));
  }, [user, reset, getValues]);

  const storage = getStorage();
  const handleDelete = () => {
    const desertRef = ref(storage, "images/" + getValues("image_name"));

    deleteObject(desertRef)
      .then(async () => {
        await updateDoc(doc(db, "users", userId), {
          avatar: "",
        });
        // setValue("avatar", "");
        setUrl("");
        setProgress(0);
        console.log("succes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          setValue("avatar", downloadURL);
          setUrl(downloadURL);
          //   setValue("image_url", downloadURL);
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
  return (
    <div>
      <DashboardHeading title="User" desc={`Edit user id - ${userId}`}>
        <Button type="button" to="/manage/user">
          Back to user manage
        </Button>
      </DashboardHeading>

      <form onSubmit={handleSubmit(handleEditUser)}>
        <Field>
          <ImageUpload
            handleDelete={handleDelete}
            image={url}
            progress={progress}
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleGetImage}
          ></ImageUpload>
        </Field>
        <div className="form-layout">
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="status">Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label htmlFor="role">Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>

              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserEdit;
