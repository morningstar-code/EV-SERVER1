import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';
import Service from './service';

const services: BozoWebService[] = [
    {
        id: 'plateLookup',
        data: {
            name: 'Plate Lookup',
            description: 'Find out what name is registered to a fake plate number.',
            callBack: 'plateLookup',
            price: 30,
            cryptoName: 'GNE',
            cryptoLogo: 'chess-knight',
            imageLogo: 'car-side',
        },
    }
]

const BozoWebPage: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.bozoWebServicesContainer}>
                {services && services.map((service: BozoWebService) => (
                    <Service key={service.id} bozoWebService={service} />
                ))}
            </div>
        </div>
    );
}

export default BozoWebPage;