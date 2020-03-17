import React, { Component } from 'react';
import Home from "./Home/Home"
class App extends Component {

  render() {
    return (
      <React.Fragment>
        {/* <nav><a href="/">Mobiotics</a></nav> */}
        <Home />
      </React.Fragment>
    )
  }
}

export default App;