import React, { useState } from 'react';
import '../css/dropdown.css'

type Option = {
  value: string;
  label: string;
};

type DropdownMenuProps = {
  selectedOption: Option['value'] | null;
  options: Option[];
  onOptionSelect: (value: Option['value']) => void;
};

function DropdownMenu(props: DropdownMenuProps) {
  const { selectedOption, options, onOptionSelect } = props;

  function handleOptionSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    onOptionSelect(event.target.value);
  }

  return (
    <select value={selectedOption || ''} onChange={handleOptionSelect}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default DropdownMenu;


