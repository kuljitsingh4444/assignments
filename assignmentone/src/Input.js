import React, { Component, Fragment } from 'react';
import './App.css';

class InputComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
      inputValue : '',
      error : ''
    }
  }

  emptyNumberCheck = (data) => {
    if(data.includes(',,')){
      this.setState({
        error : 'Error! Missed some numbers'
      })
      return true;
    }
    return false
  }

  checkIfValidInput = (data) => {
    const emptyNumberError = this.emptyNumberCheck(data)
    if(emptyNumberError) {
      return false;
    }
    const arrayInput = data.split(',')
    //use split and do trur validtion (use length), anuthing else if false.!!!! 
    console.log(arrayInput);
    return true
  }

  handleClick = () => {
    const { inputValue } = this.state
    if(!inputValue.trim()){
      this.setState({
        error : 'Empty Input!'
      })
    }
    const isValid  = this.checkIfValidInput(inputValue);
  }

  handeChange = (e) => {
    const value = e.target.value;
    this.setState({
      inputValue: value,
      error : ''
    })
  }

  render(){
    const { inputValue, error } =  this.state;
    return (
      <Fragment>
        <div>
          <input 
            value={inputValue} 
            onChange={this.handeChange} 
            placeholder='enter range, numbers'
          ></input>
          <button 
            onClick={this.handleClick}>
            Click
          </button>
        </div>
        {
          error && <div>{error}</div>
        }
      </Fragment>
    );
  }
}

export default InputComponent;
