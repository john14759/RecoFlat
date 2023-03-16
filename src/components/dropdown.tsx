import React, { useState, ChangeEvent } from 'react';
import '../css/dropdown.css'

function DropdownButton(props: { handleFlatTypeChange: (value: string) => void }) {
  const [selectedValue, setSelectedValue] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setIsDropdownOpen(false);
    props.handleFlatTypeChange(event.target.value);
  };

  return (
    <button className="dropdown-button" onClick={toggleDropdown}>
      <img src="../../img/dropdownlogo.png" alt="dropdown icon" />
      {isDropdownOpen && (
        <DropdownMenu selectedValue={selectedValue} handleChange={handleChange} />
      )}
    </button>
  );
}

type DropdownMenuProps = {
  selectedValue: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
};

function DropdownMenu({ selectedValue, handleChange }: DropdownMenuProps) {
  return (
    <div className="dropdown-menu">
      <label htmlFor="dropdown"></label>
      <select id="dropdown" value={selectedValue} onChange={handleChange}>
        <option value="3 ROOM">3 room</option>
        <option value="4 ROOM">4 room</option>
        <option value="5 ROOM">5 room</option>
      </select>
    </div>
  );
}

export default DropdownButton;

