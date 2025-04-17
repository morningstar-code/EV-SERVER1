import React from 'react';
import { Typography } from '@mui/material';
import Input from 'components/input/input';
import Button from 'components/button/button';
import useStyles from '../../index.styles';

export default (props: any) => {
    const classes = useStyles();
    const [license, setLicense] = React.useState<any>(1);

    return (
        <div>
            <div className={classes.modalGroup}>
                <div className={classes.modalItem}>
                    <Typography variant="body2"style={{ color: 'white' }}>
                        Assign License
                    </Typography>
                </div>
                <div className={classes.modalItem}>
                    <Input.Select
                        items={props.licenses}
                        label="Licenses"
                        onChange={setLicense}
                        value={license}
                    />
                </div>
                <div className={classes.modalItem}>
                    <Button.Primary
                        onClick={() => {
                            props.addLicense(license);
                        }}
                    >
                        Save
                    </Button.Primary>
                </div>
            </div>
        </div>
    )
}