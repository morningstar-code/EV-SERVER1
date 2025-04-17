import React from 'react';
import useStyles from '../index.styles';
import { ComponentDetails } from 'components/component-details';
import Text from 'components/text/text';
import Slider from './slider';
import ClothingArrows from '../../clothing-arrows';
import Input from 'components/input/input';

export default (props: any) => {
    const classes = useStyles(props);

    const defaultFaceData = {
        nose_width: 0,
        nose_peak: 0,
        nose_length: 0,
        nose_bone_curveness: 0,
        nose_tip: 0,
        nose_bone_twist: 0,
        eyebrow_up_down: 0,
        eyebrow_in_out: 0,
        cheek_bones: 0,
        cheek_sideways_bone_size: 0,
        cheek_bones_width: 0,
        eye_opening: 0,
        lip_thickness: 0,
        jaw_bone_width: 0,
        jaw_bone_shape: 0,
        chin_bone: 0,
        chin_bone_length: 0,
        chin_bone_shape: 0,
        chin_hole: 0,
        neck_thickness: 0
    };

    const currentFace = props.data?.currentFace ?? defaultFaceData;

    const [noseWidth, setNoseWidth] = React.useState(currentFace.nose_width);
    const [nosePeak, setNosePeak] = React.useState(currentFace.nose_peak);
    const [noseLength, setNoseLength] = React.useState(currentFace.nose_length);
    const [noseBoneCurveness, setNoseBoneCurveness] = React.useState(currentFace.nose_bone_curveness);
    const [noseTip, setNoseTip] = React.useState(currentFace.nose_tip);
    const [noseBoneTwist, setNoseBoneTwist] = React.useState(currentFace.nose_bone_twist);
    const [eyebrowUpDown, setEyebrowUpDown] = React.useState(currentFace.eyebrow_up_down);
    const [eyebrowInOut, setEyebrowInOut] = React.useState(currentFace.eyebrow_in_out);
    const [currentEyeColor, setCurrentEyeColor] = React.useState(props.data?.currentEyeColor ?? undefined);
    const [cheekBones, setCheekBones] = React.useState(currentFace.cheek_bones);
    const [cheekSidewaysBoneSize, setCheekSidewaysBoneSize] = React.useState(currentFace.cheek_sideways_bone_size);
    const [cheekBonesWidth, setCheekBonesWidth] = React.useState(currentFace.cheek_bones_width);
    const [eyeOpening, setEyeOpening] = React.useState(currentFace.eye_opening);
    const [lipThickness, setLipThickness] = React.useState(currentFace.lip_thickness);
    const [jawBoneWidth, setJawBoneWidth] = React.useState(currentFace.jaw_bone_width);
    const [jawBoneShape, setJawBoneShape] = React.useState(currentFace.jaw_bone_shape);
    const [chinBone, setChinBone] = React.useState(currentFace.chin_bone);
    const [chinBoneLength, setChinBoneLength] = React.useState(currentFace.chin_bone_length);
    const [chinBoneShape, setChinBoneShape] = React.useState(currentFace.chin_bone_shape);
    const [chinHole, setChinHole] = React.useState(currentFace.chin_hole);
    const [neckThickness, setNeckThickness] = React.useState(currentFace.neck_thickness);

    const noseData = {
        noseWidth: ['Nose Width', noseWidth, setNoseWidth],
        noseBoneHigh: ['Bone Height', noseBoneCurveness, setNoseBoneCurveness],
        nosePeakHight: ['Peak Height', nosePeak, setNosePeak],
        nosePeakLenght: ['Peak Length', noseLength, setNoseLength],
        nosePeakLowering: ['Peak Lowering', noseTip, setNoseTip],
        noseBoneTwist: ['Bone Twist', noseBoneTwist, setNoseBoneTwist]
    };

    const eyebrowData = {
        eyeBrownHigh: ['Eyebrow Height', eyebrowUpDown, setEyebrowUpDown],
        eyeBrownForward: ['Eyebrow Depth', eyebrowInOut, setEyebrowInOut]
    };

    const availableEyeColors = props.data?.availableEyeColors ?? [];

    const cheeksData = {
        cheeksBoneHigh: ['Cheek Bone Height', cheekBones, setCheekBones],
        cheeksBoneWidth: ['Cheek Bone Width', cheekSidewaysBoneSize, setCheekSidewaysBoneSize],
        cheeksWidth: ['Cheek Width', cheekBonesWidth, setCheekBonesWidth]
    };

    const jawBoneData = {
        jawBoneWidth: ['Jaw Bone Width', jawBoneWidth, setJawBoneWidth],
        jawBoneBackLenght: ['Jaw Bone Length', jawBoneShape, setJawBoneShape]
    };

    const chinData = {
        chimpBoneLowering: ['Chin Bone Height', chinBone, setChinBone],
        chimpBoneLenght: ['Chin Bone Length', chinBoneLength, setChinBoneLength],
        chimpBoneWidth: ['Chin Bone Width', chinBoneShape, setChinBoneShape],
        chimpHole: ['Chin Cleft', chinHole, setChinHole]
    };

    const miscFeaturesData = {
        eyesOpenning: ['Eyes Squint', eyeOpening, setEyeOpening],
        lipsThickness: ['Lips Thickness', lipThickness, setLipThickness],
        neckThikness: ['Neck Thickness', neckThickness, setNeckThickness]
    };

    React.useEffect(() => {
        props.changeValue('face', 'setFace', {
            nose_width: noseWidth,
            nose_peak: nosePeak,
            nose_length: noseLength,
            nose_bone_curveness: noseBoneCurveness,
            nose_tip: noseTip,
            nose_bone_twist: noseBoneTwist,
            eyebrow_up_down: eyebrowUpDown,
            eyebrow_in_out: eyebrowInOut,
            cheek_bones: cheekBones,
            cheek_sideways_bone_size: cheekSidewaysBoneSize,
            cheek_bones_width: cheekBonesWidth,
            eye_opening: eyeOpening,
            lip_thickness: lipThickness,
            jaw_bone_width: jawBoneWidth,
            jaw_bone_shape: jawBoneShape,
            chin_bone: chinBone,
            chin_bone_length: chinBoneLength,
            chin_bone_shape: chinBoneShape,
            chin_hole: chinHole,
            neck_thickness: neckThickness,
        });
    }, [noseWidth, nosePeak, noseLength, noseBoneCurveness, noseTip, noseBoneTwist, eyebrowUpDown, eyebrowInOut, cheekBones, cheekSidewaysBoneSize, cheekBonesWidth, eyeOpening, lipThickness, jawBoneWidth, jawBoneShape, chinBone, chinBoneLength, chinBoneShape, chinHole, neckThickness]);

    return (
        <div className={classes.container}>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Nose
                        </Text>
                    )}
                    description={(
                        <div>
                            {Object.entries(noseData).map(([key, value]: any) => (
                                <Slider
                                    key={key}
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    label={value[0]}
                                    onChange={(value: any) => value[2](value)}
                                    value={value[1]}
                                    styles={{ width: '44%', display: 'inline-flex' }}
                                />
                            ))}
                        </div>
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Eyebrows
                        </Text>
                    )}
                    description={(
                        <div>
                            {Object.entries(eyebrowData).map(([key, value]: any) => (
                                <Slider
                                    key={key}
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    label={value[0]}
                                    onChange={(value: any) => value[2](value)}
                                    value={value[1]}
                                />
                            ))}
                        </div>
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Eye Color
                        </Text>
                    )}
                    description={(
                        <div>
                            <Text className={classes.flexInline} variant="body2">
                                {availableEyeColors.length} colors
                            </Text>
                            <ClothingArrows
                                min={0}
                                max={availableEyeColors.length}
                                onChange={(value: any) => {
                                    setCurrentEyeColor(value);
                                    props.changeValue('eyeColor', 'setEyeColor', value);
                                }}
                                value={currentEyeColor}
                            />
                            <Input.Select
                                items={availableEyeColors.map((color, index) => {
                                    return {
                                        id: index,
                                        label: color
                                    }
                                })}
                                label=""
                                value={availableEyeColors.length > 0 ? currentEyeColor : ''}
                                onChange={(value: any) => {
                                    setCurrentEyeColor(value);
                                    props.changeValue('eyeColor', 'setEyeColor', value);
                                }}
                            />
                        </div>
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Cheeks
                        </Text>
                    )}
                    description={(
                        <div>
                            {Object.entries(cheeksData).map(([key, value]: any) => (
                                <Slider
                                    key={key}
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    label={value[0]}
                                    onChange={(value: any) => value[2](value)}
                                    value={value[1]}
                                />
                            ))}
                        </div>
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Jaw Bone
                        </Text>
                    )}
                    description={(
                        <div>
                            {Object.entries(jawBoneData).map(([key, value]: any) => (
                                <Slider
                                    key={key}
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    label={value[0]}
                                    onChange={(value: any) => value[2](value)}
                                    value={value[1]}
                                />
                            ))}
                        </div>
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Chin
                        </Text>
                    )}
                    description={(
                        <div>
                            {Object.entries(chinData).map(([key, value]: any) => (
                                <Slider
                                    key={key}
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    label={value[0]}
                                    onChange={(value: any) => value[2](value)}
                                    value={value[1]}
                                    styles={{ width: '44%', display: 'inline-flex' }}
                                />
                            ))}
                        </div>
                    )}
                />
            </div>
            <div className={classes.paperContainer}>
                <ComponentDetails
                    title={(
                        <Text variant="h5">
                            Miscellaneous Features
                        </Text>
                    )}
                    description={(
                        <div>
                            {Object.entries(miscFeaturesData).map(([key, value]: any) => (
                                <Slider
                                    key={key}
                                    min={-1}
                                    max={1}
                                    step={0.01}
                                    label={value[0]}
                                    onChange={(value: any) => value[2](value)}
                                    value={value[1]}
                                    styles={{ width: '44%', display: 'inline-flex' }}
                                />
                            ))}
                        </div>
                    )}
                />
            </div>
        </div>
    )
}