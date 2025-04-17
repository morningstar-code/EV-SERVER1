import Button from 'components/button/button';
import Input from 'components/input/input';
import Text from 'components/text/text';
import React, { FunctionComponent } from 'react';
import useStyles from './index.styles';

const BlankPage: FunctionComponent = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState([]);
    const [success, setSuccess] = React.useState(false);
    const components = [];

    const addComponent = (index: number) => {
        components[index] = <Input.Text
            placeholder="..."
            icon="stream"
            values={values[index]}
            onChange={(value: string) => {
                return (function (v: string, i: number) {
                    const copiedValues = [...values];
                    copiedValues[i] = v;
                    setValues(copiedValues);
                })(value, index);
            }}
        />
    }

    for (let i = 0; i < 10; i++) {
        addComponent(i);
    }

    return (
        <div className={classes.container}>
            {success && (
                <div className={classes.number}>
                    <Text variant="h5">
                        (415) 367-7103
                    </Text>
                </div>
            )}
            <div className={classes.form}>
                {components.map((component, index) => (
                    <div key={index}>
                        {component}
                    </div>
                ))}
                <Button.Primary onClick={(e: React.ChangeEvent) => {
                    e.preventDefault();
                    const ips = [
                        '192.463.12.6',
                        '192.169.1.4',
                        '192.425.2.1',
                        '192.168.1.2',
                        '192.75.2.1',
                        '192.36.75.2',
                        '192.164.4.23',
                        '192.73.23.3',
                        '192.63.23.1',
                        '192.164.7.2',
                    ];
                    values.length !== ips.length || ips.some((ip, index) => {
                        return !values.includes(ip);
                    }) || setSuccess(true);
                }}>
                    Submit
                </Button.Primary>
            </div>
        </div>
    );
}

export default BlankPage;