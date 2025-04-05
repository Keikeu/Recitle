import React from "react";
import T from "prop-types";
import OptionListItem from "./OptionListItem.js";

function OptionList({ options = [], onChange, selectedOptionId, closePopover }) {
  return (
    <>
      {options.map((option, i) => (
        <OptionListItem
          key={option.id || option.label || i}
          {...option}
          onClick={(e, id) => {
            if (onChange) onChange(id);
            closePopover(e);
          }}
          isActive={option.id === selectedOptionId}
        />
      ))}
      {options.length === 0 && <OptionListItem label="No matches found" disabled />}
    </>
  );
}

OptionList.propTypes = {
  options: T.arrayOf(T.object).isRequired,
  onChange: T.func,
  selectedOptionId: T.oneOfType([T.string, T.number]),
  closePopover: T.func,
};

export default OptionList;
