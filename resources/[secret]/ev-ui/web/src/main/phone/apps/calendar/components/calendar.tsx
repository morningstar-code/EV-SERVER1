import Button from "components/button/button";
import AppContainer from "main/phone/components/app-container";
import React from "react";
import useStyles from "./calendar.styles";
import Dates from "./dates";
import Entry from "./entry";

export default (props: any) => {
    const classes = useStyles();
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        const filteredList = props.list.filter((item: any) => {
            return item.timestamp > Date.now();
        });

        setList(filteredList);
    }, [props.list]);

    return (
        <AppContainer
            fadeIn={false}
        >
            <Dates
                {...props}
                changeSelectedDate={(value: any) => {
                    const filteredList = props.list.filter((item: any) => {
                        return {
                            ...item,
                            value
                        }
                    });

                    setList(filteredList);
                }}
            />
            <div className={classes.actions}>
                <Button.Primary onClick={() => {

                }}>
                    Create Event
                </Button.Primary>
                <Button.Tertiary onClick={() => {

                }}>
                    Join Event
                </Button.Tertiary>
            </div>
            <div className={classes.entries}>
                {list.map((entry: any) => (
                    <Entry
                        key={entry.id}
                        {...entry}
                        getEntries={props.getEntries}
                        characterName={`${props.character.first_name} ${props.character.last_name}`}
                        characterJob={props.character.job}
                    />
                ))}
            </div>
        </AppContainer>
    )
}