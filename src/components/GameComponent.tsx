import * as React from 'react';
import { Game } from '../types';
import { getNewGame } from '../utils';
import BoardComponent from './BoardComponent';
import './GameComponent.css';

export interface Props {
  dimensions: number;
  itemWidth?: number;
}

export interface State {
  game: Game;
  // TODO: game speed
}

class GameComponent extends React.Component<Props, State> {
  public state = {
    game: getNewGame(this.props.dimensions)
  }

  private itemWidth: number = this.props.itemWidth || 80;
  private gamePanelStyle: React.CSSProperties;

  public constructor(props: Props) {
    super(props);

    const dimensions = this.props.dimensions;
    const size = this.itemWidth * dimensions;
    this.gamePanelStyle = {
      height: size
    }
  }

  public componentDidMount() {
    // do nothing
    // this.resetGame();
  }

  public handleGameBoardChagne() {
    // ! test
    // ! originally update view according to the new arrangement of tiles
    // ! without animation
    this.setState(this.state, () => {
      // async: 
      // !bug: callback invoked before re-rendering
      if (this.state.game.board.isFinished()) {
        alert('Congrad! you finisehd');
      }
    });
    // console.log(this.state.game.board.tiles);
  }

  public render() {
    const handleGameBoardChagne = this.handleGameBoardChagne.bind(this);
    const handleReset = this.resetGame.bind(this);
    const dimensions = this.props.dimensions;

    return (
      <div className="container">
        <header>
          <p className="center">{dimensions * dimensions - 1}-puzzle </p>
        </header>
        <section style={this.gamePanelStyle} className="game-board-panel">
          <div className="center">
            <BoardComponent
              board={this.state.game.board}
              itemWidth={this.itemWidth}
              onChange={handleGameBoardChagne} />
          </div>
        </section>
        <section>
          {/* TODO: animation for match changes */}

          <div className="control-panel center">
            <span className="card-panel blue-grey lighten-2">
              # matched tiles: {this.state.game.board.matchedPlaces}
            </span>
            <span>
              <button className="waves-effect teal btn" onClick={handleReset}>New Game</button>
            </span>
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
