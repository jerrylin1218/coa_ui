import React, { Component } from 'react';
import HeaderNavigation from './HeaderNavigation';
import LocationDetails from './LocationDetails';

import './App.css'

class App extends Component {
  componentDidMount() {
    console.log("didmount");
      fetch(`http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com/sitecategoriesbreakdown`,
            {"method": 'GET', "mode": "cors"}) 
          .then(
              function(results) {
                console.log("hello");
                results.json().then(
                  function(data) {
                    console.log(data);
                  });
              }
            , function() { console.log("failed"); });
  }
  render() {
    return (
      <div className="App">
        <HeaderNavigation />
        <LocationDetails />
      </div>
    );
  }
}

export default App;