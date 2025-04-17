import { Typography } from '@mui/material';
import React, { FunctionComponent } from 'react';
import Button from 'components/button/button';
import { nuiAction } from 'lib/nui-comms';
import { AddSystemNotification } from '../../../../laptop-screen';
import ConfirmModal from '../confirm-modal';
import useStyles from './index.styles';

interface ServiceProps {
    bozoWebService: BozoWebService;
}

const Service: FunctionComponent<ServiceProps> = (props) => {
    const classes = useStyles();
    const service = props.bozoWebService?.data;
    const [confirmModal, setConfirmModal] = React.useState(false);

    return (
        <div className={classes.bozoWebService}>
            <i className={`fas fa-${service.imageLogo} fa-fw fa-6x`} style={{ color: 'white' }}></i>
            <Typography variant="h1" className={classes.bozoWebTextTitle}>
                {service.name}
            </Typography>
            <Typography className={classes.bozoWebTextDescription}>
                {service.description}
            </Typography>
            <ul className={classes.bozoWebPartInfo}>
                <Typography style={{ color: 'white' }} className={classes.bozoWebPartInfoText}>
                    Price: <i className={`fas fa-${service.cryptoLogo} fa-fw fa-lg`} style={{ color: 'white' }}></i> {service.price} {service.cryptoName.toUpperCase()}
                </Typography>
            </ul>
            <Button.Primary onClick={() => setConfirmModal(true)} className={classes.bozoWebPurchase}>
                Purchase
            </Button.Primary>
            <ConfirmModal
                open={confirmModal}
                handleClose={async (bool?: boolean, service?: BozoWebService, data?: { amount: number, licensePlate: string })  => {
                    if (!bool) {
                        setConfirmModal(false);
                        return;
                    }

                    const result = await nuiAction(`ev-vehicles:${service.data.callBack}`, {
                        serviceData: data
                    });

                    AddSystemNotification({
                        show: true,
                        icon: 'https://static.thenounproject.com/png/3365408-200.png',
                        title: `${result.meta.ok ? '' : '[FAILURE] '} BozoWeb Service`,
                        message: result.meta.ok ? 'You have purchased a service. Details will arrive in an email.' : result.meta.message,
                    });

                    setConfirmModal(false);
                }}
                service={props.bozoWebService}
            />
        </div>
    );
}

export default Service;