import React from 'react';
import './App.css';

export default function ResultComponent(props){
	const { array = [], heading = 'Results :', noResultText='no data found' } = props
  return(
		<div>
			{
				array.length > 0 ? 
					<div>
						{heading}
						<div className={'dflex'}>
							{
								array.map((arrayElement,index) => 
									<div key={index} className={'array-element'}>
										{arrayElement}
									</div>
								)
							}
						</div>
					</div>
				:noResultText
        }
		</div>
	);
}