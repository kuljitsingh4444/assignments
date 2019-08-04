import React, { Component, Fragment } from 'react';
import './Header.css';
import ReactPlayer from 'react-player'

class Trailer extends Component {
  render(){
		const { trailerLink } = this.props;
    return(
      <div style={{position:'absolute'}}>
   			<ReactPlayer url={trailerLink} playing />
      </div>
    );
  }
}

export default Trailer;
