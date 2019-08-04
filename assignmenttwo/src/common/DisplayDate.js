import React from 'react';
import '../List.css';
import moment from 'moment';

export default function Date(props){
    const showDispalyMonth = new moment(props.ShowDate).format('MMM');
    const showDisplayYear = new moment(props.ShowDate).format('YYYY');
    return (
        <div style={{cursor:'pointer'}}>
            <div className='month'>{showDispalyMonth}</div>
            <div className='year'>{showDisplayYear}</div>
        </div>
    );
}