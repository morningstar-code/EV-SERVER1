import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import store from '../../../store';
import { setShowNotificationPanel, setShowSettingsPanel, updateLaptopState } from '../../../actions';
import moment from 'moment';

interface TaskbarProps {
    desktopIcons: Icon[];
}

const Taskbar: FunctionComponent<TaskbarProps> = (props) => {
    const state: LaptopState = useSelector((state: any) => state[store.key]);
    const classes = useStyles();

    const [date, setDate] = React.useState('0/0/0');;

    const generateDate = () => {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        setDate(`${month}/${day}/${year}`);
    }

    React.useEffect(() => {
        generateDate();
    }, []);

    return (
        <div className={classes.taskbar}>
            <div className={classes.mainIcons}>
                <div className={classes.taskbarItem}>
                    <img src="https://i.imgur.com/94Jcaqg.png" alt="file-icon" className={classes.icon} style={{ height: 30 }} />
                </div>
                <div className={classes.taskbarItem}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAHlBMVEUAAAD/uAAAu/Jo6v/862D87mb94Uz+0Cz/uAD/vw2N2j46AAAAAnRSTlMAnxYjQ+0AAAE6SURBVHja7dzBSQRREEXRDsEYnAzGGAyhwUR+AC6UMmsRXNrolEU/lHPXn+bwajeL2TZJkiRJkqTPqtFdGvCcBoxOUOkJKj1BpSeo9ASVnqDSE1R6gkpPUOkJKj1BpSeo9ASVnqBODmAQ8Pa439zTJOB1DwNWGNC5wCigc4FRwAoDWheYBLQuMAlYYUDvAoOA3gUGASsMaF5gDtC8wBxghQHdC4wBuhcYA6wwoH2BKUD7AlOANQp42U8MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4K8A7ocC6AMuDwNdAQAAAAAAAAAAAAAAAAAAAAAAAAD+HeB6/JvsBeAkwH4QAAAAAAAAAAAAAAAAAAAAAADA7wBfdPTBo3/puuU9wPaTjj449R4A4HvAQVPvASRJkiTpo3eErGkYBFzd4QAAAABJRU5ErkJggg==" alt="file-icon" className={classes.icon} />
                </div>
                <div className={`${classes.taskbarItem} ${state.showPixelApp ? classes.open : ''}`} onClick={() => updateLaptopState({ showPixelApp: true })}>
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGymlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDUgNzkuMTYzNDk5LCAyMDE4LzA4LzEzLTE2OjQwOjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIxLTA1LTEwVDE2OjEzOjA1LTA0OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMS0wNy0wOFQyMjoyMDoxNi0wNDowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMS0wNy0wOFQyMjoyMDoxNi0wNDowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjOGE4OGY0Yy1hNWE0LWRlNGUtOWI1OS01YTViNmQ2YmFlMGEiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxZmE2OWNjZC02MWQzLWRiNDYtOGQyZC1kMzc2M2I0Y2ZkMjEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4ZGI2MzczNS1jMWMwLWUxNDktYjEyZS03NTA2YjNmNjRiN2YiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjhkYjYzNzM1LWMxYzAtZTE0OS1iMTJlLTc1MDZiM2Y2NGI3ZiIgc3RFdnQ6d2hlbj0iMjAyMS0wNS0xMFQxNjoxMzowNS0wNDowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MjllZmE3MS0wOWU4LWEwNGEtODNjZS03NTI2ZTEyOGY5MTAiIHN0RXZ0OndoZW49IjIwMjEtMDUtMTFUMTQ6NTQ6NDItMDQ6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzhhODhmNGMtYTVhNC1kZTRlLTliNTktNWE1YjZkNmJhZTBhIiBzdEV2dDp3aGVuPSIyMDIxLTA3LTA4VDIyOjIwOjE2LTA0OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOSAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+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" alt="file-icon" className={classes.icon} />
                </div>
                {props.desktopIcons && props.desktopIcons.map((item, index) => (
                    item.opened() && (
                        <div key={index} className={`${classes.taskbarItem} ${item.opened() ? classes.open : ''}`}>
                            {typeof item.icon === 'string' ? (
                                <img src={item.icon} style={{ height: 30 }} alt="file-icon" className={classes.icon} />
                            ) : (
                                item.icon()
                            )}
                        </div>
                    )
                ))}
            </div>
            <div className={`${classes.smallIcon} ${state.showSettingsPanel ? classes.open : ''}`}>
                <i onClick={() => setShowSettingsPanel(!state.showSettingsPanel)} className="fas fa-cog fa-1x" style={{ color: '#fff' }}></i>
            </div>
            <div className={classes.smallIcon}>
                <i className="fas fa-wifi fa-1x" style={{ color: '#fff' }}></i>
            </div>
            <div className={classes.systemTime}>
                <Typography variant="body1" style={{ color: '#fff', fontSize: '1em' }}>
                    {moment().format('h:mm A')}
                </Typography>
                <Typography variant="body1" style={{ color: '#fff', fontSize: '1em' }}>
                    {date}
                </Typography>
            </div>
            <div className={`${classes.taskbarItem} ${state.showNotificationPanel ? classes.open : ''}`}>
                <div onClick={() => setShowNotificationPanel(!state.showNotificationPanel)} className={classes.notficationIcon}>
                </div>
            </div>
        </div >
    );
}

export default Taskbar;