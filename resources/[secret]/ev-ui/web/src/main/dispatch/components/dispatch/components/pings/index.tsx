import { getDispatchStateKey } from 'main/dispatch/actions';
import React from 'react';
import Button from '../../../../../../components/button/button';
import Ping from './components/ping';
import useStyles from "./index.styles";

interface PingsProps {
    updateNumber: number;
}

const Pings: React.FC<PingsProps> = (props) => {
    const classes = useStyles(props);
    const [pingsLoaded, setPingsLoaded] = React.useState(10);

    const STATIC_PINGS: Ping[] = [
        {
            ctxId: 1,
            dispatchCode: "10-99",
            firstStreet: "123 Main St",
            model: "sultan",
            plate: "123-ABC",
            firstColor: "black",
            secondColor: "black"
        },
        {
            ctxId: 2,
            dispatchCode: "10-99",
            firstStreet: "123 Main St",
            model: "sultan",
            plate: "123-ABC",
            firstColor: "black",
            secondColor: "black"
        },
        {
            ctxId: 3,
            dispatchCode: "10-99",
            firstStreet: "123 Main St",
            model: "sultan",
            plate: "123-ABC",
            firstColor: "black",
            secondColor: "black"
        },
        {
            ctxId: 4,
            dispatchCode: "10-99",
            firstStreet: "123 Main St",
            model: "sultan",
            plate: "123-ABC",
            firstColor: "black",
            secondColor: "black"
        },
        {
            ctxId: 5,
            dispatchCode: "10-99",
            firstStreet: "123 Main St",
            model: "sultan",
            plate: "123-ABC",
            firstColor: "black",
            secondColor: "black"
        },
        {
            ctxId: 6,
            priority: 3,
            dispatchCode: "10-99",
            firstStreet: "123 Main St",
            model: "sultan",
            plate: "123-ABC",
            firstColor: "black",
            secondColor: "black"
        },
    ];

    return (
        <>
            {props.updateNumber === -1 ? null : (
                <div className={classes.pingsWrapper}>
                    {getDispatchStateKey('pings').slice(0, pingsLoaded).map((ping: any) => (
                        <Ping key={ping.ctxId} ping={ping} />
                    ))}
                    {getDispatchStateKey('pings').length >= 10 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 8 }}>
                            <Button.Primary onClick={() => setPingsLoaded(pingsLoaded + 10)}>
                                Load More
                            </Button.Primary>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Pings;