import { Typography } from '@mui/material';
import { getDispatchStateKey } from 'main/dispatch/actions';
import React from 'react';
import useStyles from "../../index.styles";
import Leo from './components/leo';

interface LeosProps {
    updateNumber: number;
}

const Leos: React.FC<LeosProps> = (props) => {
    const classes = useStyles(props);

    if (props.updateNumber === -1) {
        return null;
    }

    const units = getDispatchStateKey('units') ?? [];
    const filteredUnits = units && units?.length > 0 && units?.filter(u => !!u && !u.attachedTo) || [];
    const pdUnitCount = units && units?.length > 0 && units?.filter(u => !!u && u.job === 'police').length || 0;
    const emsUnitCount = units && units?.length > 0 && units?.filter(u => !!u && u.job === 'ems').length || 0;

    return (
        <>
            <div className={classes.leosWrapper}>
                <div className={classes.leosPolice}>
                    <Typography style={{ color: 'white' }}>
                        Police ({pdUnitCount} {pdUnitCount === 1 ? 'unit' : 'units'})
                    </Typography>
                    {filteredUnits?.filter(unit => !!unit && unit.job === 'police')?.map((unit: PoliceUnit) => (
                        <Leo
                            key={unit.serverId}
                            {...unit}
                            job="police"
                            attached={units?.filter(u => !!u && u.attachedTo === unit.serverId)}
                        />
                    ))}
                </div>
                <div>
                    <Typography style={{ color: 'white' }}>
                        EMS ({emsUnitCount} {emsUnitCount === 1 ? 'unit' : 'units'})
                    </Typography>
                    {filteredUnits?.filter(unit => !!unit && unit.job === 'ems')?.map((unit: PoliceUnit) => (
                        <Leo
                            key={unit.serverId}
                            {...unit}
                            job="ems"
                            attached={units?.filter(u => !!u && u.attachedTo === unit.serverId)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Leos;