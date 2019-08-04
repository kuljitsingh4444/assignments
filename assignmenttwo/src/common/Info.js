import React from 'react';
import '../List.css';
import Info from '../info.png';

export default function Date(props){
    return (
        <div className='suggestion'>
            <div style={{border:`1px solid ${props.color}`, height : '20px', width :'20px'}} className='information-container'>
                <img className='information-icon' src={Info}/>
            </div>
            <div style={{ color:props.color, fontSize : 10, marginTop: 5 }}>{props.text}</div>
            <div style={{color : props.color, fontSize : 10, marginTop: 5}}>{`(${props.value})`}</div>
        </div>
    );
}