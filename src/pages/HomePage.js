import { signOut } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig";
import Header from "../layout/Header";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";
import HomeNewest from "../module/home/HomeNewest";

const HomePageStyled = styled.div``;
const HomePage = () => {
  const navigate = useNavigate();
  const [user] = useAuth();

  const handleSignout = () => {
    signOut(auth);
  };
  useEffect(() => {}, []);
  return (
    <HomePageStyled>
      <Header></Header>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
    </HomePageStyled>
  );
};

export default HomePage;
