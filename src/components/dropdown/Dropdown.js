import React, { useState } from "react";
import { DropdownProvider, useDropdown } from "./dropdown-context";
import List from "./List";
import Select from "./Select";

const Dropdown = ({ children, placeholder, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">
        <Select placeholder={placeholder}></Select>
        <List>{children}</List>
      </div>
    </DropdownProvider>
  );
};

export default Dropdown;
