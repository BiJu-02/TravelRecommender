import React from 'react';

const RecomCard = ({ data }) => {
	return (
		<div className="bg-white rounded-lg shadow-xl p-4 flex flex-col gap-4 h-[250px]">
			<div className='flex gap-2 w-full justify-center'>
				<h4 className='text-lg font-bold'>Destination Name :</h4>
				<h3 className="text-lg font-bold mb-2">{data.destination_name}</h3>
			</div>
			<div className='flex flex-col gap-2'>
				<h4 className='text-lg font-bold'>Destination Aspects :</h4>
				{
					data.destination_type.map((d, index) =>
					(
						<p className="text-gray-700" key={index}>{d}</p>
					))
				}

			</div>

			<div className='flex flex-col gap-2'>
				<h4 className='text-lg font-bold'>Activities :</h4>

				{
					data.activities.map((d, index) =>
					(
						<p className="text-gray-700" key={index}>{d}</p>
					))
				}

			</div>
		</div>
	);
};

export default RecomCard;