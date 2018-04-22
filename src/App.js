import React, { PureComponent } from 'react';
import { CodeEmitter, codeConnect } from './CodeEmitter';

function* range (...params) {
  const [to, from = 0] = params.reverse();

  for(let i = from; i < to; i++)
    yield i;
}

const ConnectedLabel = codeConnect(({subscribers, counter}) => (
  <h2>Subscribers: {subscribers}, Counter: {counter}</h2>
));

class App extends PureComponent {
  state = {
    labelCount: 0
  };

  render() {
    const {
      labelCount
    } = this.state;

    const array = [...range(labelCount)];

    return (
      <CodeEmitter>
        <div>
          {array.map((i) => (
            <ConnectedLabel key={i} />
          ))}
          <button onClick={() => this.setState((state) => ({...state, labelCount: state.labelCount + 1}))}>Add</button>
          <button onClick={() => this.setState((state) => ({...state, labelCount: state.labelCount - 1}))}>Remove</button>
        </div>
      </CodeEmitter>
    );
  }
}

export default App;
