import Input from "components/input/input";
import React from "react";
import useStyles from "./index.styles";

export default (props: any) => {
    const classes = useStyles(props);
    const [selectedPov, setSelectedPov] = React.useState(0);

    return (
        <div className={classes.container}>
            <div className={classes.bb}></div>
            <div className={classes.bbMiddle}>
                <div>
                    <div className={classes.camChooserContent}>
                        <div className={classes.camSelector}>
                            <Input.Select
                                onChange={(e) => {
                                    props.changeSelectedPov(e);
                                    setSelectedPov(e);
                                }}
                                value={selectedPov}
                                label="Choose POV"
                                items={props.items.map((item: any) => {
                                    return {
                                        id: item.netId,
                                        name: item.name
                                    }
                                })}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.bb}></div>
        </div>
    )
}