
import React from 'react';
import useStyles from './index.styles';
import Input from 'components/input/input';
import Button from 'components/button/button';
import Text from 'components/text/text';
import { copyToClipboard } from 'utils/copy';
import Parents from './components/parents';
import Face from './components/face';
import Skin from './components/skin';

export default (props: any) => {
    const classes = useStyles(props);
    const [backupJson, setBackupJson] = React.useState<string>('');
    const [message, setMessage] = React.useState<string>('');

    const generateBackupJsonObject = () => {
        const currentHeadBlend = props.data?.currentHeadBlend ?? undefined;
        const currentFace = props.data?.currentFace ?? {};
        const currentOverlays = props.data?.currentOverlays ?? {};
        const currentHair = props.data?.currentHair ?? undefined

        const returnedObject = {
            face: {
                headBlend: {
                    skinMix: currentHeadBlend?.SkinMix ?? undefined,
                    shapeThird: currentHeadBlend?.ShapeThird ?? undefined,
                    shapeMix: currentHeadBlend?.ShapeMix ?? undefined,
                    shapeFirst: currentHeadBlend?.ShapeFirst ?? undefined,
                    shapeSecond: currentHeadBlend?.ShapeSecond ?? undefined,
                    thirdMix: currentHeadBlend?.ThirdMix ?? undefined,
                    hasParent: false,
                    skinThird: currentHeadBlend?.SkinThird ?? undefined,
                    skinFirst: currentHeadBlend?.SkinFirst ?? undefined,
                    skinSecond: currentHeadBlend?.SkinSecond ?? undefined
                },
                headStructure: Object.values(currentFace).map((value: any) => {
                    return value;
                }),
                headOverlay: Object.entries(currentOverlays).map(([key, value]: any) => {
                    return {
                        firstColour: value.firstColor,
                        colourType: value.colorType,
                        overlayOpacity: value.opacity,
                        secondColour: value.secondColor,
                        name: key === 'BodyBlemishes' ? 'AddBodyBlemishes' : key,
                        overlayValue: value.value
                    };
                }),
                hairColor: [
                    currentHair?.color ?? undefined,
                    currentHair?.highlightColor ?? undefined
                ]
            }
        };

        return JSON.stringify(returnedObject);
    }

    switch (props.variant) {
        case 'parents':
            return <Parents {...props} />;
        case 'face':
            return <Face {...props} />;
        case 'skin':
            return <Skin {...props} />;
        case 'hair':
            return null;
        case 'makeup':
            return null;
    }

    return (
        <div className={classes.container}>
            <Input.TextArea
                icon="cloud-upload-alt"
                label="Paste Backup JSON"
                onChange={(value: string) => setBackupJson(value)}
                value={backupJson}
            />
            <br />
            <div className={classes.center}>
                <Button.Primary
                    onClick={() => {
                        try {
                            const parsedBackupJson = JSON.parse(backupJson);
                            props.changeValue('headBlend', 'setHeadBlend', {
                                ShapeFirst: parsedBackupJson.face.headBlend.shapeFirst,
                                ShapeSecond: parsedBackupJson.face.headBlend.shapeSecond,
                                ShapeThird: parsedBackupJson.face.headBlend.shapeThird,
                                SkinFirst: parsedBackupJson.face.headBlend.skinFirst,
                                SkinSecond: parsedBackupJson.face.headBlend.skinSecond,
                                SkinThird: parsedBackupJson.face.headBlend.skinThird,
                                ShapeMix: +parsedBackupJson.face.headBlend.shapeMix.toFixed(2),
                                SkinMix: +parsedBackupJson.face.headBlend.skinMix.toFixed(2),
                                ThirdMix: +parsedBackupJson.face.headBlend.thirdMix.toFixed(2),
                            });
                            props.changeValue('face', 'setFace', {
                                nose_width: parsedBackupJson.face.headStructure[0],
                                nose_peak: parsedBackupJson.face.headStructure[1],
                                nose_length: parsedBackupJson.face.headStructure[2],
                                nose_bone_curveness: parsedBackupJson.face.headStructure[3],
                                nose_tip: parsedBackupJson.face.headStructure[4],
                                nose_bone_twist: parsedBackupJson.face.headStructure[5],
                                eyebrow_up_down: parsedBackupJson.face.headStructure[6],
                                eyebrow_in_out: parsedBackupJson.face.headStructure[7],
                                cheek_bones: parsedBackupJson.face.headStructure[8],
                                cheek_sideways_bone_size: parsedBackupJson.face.headStructure[9],
                                cheek_bones_width: parsedBackupJson.face.headStructure[10],
                                eye_opening: parsedBackupJson.face.headStructure[11],
                                lip_thickness: parsedBackupJson.face.headStructure[12],
                                jaw_bone_width: parsedBackupJson.face.headStructure[13],
                                jaw_bone_shape: parsedBackupJson.face.headStructure[14],
                                chin_bone: parsedBackupJson.face.headStructure[15],
                                chin_bone_length: parsedBackupJson.face.headStructure[16],
                                chin_bone_shape: parsedBackupJson.face.headStructure[17],
                                chin_hole: parsedBackupJson.face.headStructure[18],
                                neck_thickness: parsedBackupJson.face.headStructure[19],
                            });
                            const mappedHeadOverlay = parsedBackupJson.face.headOverlay.map((headOverlay: any) => {
                                return {
                                    name: headOverlay.name,
                                    value: headOverlay.overlayValue,
                                    colorType: headOverlay.colourType,
                                    firstColor: headOverlay.firstColour,
                                    secondColor: headOverlay.secondColour,
                                    opacity: +headOverlay.overlayOpacity.toFixed(2),
                                };
                            });
                            props.changeValue('overlays', 'setOverlays', {
                                Eyebrows: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'Eyebrows'),
                                FacialHair: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'FacialHair'),
                                ChestHair: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'ChestHair'),
                                Makeup: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'Makeup'),
                                Blush: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'Blush'),
                                Lipstick: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'Lipstick'),
                                Blemishes: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'BodyBlemishes'),
                                Ageing: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'Ageing'),
                                Complexion: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'Complexion'),
                                SunDamage: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'SunDamage'),
                                MolesFreckles: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'MolesFreckles'),
                                BodyBlemishes: mappedHeadOverlay.find((headOverlay: any) => headOverlay.name === 'AddBodyBlemishes'),
                            });
                            props.changeValue('hairColors', 'setHairColor', {
                                color: parsedBackupJson.face.hairColor[0],
                                highlightColor: parsedBackupJson.face.hairColor[1]
                            });
                            setMessage('Loaded backup');
                        } catch (error) {
                            setMessage('Invalid JSON');
                        }
                    }}
                    style={{
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0
                    }}
                >
                    Load Backup JSON
                </Button.Primary>
                <Button.Primary
                    onClick={() => {
                        const results = generateBackupJsonObject();
                        copyToClipboard(results);
                        setMessage('Copied JSON to clipboard');
                    }}
                >
                    Copy Backup JSON
                </Button.Primary>
            </div>
            <br />
            <div className={classes.center}>
                {message && (
                    <Text>
                        {message}
                    </Text>
                )}
            </div>
        </div>
    )
}