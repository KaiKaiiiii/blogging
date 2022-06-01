import React, { useState } from "react";
import AuthHeader from "../components/authheader/AuthHeader";
import Field from "../components/field/Field";
import Input from "../components/input/Input";
import Label from "../components/label/Label";

import { useForm } from "react-hook-form";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Button from "../components/button/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const SignInPage = () => {
  const [isView, setIsView] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useAuth();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const handleSignIn = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.email) navigate("/");
  }, []);
  return (
    <AuthHeader>
      <form onSubmit={handleSubmit(handleSignIn)}>
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
          Need an account? <NavLink to={"/sign-up"}>Register</NavLink>
        </span>
        <Button
          primary
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthHeader>
  );
};

export default SignInPage;
