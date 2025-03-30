import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import TextInput from "commons/components/TextInput";
import Popover from "commons/components/Popover";
import OptionList from "commons/components/OptionList";

const Box = styled.div``;

function SelectInput({ className, label, placeholder, value, onChange, options = [], errorMessage }) {
  const selectedItemLabel = options.find(el => el.id === value)?.label || "";

  return (
    <Box className={className}>
      <Popover
        trigger={
          <TextInput
            value={selectedItemLabel}
            placeholder={placeholder}
            label={label}
            rightIcon="arrow_drop_down"
            errorMessage={errorMessage}
            isShell
          />
        }
        content={closePopover => (
          <OptionList options={options} selectedOptionId={value} onChange={onChange} closePopover={closePopover} />
        )}
        isFullWidth
        isTriggerTabbable
      />
    </Box>
  );
}

SelectInput.propTypes = {
  className: T.string,
  label: T.string,
  placeholder: T.string,
  value: T.string,
  onChange: T.func,
  options: T.array,
  errorMessage: T.string,
};

export default SelectInput;
