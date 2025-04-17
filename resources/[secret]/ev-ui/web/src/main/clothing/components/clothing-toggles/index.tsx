import { Tooltip } from '@mui/material';
import { nuiAction } from 'lib/nui-comms';
import React from 'react';
import useStyles from './index.styles';

export default (props: any) => {
    const classes = useStyles();
    const [toggles, setToggles] = React.useState([
        {
            id: 'hat',
            icon: 'hat-cowboy-side',
            label: 'Hat',
            male: { drawables: {} },
            female: { drawables: {} },
            props: { Hat: [-1, 0] },
            active: false,
        },
        {
            id: 'mask',
            icon: 'mask',
            label: 'Mask',
            male: { drawables: { Mask: [-1, 0] } },
            female: { drawables: { Mask: [-1, 0] } },
            props: {},
            active: false,
        },
        {
            id: 'glasses',
            icon: 'glasses',
            label: 'Glasses',
            male: { drawables: {} },
            female: { drawables: {} },
            props: { Glasses: [-1, 0] },
            active: false,
        },
        {
            id: 'torso',
            icon: 'tshirt',
            label: 'Torso',
            male: {
                drawables: {
                    Undershirt: [15, 0],
                    Torso: [15, 0],
                    Kevlar: [0, 0],
                    Jacket: [15, 0]
                }
            },
            female: {
                drawables: {
                    Undershirt: [14, 0],
                    Torso: [15, 0],
                    Kevlar: [-1, 0],
                    Jacket: [18, 0]
                }
            },
            props: {},
            active: false,
        },
        {
            id: 'bag',
            icon: 'shopping-bag',
            label: 'Bag',
            male: { drawables: { Parachute: [-1, 0] } },
            female: { drawables: { Parachute: [-1, 0] } },
            props: {},
            active: false,
        },
        {
            id: 'legs',
            icon: 'drumstick-bite',
            label: 'Legs',
            male: { drawables: { Leg: [14, 0] } },
            female: { drawables: { Leg: [17, 0] } },
            props: {},
            active: false,
        },
        {
            id: 'shoes',
            icon: 'socks',
            label: 'Shoes',
            male: { drawables: { Shoes: [34, 0] } },
            female: { drawables: { Shoes: [35, 0] } },
            props: {},
            active: false,
        }
    ]);

    React.useEffect(() => {
        nuiAction('ev-clothing:setToggles', {
            toggles: toggles.map((toggle: any) => {
                return {
                    id: toggle.id,
                    male: toggle.male,
                    female: toggle.female,
                    props: toggle.props,
                    active: toggle.active
                }
            })
        });
    }, [toggles]);

    return (
        <>
            {props.isCustom ? (
                <div></div>
            ) : (
                <div className={classes.container}>
                    {toggles.map((toggle: any) => (
                        <Tooltip key={toggle.id} title={toggle.label} placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div
                                className={`${classes.toggle} ${toggle.active ? classes.toggleActive : ''}`}
                                onClick={() => {
                                    setToggles(toggles.map((t: any) => {
                                        t.id === toggle.id && (t.active = !t.active);
                                        return t
                                    }));
                                }}
                            >
                                <i className={`fas fa-${toggle.icon} fa-fw fa-sm`} style={{ color: 'white' }}></i>
                            </div>
                        </Tooltip>
                    ))}
                </div>
            )}
        </>
    )
}