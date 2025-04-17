import React from 'react';
import useStyles from '../index.styles';
import { ComponentPaper } from 'components/paper';
import { ComponentDetails } from 'components/component-details';
import Text from 'components/text/text';
import { ComponentDrawer } from 'components/component-drawer';
import { baseStyles } from 'lib/styles';

export default (props: any) => {
    const classes = useStyles();
    const [currentColor, setCurrentColor] = React.useState(props.data?.currentHair);

    return (
        <ComponentPaper
            drawer={<ComponentDrawer items={[]}>
                <Text variant="h6">
                    Color
                </Text>
                <div className={classes.colorContainer}>
                    {props.data?.hairColors?.map((color: any) => (
                        <div
                            key={color.id}
                            className={classes.colorSquare}
                            onClick={() => {
                                setCurrentColor({
                                    ...color,
                                    color: color.id
                                })
                                props.changeValue(
                                    'hairColors',
                                    'setHairColor',
                                    {
                                        ...color,
                                        color: color.id
                                    }
                                );
                            }}
                            style={{
                                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1.0))`,
                                borderColor: color.color === color.id ? baseStyles.colorTwat() : 'white',
                                borderWidth: color.color === color.id ? '3px' : '1px'
                            }}
                        >
                        </div>
                    ))}
                </div>
                <Text variant="h6">
                    Highlight
                </Text>
                <div className={classes.colorContainer}>
                    {props.data?.hairColors?.map((color: any) => (
                        <div
                            key={color.id}
                            className={classes.colorSquare}
                            onClick={() => {
                                setCurrentColor({
                                    ...color,
                                    color: color.id
                                })
                                props.changeValue(
                                    'hairColors',
                                    'setHairColor',
                                    {
                                        ...color,
                                        highlightColor: color.id
                                    }
                                );
                            }}
                            style={{
                                backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, 1.0))`,
                                borderColor: color.color === color.id ? baseStyles.colorTwat() : 'white',
                                borderWidth: color.color === color.id ? '3px' : '1px'
                            }}
                        >
                        </div>
                    ))}
                </div>
            </ComponentDrawer>}
        >
            <ComponentDetails
                title={(
                    <Text variant="h6">
                        Hair Color
                    </Text>
                )}
            />
        </ComponentPaper>
    )
}