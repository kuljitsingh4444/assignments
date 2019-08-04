import React, { Component, Fragment } from 'react';
import './Trailer.css';
import ReactPlayer from 'react-player'

class Trailer extends Component {
  render(){
		const { trailerLink } = this.props;
    return(
      <div className='trailer-main-container'>
   			<ReactPlayer url={trailerLink} playing />
				 <div className='trailer-info-container'>
					 INFO HERE
				 </div>
      </div>
    );
  }
}

export default Trailer;
