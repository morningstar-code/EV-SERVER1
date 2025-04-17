import { Grid, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import Button from '../../../../../components/button/button';
import Input from '../../../../../components/input/input';
import { updateLaptopState } from '../../../actions';
import store from '../../../store';
import useStyles from './index.styles';

interface PresetBackgroundsProps {
    show: boolean;
}

const presetBackgrounds = [
    {
        name: 'Default',
        url: 'https://i.imgur.com/EEwTSk1.jpg',
    },
    {
        name: 'Yung',
        url: 'https://i.imgur.com/p924kQR.png',
    },
    {
        name: 'Drift',
        url: 'https://i.imgur.com/H1SL3u3.png',
    },
    {
        name: 'GTR',
        url: 'https://i.imgur.com/QUx3wNC.jpg',
    },
    {
        name: 'AMG',
        url: 'https://i.imgur.com/8gCOoIZ.png',
    },
    {
        name: 'R34',
        url: 'https://i.imgur.com/4yp0klI.jpg',
    },
    {
        name: 'Lambo',
        url: 'https://i.imgur.com/vn68cBQ.jpg',
    },
    {
        name: 'Corvette',
        url: 'https://i.imgur.com/QxqrDwG.jpg',
    },
    {
        name: 'Corvette 2',
        url: 'https://i.imgur.com/hnA5H1Y.jpg',
    },
    {
        name: 'R342',
        url: 'https://i.imgur.com/8Lthbn7.png',
    },
    {
        name: 'Supra',
        url: 'https://i.imgur.com/l5romrM.jpg',
    },
    {
        name: 'FeelsBadMan',
        url: 'https://i.imgur.com/ArrXblZ.png',
    },
];

const PresetBackgrounds: FunctionComponent<PresetBackgroundsProps> = (props) => {
    const classes = useStyles();
    const show = props.show;
    const ref = React.useRef(null);

    const defaultStyle = {
        transition: '500ms ease-in-out',
        transform: 'translateX(1000%)'
    }

    const transitionStyles = {
        entering: { transform: 'translateX(0)' },
        entered: { transform: 'translateX(0)' },
        exiting: { transform: 'translateX(250%)' },
        exited: { transform: 'translateX(250%)' }
    }

    const updateBackground = (background) => {
        if (background !== '') {
            updateLaptopState({ laptopBackground: background });
            localStorage.setItem('laptopBackground', background);
        }
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                updateLaptopState({ showPresetBackgrounds: false });
            }
        })
    }, [])

    return (
        <Transition in={show} timeout={500}>
            {(state) => (
                <div className={classes.presetBackgrounds} style={{ ...defaultStyle, ...transitionStyles[state] }} ref={ref}>
                    <Typography variant="h1" className={classes.headerTitle} style={{ color: '#fff' }}>Preset Backgrounds</Typography>
                    <Grid container={true} spacing={3} className={classes.list}>
                        {presetBackgrounds.map((background, index) => (
                            <Grid item={true} xs={4} key={index}>
                                <div className={classes.presetBackground} style={{ background: `url(${background.url})`, backgroundSize: 'cover' }} onClick={(e) => updateBackground(background.url)}>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </Transition>
    );
}

export default PresetBackgrounds;