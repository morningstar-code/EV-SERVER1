import { FunctionComponent } from 'react';
import useStyles from './index.styles';
import Button from '../../../../../components/button/button';

interface ContractButtonProps {
    label: string;
    onClick: () => void;
    style?: any;
    disabled?: boolean;
}

const ContractButton: FunctionComponent<ContractButtonProps> = (props) => {
    const classes = useStyles();

    return (
        <Button.Primary className={classes.button}  onClick={props.onClick} style={props.style} disabled={props.disabled}>
            {props.label}
        </Button.Primary>
    );
}

export default ContractButton;