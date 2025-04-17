import { Typography } from '@mui/material';
import useStyles from './contextmenu.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Zoom } from "@mui/material"

export default (props: any) => {
    const classes = useStyles();

    return (
        <>
            {/* <Zoom
                timeout="300"
            > */}

                <div 
                    style={{ 
                        height: '100vh', 
                        width: '100vw', 

                        display: 'flex',
                        pointerEvents: 'all', 
                }}>
                    <div className={classes.contextFlexContainer} style={{ paddingLeft: '120px' }}>
                        {/* <div className={classes.contextLeftInnerContainer}>
                            {props.position.toString().toLowerCase() === 'left' && props.menus && props.menus.length > 0 ? (
                                props.menus.map((context) => (
                                    <>
                                        <div onClick={() => props.handleActionClick(context.action, context.key, context.disabled, context.children, context.backButton, context.extraAction)} className={context.disabled !== undefined && context.disabled === true ? classes.contextButtonDisabled : classes.contextButton} style={{ opacity: props.showButton ? '1' : '0', paddingRight: context.children !== undefined ? '0px' : '8px', paddingLeft: context.backButton !== undefined ? '0px' : '8px', marginBottom: context.backButton !== undefined ? '16px' : '8px', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>
                                            <div style={{ display: context.icon !== undefined ? '' : 'none', margin: 'auto 0px', width: '10%' }}>
                                                <FontAwesomeIcon icon={context.icon} width="14" fixedWidth />
                                            </div>
                                            <div className={classes.contextButtonFlex}>
                                            
                                                <div className={classes.contextButtonChevron} style={{ display: context.backButton !== undefined ? '' : 'none' }}>
                                                    <FontAwesomeIcon icon="chevron-left" width="10" fixedWidth />
                                                </div>

                                                <div>
                                                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>{context.title !== undefined ? context.title : ''}</Typography>
                                                    <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body2" gutterBottom>{context.description !== undefined ? context.description : ''}</Typography>
                                                </div>
                                            </div>

                                            <div className={classes.contextButtonChevron} style={{ display: context.children?.length > 0 ? '' : 'none' }}>
                                                <FontAwesomeIcon icon="chevron-right" width="10" fixedWidth />
                                            </div>
                                        </div>
                                    </>
                                ))
                            ) : (
                                <>
                                </>
                            )}
                        </div> */}
                    </div>
                    <div className={classes.contextFlexContainer} style={{ paddingLeft: '120px' }}>
                        <div className={classes.contextRightInnerContainer}>
                            {props.position.toString().toLowerCase() === 'right' && props.menus && props.menus.length > 0 ? (
                                props.menus.map((context, index) => (
                                    <>
                                        {/* <div className={classes.header}>
                                            <Typography style={{ color: '#fff', wordBreak: 'break-word' }} variant="body1" gutterBottom>{context.header !== undefined ? context.header : ''}</Typography>
                                        </div> */}

                                        <div onClick={() => props.handleActionClick(context.action, context.key, context.disabled, context.children, context.backButton, context.extraAction)} className={context.disabled !== undefined && context.disabled === true ? classes.contextButtonDisabled : classes.contextButton} style={{ opacity: props.active ? '1' : '0', paddingRight: context.children !== undefined ? '0px' : '8px', paddingLeft: context.backButton !== undefined ? '0px' : '8px', marginBottom: context.backButton !== undefined ? '10px' : '2px', transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms' }}>

                                            <div className={classes.contextButtonFlex}>
                                                <div className={classes.contextButtonChevron} style={{ display: context.backButton !== undefined ? '' : 'none' }}>
                                                    <FontAwesomeIcon icon="chevron-left" width="10" fixedWidth />
                                                </div>
                                                    <div>
                                                        <Typography 
                                                            style={{ color: 'lightgrey', wordBreak: 'break-word' }} variant="body1" gutterBottom>
                                                            <FontAwesomeIcon style={{ paddingRight: '.5vh', fontWeight: 'bold', color: '#fff' }} icon={context.icon} width="14" fixedWidth />
                                                                {context.title !== undefined ? context.title : ''}
                                                        </Typography>
                                                        <Typography style={{ color: '#a8b0bb', wordBreak: 'break-word' }} variant="body2" gutterBottom>{context.description !== undefined ? context.description : ''}</Typography>
                                                    </div>
                                                </div>
                                                
                                            <div className={classes.contextButtonChevron} style={{ display: context.children?.length > 0 ? '' : 'none' }}>
                                                <FontAwesomeIcon icon="chevron-right" width="10" fixedWidth />
                                            </div>
                                        </div>
                                    </>
                                ))
                            ) : (
                                <>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            {/* </Zoom> */}
        </>
    )
}