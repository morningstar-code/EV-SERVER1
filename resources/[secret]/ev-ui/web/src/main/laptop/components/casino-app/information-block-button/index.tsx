import Text from "components/text/text";

interface InformationBlockButtonProps {
    title: string;
    action?: () => void;
}

export default (props: InformationBlockButtonProps) => {
    return (
        <div className="information-block button" onClick={props.action}>
            <Text variant="h1" className="title">
                {props.title}
            </Text>
        </div>
    )
};