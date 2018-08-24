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
  private freezing = false;
  // private boardRef: React.RefObject<HTMLDivElement>;

  public constructor(props: Props) {
    super(props);

    const dimensions = this.props.dimensions;
    const size = this.itemWidth * dimensions;
    this.gamePanelStyle = {
      height: size
    }
    this.handleGameBoardChagne = this.handleGameBoardChagne.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleClickCapture = this.handleClickCapture.bind(this);
    this.freeze = this.freeze.bind(this);
    this.thaw = this.thaw.bind(this);
  }

  public handleClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    // console.log('handleClickCapture called', this.freezing);
    if (this.freezing) {
      console.log('stop propagation');
      e.stopPropagation();
    }
  }

  public handleGameBoardChagne(callback: () => void) {
    // ? tricky workflow
    this.setState(this.state, () => {
      console.log('setState() finished');
      // !bug: callback invoked before re-rendering
      if (this.state.game.board.isFinished()) {
        alert('Congrad! you finisehd');
      }
      callback();
    });
    // console.log(this.state.game.board.tiles);
  }

  public render() {
    const dimensions = this.props.dimensions;
    return (
      <div className="container">
        <div className="title row">
          <p className="center">{dimensions * dimensions - 1}-puzzle </p>
        </div>
        <div onClickCapture={this.handleClickCapture}
          style={this.gamePanelStyle} className="game-board-panel row">
          <BoardComponent
            board={this.state.game.board}
            itemWidth={this.itemWidth}
            onChange={this.handleGameBoardChagne}
            freeze={this.freeze}
            thaw={this.thaw} />
        </div>
        <div>
          {/* TODO: animation for match changes */}

          <div className="control-panel row center">
            <div className="col s6">
              <div className="card-panel blue-grey lighten-2 col s8 offset-s2">
                <i className="material-icons inline-icon">change_history</i> matched tiles: {this.state.game.board.matchedPlaces}
              </div>
            </div>
            <div className="col s6">
              <button className="waves-effect teal btn" onClick={this.resetGame}>New Game</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private resetGame() {
    this.state.game.reset();
    this.setState(this.state);
  }

  private freeze() {
    this.freezing = true;
    // console.log('board freezed');
  }

  private thaw() {
    this.freezing = false;
    // console.log('board activated (un-freezed)');
  }
}

export default GameComponent;
