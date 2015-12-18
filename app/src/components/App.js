import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (<div>{'Test'}</div>);
  }
}

function selectTopics(store) {
  return {
    topics: store.RootReducer ? store.RootReducer.topics : [],
  };
}

export default connect(selectTopics)(App);
