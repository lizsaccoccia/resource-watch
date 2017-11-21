import React from 'react';

export default function Dropdown({ open, openDropdown, asyncCloseDropdown }) {
  return (
    <div>

      <button onClick={openDropdown}>
        Open
      </button>

      <button onClick={asyncCloseDropdown}>
        Close
      </button>

      Drop down
      {open && ' open'}
    </div>
  );
}

Dropdown.propTypes = {
};
