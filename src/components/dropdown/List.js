import React from "react";
import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show, setShow } = useDropdown();

  return (
    <div>
      {show && (
        <div
          className="absolute top-full left-0 w-full bg-white shadow-sm"
          onClick={() => {
            setShow(!show);
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default List;
