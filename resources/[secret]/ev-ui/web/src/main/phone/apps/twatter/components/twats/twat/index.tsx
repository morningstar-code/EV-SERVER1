import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { FindImagesInString } from "lib/images";
import { Tooltip, Typography } from "@mui/material";
import useStyles from "./index.styles";
import ComponentImage from "components/component-image";
import moment from "moment";
import { closeConfirmModal, closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import TwatModal from "../../twat-modal";
import { nuiAction } from "lib/nui-comms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '@fortawesome/fontawesome-svg-core/styles.css';

interface TwatProps {
    twat: any;
    reloadUsers: () => Promise<void>;
}

const Twat: FunctionComponent<TwatProps> = (props) => {
    const twitterEnabled = useSelector((state: any) => state.system.account.twitterEnabled);
    const name = `@${props.twat.character.first_name} ${props.twat.character.last_name}`.replace(/\s+/g, '_');
    const messageData = FindImagesInString(props.twat?.text);
    const images = messageData.images;
    const message = messageData.message;

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div>
                <Typography variant="body1" style={{ color: '#fff' }}>
                    {name}
                    {props.twat.isBlue && (
                        <Tooltip placement="left" title="This citizen is subscribed to Twatter Blu" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <span>
                                <FontAwesomeIcon
                                    icon="badge-check"
                                    size="lg"
                                    color="#00b8ff"
                                    style={{ marginLeft: 5 }}
                                />
                            </span>
                        </Tooltip>
                    )}
                    {props.twat.isGold && (
                        <Tooltip placement="left" title="Official Twatter Admin" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <span className="fa-layers fa-fw" style={{ marginLeft: 5 }}>
                                <FontAwesomeIcon
                                    icon="certificate"
                                    size="lg"
                                    color="#e2b719"
                                />
                                <FontAwesomeIcon
                                    icon="check"
                                    color="black"
                                    transform="shrink-6"
                                />
                            </span>
                        </Tooltip>
                    )}
                </Typography>
            </div>
            <div className={classes.content}>
                <Typography variant="body2" style={{ color: '#fff' }}>
                    {message}
                </Typography>
            </div>
            {images && images.length > 0 && (
                <ComponentImage
                    key={props.twat.timestamp}
                    images={images}
                />
            )}
            <div className={classes.footer} style={{ marginTop: images.length > 0 ? 8 : 0 }}>
                <div className={classes.actions}>
                    {twitterEnabled && (
                        <Tooltip title="Reply" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div onClick={() => {
                                openPhoneModal(
                                    <TwatModal twat={`${name} `} />
                                )
                            }}>
                                <i className="fas fa-reply fa-fw fa-sm" style={{ color: '#fff' }}></i>
                            </div>
                        </Tooltip>
                    )}
                    {twitterEnabled && (
                        <Tooltip title="RT" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div onClick={() => {
                                const text = props.twat.text.includes('RT @') ? props.twat.text : `RT ${name} ${props.twat.text}`

                                openPhoneModal(
                                    <TwatModal twat={text.substring(0, 255)} />
                                )
                            }}>
                                <i className="fas fa-retweet fa-fw fa-sm" style={{ color: '#fff' }}></i>
                            </div>
                        </Tooltip>
                    )}
                    <Tooltip title="Report" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div onClick={async () => {
                            setPhoneModalLoading();

                            const results = await nuiAction('ev-ui:twatReport', {
                                twat: props.twat
                            });

                            if (results.meta.ok) {
                                closePhoneModal();
                            } else {
                                setPhoneModalError(results.meta.message);
                            }
                        }}>
                            <i className="fas fa-flag fa-fw fa-sm" style={{ color: '#fff' }}></i>
                        </div>
                    </Tooltip>
                    <Tooltip title="Block" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                        <div onClick={() => {
                            openConfirmModal(
                                async () => {
                                    setPhoneModalLoading();

                                    await nuiAction('ev-ui:blockTwatterUser', {
                                        cid: props.twat.character.id
                                    });

                                    closeConfirmModal();
                                    props.reloadUsers();
                                },
                                "Do you really want to block this user?"
                            )
                        }}>
                            <i className="fas fa-shield-alt fa-fw fa-sm" style={{ color: '#fff' }}></i>
                        </div>
                    </Tooltip>
                </div>
                <div className={classes.when}>
                    <Typography variant="body2" style={{ color: '#fff' }}>
                        {moment(props.twat.timestamp).fromNow()}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

export default Twat;