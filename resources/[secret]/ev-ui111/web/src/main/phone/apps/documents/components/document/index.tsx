import { ComponentPaper } from 'components/paper';
import { ComponentDetails } from 'components/component-details';
import { ComponentDetailsAux } from 'components/component-details-aux';

export default (props: any) => {
    const document = props.document;
    const onClick = props.onClick;

    return (
        <ComponentPaper onClick={onClick}>
            <ComponentDetails title={document.title} />
            <ComponentDetailsAux icon={document.signature_requested ? 'pen-nib' : document.editable ? 'edit' : 'eye'} />
        </ComponentPaper>
    )
}