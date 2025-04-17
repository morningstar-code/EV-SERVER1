import { Typography } from '@mui/material';
import React from 'react';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';

class Compass extends React.Component<any> {
    state = {
        area: "Pillbox Hill",
        heading: 0,
        showCompass: false,
        showRoadNames: false,
        street: "San Andreas Ave",
        street2: "San Andreas Ave",
        time: "12:00"
    }

    onEvent = (eventData: any) => {
        if (
            eventData &&
            eventData.data &&
            eventData.data.source === 'ev-nui'
        ) {
            if (eventData.data.app !== 'hud.compass') {
                if (eventData.data.app === 'game') {
                    if (eventData.data.data.time) {
                        this.setState({ time: eventData.data.data.time });
                    }
                }
            } else {
                this.setState(eventData.data.data || {});
            }
        }
    }

    componentDidMount() {
        window.addEventListener('message', this.onEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.onEvent);
    }

    render() {
        if (!this.state.showCompass) {
            return null
        }

        return (
            <div style={{
                width: '100vw',
                display: 'flex',
                height: ResponsiveHeight(52),
                justifyContent: 'unset',
                flexDirection: 'column'
            }}>
                <div style={{
                    width: '100vw',
                    height: ResponsiveHeight(32),
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    {this.state.showRoadNames && (
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: `0 ${ResponsiveHeight(16)}`,
                            textAlign: 'right'
                        }}>
                            <p style={{
                                textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                letterSpacing: ResponsiveWidth(0.7),
                                fontWeight: '600',
                                textDecoration: 'none',
                                fontStyle: 'normal',
                                fontVariant: 'small-caps',
                                textTransform: 'none',
                                width: '100%'
                            }}>
                                {this.state.area}
                            </p>
                        </div>
                    )}
                    <div style={{
                        width: 180,
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundImage: 'url('.concat(
                            "'https://gta-assets.subliminalrp.net/images/compass.png'",
                            ')'
                        ),
                        backgroundRepeat: 'repeat',
                        backgroundSize: `360px ${ResponsiveHeight(32)}`,
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundPositionX: -(this.state.heading + 90)
                    }}>
                        <img
                            src="https://gta-assets.subliminalrp.net/images/compass-marker.png"
                            style={{ height: ResponsiveHeight(12) }}
                            alt=""
                        />
                    </div>
                    {this.state.showRoadNames && (
                        <div style={{
                            flex: 1,
                            display: 'flex',
                            alignItems: 'center',
                            margin: `0 ${ResponsiveHeight(16)}`,
                            textAlign: 'left',
                            justifyContent: 'flex-start'
                        }}>
                            <Typography variant="body1" style={{
                                textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
                                fontFamily: 'Arial, Helvetica, sans-serif',
                                letterSpacing: ResponsiveWidth(0.7),
                                fontWeight: '600',
                                textDecoration: 'none',
                                fontStyle: 'normal',
                                fontVariant: 'small-caps',
                                textTransform: 'none',
                                width: 'auto',
                                display: 'inline',
                                color: 'white'
                            }}>
                                {this.state.street}
                            </Typography>
                            {!!this.state.street2 && (
                                <Typography variant="body1" style={{
                                    textShadow: '-1px 1px 0 #37474F, 1px 1px 0 #37474F, 1px -1px 0 #37474F, -1px -1px 0 #37474F',
                                    fontFamily: 'Arial, Helvetica, sans-serif',
                                    letterSpacing: ResponsiveWidth(0.7),
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    fontStyle: 'normal',
                                    fontVariant: 'small-caps',
                                    textTransform: 'none',
                                    width: 'auto',
                                    display: 'inline',
                                    color: 'white'
                                }}>
                                    {'\xA0['}{this.state.street2}{']'}
                                </Typography>
                            )}
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Compass;