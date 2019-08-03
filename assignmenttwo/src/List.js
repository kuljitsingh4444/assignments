import React, { Component, Fragment } from 'react';
import Trailer from './Trailer';
import './List.css';

let rowCount = 0;
let trailerPerRow = 0;

class List extends Component {

	constructor(props){
		super(props);
		this.state = {
			trailerDisplayList : {}
		}
		this.trailerContainer = React.createRef();
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
			trailerPerRow = newTrailerPerRow;
			const { trailerList } = this.props;
			let trailerListCopy = {...trailerList}
			this.setRowCount(trailerListCopy)
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

	playTrailerRequest = (trailerKey) => {
		const { trailerDisplayList } = this.state;
		this.setState({
			trailerAtRow : trailerDisplayList[trailerKey].rowCount
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
	
  render(){
		const { trailerDisplayList = {}, trailerAtRow } = this.state;
		const trailerListKeys = Object.keys(trailerDisplayList);
		return(
			<div className='trailer-list-container'> 
				{
					trailerListKeys.map((trailer, key) => {
						const showTrailer = trailerDisplayList[trailer].rowCount === trailerAtRow ? true : false;
						const isFirstOfRow = trailerDisplayList[trailer].firstOfRow;
						return (
							<div onClick={() => this.playTrailerRequest(trailer)} key={key} className={this.getClassNames(showTrailer,isFirstOfRow)}>
								{isFirstOfRow && showTrailer && <div ref={this.trailerContainer} className='trailer-container'>
									<Trailer/>
								</div>}
								<img className={showTrailer && isFirstOfRow ? 'trailer-image image-placement' : 'trailer-image'} src={`https://in.bmscdn.com/events/moviecard/${trailer}.jpg`}/>
							</div>
						);
					})
				}
    	</div>
		);
  }
}

export default List;
