import React from 'react';
import './App.css';

export default function ErrorComponent(props){
  return(
		<div className={'error-block'}>
			{props.message}
		</div>
	);
}