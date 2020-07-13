import React from 'react';
import style from './Soundboard.module.scss';
import { AppConsumer, AppContextProps, Response } from './AppContext';

interface SoundboardProps {
}

interface SoundboardState {
  sounds: string[];
}

export default class Soundboard extends React.Component<SoundboardProps, SoundboardState> {
  public context: AppContextProps;

  constructor (props) {
    super(props);
    this.state = {
      sounds: [],
    };
  }

  public componentDidMount (): void {
    interface SoundsResponse extends Response {
      sounds: string[];
    }
    this.context.req<SoundsResponse>('sh sounds a', {})
      .then(res => {
        if (!res.success) return;
        this.setState({
          sounds: res.sounds,
        });
      });
  }

  public render () {
    return (
      <AppConsumer>
        {ctx => {
          this.context = ctx;
          return (
            <div className={style.root}>
              { this.state.sounds.map(s => <div className={style.sound} key={s} title={s}>{s[0].toUpperCase()}</div>) }
            </div>
          );
        }}
      </AppConsumer>
    );
  }
};