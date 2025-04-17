import { Slider, Tooltip } from "@mui/material";
import useStyles from "./index.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Text from "components/text/text";

export default (props: any) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.innerContainer}>
                {props.mode === 'youtube' && (
                    <div className={classes.statusBox}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Slider
                                value={props.percentage}
                                min={0}
                                max={100}
                                step={0.01}
                                disabled={true}
                            />
                        </div>
                    </div>
                )}
                {props.mode === 'youtube' && (
                    <div className={classes.statusBox}>
                        <div style={{ display: 'flex' }}>
                            {props.isAllowed && (
                                <>
                                    {props.paused && (
                                        <div>
                                            <FontAwesomeIcon onClick={() => props.play()} icon="play" size="2x" fixedWidth />
                                        </div>
                                    )}
                                    {!props.paused && (
                                        <div>
                                            <FontAwesomeIcon onClick={() => props.pause()} icon="pause" size="2x" fixedWidth />
                                        </div>
                                    )}
                                    <div>
                                        <FontAwesomeIcon onClick={() => props.next()} icon="angle-double-right" size="2x" fixedWidth />
                                    </div>
                                    <div>
                                        <FontAwesomeIcon onClick={() => props.advance(-10)} icon="chevron-left" size="2x" fixedWidth />
                                    </div>
                                    <div>
                                        <FontAwesomeIcon onClick={() => props.advance(10)} icon="chevron-right" size="2x" fixedWidth />
                                    </div>
                                    <div>
                                        <FontAwesomeIcon onClick={() => props.seek()} icon="history" size="2x" fixedWidth />
                                    </div>
                                    <div>
                                        <Tooltip title="Add to queue" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                            <FontAwesomeIcon onClick={() => props.add()} icon="plus" size="2x" fixedWidth />
                                        </Tooltip>
                                    </div>
                                </>
                            )}
                            <div>
                                <FontAwesomeIcon onClick={() => props.viewPlaylist()} icon="list" size="2x" fixedWidth />
                            </div>
                            <div>
                                <FontAwesomeIcon onClick={() => props.camera()} icon="camera" size="2x" fixedWidth />
                            </div>
                            {props.canMap && (
                                <div>
                                    <FontAwesomeIcon onClick={() => props.map()} icon="map" size="2x" fixedWidth />
                                </div>
                            )}
                            <div style={{ width: props.isAllowed ? '50%' : '80%', marginLeft: '1rem' }}>
                                <Slider
                                    value={props.volume}
                                    min={0}
                                    max={100}
                                    step={1}
                                    onChange={(e, value) => props.changeVolume(+value)}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {props.showPlaylist && (
                    <div className={classes.statusBox}>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            {props.playlist && props.playlist.length > 0 && props.playlist.map((item: any) => (
                                <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem' }}>
                                    <div style={{ width: '80%' }}>
                                        <Text>
                                            {item.title}
                                        </Text>
                                    </div>
                                    {props.isAllowed && (
                                        <>
                                            {item.video !== props.currentVideo && (
                                                <div>
                                                    <FontAwesomeIcon onClick={() => props.removeVideo(item.video)} icon="trash" size="2x" fixedWidth style={{ marginRight: '0.5rem' }} />
                                                </div>
                                            )}
                                            {item.video === props.currentVideo && (
                                                <div>
                                                    Playing
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}