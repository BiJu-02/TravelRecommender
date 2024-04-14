import React, { useState } from 'react';
import DestinationInput from './DestinationInput';
import TagInput from './TagInput';

const InputCard = ({ destinationName, destinationType, activities, currentIdx, updateFuncs, onDelete }) => {
  const [destination, setDestination] = useState(destinationName);
  const [tags1, setTags1] = useState(destinationType);
  const [tags2, setTags2] = useState(activities);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-md w-full relative">
      <button
        onClick={onDelete}
        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
        aria-label="Close"
      >
        X
      </button>
      <div className="mb-4">
        <label htmlFor="destination" className="block font-bold mb-2">
          Favourite destination name
        </label>
        <DestinationInput destName={destination} currentIdx={currentIdx} onChange={updateFuncs[0]} />
      </div>
      <div className="mb-4">
        <label htmlFor="tags1" className="block font-bold mb-2">
          Aspects you liked
        </label>
        <TagInput currTags={tags1} tagType={"destination_type"} onChange={updateFuncs[1]} currentIdx={currentIdx} currDest={destinationName} />
      </div>
      <div className="mb-4">
        <label htmlFor="tags2" className="block font-bold mb-2">
          Activities you enjoyed
        </label>
        <TagInput currTags={tags2} tagType={"activities"} onChange={updateFuncs[2]} currentIdx={currentIdx} currDest={destinationName} />
      </div>
    </div>
  );
};

export default InputCard;
