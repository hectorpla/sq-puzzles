import * as React from 'react';
import './App.css';
import GameComponent from './components/GameComponent';

class App extends React.Component {
  public render() {
    return (
      <div className="container">
        <GameComponent dimensions={4} />
      </div>
    );
  }
}

export default App;
