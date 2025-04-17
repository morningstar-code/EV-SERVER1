import React from 'react';
import useStyles from '../index.styles';
import Color from './color';
import ClothingInput from '../../clothing-input';

export default (props: any) => {
    const classes = useStyles();

    const components = [
        {
            name: 'Hat',
            enum: 'Hat',
            type: 'prop',
            component: 0,
            initialValues: props.data?.currentProps?.Hat ?? undefined,
            components: props.data?.props?.Hat?.length ?? undefined,
            textures: props.data?.props?.Hat ?? undefined
        },
        {
            name: 'Hair',
            enum: 'Hair',
            type: 'drawable',
            component: 2,
            initialValues: props.data?.currentDrawables?.Hair ?? undefined,
            components: props.data?.drawables?.Hair?.length ?? undefined,
            textures: props.data?.drawables?.Hair ?? undefined,
            extraComponent: <Color {...props} />
        },
        {
            name: 'Jacket',
            enum: 'Jacket',
            type: 'drawable',
            component: 11,
            initialValues: props.data?.currentDrawables?.Jacket ?? undefined,
            components: props.data?.drawables?.Jacket?.length ?? undefined,
            textures: props.data?.drawables?.Jacket ?? undefined
        },
        {
            name: 'Undershirt',
            enum: 'Undershirt',
            type: 'drawable',
            component: 8,
            initialValues: props.data?.currentDrawables?.Undershirt ?? undefined,
            components: props.data?.drawables?.Undershirt?.length ?? undefined,
            textures: props.data?.drawables?.Undershirt ?? undefined
        },
        {
            name: 'Arms / Gloves',
            enum: 'Torso',
            type: 'drawable',
            component: 3,
            initialValues: props.data?.currentDrawables?.Torso ?? undefined,
            components: props.data?.drawables?.Torso?.length ?? undefined,
            textures: props.data?.drawables?.Torso ?? undefined
        },
        {
            name: 'Pants',
            enum: 'Leg',
            type: 'drawable',
            component: 4,
            initialValues: props.data?.currentDrawables?.Leg ?? undefined,
            components: props.data?.drawables?.Leg?.length ?? undefined,
            textures: props.data?.drawables?.Leg ?? undefined
        },
        {
            name: 'Shoes',
            enum: 'Shoes',
            type: 'drawable',
            component: 6,
            initialValues: props.data?.currentDrawables?.Shoes ?? undefined,
            components: props.data?.drawables?.Shoes?.length ?? undefined,
            textures: props.data?.drawables?.Shoes ?? undefined
        },
        {
            name: 'Decals',
            enum: 'Badge',
            type: 'drawable',
            component: 10,
            initialValues: props.data?.currentDrawables?.Badge ?? undefined,
            components: props.data?.drawables?.Badge?.length ?? undefined,
            textures: props.data?.drawables?.Badge ?? undefined
        },
    ];

    return (
        <div className={classes.innerContainer}>
            {components.map((component: any) => (
                <React.Fragment
                    key={component.name}
                >
                    <ClothingInput
                        changeValue={props.changeValue}
                        gender={props.data?.gender ?? undefined}
                        whitelistedClothing={props.data?.whitelistedClothing ?? undefined}
                        isCustom={props.data?.isCustom ?? undefined}
                        nameData={props.data?.nameData ?? undefined}
                        {...component}
                    />
                    {component.extraComponent}
                </React.Fragment>
            ))}
        </div>
    )
}