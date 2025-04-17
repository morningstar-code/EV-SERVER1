import React from 'react';
import { Typography } from '@mui/material';
import { ComponentDetails } from 'components/component-details';
import { ComponentPaper } from 'components/paper';
import useStyles from './peds.styles';
import Input from 'components/input/input';
import ClothingInput from '../clothing-input';
import ClothingArrows from '../clothing-arrows';

export default (props: any) => {
    const classes = useStyles();

    const [customPed, setCustomPed] = React.useState('');
    const [currentMalePed, setCurrentMalePed] = React.useState(0);
    const [currentFemalePed, setCurrentFemalePed] = React.useState(0);

    const totalMalePeds = props?.data?.pedEntries?.male?.length ?? 0;
    const totalFemalePeds = props?.data?.pedEntries?.female?.length ?? 0;
    const totalWhitelistPeds = props?.data?.pedEntries?.whitelist ?? [];

    const updatePedValue = (value: any) => {
        props.changeValue('ped', 'setPed', value);
    }

    return (
        <div className={classes.innerContainer}>
            <ComponentPaper className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Typography variant="h5" style={{ color: 'white' }}>
                            Male Ped
                        </Typography>
                    )}
                    description={(
                        <div>
                            <Typography variant="body2" style={{ color: 'white' }}>
                                {totalMalePeds} peds
                            </Typography>
                            <ClothingArrows
                                min={0}
                                max={totalMalePeds}
                                onChange={(value: number) => {
                                    value < 0 && (value = totalMalePeds - 1);
                                    value > totalMalePeds - 1 && (value = 0);
                                    setCurrentMalePed(value);
                                    setCurrentFemalePed(0);
                                    updatePedValue({
                                        type: 'male',
                                        value: value
                                    });
                                }}
                                value={currentMalePed}
                                styles={{ display: 'inline-flex', width: '50%' }}
                            />
                        </div>
                    )}
                />
            </ComponentPaper>
            <ComponentPaper className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Typography variant="h5" style={{ color: 'white' }}>
                            Female Ped
                        </Typography>
                    )}
                    description={(
                        <div>
                            <Typography variant="body2" style={{ color: 'white' }}>
                                {totalFemalePeds} peds
                            </Typography>
                            <ClothingArrows
                                min={0}
                                max={totalFemalePeds}
                                onChange={(value: number) => {
                                    value < 0 && (value = totalMalePeds - 1);
                                    value > totalMalePeds - 1 && (value = 0);
                                    setCurrentFemalePed(value);
                                    setCurrentMalePed(0);
                                    updatePedValue({
                                        type: 'female',
                                        value: value,
                                    });
                                }}
                                value={currentFemalePed}
                                styles={{ display: 'inline-flex', width: '50%' }}
                            />
                        </div>
                    )}
                />
            </ComponentPaper>
            <ClothingInput
                changeValue={props.changeValue}
                gender={props?.data?.gender ?? 'male'}
                isCustom={props?.data?.isCustom ?? false}
                name="Face Skin"
                enum="Face"
                type="drawable"
                component={0}
                initialValues={props?.data?.currentDrawables?.Face ?? []}
                components={props?.data?.drawables?.Face.length ?? 0}
                textures={props?.data?.drawables?.Face ?? []}
                whitelistedClothing={props?.data?.whitelistedClothing ?? []}
                nameData={props?.data?.nameData ?? []}
            />
            <ComponentPaper className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Typography variant="h5" style={{ color: 'white' }}>
                            Custom Ped
                        </Typography>
                    )}
                    description={(
                        <form onSubmit={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();

                            if (totalWhitelistPeds && totalWhitelistPeds.includes(customPed.toLocaleLowerCase())) {
                                setCurrentMalePed(0);
                                setCurrentFemalePed(0);
                                updatePedValue({
                                    type: 'custom',
                                    model: customPed.toLowerCase(),
                                });
                            }
                        }}>
                            <Input.Text
                                icon="user-check"
                                value={customPed}
                                onChange={(e: any) => setCustomPed(e)}
                            />
                        </form>
                    )}
                />
            </ComponentPaper>
        </div>
    )
}