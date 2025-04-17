import React, { FunctionComponent } from "react";
import { Tooltip, Typography } from "@mui/material";
import useStyles from "../index.styles";
import { formatNumber } from "lib/format";
import { callStart } from "main/phone/apps/call-history/events";

interface AdProps {
    ad: any;
}

const Ad: FunctionComponent<AdProps> = (props) => {
    const classes = useStyles();
    const ad = props.ad;

    return (
        <div className={classes.ad}>
            <div style={{ padding: 8 }}>
                <Typography variant="body2">
                    {ad.text}
                </Typography>
            </div>
            <div className={classes.details}>
                <div className={classes.name} style={{ flex: 1 }} >
                    <Typography variant="body2" style={{ fontSize: '0.75rem !important' }}>
                        {ad.character.first_name} {ad.character.last_name}
                    </Typography>
                </div>
                <Tooltip title="Call" placement="bottom" sx={{ backgroundColor: 'rgba(97, 97, 97, 0.9)', fontSize: '1em', maxWidth: '1000px' }} arrow>
                    <div style={{ flex: 1 }} onClick={() => callStart({ number: ad.character.number })}>
                        <Typography variant="body2" style={{ fontSize: '0.75rem !important' }}>
                            {formatNumber(ad.character.number)}
                        </Typography>
                    </div>
                </Tooltip>
            </div>
        </div>
    )
}

export default Ad;