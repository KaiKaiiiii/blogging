import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
const AuthHeaderStyle = styled.section`
  width: 100%;
  min-height: 100vh;
  .heading {
    color: ${(props) => props.theme.primary};
    text-align: center;
    font-weight: 600;
    font-size: 36px;
    margin-bottom: 60px;
  }
  .logo {
    margin: 0 auto 20px;
  }
  .auth-question {
    font-size: 20px;
    & * {
      color: ${(props) => props.theme.primary};
    }
  }
  & form {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
`;
const AuthHeader = ({ children }) => {
  return (
    <AuthHeaderStyle>
      <div className="container">
        <NavLink to="/">
          <img srcSet="/logo.png 3x" alt="" className="logo" />
        </NavLink>
        <h1 className="heading">Monkey Blogging</h1>
        {children}
      </div>
    </AuthHeaderStyle>
  );
};

export default AuthHeader;
