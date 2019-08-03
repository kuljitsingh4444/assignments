import React, { Component, Fragment } from 'react';
import './List.css';

let rowCount = 0;
class List extends Component {

	constructor(props){
		super(props);
		this.state = {
			trailerDisplayList : {}
		}
	}

	componentDidMount(){
		const { trailerList } = this.props;
		let trailerListCopy = {...trailerList}
		this.setRowCount(trailerListCopy)
	}

	setRowCount = (trailerList) => {
		const trailerKeys = Object.keys(trailerList);
		trailerKeys.forEach((trailer,index) => {
			const isFirstTrailerOfRow = (index % 6 === 0);
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
		console.log(trailerDisplayList[trailerKey].rowCount)
		console.log(trailerDisplayList[trailerKey].firstOfRow)
		this.setState({
			trailerAtRow : trailerDisplayList[trailerKey].rowCount
		})
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
								{isFirstOfRow && showTrailer && <div className='trailer-container'>
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									TRAILER TRAILER TRAILER TRAILER
									

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
