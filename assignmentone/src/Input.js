import React, { Component, Fragment } from 'react';
import ErrorComponent from './Error';

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

    let arrayInput = data.split(',');

    arrayInput = arrayInput.map(data => {
      if(data.trim()){
        return data.trim();
      }
    }).filter(element => element);

    let isValid = true;
    arrayInput.forEach(inputElement => {
      if(isNaN(inputElement)){
        let range = inputElement.split('-');
        range = range.map(element => element.trim());
        if(!( range.length === 2 && 
          ( ( Number(range[0]) < Number(range[1]) ) || 
            ( Number(range[0]) === Number(range[1]) )  
          )
        )) {
          isValid = false
        }
      }
    })

    return isValid
  }

  handleClick = () => {
    const { inputValue } = this.state
    const { updateArray } = this.props;

    if(!inputValue.trim()){
      this.setState({
        error : 'Empty Input!'
      })
      updateArray([]);
      return;
    }
    const isValid = this.checkIfValidInput(inputValue);
    if(!isValid){
      this.setState({
        error : 'Invalid input, try removing extra white spaces or give proper range or remove special characters/alphabets'
      })
      updateArray([]);
      return;
    }

    // array is Valid, update in parent component!
    updateArray(inputValue.split(','));
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
          error && <ErrorComponent message={error}/>
        }
      </Fragment>
    );
  }
}

export default InputComponent;
