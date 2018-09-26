import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      component1: null,
      component2: null,
      component3: null,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  async componentWillMount() {
    const [Component1, Component2, Component3] = await Promise.all([
      import('./Component1'),
      import('./Component2'),
      import('./Component3')
    ]);
    this.setState({
      component1: Component1.default(),
      component2: Component2.default(),
      component3: Component3.default(),
    });
  }
  handleClick(e) {
    e.preventDefault();
    import('./Component1')
    //
    .then((module) => {
      return this.setState({
        component3: module.default(),
      });
    })
    .catch((e) => {
      return console.log(e);
    });
  }
  render () {
    return (
      <div>
        { this.state.component1 || <div>...</div> }
        { this.state.component2 || <div>...</div> }
        { this.state.component3 || <div>...</div> }
        <button onClick={this.handleClick}>コンポーネント追加</button>
      </div>
    );
  }
}

export default App;
