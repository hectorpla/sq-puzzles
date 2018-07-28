import * as React from 'react';
import { Game } from '../types';
import { getNewGame } from '../utils';
import BoardComponent from './BoardComponent';


export interface Props {
  dimensions: number;
}

class GameComponent extends React.Component<Props> {
  private game: Game;

  public constructor(props: Props) {
    super(props);
    this.game = getNewGame(this.props.dimensions);
  }

  public render() {
    return (
      <div>
        <div>
          <BoardComponent board={this.game.board} width={15}/>
        </div>
        <div>
          <button>New Game</button>
        </div>
      </div>
    )
  }
}

export default GameComponent;