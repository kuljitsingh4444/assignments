import React, { Component, Fragment } from 'react';
import Input from './Input';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      existingArray : [7000,7001,7002,7003,7004,7005]
    }
  }
  
  render(){
    const { existingArray } = this.state;
    return (
      <Fragment>
        <div>
          <div>
            Existing Array of elements : 
          </div>
          <div>
            {existingArray.map(arrayElement => arrayElement+' ')}
          </div>
        </div>
        <Input/>
      </Fragment>
    );
  }
}

export default App;
