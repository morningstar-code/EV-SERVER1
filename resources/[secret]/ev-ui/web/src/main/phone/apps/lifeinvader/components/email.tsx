import { ComponentDetails } from 'components/component-details';
import { ComponentDetailsAux } from 'components/component-details-aux';
import { ComponentPaper } from 'components/paper';
import Text from 'components/text/text';

interface LifeInvaderEmailProps {
    email: LifeInvaderEmail;
    onClick: () => void;
}

export default (props: LifeInvaderEmailProps) => {
    const email = props.email;
    const onClick = props.onClick;
    
    return (
        <ComponentPaper
            onClick={onClick}
            style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                padding: 10
            }}
        >
            <ComponentDetails
                title={email.title}
                description={(
                    <div>
                        <Text variant="body2" style={{ fontSize: '0.8rem' }}>
                            {email.category === 'draft' ? null : email.category === 'sent' ? email.to : email.sender}
                        </Text>
                    </div>
                )}
            />
            <ComponentDetailsAux icon="eye" />
        </ComponentPaper>
    )
}