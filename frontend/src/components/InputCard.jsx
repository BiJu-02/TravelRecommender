import React, { useState } from 'react';
import DestinationInput from './DestinationInput';
import TagInput from './TagInput';

const InputCard = () => {
  const [destination, setDestination] = useState('');
  const [tags1, setTags1] = useState([]);
  const [tags2, setTags2] = useState([]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md w-full">
      <div className="mb-4">
        <label htmlFor="destination" className="block font-bold mb-2">
          Destination
        </label>
        <DestinationInput onChange={setDestination} />
      </div>
      <div className="mb-4">
        <label htmlFor="tags1" className="block font-bold mb-2">
          Tags 1
        </label>
        <TagInput onChange={setTags1} />
      </div>
      <div className="mb-4">
        <label htmlFor="tags2" className="block font-bold mb-2">
          Tags 2
        </label>
        <TagInput onChange={setTags2} />
      </div>
    </div>
  );
};

export default InputCard;