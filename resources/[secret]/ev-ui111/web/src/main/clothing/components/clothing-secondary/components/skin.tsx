import React from 'react';
import useStyles from '../index.styles';
import { ComponentDetails } from 'components/component-details';
import Text from 'components/text/text';
import { baseStyles } from 'lib/styles';
import ClothingArrows from '../../clothing-arrows';
import Slider from './slider';

export default (props: any) => {
    const classes = useStyles(props);

    const defaultData = {
        value: 0,
        colorType: 0,
        firstColor: 0,
        secondColor: 0,
        opacity: 0,
    };

    const currentOverlays = props.data?.currentOverlays ?? undefined;

    const [blemishes, setBlemishes] = React.useState(currentOverlays?.Blemishes ?? defaultData);
    const [ageing, setAgeing] = React.useState(currentOverlays?.Ageing ?? defaultData);
    const [complexion, setComplexion] = React.useState(currentOverlays?.Complexion ?? defaultData);
    const [sunDamage, setSunDamage] = React.useState(currentOverlays?.SunDamage ?? defaultData);
    const [molesFreckles, setMolesFreckles] = React.useState(currentOverlays?.MolesFreckles ?? defaultData);
    const [bodyBlemishes, setBodyBlemishes] = React.useState(currentOverlays?.BodyBlemishes ?? defaultData);

    const skinData = {
        blemishes: ['Blemishes', blemishes, setBlemishes],
        ageing: ['Ageing', ageing, setAgeing],
        complexion: ['Complexion', complexion, setComplexion],
        sunDamage: ['Sun Damage', sunDamage, setSunDamage],
        molesFreckles: ['Moles & Freckles', molesFreckles, setMolesFreckles],
        bodyBlemishes: ['Body Blemishes', bodyBlemishes, setBodyBlemishes],
    };

    React.useEffect(() => {
        props.changeValue('overlays', 'setOverlays', {
            Blemishes: blemishes,
            Ageing: ageing,
            Complexion: complexion,
            SunDamage: sunDamage,
            MolesFreckles: molesFreckles,
            BodyBlemishes: bodyBlemishes,
        });
    }, [blemishes, ageing, complexion, sunDamage, molesFreckles, bodyBlemishes]);

    return (
        <div className={classes.container}>
            {Object.entries(skinData).map(([key, value]: any) => {
                const foundHeadOverlay = props.data?.barberData?.headOverlays?.find((headOverlay: any) => headOverlay.name.toLocaleLowerCase() === key.toLocaleLowerCase());

                return (
                    <div key={value[0]} className={classes.paperContainer}>
                        <ComponentDetails
                            title={(
                                <Text variant="h5">
                                    {value[0]}
                                </Text>
                            )}
                            description={(
                                <>
                                    <Text variant="body2" style={{ color: baseStyles.textColorGrey() }}>
                                        {foundHeadOverlay?.total ?? 0} items
                                    </Text>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <ClothingArrows
                                            min={0}
                                            max={foundHeadOverlay?.total ?? 0 + 1}
                                            onChange={(v: any) => {
                                                value[2]({
                                                    ...value[1],
                                                    value: v - 1
                                                });
                                            }}
                                            value={value[1].value ? 0 : value[1].value + 1}
                                            styles={{ display: 'inline-flex', width: '50%' }}
                                        />
                                        <Slider
                                            key={key}
                                            min={0}
                                            max={1}
                                            step={0.01}
                                            onChange={(opacity: any) => {
                                                value[2]({
                                                    ...value[1],
                                                    opacity: opacity
                                                });
                                            }}
                                            label="Opacity"
                                            value={value[1].opacity}
                                            styles={{ display: 'inline-flex', width: '45%' }}
                                        />
                                    </div>
                                </>
                            )}
                        />
                    </div>
                )
            })}
        </div>
    )
}