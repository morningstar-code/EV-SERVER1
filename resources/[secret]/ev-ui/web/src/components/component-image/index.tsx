import React, { FunctionComponent } from "react";
import { ClickAwayListener, Tooltip, Typography } from "@mui/material";
import "./component-image.scss";

const ComponentImage: FunctionComponent<{images: string[]}> = (props) => {
    const images = props.images;
    const [opened, setOpened] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    return (
        <div className="component-image-container">
            <div>
                <Typography variant="body2" style={{ color: '#fff' }}>Images attached: {images?.length}</Typography>
                {opened && (
                    <div onClick={() => setOpened(false)}>
                        <Typography variant="body2" style={{ color: '#fff', textDecoration: 'underline !important' }}>Hide (click image to copy URL)</Typography>
                    </div>
                )}
            </div>
            <div className={`container ${opened ? '' : 'container-max-height'}`}>
                {!opened && (
                    <div className="blocker" onClick={() => setOpened(true)}>
                        <i className="fas fa-eye fa-fw fa-3x" style={{ color: '#000' }}></i>
                        <Typography variant="body1" style={{ color: '#fff' }}>Click to View</Typography>
                        <Typography variant="body2" style={{ color: '#fff', textAlign: 'center', marginTop: '8px !important' }}>Only reveal images from those you know are not total pricks</Typography>
                    </div>
                )}
                {images && images.length > 0 && images.filter((image) => !image.match(/.mp4/g)).map(function (image) {
                    return (
                        <>
                            <ClickAwayListener
                                key={Math.random()}
                                onClickAway={() => setOpen(false)}
                            >
                                <Tooltip
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0)', color: 'rgba(0, 0, 0, 0.87)', maxWidth: 'none', fontSize: '0.75rem', position: 'relative' }}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={(
                                        <>
                                            <div onClick={() => setOpen(false)}>
                                                <img
                                                    alt={image}
                                                    src={image}
                                                    style={{ maxHeight: 600, maxWidth: 800 }}
                                                />
                                            </div>
                                        </>
                                    )}
                                    placement="left"
                                    open={open}
                                    onClose={() => setOpen(false)}
                                >
                                    {opened ? (
                                        <div
                                            className={`image ${opened ? '' : 'image-with-blur'}`}
                                            onClick={() => setOpen(!open)}
                                            style={{ backgroundImage: `url(${image})` }}
                                        >
                                        </div>
                                    ) : <div></div>}
                                </Tooltip>
                            </ClickAwayListener>
                        </>
                    )
                })}
                {opened && images.filter((image) => image.match(/.mp4/g)).map((image, index) => (
                    <div key={Math.random()} className={`image ${opened ? '' : 'image-with-blur'}`} style={{ backgroundImage: `url(${image})` }}>
                        <video
                            autoPlay={opened}
                            muted
                            loop
                            id='myVideo'
                            onClick={() => { }}
                        >
                            <source src={image} type="video/mp4" />
                        </video>
                    </div>
                ))}
                <div className="spacer" />
            </div>
        </div>
    )
}

export default ComponentImage;