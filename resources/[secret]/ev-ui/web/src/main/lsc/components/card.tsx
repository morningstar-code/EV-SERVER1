import Text from 'components/text/text';
import React from 'react';
import useStyles from './card.styles';

export default (props: any) => {
    const classes = useStyles({});

    return (
        <div className={classes.card}>
            <div className={classes.front}>
                <Text variant="body1" className={classes.stateId}>
                    {props?.cardInfo?.stateId}
                </Text>
                <Text variant="body1" className={classes.firstName}>
                    {props?.cardInfo?.firstName}
                </Text>
                <Text variant="body1" className={classes.lastName}>
                    {props?.cardInfo?.lastName}
                </Text>
                <Text variant="body1" className={classes.sex}>
                    {props?.cardInfo?.sex}
                </Text>
                <Text variant="body1" className={classes.dob}>
                    {props?.cardInfo?.dob}
                </Text>
                <Text variant="body1" className={classes.eyeColor}>
                    {props?.cardInfo?.eyeColor}
                </Text>
                <Text variant="body1" className={classes.height}>
                    {props?.cardInfo?.height}
                </Text>
                <Text variant="body1" className={classes.expiration}>
                    {props?.cardInfo?.expiration}
                </Text>
                <Text variant="body1" className={classes.class}>
                    {props?.cardInfo?.class}
                </Text>
            </div>
        </div>
    )
}