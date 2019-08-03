import React, { Component, Fragment } from 'react';
import './List.css';

class List extends Component {
  render(){
    const { trailerList } = this.props;
    console.log(trailerList)
    return(
      <div>
        LIST HERE!
      </div>
    );
  }
}

export default List;
