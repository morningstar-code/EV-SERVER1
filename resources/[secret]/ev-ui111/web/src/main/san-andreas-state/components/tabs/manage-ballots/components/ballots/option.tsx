import Text from "components/text/text";
import useStyles from "./option.styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default (props: { active: boolean, option: BallotOption, deleteBallot: (...args: any) => any }) => {
    const classes = useStyles();
    const active = props.active ?? false;
    const option = props.option ?? null;

    const handleDeleteBallot = async () => {
        //confirm(async () => { //TODO;
            const results = await props.deleteBallot({}, option.id);
            return results.meta;
        //});
    }

    return (
        <div key={option.id} className={classes.ballotItem}>
            <div className={classes.ballotTop}>
                <div className={classes.nameDescription}>
                    <Text variant="body2">
                        {option.name}
                    </Text>
                </div>
                <div className={classes.meta}>
                    {option.icon && (
                        <FontAwesomeIcon icon={option.icon} />
                    )}
                    <Text variant="body2">
                        {option.party}
                    </Text>
                    {!active && (
                        <Text variant="body2">
                            {option.vote_count} vote(s)
                        </Text>
                    )}
                </div>
                {active && (
                    <div className={classes.action} onClick={handleDeleteBallot}>
                        <FontAwesomeIcon icon="minus-circle" style={{ color: '#f44336' }} />
                    </div>
                )}
            </div>
            <div className={classes.ballotTop}>
                <Text variant="body2">
                    {option.description}
                </Text>
            </div>
        </div>
    )
}