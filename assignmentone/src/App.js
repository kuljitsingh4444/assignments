import React, { Component, Fragment } from 'react';
import Input from './Input';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      existingArray : [7000,7001,7002,7003,7004,7005],
      duplicates : [],
      showResults : false
    }
  }

  updateArray = (array) => {
    if(array.length) {
      this.updateDuplicates(array)
    } else { 
      this.setState({
        showResults : false
      })
    }
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
      duplicates : duplicates,
      showResults : true
    })
  }
  
  render(){
    const { existingArray, duplicates, showResults } = this.state;
    return (
      <Fragment>
        <div>
          <div>
            Existing Array of elements : 
          </div>
          <div className={'dflex'}>
            {
              existingArray.map(arrayElement => 
              <div className={'array-element'}>
                {arrayElement}
              </div>)
            }
          </div>
        </div>
        <Input updateArray={this.updateArray}/>
        {
          showResults &&
          <div>
            {
              duplicates.length > 0 ? 
                <div>
                  Duplicates :
                  <div className={'dflex'}>
                    {
                      duplicates.map((duplicateItem,index) => 
                        <div key={index} className={'array-element'}>
                          {duplicateItem}
                        </div>
                      )
                    }
                  </div>
                </div>
              :'No Duplicates'
            }
          </div>
        }
      </Fragment>
    );
  }
}

export default App;
