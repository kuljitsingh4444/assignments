import React from 'react';
import '../List.css';
import like from '../like.png';

export default function Ratings(props){
    const  { wtsCount } = props.ratings;
    const { wtsPerc } = props.ratings;
    return (
        <React.Fragment>
            <div className='rating-perc'>
                <img className='like-png' src={like}/>
                <div className='wts-perc'>{wtsPerc}%</div>
            </div>
            <div className='wts-count'>{wtsCount} votes</div>
        </React.Fragment>
    );
}