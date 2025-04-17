import { ComponentDetails } from "components/component-details";
import { ComponentDetailsAux } from "components/component-details-aux";
import { ComponentPaper } from "components/paper";
import Text from "components/text/text";

interface LifeInvaderContactProps {
    contact: LifeInvaderContact;
    onClick: () => void;
}

export default (props: LifeInvaderContactProps) => {
    const contact = props.contact;
    const onClick = props.onClick;

    return (
        <ComponentPaper style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: 10
        }}>
            <ComponentDetails
                title={contact.name}
                description={(
                    <div>
                        <Text variant="body2" style={{ fontSize: '0.8rem' }}>
                            {contact.email}
                        </Text>
                    </div>
                )}
            />
            <ComponentDetailsAux
                icon="trash"
                onClick={onClick}
            />
        </ComponentPaper>
    )
}