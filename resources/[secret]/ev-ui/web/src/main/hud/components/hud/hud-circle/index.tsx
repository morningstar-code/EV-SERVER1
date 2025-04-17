import React, { useState, useEffect, useRef } from 'react';
import useStyles from './index.styles';
import { ResponsiveWidth } from 'utils/responsive';
import Circle from './circle';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HudCircle: React.FC<any> = (props) => {
    const classes = useStyles();
    const [style, setStyle] = useState({
        maxWidth: ResponsiveWidth(props.hide ? 0 : 54),
        opacity: props.hide ? 0 : 1,
        transition: 'none',
        transitionDelay: 'unset'
    });
    const hudTimeout = useRef<any>(null);

    useEffect(() => {
        if (props.hide) {
            if (hudTimeout.current) {
                return;
            }

            setStyle({
                maxWidth: ResponsiveWidth(54),
                opacity: 1,
                transition: 'none',
                transitionDelay: 'unset'
            });

            hudTimeout.current = setTimeout(() => {
                setStyle({
                    maxWidth: ResponsiveWidth(54),
                    opacity: 0,
                    transition: 'opacity 1s linear',
                    transitionDelay: '1s'
                });
            }, 1000);
        } else {
            clearTimeout(hudTimeout.current);

            setStyle({
                maxWidth: ResponsiveWidth(54),
                opacity: 1,
                transition: 'none',
                transitionDelay: 'unset'
            })
        }

        hudTimeout.current = false;
    }, [props.hide]);

    return (
        <>
            <div
                className={classes.hudIconWrapper}
                style={style}
                onTransitionEnd={() => {
                    return setStyle({
                        maxWidth: ResponsiveWidth(0),
                        opacity: 0,
                        transition: 'none',
                        transitionDelay: 'unset'
                    });
                }}
            >
                <div
                    className={classes.hudIcon}
                    onTransitionEnd={(e) => {
                        return e.stopPropagation();
                    }}
                >
                    {/* Circle Component Here (This circle is under the filled circle) */}
                    <Circle zIndex={100} fill={100} strokeOpacity={props.fill > 9 || !props.redIfLow ? 0.35 : 1} radius={46} color={props.fill > 9 || !props.redIfLow ? props.color : 'red'} transitionTime={props.transitionTime} excludeTransition={props.excludeTransition} />
                </div>

                <div
                    className={classes.hudIcon}
                    onTransitionEnd={(e) => {
                        return e.stopPropagation();
                    }}
                >
                    {/* Circle Component Here (This is the circle that fills up based on the fill value) */}
                    <Circle zIndex={200} fill={props.fill} radius={46} color={props.color} transitionTime={props.transitionTime} excludeTransition={props.excludeTransition} />
                </div>

                <div className={classes.hudIcon}>
                    <div className={classes.iconWrapper}>
                        {/* Icon Component Here */}
                        {/* <i className={`fas fa-${props.icon} fa-w-${props.iconSize} fa-fw`} style={{ color: props.innerText ? '#606060' : props.iconBuffed ? '#FFD700' : props.iconColor || 'white', fontSize: ResponsiveWidth(18) }}></i> */}
                        <FontAwesomeIcon
                            icon={props.icon}
                            width={props.iconSize}
                            fixedWidth
                            style={{ color: props.innerText ? '#606060' : props.iconBuffed ? '#FFD700' : props.iconColor || 'white', fontSize: ResponsiveWidth(18) }}
                        />
                        {props.innerText && (
                            <>
                                <div className={classes.circleTestInnerText}>
                                    <Typography style={{ color: '#fff', fontSize: ResponsiveWidth(16 - props.innerText.length) }} variant="body1" gutterBottom>{props.innerText}</Typography>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default HudCircle;