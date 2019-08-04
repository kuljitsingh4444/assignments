import React, { Component, Fragment } from 'react';
import './Trailer.css';
import ReactPlayer from 'react-player';
import like from './like.png';
import calendar from './calendar.png';
import moment from 'moment';
import Info from './common/Info';

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
		const { trailerInfo } = this.props;
		const { isPaused } = this.state;
    return(
      <div>
				<div className='backgorund'>
					<img className='sel-img' src={`https://in.bmscdn.com/events/moviecard/${trailerInfo.EventCode}.jpg`}/>
				</div>
				<div className='trailer-main-container'>
					<ReactPlayer width={'46.5vw'} className='player' onStart={this.handleStart} progressInterval={0} onPause={this.handlePause} onPlay={this.handlePlay} ref={this.trailer} onProgress={this.handleProgress} url={trailerInfo.TrailerURL} playing={!isPaused} />		
					<div className='trailer-info-container'>
						<div>
							<div className='title'>{trailerInfo.EventTitle}</div>
							<div className='language'>{trailerInfo.EventLanguage}</div>
							<div className='tag-content'>
								{
									trailerInfo.EventGenre.split('|').map(genre => {
										return (
											<div className='tag'>{genre}</div>
										);
									})
								}
							</div>
							<div className='overlay'>
								<div className='rating-info'>
									<img className='img-like' src={like}/>
									<div className='rating-detail'>
										<div className='rating-perc'>{trailerInfo.ratings.wtsPerc} %</div>
										<div className='rating-count'>{trailerInfo.ratings.wtsCount} votes</div>
									</div>
								</div>
								<div className='rating-info'>
									<img className='img-like' src={calendar}/>
									<div className='rating-detail'>
										<div className='rating-perc'>{new moment(trailerInfo.ShowDate).format('MMM')}</div>
										<div className='rating-count'>{new moment(trailerInfo.ShowDate).format('YYYY')}</div>
									</div>
								</div>
							</div>
							<div className='movie-desc'>
									Watch this movie in 3D, 4D. Make sure to rate us in the below section.
									Watch this movie in 3D, 4D. Make sure to rate us in the below section.
								</div>
							</div>
							<div className='feedback-container'>
								<div><Info value={trailerInfo.ratings.wtsCount} text='WILL WATCH' color='#64C593'/></div>
								<div><Info value={trailerInfo.ratings.maybe} text='MAYBE' color='yellow'/></div>
								<div><Info value={trailerInfo.ratings.dwtsCount} text='WONT WATCH' color='#C60000'/></div>
							</div>
					</div>
				</div>
      </div>
    );
  }
}

export default Trailer;
