import React, { createContext, PureComponent } from 'react';

const {Provider, Consumer} = createContext(null);

export class CodeEmitter extends PureComponent {
  interval = null;

  state = {
    subscribers: 0,
    counter: 0
  };

  startCounter = () => {
    this.interval = setInterval(() => {
      this.setState((state) => ({...state, counter: state.counter + 1}));
    }, 250);
  }

  stopCounter = () => {
    clearInterval(this.interval)
    this.interval = null
  }

  subscribe = () => {
    this.setState((state) => ({...state, subscribers: state.subscribers + 1}), () => {
      if(!this.interval)
        this.startCounter()
    });
  }

  unsubscribe = () => {
    this.setState((state) => ({...state, subscribers: state.subscribers - 1}), () => {
      if(this.state.subscribers === 0)
        this.stopCounter()
    });
  }

  render() {
    const values = {
      subscribers: this.state.subscribers,
      counter: this.state.counter,
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe
    }

    return (
      <Provider value={values}>
        {this.props.children}
      </Provider>
    );
  }
}

export const codeConnect = (WrappedComponent) => {

  class ConnectingComponent extends PureComponent {
    componentDidMount() {
      this.props.context.subscribe();
    }

    componentWillUnmount() {
      this.props.context.unsubscribe();
    }

    render() {
      const {
        context: {
          subscribers = 0,
          counter = 0
        },
        ...props
      } = this.props;


      return (
        <WrappedComponent subscribers={subscribers} counter={counter} {...props} />
      )
    }
  }

  return (props) => (
    <Consumer>
      {(value) => (
        <ConnectingComponent context={value} {...props} />
      )}
    </Consumer>
  );
}