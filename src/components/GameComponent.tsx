import * as React from 'react';
import { Game } from '../types';
import BoardComponent from './BoardComponent';

export interface Props {
  dimensions: number;
}

class GameComponent extends React.Component<Props> {
  public componentDidMount() {
    
  }

  public render() {
    return (
      <div>
        <div>
          <BoardComponent />
        </div>
        <div>
          <button>New Game</button>
        </div>
      </div>
    )
  }
}

export default GameComponent;