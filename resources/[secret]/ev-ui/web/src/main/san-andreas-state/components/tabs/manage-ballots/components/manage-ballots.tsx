import Ballots from "./ballots"

export default (props: any) => {
    return (
        <div>
            <Ballots
                {...props}
                active={true}
                ballots={props.activeBallots || []}
            />
            <Ballots
                {...props}
                active={false}
                ballots={props.expiredBallots || []}
            />
        </div>
    )
}