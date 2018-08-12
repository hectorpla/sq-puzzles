import * as React from 'react';
import './App.css';
import GameComponent from './components/GameComponent';

const gitUrl = 'https://github.com/hectorpla/sq-puzzles';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <nav className="left brown lighten-3">
          <div className="nav-wrapper">
            A game powered by React, typescript and materialize design
          </div>
        </nav>
        <main>
          <GameComponent dimensions={3} />
        </main>
        <footer className="page-footer brown lighten-3">
          <div className="contaianer right">
            github: <a href={gitUrl}> {gitUrl} </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
