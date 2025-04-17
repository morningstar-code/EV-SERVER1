import { Menu, MenuItem, Tooltip } from "@mui/material";
import Text from "components/text/text";
import { formatCurrency } from "lib/format";
import React from "react";
import useStyles from "../index.styles";

export default (props: any) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (e: any, key: any, value: any) => {
        e.stopPropagation();
        e.preventDefault();
        props[key](value);
        setAnchorEl(null);
    }

    const charge = props.charge;

    return (
        <Tooltip
            key={charge.id}
            classes={{ tooltip: classes.tooltipWidth }}
            title={(
                <div>
                    <Text variant="body1" style={{ textAlign: 'center' }}>
                        {charge.description}
                    </Text>
                    {!!charge.accomplicerized && !!charge.accomplice_description && (
                        <>
                            <hr />
                            <Text variant="body2" style={{ textAlign: 'center' }}>
                                as Accomplice
                            </Text>
                            <Text variant="body1" style={{ textAlign: 'center' }}>
                                {charge.accomplice_description}
                            </Text>
                        </>
                    )}
                    {!!charge.accessorized && !!charge.accessory_description && (
                        <>
                            <hr />
                            <Text variant="body2" style={{ textAlign: 'center' }}>
                                as Accessory
                            </Text>
                            <Text variant="body1" style={{ textAlign: 'center' }}>
                                {charge.accessory_description}
                            </Text>
                        </>
                    )}
                </div>
            )}
            placement="top"
            sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }}
        >
            <div
                className={`${classes.charge} ${charge.felony ? classes.chargeFelony : ''} ${charge.held_until_trial ? classes.chargeHut : ''}`}
                onClick={(e: any) => setAnchorEl(e.currentTarget)}
                style={{ height: `${25 + 50 * (1 + charge.accomplicerized + charge.accessorized)}px` }}
            >
                {!!props.onAddCharge && (
                    <Menu
                        id={`charge-menu-${charge.id}`}
                        anchorEl={anchorEl}
                        keepMounted={true}
                        open={Boolean(anchorEl)}
                        onClose={(e: any) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setAnchorEl(null);
                        }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                        }}
                    >
                        <MenuItem
                            onClick={(e: any) => handleClick(e, 'onAddCharge', charge)}
                        >
                            Add Charge
                        </MenuItem>
                        {!!charge.accomplicerized && (
                            <MenuItem
                                onClick={(e: any) => handleClick(e, 'onAddChargeAsAccomplice', charge)}
                            >
                                Add Charge (Accomplice)
                            </MenuItem>
                        )}
                        {!!charge.accessorized && (
                            <MenuItem
                                onClick={(e: any) => handleClick(e, 'onAddChargeAsAccessory', charge)}
                            >
                                Add Charge (Accessory)
                            </MenuItem>
                        )}
                    </Menu>
                )}
                <div style={{ maxWidth: '100%', whiteSpace: 'nowrap' }}>
                    <Text variant="body1" style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', wordBreak: 'break-all' }}>
                        {charge.name}
                    </Text>
                </div>
                <div className={classes.info}>
                    <Text variant="body2" style={{ flex: 1, textAlign: 'center' }}>
                        {charge.time} month(s)
                    </Text>
                    <Text variant="body2" style={{ flex: 1, textAlign: 'center' }}>
                        {formatCurrency(charge.fine)}
                    </Text>
                    <Text variant="body2" style={{ flex: 1, textAlign: 'center' }}>
                        {charge.points} point(s)
                    </Text>
                </div>
                {!!charge.accomplicerized && (
                    <>
                        <div className={classes.accessoryTitle}>
                            <Text variant="body2">
                                as Accomplice
                            </Text>
                        </div>
                        <div key={charge.id} className={classes.info}>
                            <Text variant="body2" style={{ flex: 1, textAlign: 'center' }}>
                                {charge.accomplice_time} month(s)
                            </Text>
                            <Text variant="body2" style={{ flex: 1, textAlign: 'center' }}>
                                {formatCurrency(charge.accomplice_fine)}
                            </Text>
                            <Text variant="body2" style={{ flex: 1, textAlign: 'center' }}>
                                {charge.accomplice_points} point(s)
                            </Text>
                        </div>
                    </>
                )}
                {!!charge.accessorized && (
                    <>
                        <div className={classes.accessoryTitle}>
                            <Text variant="body2">
                                as Accessory
                            </Text>
                        </div>
                        <div key={charge.id} className={classes.info}>
                            <Text variant="body2" style={{ flex: 1, textAlign: 'center' }}>
                                {charge.accessory_time} month(s)
                            </Text>
                            <Text variant="body2" style={{ flex: 1, textAlign: 'center' }}>
                                {formatCurrency(charge.accessory_fine)}
                            </Text>
                            <Text variant="body2" style={{ flex: 1, textAlign: 'center' }}>
                                {charge.accessory_points} point(s)
                            </Text>
                        </div>
                    </>
                )}
            </div>
        </Tooltip>
    )
}