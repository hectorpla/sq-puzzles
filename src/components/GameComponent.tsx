import * as React from 'react';
import { Game } from '../types';
import { getNewGame } from '../utils';
import BoardComponent from './BoardComponent';
import './GameComponent.css';

export interface Props {
  dimensions: number;
}

export interface State {
  game: Game;
}

class GameComponent extends React.Component<Props, State> {
  public state = {
    game: getNewGame(this.props.dimensions)
  }

  private itemWidth: number = 80;
  private gamePanelStyle: React.CSSProperties;

  public constructor(props: Props) {
    super(props);

    const dimensions = this.props.dimensions;
    const size = this.itemWidth * dimensions;

    this.gamePanelStyle = {
      width: size,
      height: size
    }
  }

  public componentDidMount() {
    // do nothing
    // this.resetGame();
  }

  public handleGameBoardChagne() {
    this.setState(this.state, () => {
      // async: 
      // !bug: callback invoked before re-rendering
      if (this.state.game.board.isFinished()) {
        alert('Congrad! you finisehd');
      }
    });
  }

  // TODO: center the game board; failed 
  public render() {
    const handleGameBoardChagne = this.handleGameBoardChagne.bind(this);
    const handleReset = this.resetGame.bind(this);
    const dimensions = this.props.dimensions;

    return (
      <div className="container">
        <header>
          <p className="center">{dimensions * dimensions - 1}-puzzle </p>
        </header>
        <section style={this.gamePanelStyle} className="game-board-panel brown lighten-1">
          <div className="center">
            <BoardComponent
              board={this.state.game.board}
              itemWidth={this.itemWidth}
              onChange={handleGameBoardChagne} />
          </div>
        </section>
        <section>
          <div className="center">
            # matched tiles: {this.state.game.board.matchedPlaces}
          </div>
          <div className="control-panel center">
            <button className="button" onClick={handleReset}>New Game</button>
          </div>
        </section>
      </div>
    )
  }

  private resetGame() {
    this.state.game.reset();
    this.setState(this.state);
  }
}

export default GameComponent;