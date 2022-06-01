import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import PropTypes from "prop-types";

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  .input {
    width: 100%;
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all 0.2s linear;
  }
  .input:focus {
    border: 1px solid ${(props) => props.theme.primary};
    background-color: white;
  }
  .input::-webkit-input-placeholder {
    color: ${(props) => props.theme.grayDark};
    opacity: 0.5;
  }
  .input::-moz-input-placeholder {
    color: ${(props) => props.theme.grayDark};
    opacity: 0.5;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;
const Input = ({
  name,
  control,
  type = "text",
  children,

  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });

  return (
    <InputStyles>
      <input type={type} id={name} {...field} {...props} className="input" />
      {{ children } ? <div className="input-icon">{children}</div> : null}
    </InputStyles>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  children: PropTypes.node,
};
export default Input;
