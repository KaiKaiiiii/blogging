import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = (props) => {
  const { show, setShow } = useDropdown();
  const { onClick } = props;
  const handleClick = () => {
    onClick();
    setShow(!show);
  };
  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
