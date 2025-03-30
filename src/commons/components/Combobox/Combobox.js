import React, { useMemo, useState } from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import TextInput from "commons/components/TextInput";
import Popover from "commons/components/Popover";
import { caseInsensitiveCompare } from "commons/util/helpers";
import OptionList from "../OptionList";

const Box = styled.div``;

function Combobox({ className, label, placeholder, value, onChange, options = [], ...rest }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const selectedItemLabel = options.find(el => el.id === value)?.label || "";

  const filteredOptions = useMemo(() => {
    if (!searchPhrase) {
      return options;
    }
    return options.filter(el => caseInsensitiveCompare(el.label, searchPhrase));
  }, [searchPhrase, options]);

  return (
    <Box className={className}>
      <Popover
        trigger={
          <TextInput
            value={selectedItemLabel || searchPhrase}
            onChange={setSearchPhrase}
            placeholder={placeholder}
            label={label}
            rightIcon="arrow_drop_down"
            {...rest}
          />
        }
        content={closePopover => (
          <OptionList options={filteredOptions} selectedOptionId={0} onChange={onChange} closePopover={closePopover} />
        )}
        contentStyles={{
          maxHeight: "400px",
          overflow: "auto",
        }}
        isFullWidth
      />
    </Box>
  );
}

Combobox.propTypes = {
  className: T.string,
  label: T.string,
  placeholder: T.string,
  options: T.array,
  onChange: T.func,
  value: T.string,
};

export default Combobox;
