import React, { useState, useEffect } from 'react';

const TagInput = ({ currTags, tagType, onChange, currentIdx, currDest }) => {
	const [options, setOptions] = useState([]);
	const [showOptions, setShowOptions] = useState(false);
	const [tags, setTags] = useState(currTags);
	

	// depending on the destination name user chose, fetch the labels applicable for that destination
	const fetchOptions = async () => {
		try {
			if (currDest === "") {
				setShowOptions(false);
				return;
			}
			if (options.length > 0) {
				setShowOptions(!showOptions);
				return;
			}
			const response = await fetch(`http://localhost:4000/get-dest-tags/${currDest}`);
			const data = await response.json();
			console.log(data[tagType].split(", "));
			setOptions(data[tagType].split(", "));
			setShowOptions(true);
		} catch (error) {
			console.error('Error fetching options:', error);
		}
	};





	const handleOptionSelect = (option) => {
		if (!tags.includes(option)) {
			const newTags = [...tags, option]
			setTags(newTags);
			setOptions([]);
			// reflect changes in the homepage cards state
			onChange(currentIdx, newTags);
		}
	};

	const handleRemoveTag = (tagToRemove) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		// reflect changes in the homepage cards state
		onChange(currentIdx, newTags);
		setTags(newTags);
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
				placeholder=""
				className="w-full px-3 py-2 border border-gray-300 rounded"
				onClick={fetchOptions}
				readOnly
			/>
			{options.length > 0 && showOptions && (
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