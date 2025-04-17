import { Menu, MenuItem, Typography } from "@mui/material";
import Button from "components/button/button";
import React from "react";
import useStyles from "../index.styles";
import Modal from "../modal";

export default (props: any) => {
    const classes = useStyles();
    const [modalData, setModalData] = React.useState<any>({
        show: false,
        fields: []
    });
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const resetAnchor = () => {
        setAnchorEl(null);
    }

    return (
        <div className={classes.wrapper}>
            {modalData.show && (
                <div className={classes.modalWrapper}>
                    <Modal
                        fields={modalData.fields}
                        onCancel={() => setModalData({ show: false })}
                        onSubmit={(value: any) => modalData.onSubmit(value)}
                    />
                </div>
            )}
            <div className={classes.itemHeadingInner}>
                <Typography variant="h6">
                    {props.heading}
                </Typography>
                <div className={classes.burgerWrapper}>
                    {props.action && (
                        <div>
                            <Button.Primary onClick={() => setModalData({ show: true, fields: props.action.fields, onSubmit: props.action.onSubmit })}>
                                {props.action.label}
                            </Button.Primary>
                        </div>
                    )}
                    {props.burger && (
                        <div className={classes.itemHeadingActions}>
                            <div onClick={(e) => setAnchorEl(e.currentTarget)}>
                                <i className="fas fa-ellipsis-v fa-fw fa-lg" style={{ color: '#fff' }}></i>
                            </div>
                            <Menu
                                id="fade-menu"
                                anchorEl={anchorEl}
                                keepMounted={true}
                                open={Boolean(anchorEl)}
                                onClose={resetAnchor}
                            >
                                {props.burger.map((item: any) => {
                                    const label = item.label;
                                    const onClick = item.onClick;
                                    return (
                                        <MenuItem
                                            key={label}
                                            onClick={() => {
                                                resetAnchor();
                                                onClick && onClick();
                                                item.isForm && setModalData({ show: true, fields: item.fields, onSubmit: item.onSubmit })
                                            }}>
                                            {label}
                                        </MenuItem>
                                    )
                                })}
                            </Menu>
                        </div>
                    )}
                </div>
            </div>
            {props.children}
        </div>
    )
}