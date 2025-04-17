import Text from "components/text/text";

interface InformationBlockProps {
    value: string;
    title: string;
    action?: () => void;
    danger?: any;
    success?: any;
}

export default (props: InformationBlockProps) => {
    return (
        <div className="information-block" onClick={props.action}>
            <Text variant="p" className={props?.danger ? { ...props?.danger } : props?.success ? { ...props?.success } : ''}>
                {props.value}
            </Text>
            <Text variant="h1" className="title">
                {props.title}
            </Text>
        </div>
    )
};