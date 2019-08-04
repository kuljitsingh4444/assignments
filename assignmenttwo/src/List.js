import React, { Component, Fragment } from 'react';
import Trailer from './Trailer';
import play from './play.png';
import './List.css';
import Date from './common/DisplayDate';
import Ratings from './common/Ratings';

let rowCount = 0;
let trailerPerRow = 0;

class List extends Component {

	constructor(props){
		super(props);
		this.state = {
			trailerDisplayList : {},
			selectedTrailerKey : ''
		}
		this.trailerContainer = React.createRef();
		this.playedSeconds = 0;
		this.isTrailerPaused = false;
	}

	handleWindow = () => {
		const width = document.documentElement.clientWidth;
		let newTrailerPerRow = 0;
		if(width <= 510) {
			newTrailerPerRow = 2;
		}else if(width <= 680) {
			newTrailerPerRow = 3;
		}else if(width <= 820) {
			newTrailerPerRow = 4;
		} else if(width <= 1000){
			newTrailerPerRow =  5;
		} else {
			newTrailerPerRow =  6;
		}
		if(newTrailerPerRow !== trailerPerRow){
			const { selectedTrailerKey } = this.state;
			trailerPerRow = newTrailerPerRow;
			const { trailerList } = this.props;
			let trailerListCopy = {...trailerList}
			this.setRowCount(trailerListCopy)
			if(selectedTrailerKey) {
				this.playTrailerRequest(selectedTrailerKey, false)
			}
		}
	}

	componentDidMount(){
		const { trailerList } = this.props;
		let trailerListCopy = {...trailerList}
		this.setRowCount(trailerListCopy)
		this.handleWindow();
		window.addEventListener("resize", this.handleWindow);
	}

	componentWillUnmount(){
		window.removeEventListener("resize", this.handleWindow);
	}

	setRowCount = (trailerList) => {
		const trailerKeys = Object.keys(trailerList);
		trailerKeys.forEach((trailer,index) => {
			const isFirstTrailerOfRow = (index % trailerPerRow === 0);
			if(isFirstTrailerOfRow) {
				rowCount++;
			}
			trailerList[trailer].rowCount = rowCount
			trailerList[trailer].firstOfRow = isFirstTrailerOfRow
		})
		this.setState({
			trailerDisplayList : trailerList
		})
	}

	playTrailerRequest = (trailerKey, resetPlayData) => {
		const { trailerDisplayList } = this.state;
		if(resetPlayData) {
			this.isTrailerPaused = false;
			this.playedSeconds = 0;	
		}
		this.setState({
			selectedTrailerKey : trailerKey,
			trailerAtRow : trailerDisplayList[trailerKey].rowCount,
		})
		setTimeout(()=>{
			if(this.trailerContainer.current) {
				this.trailerContainer.current.scrollIntoView({
					behavior: "smooth",
					block: "start"
				});
			}
		},100)
	}

	getClassNames = (showTrailer, isFirstOfRow) => {
		if(isFirstOfRow && showTrailer) {
			return 'trailer-list-item'
		}
		if(showTrailer) {
			return 'trailer-list-item gap-trailer-view'
		} else {
			return 'trailer-list-item'
		}
	}

	getImageClass = (showTrailer, isFirstOfRow, trailer) => {
		const { selectedTrailerKey } = this.state;
		let classList = '';
		if(selectedTrailerKey === trailer) {
			classList = ' border-img';
		}
		if(showTrailer && isFirstOfRow) {
			return 'trailer-image image-placement'+classList
		} else {
			return 'trailer-image'+classList
		}
	}

	updatePlayTime = (playedSeconds, isTrailerPaused) => {
		this.playedSeconds = playedSeconds;
		this.isTrailerPaused = isTrailerPaused;
	}
	
  render(){
		const { trailerDisplayList = {}, trailerAtRow, selectedTrailerKey } = this.state;
		const trailerListKeys = Object.keys(trailerDisplayList);
		return(
			<div className='trailer-list-container'> 
				{
					trailerListKeys.map((trailer, key) => {
						const showTrailer = trailerDisplayList[trailer].rowCount === trailerAtRow ? true : false;
						const isFirstOfRow = trailerDisplayList[trailer].firstOfRow;
						const ShowDate = trailerDisplayList[trailer].ShowDate;
						const ratings = trailerDisplayList[trailer].ratings;
	
						return (
							<div key={key} className={this.getClassNames(showTrailer,isFirstOfRow)}>
								<div className={isFirstOfRow && showTrailer ? 'first-icon-container icon-container':'icon-container'}>
									<img onClick={() => this.playTrailerRequest(trailer,true)} style={trailer === selectedTrailerKey ? {visibility:'hidden'} : {}} className={'play-button'} src={play}/>
									<div onClick={() => this.playTrailerRequest(trailer,true)} className={'display-date'}>
										<Date ShowDate={ShowDate}/>
									</div>
									<div onClick={() => this.playTrailerRequest(trailer,true)} className={'display-ratings'}>
										<Ratings ratings={ratings}/>
									</div>
								</div>
								{isFirstOfRow && showTrailer && <div ref={this.trailerContainer} className='trailer-container'>
									<Trailer trailerInfo={trailerDisplayList[selectedTrailerKey]} isTrailerPaused={this.isTrailerPaused} playedSeconds={this.playedSeconds} updatePlayTime={this.updatePlayTime} />
								</div>}
								<div className={'trailer-image-container'}>
									<img onClick={() => this.playTrailerRequest(trailer,true)} className={this.getImageClass(showTrailer, isFirstOfRow, trailer)} src={`https://in.bmscdn.com/events/moviecard/${trailer}.jpg`}/>	
									<div onClick={() => this.playTrailerRequest(trailer,true)} className={isFirstOfRow && showTrailer ? 'first-name name' : 'name'}>{trailerDisplayList[trailer].EventName}</div>
								</div>
							</div>
						);
					})
				}
    	</div>
		);
  }
}

export default List;
