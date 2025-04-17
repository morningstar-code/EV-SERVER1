import { getDispatchStateKey } from 'main/dispatch/actions';
import React from 'react';
import Call from './components/call';
import useStyles from "./index.styles";

interface CallsProps {
    updateNumber: number;
}

const Calls: React.FC<CallsProps> = (props) => {
    const classes = useStyles(props);

    return (
        <>
            {props.updateNumber === -1 ? null : (
                <div className={classes.pingsWrapper}>
                    {getDispatchStateKey('activeCalls').map((call: any) => (
                        <Call key={call.ctxId} ping={call} />
                    ))}
                    {/* Need to sort inactive calls based on ctxId, the highest at top and lowest at bottom etc. */}
                    {getDispatchStateKey('inactiveCalls').sort((a: any, b: any) => b.ctxId - a.ctxId).map((call: any) => { //TODO; Doesn't work. Need to fix
                        const unix = Math.round(Date.now() / 1000);
                        return (
                            <Call
                                key={call.ctxId}
                                ping={call}
                                opaque={Number(call.timestamp || 0) < unix - 900}
                            />
                        )
                    })}
                </div>
            )}
        </>
    );
}

export default Calls;