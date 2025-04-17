import React, { useEffect, useState } from 'react';
import useStyles from "./index.styles";
import { MemoTaskbarCircle } from '../taskbar-circle';
import { useSelector } from 'react-redux';

const Taskbar: React.FC = (props: any) => {
    const classes = useStyles();
    const [width, setWidth] = useState('0%');
    const [fill, setFill] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            return setFill(100)
        }, 32)
        setTimeout(() => {
            return setWidth('100%')
        }, 32)
    }, [])

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.top} />
                <div className={classes.bottom}>
                    <div className={classes.top} />
                    <div className={classes.bottom}>
                        {props.preferences['hud.taskbar.circle'] ? (
                            <div className={classes.box}>
                                <MemoTaskbarCircle
                                    fill={fill}
                                    radius={46}
                                    transitionTime={props.duration - 32 + 'ms'}
                                />
                                <div>
                                    <p className={classes.loadingText}>
                                        {props.label}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={classes.progressBarWrap}>
                                <div className={classes.innerWrapper}>
                                    <p className={classes.loadingTextDefault}>
                                        {props.label}
                                    </p>
                                </div>
                                <div className={classes.progressBarInner} style={{ width: width, transition: `width ${props.duration - 32}ms linear` }} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Taskbar;