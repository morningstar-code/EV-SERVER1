import Text from "components/text/text";
import Tournament from "./tournament";

interface TournamentsProps {
    category: string;
    tournaments: RaceTournament[];
    character: Character;
}

export default (props: TournamentsProps) => {
    return (
        <div style={{ marginTop: 8, width: '100%' }}>
            <Text variant="body1" style={{ marginBottom: 8 }}>
                {props.category}
            </Text>
            {props.tournaments && props.tournaments.length > 0 && props.tournaments.map((t: RaceTournament) => (
                <Tournament
                    key={t.name}
                    tournament={t}
                    character={props.character}
                />
            ))}
        </div>
    )
}