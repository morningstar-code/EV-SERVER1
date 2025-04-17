import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip, Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

const JsonWrapper = (props) => {
    const children = props.children;
    return (
        <div className="debug-log-json-wrapper">
            {children}
        </div>
    )
}

const Log: FunctionComponent<{ log: any }> = (props) => {
    const log = props.log;
    const data = JSON.stringify(log.data, null, 2);
    const dataLength = data.split(/\n/g).length;
    const result = JSON.stringify(log.result, null, 2);
    const resultLength = result.split(/\n/g).length;

    return (
        <div className={`debug-log-wrapper debug-log-wrapper-${log.arrow ? 'red' : ''}`}>
            <Typography variant="body1" style={{ color: 'black' }}>
                {log.type}: {log.action}
            </Typography>
            <div className="flex flex-row flex-space-between">
                <Typography variant="body1" style={{ color: 'black' }}>
                    Body:
                </Typography>
                {log.type === 'Action' && (
                    <div onClick={() => { }}>
                        <Tooltip title="Replay Request">
                            <div>
                                <FontAwesomeIcon icon="redo" size="sm" fixedWidth />
                            </div>
                        </Tooltip>
                    </div>
                )}
            </div>
            <JsonWrapper>
                <textarea tabIndex={-1} rows={Math.min(dataLength, 8)} defaultValue={data} />
            </JsonWrapper>
            {log.type === 'Action' && (
                <>
                    <Typography variant="body1" style={{ color: 'black' }}>
                        Response: {log.ms ? `${log.ms}ms` : ''}
                    </Typography>
                    <JsonWrapper>
                        <textarea tabIndex={-1} rows={Math.min(resultLength, 8)} defaultValue={result} />
                    </JsonWrapper>
                </>
            )}
        </div>
    );
}

export default Log;