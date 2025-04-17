import { Grid, Slider } from '@mui/material';
import useStyles from './index.styles';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Button from 'components/button/button';

export default (props: any) => {
    const classes = useStyles(props);

    return (
        <div className={classes.container}>
            <div className={classes.musicPlayer}>
                <iframe
                    title="music-player"
                    id="soundcloud-musicplayer"
                    style={{
                        height: props.minimized ? '0%' : '100%',
                        width: props.minimized ? '0%' : '100%'
                    }}
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${props.url}&amp;color=%2300f8b9&amp;auto_play=false&amp;amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false&amp;show_teaser=false&amp;visual=false`}
                    onLoad={props.iframeLoaded}
                />
                <div className={classes.controlsBlocker1} />
                <div className={classes.controlsBlocker2} />
            </div>
            <div className={classes.musicControls}>
                {!props.minimized && (
                    <div className={classes.volume}>
                        <Grid
                            container={true}
                            spacing={2}
                            style={{ height: '100%' }}
                        >
                            <Grid item={true}>
                                <VolumeDown style={{ color: 'white' }} />
                            </Grid>
                            <Grid item={true} xs={true}>
                                <Slider
                                    value={props.volume}
                                    onChange={(e, value) => props.changeVolume(value)}
                                />
                            </Grid>
                            <Grid item={true}>
                                <VolumeUp style={{ color: 'white' }} />
                            </Grid>
                        </Grid>
                    </div>
                )}
                <div className={classes.closeButton}>
                    <Button.Primary onClick={props.minimize} style={{ marginRight: 16, marginLeft: 16 }}>
                        {props.minimized ? 'Expand' : 'Minimize'}
                    </Button.Primary>
                    {!props.minimized && (
                        <Button.Secondary onClick={props.closeWindow}>
                            Close
                        </Button.Secondary>
                    )}
                </div>
            </div>
        </div>
    )
}