import { Typography } from '@mui/material';
import useStyles from '../index.styles';
import { useSelector } from 'react-redux';
import { isEnvBrowser } from 'utils/misc';
import { isDevel } from 'lib/env';

export default (props: any) => {
    const state = useSelector((state: any) => state.mdt);
    const classes = useStyles(props);

    return (
        <div className={classes.navWrapper}>
            <div className={classes.mainMenu}>
                {props.pages && props.pages.filter((page) => {
                    return (function (prop, config) {
                        const hideFromNav = config.hideFromNav ?? false;
                        const jobs = config.jobs;
                        const publicApp = config.publicApp;

                        return (
                            !hideFromNav &&
                            (!prop.publicApp ||
                                prop.publicApp === publicApp) &&
                            (prop.permissions.steam ||
                                !jobs ||
                                jobs)
                        )
                    })(props, page);
                }).map((page: any) => {
                    const name = page.name;

                    return (
                        <div
                            key={name}
                            className={props.page === name ? `${classes.navItem} ${classes.navActive}` : classes.navItem}
                            onClick={() => {
                                props.updateState({ page: name });
                            }}
                        >
                            <Typography variant="h6" style={{ color: 'white' }}>
                                {name}
                            </Typography>
                        </div>
                    )
                })}
                {/* !props.publicApp && props.permissions.steam || state.permissions.steam_id == 'steam:1100001429eb87b' */}
                {!props.publicApp && props.permissions.steam && (
                    <div>
                        <div
                            className={props.page === 'Config' ? `${classes.navItem} ${classes.navActive}` : classes.navItem}
                            onClick={() => {
                                props.updateState({ page: 'Config' })
                            }}
                        >
                            <Typography variant="h6" style={{ color: 'white' }}>
                                Config
                            </Typography>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}