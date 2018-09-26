import React from 'react';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';

class App extends React.Component {
  render () {
    return (
      <div>
        <Component1 />
        <Component2 />
        <Component3 />
      </div>
    );
  }
}

export default App;
