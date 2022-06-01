import React from "react";

const FieldCheckboxes = ({ children, ...props }) => {
  return (
    <div className="flex flex-wrap gap-5 " {...props}>
      {children}
    </div>
  );
};

export default FieldCheckboxes;
