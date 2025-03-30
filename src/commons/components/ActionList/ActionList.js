import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import ActionListItem from "./ActionListItem.js";

const Box = styled.div``;

function ActionList({ className, actions = [], onClick, closePopover }) {
  return (
    <Box className={className}>
      {actions.map((actionItem, i) => (
        <ActionListItem
          key={actionItem.label || i}
          {...actionItem}
          onClick={id => {
            if (actionItem.onClick) actionItem.onClick(id);
            if (onClick) onClick(id);
            if (closePopover) closePopover();
          }}
        />
      ))}
    </Box>
  );
}

ActionList.propTypes = {
  className: T.string,
  actions: T.arrayOf(T.object).isRequired,
  onClick: T.func,
  closePopover: T.func,
};

export default ActionList;
