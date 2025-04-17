import React from 'react';
import { MemoSpeedCircle } from './speed-circle';
import { ResponsiveHeight } from 'utils/responsive';
import ValueUpdater from '../../value-updater';

class Speed extends React.Component<any> {
    state = {
        alt: 0,
        speed: 0
    }

    render() {
        return (
            <>
                {this.props.label === "alt" ? (
                    <>
                        <MemoSpeedCircle
                            fill={(this.state.speed / 2000) * 100}
                            label={this.props.label}
                            labelMarginTop={ResponsiveHeight(-12)}
                            value={<ValueUpdater stateKey={this.props.stateKey} update={(value: any) => {
                                this.setState({ speed: value });
                            }} />}
                            valueMarginTop={ResponsiveHeight(-6)}
                            excludeTransition={true}
                        />
                    </>
                ) : (
                    <>
                        <MemoSpeedCircle
                            fill={Math.floor(((this.state.speed + 1) / 180) * 100)}
                            fillFactor={1.5}
                            rotate={120}
                            label={this.props.label}
                            labelMarginTop={ResponsiveHeight(-12)}
                            radius={60}
                            value={<ValueUpdater stateKey={this.props.stateKey} update={(value: any) => {
                                this.setState({ speed: value });
                            }} />}
                            valueMarginTop={ResponsiveHeight(-6)}
                            excludeTransition={true}
                        />
                    </>
                )}
            </>
        );
    }
}

export const MemoSpeed = React.memo(Speed);