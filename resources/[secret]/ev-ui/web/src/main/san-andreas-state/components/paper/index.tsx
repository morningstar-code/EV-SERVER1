import { Fade, Menu, MenuItem } from "@mui/material";
import Spinner from "components/spinner/spinner";
import Text from "components/text/text";
import React from "react";
import useStyles from "../index.styles";
import Modal from "../modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default (props: any) => {
    const includeConfirm = props.includeConfirm ?? false;
    const [loading, setLoading] = React.useState(false);
    const [modalData, setModalData] = React.useState<any>({
        show: false,
        fields: []
    });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const anchorElBool = Boolean(anchorEl);

    const resetAnchor = () => {
        setAnchorEl(null);
    }

    const classes = useStyles();
    const randomId = Math.random();

    return (
        <div className={classes.itemWrapper}>
            {modalData.show && (
                <div className={classes.modalWrapper}>
                    <Modal
                        fields={modalData.fields}
                        isConfirm={modalData.isConfirm}
                        onCancel={() => setModalData({ show: false })}
                        onSubmit={(value: any) => modalData.onSubmit(value)}
                    />
                </div>
            )}
            {loading && (
                <div className={classes.modalWrapper}>
                    <Spinner />
                </div>
            )}
            <div className={classes.itemHeading}>
                <div className={classes.itemHeadingInner}>
                    <Text variant="body1">
                        {props.heading}
                    </Text>
                    {props.headingExtra && (
                        <Text variant="body1">
                            {props.headingExtra}
                        </Text>
                    )}
                </div>
                {props.actions && props.actions.length > 0 && (
                    <div className={classes.itemHeadingActions}>
                        <div
                            onClick={(e: any) => setAnchorEl(e.currentTarget)}
                        >
                            <FontAwesomeIcon icon="ellipsis-v" />
                        </div>
                        <Menu
                            id={`fade-menu-${randomId}`}
                            anchorEl={anchorEl}
                            keepMounted={true}
                            open={anchorElBool}
                            onClose={resetAnchor}
                            TransitionComponent={Fade}
                        >
                            {props.actions.map((action: any) => {
                                const label = action.label;
                                const onClick = action.onClick;
                                return (
                                    <MenuItem
                                        key={label}
                                        onClick={() => {
                                            const click = { loading: setLoading };
                                            resetAnchor();
                                            onClick && onClick(click);
                                            action.isForm && setModalData({
                                                show: true,
                                                fields: action.fields,
                                                onSubmit: action.onSubmit
                                            });
                                            action.isConfirm && setModalData({
                                                isConfirm: true,
                                                show: true,
                                                onSubmit: action.onConfirm
                                            });
                                        }}
                                    >
                                        {label}
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                    </div>
                )}
            </div>
            {React.Children.map(props.children, (child: any) => {
                const func = {
                    confirm: (onSubmit: any) => {
                        setModalData({
                            isConfirm: true,
                            show: true,
                            onSubmit: onSubmit
                        });
                    }
                }
                return React.isValidElement(child)
                    ? React.cloneElement(child, includeConfirm ? func : {})
                    : child;
            })}
        </div>
    )
}