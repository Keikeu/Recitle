import React, { forwardRef } from "react";
import T from "prop-types";
import InputBase from "../InputBase";

// eslint-disable-next-line react/display-name
const TextInput = forwardRef(({ className, value, onChange, ...inputProps }, ref) => {
  return <InputBase className={className} type="text" value={value} onChange={onChange} ref={ref} {...inputProps} />;
});

TextInput.propTypes = {
  className: T.string,
  value: T.string.isRequired,
  onChange: T.func,
};

export default TextInput;
