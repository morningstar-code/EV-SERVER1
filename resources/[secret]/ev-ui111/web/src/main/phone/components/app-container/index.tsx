import { Fade, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";
import Input from "components/input/input";
import useStyles from "./index.styles";

interface AppContainerProps {
    style?: any;
    onClickBack?: () => void;
    search?: any;
    titularInput?: any;
    primaryActions?: any;
    auxActions?: any;
    containerStyle?: any;
    emptyMessage?: boolean;
    fadeIn?: boolean;
    removePadding?: boolean;
    background?: string;
}

const AppContainer: FunctionComponent<AppContainerProps> = (props) => {
    const classes = useStyles(props);
    const [searchValue, setSearchValue] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const anchorElBool = Boolean(anchorEl);
    const style = props.style ? props.style : {};

    const resetAnchor = () => {
        setAnchorEl(null);
    }

    return (
        <div className={classes.wrapper} style={style}>
            {(props.onClickBack || props.search) && (
                <div className={classes.searchContainer}>
                    {props.onClickBack !== undefined && (
                        <Tooltip title="Go Back" placement="right" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                            <div className={classes.backButton} onClick={props.onClickBack}>
                                <i className="fas fa-chevron-left fa-fw fa-lg" style={{ color: '#fff' }}></i>
                            </div>
                        </Tooltip>
                    )}
                    {props.search && (
                        <div className={classes.search}>
                            <Input.Search
                                onChange={(e) => {
                                    if ((setSearchValue(e), e)) {
                                        if (e !== '') {
                                            const allowed = props.search.filter;
                                            const realList = props.search.list;
                                            const _searchValue = e.toString().toLowerCase()

                                            const filtered = realList
                                                .filter(obj =>
                                                    Object.keys(obj).some(k => allowed.includes(k))
                                                )
                                                .filter(obj =>
                                                    Object.values(obj)
                                                        .map(v => v?.toString().toLocaleLowerCase())
                                                        .some(v => v?.startsWith(_searchValue))
                                                )

                                            props.search.onChange(filtered, e);
                                        } else {
                                            props.search.onChange(props.search.list);
                                        }
                                    } else {
                                        props.search.onChange(props.search.list);
                                    }
                                }}
                                value={searchValue}
                            />
                        </div>
                    )}
                    {props.titularInput && (
                        <div className={classes.search}>
                            {props.titularInput}
                        </div>
                    )}
                </div>
            )}
            {(props.primaryActions || props?.auxActions) && (
                <>
                    <div className={classes.actions}>
                        {props.primaryActions && props.primaryActions.map((action: any, index: number) => {
                            return (
                                <Tooltip key={`${action.title}${action.icon}`} title={action.title} placement="left" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                                    <div className={classes.action} onClick={action.onClick ? action.onClick : () => { }}>
                                        <i className={`${action.iconType ? action.iconType : 'fas'} fa-${action.icon} fa-fw fa-lg`} style={{ color: '#fff' }}></i>
                                    </div>
                                </Tooltip>
                            )
                        })}
                        {props.auxActions && props.auxActions.length > 0 && (
                            <>
                                <div className={classes.action} onClick={(e) => setAnchorEl(e.currentTarget)} style={{ marginLeft: 0 }}>
                                    <i className="fas fa-ellipsis-v fa-fw fa-lg" style={{ color: '#fff' }}></i>
                                </div>
                                <Menu
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    keepMounted
                                    open={anchorElBool}
                                    onClose={resetAnchor}
                                    TransitionComponent={Fade}
                                >
                                    {props.auxActions.map((a: any, i: number) => (
                                        <MenuItem
                                            key={a.title} onClick={() => {
                                                resetAnchor();
                                                a.onClick();
                                            }}>
                                            <div style={{ minWidth: 32 }}>
                                                <i className={`fas fa-${a.icon} fa-fw fa-sm`} style={{ color: '#fff' }}></i>
                                            </div>
                                            <Typography variant="body2" style={{ color: '#fff' }}>{a.title}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        )}
                    </div>
                </>
            )}
            <div className={classes.container} style={props.containerStyle || {}}>
                {!!props.emptyMessage && (
                    <div className="flex-centered" style={{ padding: 32, flexDirection: 'column', textAlign: 'center' }}>
                        <i className="fas fa-frown fa-fw fa-3x" style={{ color: '#fff', marginBottom: 32 }}></i>
                        <Typography variant="h6" style={{ color: '#fff' }}>Nothing Here!</Typography>
                    </div>
                )}
                {props.children}
            </div>
        </div>
    )
}

export default AppContainer;