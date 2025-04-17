import { Typography } from "@mui/material";
import Button from "components/button/button";
import { ComponentDetails } from "components/component-details";
import { ComponentDrawer } from "components/component-drawer";
import { ComponentPaper } from "components/paper";
import useStyles from "./calendar.styles";

export default (props: any) => {
    const classes = useStyles();

    const items = [
        {
            icon: 'paragraph',
            text: props.description,
            tooltip: 'Description',
        },
        {
            icon: 'map-marker',
            text: props.location,
            tooltip: 'Location',
        },
        {
            icon: 'user-cog',
            text: props.host,
            tooltip: 'Host',
        },
        {
            icon: 'users',
            text: props.attendees,
            tooltip: 'Attendees',
        }
    ];

    if (props.code) {
        items.push({
            icon: 'file-signature',
            text: props.code,
            tooltip: 'Join Code',
        });
    }

    return (
        <ComponentPaper
            drawer={(
                <ComponentDrawer
                    items={items}
                >
                    <div className={classes.buttonContainer}>
                        <Button.Secondary>
                            Leave
                        </Button.Secondary>
                        <hr />
                        {props.host === props.characterName && (
                            <>
                                <Button.Tertiary>
                                    Invite
                                </Button.Tertiary>
                                <Button.Primary>
                                    Edit
                                </Button.Primary>
                                {props.characterJob === 'judge' && (
                                    <>
                                        <hr />
                                        <Button.Tertiary>
                                            Force Add
                                        </Button.Tertiary>
                                    </>
                                )}
                                <hr />
                            </>
                        )}
                        {!!props.shareable && (
                            <Button.Tertiary>
                                Share
                            </Button.Tertiary>
                        )}
                    </div>
                </ComponentDrawer>
            )}
        >
            <ComponentDetails
                title={(
                    <>
                        <Typography variant="body2" style={{ color: 'white' }}>
                            {props.name}
                        </Typography>
                    </>
                )}
            />
        </ComponentPaper>
    )
}