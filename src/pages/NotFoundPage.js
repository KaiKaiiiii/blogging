import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyled = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  height: 100vh;

  .heading2 {
    font-size: 50px;
    font-weight: bold;
    text-align: center;
  }
  .link {
    font-size: 20px;
    color: ${(props) => props.theme.primary};
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyled>
      <NavLink to="/">
        <img srcSet="/logo.png 2x" alt="" />
      </NavLink>
      <h2 className="heading2">
        Page not Found <br /> Oops !!! Error occurs
      </h2>
      <NavLink to="/" className={"link"}>
        Back to homepage
      </NavLink>
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;
