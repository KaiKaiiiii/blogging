import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const FieldInput = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  align-items: flex-start;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Field = ({ children }) => {
  return <FieldInput>{children}</FieldInput>;
};

Field.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Field;
