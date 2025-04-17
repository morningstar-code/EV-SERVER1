import React from 'react';
import useStyles from '../index.styles';
import { ComponentDetails } from 'components/component-details';
import Text from 'components/text/text';
import { baseStyles } from 'lib/styles';
import ClothingArrows from '../../clothing-arrows';
import Slider from './slider';
import ClothingInput from '../../clothing-input';
import Color from '../../clothing-page/components/color';

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

    const [eyebrows, setEyebrows] = React.useState(currentOverlays?.Eyebrows ?? defaultData);
    const [facialHair, setFacialHair] = React.useState(currentOverlays?.FacialHair ?? defaultData);
    const [chestHair, setChestHair] = React.useState(currentOverlays?.ChestHair ?? defaultData);
    const [selectedFade, setSelectedFade] = React.useState<any>(); //TODO;

    const hairData = {
        eyebrows: ['Eyebrows', eyebrows, setEyebrows],
        facialHair: ['Facial Hair', facialHair, setFacialHair],
        chestHair: ['Chest Hair', chestHair, setChestHair],
    };

    React.useEffect(() => {
        props.changeValue('overlays', 'setOverlays', {
            Eyebrows: eyebrows,
            FacialHair: facialHair,
            ChestHair: chestHair,
        });
    }, [eyebrows, facialHair, chestHair]);

    React.useEffect(() => {
        props.changeValue('fade', 'setFade', {
            ...props.data?.availableFades[selectedFade]
        });
    }, [selectedFade]);

    return (
        <div className={classes.container}>
            <ClothingInput />
            <Color {...props} />
            <div className={classes.paperContainer}>

            </div>
            {Object.entries(hairData).map(([key, value]: any) => {})}
        </div>
    )
}