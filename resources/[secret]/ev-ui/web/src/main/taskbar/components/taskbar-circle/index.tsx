import React from 'react';
import useStyles from './index.styles';
import { MemoCircle } from './circle';

const TaskbarCircle: React.FC<TaskbarCircleProps> = (props) => {
    const radius = props.radius || 60;
    const fillFactor = props.fillFactor || 1.5;
    const rotate = props.rotate || 150;
    
    const classes = useStyles({ height: radius + 2 });

    return (
        <>
            <div className={classes.gauge}>
                <div className={classes.gaugeCircle}>
                    <MemoCircle
                        color="rgba(255, 255, 255, 0.5)"
                        fill={100}
                        fillFactor={fillFactor}
                        radius={radius}
                        rotate={rotate}
                        show={true}
                        strokeWidth={6}
                    />
                </div>
                <div className={classes.gaugeCircle}>
                    <MemoCircle
                        color="#4F7CAC"
                        fill={props.fill}
                        fillFactor={fillFactor}
                        radius={radius}
                        rotate={rotate}
                        show={true}
                        strokeWidth={6}
                        transitionTime={props.transitionTime}
                    />
                </div>
            </div>
        </>
    );
}

export const MemoTaskbarCircle = React.memo(TaskbarCircle);