import React, { useState } from 'react';

const TagInput = ({ onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);

  const fetchOptions = async () => {
    try {
      const response = await fetch(`/api/destinations?q=${inputValue}`);
      const data = await response.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() !== '') {
      fetchOptions();
    } else {
      setOptions([]);
    }
  };

  const handleOptionSelect = (option) => {
    setTags([...tags, option]);
    setInputValue('');
    setOptions([]);
    onChange(tags);
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap items-center mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white px-3 py-1 rounded-full mr-2 mb-2 flex items-center"
          >
            <span>{tag}</span>
            <button
              onClick={() => handleRemoveTag(tag)}
              className="ml-2 text-white hover:text-gray-300"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
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

export default TagInput;