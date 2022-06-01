import { signOut } from "firebase/auth";
import React from "react";
import { useCookies } from "react-cookie";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/button/Button";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig";

const HeaderStyled = styled.div`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 20px;
    &-left {
      gap: 20px;
      display: flex;
      align-items: center;
    }
    &-right {
      gap: 20px;
      display: flex;
      align-items: center;
      justify-items: center;
    }
  }

  .menu {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    & * {
      text-decoration: none;
      color: black;
      font-weight: 600;
    }
  }
  .search {
    position: relative;
    &-input {
      padding: 12px 40px 12px 12px;
      border: 2px solid #ccc;
      border-radius: 8px;
    }
    &-icon {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  .user-display {
    color: ${(props) => props.theme.primary};
    text-align: center;
  }
`;
const linkList = [
  {
    to: "/#",
    title: "Home",
  },
  {
    to: "/blog",
    title: "Blog",
  },
  {
    to: "/contact",
    title: "Contact",
  },
];

const Header = () => {
  const navigate = useNavigate();

  const [user] = useAuth();

  return (
    <HeaderStyled>
      <div className="container">
        <div className="header">
          <div className="header-left">
            <NavLink to="/">
              <img srcSet="/logo.png 4x" alt="" />
            </NavLink>
            <ul className="menu">
              {linkList.map((link) => {
                return (
                  <NavLink key={link.title} to={link.to}>
                    {link.title}
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <div className="header-right">
            <div className="search">
              <input
                type="text"
                className="search-input"
                placeholder="Search posts..."
              />
              <svg
                className="search-icon"
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            {user ? (
              <Button type="button" to="/dashboard">
                Dashboard
              </Button>
            ) : (
              <Button
                primary
                type="button"
                height="52px"
                to="/sign-in "
                onClick={() => {
                  navigate("/sign-in");
                }}
              >
                Log in
              </Button>
            )}
          </div>
        </div>
      </div>
    </HeaderStyled>
  );
};

export default Header;
