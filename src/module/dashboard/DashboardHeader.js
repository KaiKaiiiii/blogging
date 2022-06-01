import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/button/Button";
import { useAuth } from "../../context/AuthContext";
import { auth, db } from "../../firebase/firebaseConfig";

const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;

const DashboardHeader = () => {
  const [user, setUser] = useAuth();
  const [cookies, setCookie] = useCookies(["userId", "userInfo"]);
  const [userDetail, setUserDetail] = useState([]);
  useEffect(() => {
    if (!user) return;
    async function getUser() {
      const singleDoc = await getDoc(doc(db, "users", user.uid));
      setUserDetail(singleDoc.data());
    }
    getUser();
  }, [user]);

  const handleLogout = () => {
    setTimeout(() => {
      setCookie("userId", "");
      setCookie("userInfo", "");
      setUser(null);
      signOut(auth);
    }, 1000);
  };
  return (
    <DashboardHeaderStyles>
      <Button
        className="header-button"
        height="52px"
        onClick={handleLogout}
        to="/"
      >
        Log out
      </Button>
      <div className="header-avatar">
        <NavLink to={`/profile/${user?.uid}`}>
          {userDetail !== "undefined" && userDetail.length !== 0 && (
            <img
              src={
                userDetail.avatar ||
                "https://i.pinimg.com/280x280_RS/2e/45/66/2e4566fd829bcf9eb11ccdb5f252b02f.jpg"
              }
              alt=""
            />
          )}
        </NavLink>
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
