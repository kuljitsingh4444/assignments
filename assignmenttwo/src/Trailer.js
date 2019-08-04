import React, { Component, Fragment } from 'react';
import './Trailer.css';
import ReactPlayer from 'react-player';

class Trailer extends Component {

	constructor(props){
		super(props);
		this.trailer = React.createRef();
		this.isPaused = false;
		this.state = {
			isPaused : false
		}
	}

	componentDidMount(){
		const { playedSeconds, isTrailerPaused } = this.props;
		if(playedSeconds && !isTrailerPaused){
			this.trailer.current.seekTo(playedSeconds, 'seconds');
		}
		if(playedSeconds && isTrailerPaused){
			this.setState({
				isPaused : true
			})
		}
	}
	
	handleProgress = (event) => {
		const { updatePlayTime } = this.props;
		updatePlayTime(event.playedSeconds, this.isPaused);
	}

	handleStart = () => {
	const { playedSeconds, isTrailerPaused } = this.props;
		if(playedSeconds && isTrailerPaused) {
			this.trailer.current.seekTo(playedSeconds, 'seconds');
		}
	}	
	
	handlePlay = () => {
		this.isPaused = false;
	}

	handlePause = () => {
		this.isPaused = true;
	}

  render(){
		const { trailerLink } = this.props;
		const { isPaused } = this.state;
    return(
      <div className='trailer-main-container'>
   			<ReactPlayer width={'45vw'} className='player' onStart={this.handleStart} progressInterval={0} onPause={this.handlePause} onPlay={this.handlePlay} ref={this.trailer} onProgress={this.handleProgress} url={trailerLink} playing={!isPaused} />
				 <div className='trailer-info-container'>
					 INFO HERE
				 </div>
      </div>
    );
  }
}

export default Trailer;
