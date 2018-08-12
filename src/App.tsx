import * as React from 'react';
import './App.css';
import GameComponent from './components/GameComponent';

const gitUrl = 'https://github.com/hectorpla/sq-puzzles';

interface State {
  dimension: number;
}

class App extends React.Component<{}, State> {
  public state = {
    dimension: 3
  }

  public constructor(prop: {}) {
    super(prop);
    this.handleDimensionChange = this.handleDimensionChange.bind(this);
  }

  public render() {
    // ! mind: use flexbox to layout, refer to App.css
    return (
      <div className="App">
        <nav className="brown lighten-1 row header">
          <div className="col s8">
            <p className="truncate">A game powered by React, typescript and materialize design</p>
          </div>
          <div className="input-field col s4  valign-wrapper">
            <select className="browser-default"
              onChange={this.handleDimensionChange}
              value={3}>
              <option value={3} disabled={true}> choose the dimension </option>
              <option value={3}> 8-puzzle </option>
              <option value={4}> 15-puzzle </option>
            </select>
          </div>
        </nav>
        <main>
          <GameComponent dimensions={this.state.dimension} />
        </main>
        <footer className="white-text brown lighten-1">
          <p>github: <a href={gitUrl}> {gitUrl} </a></p>
        </footer>
      </div>
    );
  }

  private handleDimensionChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const dimension = parseInt(e.target.value!, 10);
    this.setState({ dimension });
  }
}

export default App;
