import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { CodeEmitter, codeConnect } from './CodeEmitter';

const Label = (props) => (
  <h2>Subscribers: {props.subscribers}, Counter: {props.counter}</h2>
);

const ConnectedLabel = codeConnect(Label);

class App extends Component {
  state = {
    labels: 0
  };

  renderLabels = () => {
    const labels = [];

    for(let i = 0; i < this.state.labels; i++)
      labels.push(<ConnectedLabel key={i}/>);

    return labels;
  }

  render() {

    return (
      <CodeEmitter>
        <div>
          {this.renderLabels()}
          <button onClick={() => this.setState((state) => ({...state, labels: state.labels + 1}))}>Add</button>
          <button onClick={() => this.setState((state) => ({...state, labels: state.labels - 1}))}>Remove</button>
        </div>
      </CodeEmitter>
    );
  }
}

export default App;
