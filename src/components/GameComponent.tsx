import * as React from 'react';

import { Game } from '../types';
import { computePositionDelta, getAllPositions, getMovePromises, getNewGame } from '../utils';
import BoardComponent from './BoardComponent';
import './GameComponent.css';
import Timer from './Timer';

export interface Props {
  dimensions: number;
  itemWidth?: number;
}

export interface State {
  game: Game;
  // TODO: game speed

  /**
   * game states: initial, gaming, finished, etc.
   */
  isStartState: boolean;
  counting: boolean;
}

class GameComponent extends React.Component<Props, State> {
  public state = {
    game: getNewGame(this.props.dimensions),
    isStartState: true,
    counting: false
  }

  // ? private member, good practice?
  private itemWidth: number = this.props.itemWidth || 80;
  private gamePanelStyle: React.CSSProperties;
  private freezing = false;
  private lastFinishTime: number | void = undefined;

  public constructor(props: Props) {
    super(props);

    const dimensions = this.props.dimensions;
    const size = this.itemWidth * dimensions;
    this.gamePanelStyle = {
      height: size
    }
    this.handleGameBoardChange = this.handleGameBoardChange.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleClickCapture = this.handleClickCapture.bind(this);
    this.freeze = this.freeze.bind(this);
    this.thaw = this.thaw.bind(this);
    this.setTimeDelegate = this.setTimeDelegate.bind(this);
  }

  public handleClickCapture(e: React.MouseEvent<HTMLDivElement>) {
    // console.log('handleClickCapture called', this.freezing);
    if (this.freezing) {
      console.log('stop propagation');
      e.stopPropagation();
    }
  }

  // ! bad smell for using callback (prev)
  public handleGameBoardChange(): Promise<void> {
    const finisehd = this.state.game.board.isFinished();
    console.log('handleGameBoardChange called')

    return new Promise((resolve) => {
      this.setState({
        ...this.state,
        isStartState: false,
        counting: !finisehd
      }, () => { // ? tricky workflow
        console.log('setState() finished');
        // !bug: callback invoked before re-rendering
        if (finisehd) {
          alert('Congrad! you finisehd');
          console.log(`finshed time ${this.lastFinishTime}`)
        }
        resolve();
      });
    })
  }

  public render() {
    const dimensions = this.props.dimensions;
    return (
      <div className="container">
        <div className="title row">
          <p className="center">{dimensions * dimensions - 1}-puzzle </p>
        </div>
        <div className="row center">
          <Timer counting={this.state.counting}
            setTime={this.setTimeDelegate} 
            startFromBegining={true}/>
        </div>
        <div onClickCapture={this.handleClickCapture}
          style={this.gamePanelStyle} className="game-board-panel row">
          <BoardComponent
            board={this.state.game.board}
            itemWidth={this.itemWidth}
            onChange={this.handleGameBoardChange}
            freeze={this.freeze}
            thaw={this.thaw} />
        </div>
        <div>
          {/* TODO: animation for match changes */}

          <div className="control-panel row center">
            <div className="col s12 m6 l6">
              <div className="card-panel lime darken-2 col s8 m8 l8 offset-s2 offset-m2 offset-l2">
                <i className="material-icons inline-icon">change_history</i> matched tiles: {this.state.game.board.matchedPlaces}
              </div>
            </div>
            <div className="col s12 m6 l6">
              <button className="waves-effect lime darken-4 btn" onClick={this.resetGame}>New Game</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private resetGame() {
    // ? good level to do the animation? maybe better for BoardComponent 
    const originalPositions = getAllPositions(this.state.game.board.tiles);

    // shuffle
    this.state.game.reset();

    const currentPositions = getAllPositions(this.state.game.board.tiles);
    const deltas = computePositionDelta(
      originalPositions,
      currentPositions,
      this.itemWidth
    );

    const { forward, reverse } = getMovePromises(deltas);
    // console.log(this.state.game.board.tiles);

    this.freeze();
    // 1. off animation
    Promise.all(forward.map((func) => func()))
      .then(() => {
        // 2. set state
        this.setState({
          ...this.state,
          isStartState: true,
          counting: false
        }, () => {
          // 3. reverse animation
          Promise.all(reverse.map((func) => func()))
            .then(() => {
              this.thaw()
            })
        })
      });
  }

  private freeze() {
    this.freezing = true;
    // console.log('board freezed');
  }

  private thaw() {
    this.freezing = false;
    // console.log('board activated (un-freezed)');
  }

  private setTimeDelegate(time: number) {
    this.lastFinishTime = time;
  }
}

export default GameComponent;
