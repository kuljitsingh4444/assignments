import React, { Component, Fragment } from 'react';
import Input from './Input';
import Result from './Result';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      existingArray : [7000,7001,7002,7003,7004,7005],
      duplicates : [],
      showResults : false,
      distinctElements : []
    }
  }

  updateArray = (array) => {
    if(array.length) {
      const duplicates = this.updateDuplicates(array);
      this.updateDistinctElements(array, duplicates);
    } else { 
      this.setState({
        showResults : false
      })
    }
  }

  updateDistinctElements = (array, duplicates) => {
    let distinctElements = [];
    const { existingArray } = this.state;
    existingArray.forEach(existingArrayElement => {
      if(!duplicates.includes(existingArrayElement)) {
        distinctElements.push(existingArrayElement);
      }
    })

    array.forEach(arrayElement => {
      const element = Number(arrayElement);
      if(!isNaN(element)) {
        //number case
        if(!duplicates.includes(element)) {
          distinctElements.push(element);
        }
      } else {
        //range case
        const rangeArray = String(arrayElement).split('-');
        const lowerLimit = Number(rangeArray[0]);
        const upperLimit = Number(rangeArray[1]);
        for( let i = lowerLimit+1 ; i < upperLimit; i++ ) {
          if(!duplicates.includes(i)){
            distinctElements.push(i);
          }
        }
      }
    })
    this.setState({
      distinctElements : distinctElements,
      showResults : true
    })
  }

  updateDuplicates = (array) => {

    const { existingArray } = this.state;
    let duplicates = [];

    array.forEach(ele=> {
      const element = Number(ele);
      if(!isNaN(element)) {
        //number case
        if(existingArray.includes(element) && !duplicates.includes(element)) {
          duplicates.push(element)
        }
      } else {
        //range case
        const rangeArray = String(ele).split('-');
        const lowerLimit = Number(rangeArray[0]);
        const upperLimit = Number(rangeArray[1]);
        for( let i = lowerLimit+1 ; i < upperLimit; i++ ) {
          if(existingArray.includes(i) && !duplicates.includes(i)){
            duplicates.push(i)
          }
        }
      }
    })

    this.setState({
      duplicates : duplicates
    })
    return duplicates
  }
  
  render(){
    const { existingArray, duplicates, showResults, distinctElements } = this.state;
    return (
      <Fragment>
        <div>
          <div>
            Existing Array of elements : 
          </div>
          <div className={'dflex'}>
            {
              existingArray.map((arrayElement,index) => 
              <div key={index} className={'array-element'}>
                {arrayElement}
              </div>)
            }
          </div>
        </div>
        <Input updateArray={this.updateArray}/>
        {
          showResults &&
          <div>
            <Result array={duplicates} heading={'Duplicates :'} noResultText={'No Duplicates'}/>
            <Result array={distinctElements} heading={'Distict Elements :'} noResultText={'No Distict Elements'}/>
          </div>
        }
      </Fragment>
    );
  }
}

export default App;
