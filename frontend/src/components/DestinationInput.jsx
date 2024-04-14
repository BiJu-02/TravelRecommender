import React, { useState, useEffect } from 'react';

const DestinationInput = ({ onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [optionFixed, setOptionFixed] = useState(false);

  useEffect(() => {
    if (optionFixed) { return; }
    const fetchOptions = async () => {
      try {
        const response = await fetch(`http://localhost:4000/get-dest-name?input=${inputValue}`);
        const data = await response.json();
        setOptions(data.desination_list);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    if (inputValue.trim() !== '') {
      fetchOptions();
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOptionSelect = (option) => {
    onChange(option);
    setInputValue(option);
    setOptionFixed(true);
    setOptions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter destination"
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
      {options.length > 0 && (
        <ul className="bg-white border border-gray-300 rounded mt-2">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleOptionSelect(option)}
              className="px-3 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DestinationInput;