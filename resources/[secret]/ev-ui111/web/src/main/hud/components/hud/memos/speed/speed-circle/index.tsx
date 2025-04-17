import React from 'react';
import { MemoCircle } from './circle';
import { Typography } from '@mui/material';
import useStyles from 'main/hud/components/hud/index.styles';

const SpeedCircle: React.FC<any> = (props) => {
    const radius = props.radius || 60;
    const fillFactor = props.fillFactor || 1.5;
    const rotate = props.rotate || 150;
    
    const classes = useStyles({ height: radius + 2 });

    return (
        <>
            <div className={classes.gauge}>
                <div className={classes.gaugeCircle}>
                    <MemoCircle
                        color="#9E9E9E"
                        fill={100}
                        fillFactor={fillFactor}
                        radius={radius}
                        rotate={rotate}
                        show={true}
                        strokeWidth={props.strokeWidth}
                    />
                </div>
                <div className={classes.gaugeCircle}>
                    <MemoCircle
                        color={props.color || 'white'}
                        fill={props.fill}
                        fillFactor={fillFactor}
                        radius={radius}
                        rotate={rotate}
                        show={true}
                        strokeWidth={props.strokeWidth}
                        transitionTime={props.transitionTime}
                        excludeTransition={props.excludeTransition}
                    />
                </div>
                <div className={classes.gaugeValue} style={{ marginTop: props.valueMarginTop || 0 }}>

                    {React.isValidElement(props.value) ? props.value : props.icon ? (
                        <i className={`fas fa-${props.icon} fa-w-16 fa-2x fa-fw`} style={{ color: 'white', height: 14, width: 14, fontSize: 14 }}></i>
                    ) : (
                        <Typography style={{ color: '#fff' }} variant="body2" gutterBottom>{props.value}</Typography>
                    )}
                </div>
                <div className={classes.gaugeLabel} style={{ marginTop: props.labelMarginTop || 0 }}>
                    <Typography style={{ color: '#fff' }} variant="body2" gutterBottom>{props.label}</Typography>
                </div>
            </div>
        </>
    );
}

export const MemoSpeedCircle = React.memo(SpeedCircle);