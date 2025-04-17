import React, { FunctionComponent } from "react";
import { ComponentDetails } from "components/component-details";
import Text from "components/text/text";
import { baseStyles } from "lib/styles";
import ClothingArrows from "../clothing-arrows";
import { DelayCallback } from "utils/misc";
import Input from "components/input/input";

const ClothingInput: FunctionComponent = (props: any) => {
    //TODO; REDO THIS COMPONENT
    const [componentId, setComponentId] = React.useState(Array.isArray(props?.initialValues) ? props.initialValues[0] : props?.initialValues ?? 0);
    const [textureId, setTextureId] = React.useState(Array.isArray(props?.initialValues) ? props.initialValues[1] : 0);
    const [unavailable, setUnavailable] = React.useState(false);
    const ref = React.useRef(false);

    const textures = Array.isArray(props?.textures) ? props?.textures[componentId] : props?.textures ?? 0;

    // const handleSetComponent = DelayCallback(function (id: any) {
    //     if (ref.current) {
    //         props.changeValue(props?.type, 'setComponent', {
    //             name: props?.enum,
    //             component: +id,
    //             texture: 0
    //         });
    //     }
    // }, 100);

    // const updateComponentAndTexture = DelayCallback(function () {
    //     if (ref.current) {
    //         props.changeValue(props?.type, 'setComponent', {
    //             name: props?.enum,
    //             component: +componentId,
    //             texture: +textureId
    //         });
    //     }
    // }, 100);

    const handleSetComponent = (id: any) => {
        console.log('handleSetComponent', id);
        if (ref.current) {
            console.log('handleSetComponent', props?.enum, id, 0);
            props.changeValue(props?.type, 'setComponent', {
                name: props?.enum,
                component: +id,
                texture: 0
            });
        }
    }

    const updateComponentAndTexture = () => {
        console.log('updateComponentAndTexture');
        if (ref.current) {
            console.log('updateComponentAndTexture', componentId, textureId);
            props.changeValue(props?.type, 'setComponent', {
                name: props?.enum,
                component: +componentId,
                texture: +textureId
            });
        }
    }

    const handleChange = (newTextureId: number) => {
        newTextureId < 0 && (newTextureId = textures - 1);
        newTextureId > textures - 1 && (newTextureId = 0);
        //const whitelistedClothing = props?.whitelistedClothing?.[props.gender]?.[props.enum]?.find(clothing => clothing.componentId === componentId);
        //if (props?.whitelistedClothing && props?.whitelistedClothing[props.gender] && whitelistedClothing) {
        //    setTextureId(0);
        //    setUnavailable(true);
        //    return;
        //}
        setTextureId(newTextureId);
        updateComponentAndTexture();
    }

    React.useEffect(() => {
        console.log(`useEffect | Initial Values: ${props?.initialValues} | Component ID: ${componentId} | Texture ID: ${textureId}`);
        ref.current = props?.initialValues && (props?.initialValues[0] !== componentId || props?.initialValues[1] !== textureId); //FIX THIS!
    }, [props.initialValues, componentId, textureId]);

    const components = [];
    const nameData = props?.isCustom ? null : props?.type === 'prop' ? props?.nameData?.props[props.gender][props.component] && props?.nameData?.props[props.gender][props.component][componentId] : props?.nameData?.clothing[props.gender][props.component] && props?.nameData?.clothing[props.gender][props.component][componentId];

    console.log('nameData', nameData);

    for (let i = 0; i < textures; i++) {
        let data = nameData ? nameData[i] : null;
        components.push({
            id: i,
            name: data ? data : `Texture ${i}`
        });
    }

    return (
        <div style={{ width: '100%', marginTop: '7.5%', borderBottom: 'none' }}>
            <ComponentDetails
                title={(
                    <Text variant="h5">
                        {props?.name ?? ''}
                    </Text>
                )}
                description={(
                    <div>
                        <Text variant="body2" style={{ color: baseStyles.textColorGrey() }}>
                            {props?.components ?? 0} components
                        </Text>
                        <ClothingArrows
                            min={-1}
                            max={props?.components ?? 0}
                            onChange={(id: any) => {
                                //const whitelistedClothing = props?.whitelistedClothing?.[props.gender]?.[props.enum]?.find(clothing => clothing?.componentId === id);
                                //if (props?.whitelistedClothing && props?.whitelistedClothing[props.gender] && whitelistedClothing) {
                                //    setTextureId(0);
                                //    setComponentId(id);
                                //    setUnavailable(true);
                                //    return;
                                //}
                                setTextureId(0);
                                setComponentId(id);
                                setUnavailable(false);
                                handleSetComponent(id);
                            }}
                            value={componentId}
                            styles={{
                                display: 'inline-flex',
                                width: '50%'
                            }}
                        />
                        <ClothingArrows
                            min={-1}
                            max={props?.components ?? 0}
                            onChange={handleChange}
                            value={textureId}
                            styles={{
                                display: 'inline-flex',
                                width: '50%',
                                justifyContent: 'flex-end'
                            }}
                        />
                        <br />
                        <br />
                        <Input.Select
                            items={unavailable ? [] : components}
                            label={unavailable ? 'Item Unavailable' : `${textures ?? 0} texture${textures === 1 ? '' : 's'}`}
                            value={components.length > 0 && !unavailable ? textureId : ''}
                            onChange={(value: any) => handleChange(value)}
                        />
                    </div>
                )}
            />
        </div>
    )
};

export default React.memo(ClothingInput) as any;