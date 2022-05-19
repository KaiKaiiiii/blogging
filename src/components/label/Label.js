import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelInput = styled.label`
  color: ${(props) => props.theme.grayDark};
  cursor: pointer;
  font-weight: 600;
`;
const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelInput htmlFor={htmlFor} {...props}>
      {children}
    </LabelInput>
  );
};

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Label;
