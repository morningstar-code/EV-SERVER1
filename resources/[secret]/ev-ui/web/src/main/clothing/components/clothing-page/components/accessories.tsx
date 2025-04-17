import React from 'react';
import useStyles from '../index.styles';
import ClothingInput from '../../clothing-input';

export default (props: any) => {
    const classes = useStyles();

    const components: any = [
        {
            name: 'Masks',
            enum: 'Mask',
            type: 'drawable',
            component: 1,
            initialValues: props.data?.currentDrawables?.Mask ?? undefined,
            components: props.data?.drawables?.Mask?.length ?? undefined,
            textures: props.data?.drawables?.Mask ?? undefined
        },
        {
            name: 'Glasses',
            enum: 'Glasses',
            type: 'prop',
            component: 1,
            initialValues: props.data?.currentProps?.Glasses ?? undefined,
            components: props.data?.props?.Glasses?.length ?? undefined,
            textures: props.data?.props?.Glasses ?? undefined
        },
        {
            name: 'Earrings',
            enum: 'Ears',
            type: 'prop',
            component: 2,
            initialValues: props.data?.currentProps?.Ears ?? undefined,
            components: props.data?.props?.Ears?.length ?? undefined,
            textures: props.data?.props?.Ears ?? undefined
        },
        {
            name: 'Scarfs & Necklaces',
            enum: 'Accessory',
            type: 'drawable',
            component: 7,
            initialValues: props.data?.currentDrawables?.Accessory ?? undefined,
            components: props.data?.drawables?.Accessory?.length ?? undefined,
            textures: props.data?.drawables?.Accessory ?? undefined
        },
        {
            name: 'Watches',
            enum: 'Watch',
            type: 'prop',
            component: 6,
            initialValues: props.data?.currentProps?.Watch ?? undefined,
            components: props.data?.props?.Watch?.length ?? undefined,
            textures: props.data?.props?.Watch ?? undefined
        },
        {
            name: 'Bracelets',
            enum: 'Bracelet',
            type: 'prop',
            component: 7,
            initialValues: props.data?.currentProps?.Bracelet ?? undefined,
            components: props.data?.props?.Bracelet?.length ?? undefined,
            textures: props.data?.props?.Bracelet ?? undefined
        },
        {
            name: 'Vest',
            enum: 'Kevlar',
            type: 'drawable',
            component: 9,
            initialValues: props.data?.currentDrawables?.Kevlar ?? undefined,
            components: props.data?.drawables?.Kevlar?.length ?? undefined,
            textures: props.data?.drawables?.Kevlar ?? undefined
        },
        {
            name: 'Bags',
            enum: 'Parachute',
            type: 'drawable',
            component: 5,
            initialValues: props.data?.currentDrawables?.Parachute ?? undefined,
            components: props.data?.drawables?.Parachute?.length ?? undefined,
            textures: props.data?.drawables?.Parachute ?? undefined
        }
    ];

    console.log("Accesory Components", components);

    return (
        <div className={classes.innerContainer}>
            {components.map((component) => (
                <React.Fragment key={component.name}>
                    <ClothingInput
                        changeValue={props.changeValue}
                        gender={props.data?.gender ?? undefined}
                        whitelistedClothing={props.data?.whitelistedClothing ?? undefined}
                        isCustom={props.data?.isCustom ?? undefined}
                        nameData={props.data?.nameData ?? undefined}
                        {...component}
                    />
                    {component?.extraComponent ?? null}
                </React.Fragment>
            ))}
        </div>
    )
}