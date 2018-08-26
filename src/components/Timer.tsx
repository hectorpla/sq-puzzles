import * as React from 'react';

export interface Props {
  startFromBegining: boolean;
  counting: boolean;
  setTime: (time: number) => void;
}

interface State {
  time: number
}

/**
 * make it a uncontrolled component
 */
class Timer extends React.Component<Props, State> {
  public state = {
    time: 0
  }

  private intervalHandler?: NodeJS.Timer;

  public componentDidUpdate() {
    if (this.props.counting && !this.intervalHandler) {
      console.log('timer starts');
      this.state.time = 0;
      this.intervalHandler = setInterval(() => {
        this.setState({ time: this.state.time + 1 })
      }, 1000);
    } else if (!this.props.counting && this.intervalHandler) {
      console.log('timer stops');
      clearInterval(this.intervalHandler);
      this.intervalHandler = undefined;
      this.props.setTime(this.state.time); // sync
      if (this.props.startFromBegining) {
        this.setState({ time: 0 });
      }
    }
  }

  public render() {
    return (
      <div>
        <i className="material-icons inline-icon">access_alarm</i>
        {this.state.time} s
      </div>
    )
  }
}

export default Timer;