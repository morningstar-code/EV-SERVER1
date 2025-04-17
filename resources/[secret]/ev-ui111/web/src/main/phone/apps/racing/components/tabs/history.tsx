import { Typography } from "@mui/material";
import AppContainer from "main/phone/components/app-container";
import { getRacingCategory } from "../../actions";
import Race from "../race";

export default (props: any) => {
    const category = getRacingCategory() ?? 'underground';

    const filterFunction = (item: Race) => {
        return item.category === category || item.category === "random";
    }

    const pending = props.pending.filter(filterFunction);
    const active = props.active.filter(filterFunction);
    const completed = props.completed.filter(filterFunction);

    const openConversation = (eventId: string, data: any) => {
        props.updateState({
            currentConversation: eventId,
            conversations: {
                ...props.conversations,
                [eventId]: data
            }
        });
    }

    return (
        <AppContainer
            containerStyle={{ padding: 0 }}
            style={{ padding: 0 }}
        >
            {!!pending.length && (
                <div style={{ marginTop: 8, width: '100%' }}>
                    <Typography variant="body1" style={{ color: 'white', marginBottom: 8 }}>
                        Pending
                    </Typography>
                    {pending.map((race: Race) => (
                        <Race
                            key={race.eventId || race.id}
                            race={race}
                            type="pending"
                            character={props.character}
                            isNightTime={props.isNightTime}
                            onConversationOpened={(data: any) => {
                                return openConversation(race.eventId, data);
                            }}
                        />
                    ))}
                </div>
            )}
            {!!active.length && (
                <div style={{ marginTop: 8, width: '100%' }}>
                    <Typography variant="body1" style={{ color: 'white', marginBottom: 8 }}>
                        Active
                    </Typography>
                    {active.map((race: Race) => (
                        <Race
                            key={race.eventId || race.id}
                            race={race}
                            type="active"
                            character={props.character}
                            isNightTime={props.isNightTime}
                            onConversationOpened={(data: any) => {
                                return openConversation(race.eventId, data);
                            }}
                        />
                    ))}
                </div>
            )}
            {!!completed.length && (
                <div style={{ marginTop: 8, width: '100%' }}>
                    <Typography variant="body1" style={{ color: 'white', marginBottom: 8 }}>
                        Completed
                    </Typography>
                    {completed.map((race: Race) => (
                        <Race
                            key={race.eventId || race.id}
                            race={race}
                            type="completed"
                            character={props.character}
                            isNightTime={props.isNightTime}
                            onConversationOpened={(data: any) => {
                                return openConversation(race.eventId, data);
                            }}
                        />
                    ))}
                </div>
            )}
        </AppContainer>
    )
}