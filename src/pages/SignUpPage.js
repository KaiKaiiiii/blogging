import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";
import { IconEyeClose, IconEyeOpen } from "../icon";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import AuthHeader from "../components/authheader/AuthHeader";
import { useAuth } from "../context/AuthContext";
import slugify from "slugify";
import { userRole, userStatus } from "../utils/constants";

const schema = yup.object({
  fullname: yup.string().required("Please enter your fullname"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter your email address"),
  password: yup.string().min(8, "Must be at least 8 characters"),
});

const SignUpPage = () => {
  const [isView, setIsView] = useState(false);
  const [user, setUser] = useAuth();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleSignUp = async (values) => {
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      updateProfile(auth.currentUser, {
        displayName: values.fullname,
      });

      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });

      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullname,
        email: values.email,
        password: values.password,
        username: slugify(values.fullname, { lower: true, replacement: "" }),
        avatar: "",
        role: userRole.USER,
        status: userStatus.ACTIVE,
        createdAt: serverTimestamp(),
      });

      console.log(user);
    } catch (error) {
      console.log(error);
    }

    if (!isSubmitting && isValid) {
      toast.success("Successfully sign up");
      navigate("/");
    }
  };

  useEffect(() => {
    const errorContain = Object.values(errors);
    toast.error(errorContain[0]?.message, {
      pauseOnHover: false,
      autoClose: 1000,
      delay: 500,
    });
  }, [errors]);

  return (
    <AuthHeader>
      <form onSubmit={handleSubmit(handleSignUp)} autoComplete="off">
        <Field>
          <Label htmlFor="fullname">Full Name</Label>
          <Input
            type="text"
            name="fullname"
            placeholder="Enter your full name"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <Input
            type={isView ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            control={control}
          >
            {!isView ? (
              <IconEyeClose onClick={() => setIsView(true)}></IconEyeClose>
            ) : (
              <IconEyeOpen onClick={() => setIsView(false)}></IconEyeOpen>
            )}
          </Input>
        </Field>
        <span className="auth-question">
          Already have an account? <NavLink to={"/sign-in"}>Log in</NavLink>
        </span>
        <Button
          primary
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="mt-10"
        >
          Sign Up
        </Button>
      </form>
    </AuthHeader>
  );
};

export default SignUpPage;
