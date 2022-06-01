import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import ImageUpload from "../../components/uploadimage/ImageUpload";
import { auth, db } from "../../firebase/firebaseConfig";
import DashboardHeading from "../dashboard/DashboardHeading";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { updatePassword } from "firebase/auth";
import DatePicker from "react-date-picker";

const schema = yup.object({
  password: yup
    .string()
    .required("Please enter your password.")
    .min(8, "Your password is too short."),
  confirmPassword: yup
    .string()
    .required("Please confirm your password.")
    .oneOf([yup.ref("password")], "Your passwords do not match."),
});

const UserProfile = () => {
  const [value, onChange] = useState(new Date());

  const { userId } = useParams();
  const [user, setUser] = useState([]);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,

    formState: { isSubmitting, isValid, errors },
  } = useForm({
    mode: "onChange",
    // resolver: yupResolver(schema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      image_name: "",
      avatar: "",
      birthday: "",
      phone: "",
      createdAt: new Date(),
    },
  });

  useEffect(() => {
    if (!errors) return;
    const errorContain = Object?.values(errors);
    toast.error(errorContain[0]?.message, {
      pauseOnHover: false,
      autoClose: 1000,
      delay: 500,
    });
  }, [errors]);

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
  const currentUser = auth.currentUser;

  const handleUpdateUserProfile = async (values) => {
    const { newPassword, confirmPassword, ...others } = values;
    const cloneValues = others;
    cloneValues.password = newPassword;

    try {
      if (cloneValues.newPassword === cloneValues.confirmPassword) {
        await updateDoc(doc(db, "users", userId), {
          ...cloneValues,
        });
        updatePassword(currentUser, cloneValues.password)
          .then(() => {
            console.log("Succesfully");
          })
          .catch((error) => {
            console.log(error);
          });
        console.log(cloneValues);
      }
      toast.success("Success fully update user", {
        pauseOnHover: true,
        autoClose: 1000,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUserProfile)}>
        <div className="text-center mb-10">
          <ImageUpload
            handleDelete={handleDelete}
            image={url}
            progress={progress}
            className="w-[200px] h-[200px] !rounded-full min-h-0 mx-auto"
            onChange={handleGetImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="username">Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="birthday">Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
            {/* <DatePicker onChange={onChange} value={value} locale="vi-VI" /> */}
          </Field>
          <Field>
            <Label htmlFor="phone">Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field htmlFor="email">
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          {/* <Field></Field> */}
        </div>
        <div className="form-layout">
          <Field>
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              control={control}
              name="newPassword"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div>
        <Button kind="primary" className="mx-auto w-[200px]" type="submit">
          Update user
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
