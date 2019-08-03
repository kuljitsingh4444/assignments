import React, { Component, Fragment } from 'react';
import './List.css';

let rowCount = 0;
class List extends Component {

	constructor(props){
		super(props);
		this.state = {
			trailerDisplayList : []
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
			if(index % 6 === 0) {
				rowCount++;
			}
			trailerList[trailer].rowCount = rowCount
		})
		this.setState({
			trailerDisplayList : trailerList
		})
	}

	playTrailerRequest = (trailerKey) => {
		const { trailerDisplayList } = this.state;
		console.log(trailerDisplayList[trailerKey].rowCount)
	}
	
  render(){
		const { trailerList } = this.props;
		const { trailerDisplayList = [] } = this.state;
		console.log(trailerDisplayList)
		const trailerListKeys = Object.keys(trailerList);
		return(
			<div className='trailer-list-container'> 
				{
					trailerListKeys.map((trailer, key) => {
						return (
							<div onClick={() => this.playTrailerRequest(trailer)} key={key} className='trailer-list-item'>
								<img className='trailer-image' src={`https://in.bmscdn.com/events/moviecard/${trailer}.jpg`}/>
							</div>
						);
					})
				}
    	</div>
		);
  }
}

export default List;
