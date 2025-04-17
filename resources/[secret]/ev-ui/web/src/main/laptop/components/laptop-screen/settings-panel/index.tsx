import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import Button from '../../../../../components/button/button';
import Input from '../../../../../components/input/input';
import { updateLaptopState } from '../../../actions';
import store from '../../../store';
import useStyles from './index.styles';

interface SettingsPanelProps {
    show: boolean;
}

const SettingsPanel: FunctionComponent<SettingsPanelProps> = (props) => {
    const laptopState = useSelector((state: any) => state[store.key]);
    const classes = useStyles();
    const show = props.show;
    const ref = React.useRef(null);
    const [background, setBackground] = React.useState('');

    const defaultStyle = {
        transition: '300ms ease-in-out',
        transform: 'translateX(1000%)'
    }

    const transitionStyles = {
        entering: { transform: 'translateX(0)' },
        entered: { transform: 'translateX(0)' },
        exiting: { transform: 'translateX(150%)' },
        exited: { transform: 'translateX(150%)' }
    }

    const openPresetBackgrounds = () => {
        updateLaptopState({ showSettingsPanel: false });
        updateLaptopState({ showPresetBackgrounds: !laptopState.showPresetBackgrounds });
    }

    const handleWhiteIconNames = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateLaptopState({ whiteIconNames: e.target.checked ? 'on' : 'off' });
        localStorage.setItem('useWhiteIconNames', e.target.checked ? 'on' : 'off');
    }

    const saveBackground = () => {
        if (background !== '') {
            updateLaptopState({ laptopBackground: background });
            localStorage.setItem('laptopBackground', background);
        }
    }

    React.useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                updateLaptopState({ showSettingsPanel: false });
            }
        })
    }, [])

    return (
        <Transition in={show} timeout={300}>
            {(state) => (
                <div className={classes.settingsPanel} style={{ ...defaultStyle, ...transitionStyles[state] }} ref={ref}>
                    <Typography variant="h1" className={classes.headerTitle} style={{ color: '#fff' }}>Settings</Typography>
                    <div className={classes.list}>
                        <div className={classes.section}>
                            <Input.Text
                                label="Enter Background (16:9)"
                                icon="images"
                                onChange={(background: string) => setBackground(background)}
                                value={background}
                            />
                            <div className={classes.buttons}>
                                <Button.Primary className={classes.settingsBtn} onClick={saveBackground}>
                                    Save
                                </Button.Primary>
                                <Button.Primary className={classes.settingsBtn} onClick={openPresetBackgrounds}>
                                    Presets
                                </Button.Primary>
                            </div>
                        </div>
                        <div className={classes.section}>
                            <FormControlLabel
                                label="White Font"
                                style={{ color: '#fff' }}
                                onChange={handleWhiteIconNames}
                                control={<Checkbox
                                    color="warning"
                                    checked={laptopState.whiteIconNames === 'on'}
                                    disableRipple
                                    disableFocusRipple
                                    disableTouchRipple
                                />}
                            />
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    );
}

export default SettingsPanel;