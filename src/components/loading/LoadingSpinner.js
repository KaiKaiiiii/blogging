import React from "react";
import styled from "styled-components";

const Loading = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border-radius: 100rem;
  border: ${(props) => props.borderSize} solid white;
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  animation: spinner infinite 1s;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = ({ size = "32px", borderSize = "4px" }) => {
  return <Loading size={size} borderSize={borderSize}></Loading>;
};

export default LoadingSpinner;
