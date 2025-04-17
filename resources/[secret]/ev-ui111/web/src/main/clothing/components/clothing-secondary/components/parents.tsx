import React from 'react';
import useStyles from '../index.styles';
import { ComponentDetails } from 'components/component-details';
import Text from 'components/text/text';
import ClothingArrows from '../../clothing-arrows';
import Slider from './slider';

export default (props: any) => {
    const classes = useStyles(props);
    const [shapeFirst, setShapeFirst] = React.useState(props.data?.currentHeadBlend?.ShapeFirst ?? undefined);
    const [shapeSecond, setShapeSecond] = React.useState(props.data?.currentHeadBlend?.ShapeSecond ?? undefined);
    const [shapeThird, setShapeThird] = React.useState(props.data?.currentHeadBlend?.ShapeThird ?? undefined);
    const [skinFirst, setSkinFirst] = React.useState(props.data?.currentHeadBlend?.SkinFirst ?? undefined);
    const [skinSecond, setSkinSecond] = React.useState(props.data?.currentHeadBlend?.SkinSecond ?? undefined);
    const [skinThird, setSkinThird] = React.useState(props.data?.currentHeadBlend?.SkinThird ?? undefined);
    const [shapeMix, setShapeMix] = React.useState(props.data?.currentHeadBlend?.ShapeMix ?? undefined);
    const [skinMix, setSkinMix] = React.useState(props.data?.currentHeadBlend?.SkinMix ?? undefined);
    const [thirdMix, setThirdMix] = React.useState(props.data?.currentHeadBlend?.ThirdMix ?? undefined);

    const maxHeads = props.data?.barberData?.heads ?? undefined;

    React.useEffect(() => {
        props.changeValue('headBlend', 'setHeadBlend', {
            ShapeFirst: shapeFirst,
            ShapeSecond: shapeSecond,
            ShapeThird: shapeThird,
            SkinFirst: skinFirst,
            SkinSecond: skinSecond,
            SkinThird: skinThird,
            ShapeMix: shapeMix,
            SkinMix: skinMix,
            ThirdMix: thirdMix,
        });
    }, [shapeFirst, shapeSecond, shapeThird, skinFirst, skinSecond, skinThird, shapeMix, skinMix, thirdMix]);

    return (
        <div className={classes.container}>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Face One
                        </Text>
                    )}
                    description={(
                        <div>
                            <Text className={classes.flexInline} variant="body2">
                                {maxHeads} heads
                            </Text>
                            <Text className={classes.flexInline} variant="body2">
                                {maxHeads} skins
                            </Text>
                            <ClothingArrows
                                min={0}
                                max={maxHeads}
                                onChange={(value: any) => setShapeFirst(value)}
                                value={shapeFirst}
                                styles={{ display: 'inline-flex', width: '50%' }}
                            />
                            <ClothingArrows
                                min={0}
                                max={maxHeads}
                                onChange={(value: any) => setSkinFirst(value)}
                                value={skinFirst}
                                styles={{ display: 'inline-flex', width: '50%' }}
                            />
                        </div>
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Face Two
                        </Text>
                    )}
                    description={(
                        <div>
                            <Text className={classes.flexInline} variant="body2">
                                {maxHeads} heads
                            </Text>
                            <Text className={classes.flexInline} variant="body2">
                                {maxHeads} skins
                            </Text>
                            <ClothingArrows
                                min={0}
                                max={maxHeads}
                                onChange={(value: any) => setShapeSecond(value)}
                                value={shapeSecond}
                                styles={{ display: 'inline-flex', width: '50%' }}
                            />
                            <ClothingArrows
                                min={0}
                                max={maxHeads}
                                onChange={(value: any) => setSkinSecond(value)}
                                value={skinSecond}
                                styles={{ display: 'inline-flex', width: '50%' }}
                            />
                        </div>
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Face Three
                        </Text>
                    )}
                    description={(
                        <div>
                            <Text className={classes.flexInline} variant="body2">
                                {maxHeads} heads
                            </Text>
                            <Text className={classes.flexInline} variant="body2">
                                {maxHeads} skins
                            </Text>
                            <ClothingArrows
                                min={0}
                                max={maxHeads}
                                onChange={(value: any) => setShapeThird(value)}
                                value={shapeThird}
                                styles={{ display: 'inline-flex', width: '50%' }}
                            />
                            <ClothingArrows
                                min={0}
                                max={maxHeads}
                                onChange={(value: any) => setSkinThird(value)}
                                value={skinThird}
                                styles={{ display: 'inline-flex', width: '50%' }}
                            />
                        </div>
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h6">
                            Face Mix
                        </Text>
                    )}
                    description={(
                        <Slider
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(value: any) => setShapeMix(value)}
                            value={shapeMix}
                        />
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h6">
                            Skin Mix
                        </Text>
                    )}
                    description={(
                        <Slider
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(value: any) => setSkinMix(value)}
                            value={skinMix}
                        />
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h6">
                            Third Face Mix
                        </Text>
                    )}
                    description={(
                        <Slider
                            min={0}
                            max={1}
                            step={0.01}
                            onChange={(value: any) => setThirdMix(value)}
                            value={thirdMix}
                        />
                    )}
                />
            </div>
        </div>
    )
}