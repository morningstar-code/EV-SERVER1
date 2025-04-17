import { Typography } from '@mui/material';
import Button from 'components/button/button';
import React from 'react';
import { validation } from './validation';
import './simple-form.scss';

interface SimpleFormProps {
    defaultValues?: { [key: string]: any };
    elements: SimpleFormElement[];
    onCancel?: () => void;
    onSubmit?: (values: any) => void;
    submitButtonValue?: string;
}

class SimpleForm extends React.Component<SimpleFormProps, { messages: string[], values: any }> {
    state = {
        messages: [],
        values: this.props.defaultValues ? { ...this.props.defaultValues } : {}
    }

    validate = () => {
        const messages = [];
        let result = true;

        this.props.elements.filter((e) => !!e.validate).forEach((e) => {
            const name = e.name;
            const validate = e.validate;

            const formattedValidate = Array.isArray(validate) ? {
                ...validation[validate[0]],
                message: `${validate[1]} ${validation[validate[0]].message}`
            } : { ...validate };

            const fn = formattedValidate.fn;
            const message = formattedValidate.message;

            const res = fn(
                this.state.values[name],
                this.state.values
            );

            if (!res) {
                result = false;
                messages.push(message);
            }
        });

        this.setState({ messages: messages });

        return result;
    }

    onChange = (key, value) => {
        this.setState({
            values: {
                ...this.state.values,
                [key]: value
            }
        });
    }

    render() {
        return (
            <div className="component-simple-form">
                {this.props.elements.map((element, i) => {
                    return Array.isArray(element) ? (
                        <div key={element[0].name} className="flex-row">
                            {element.map((element) => {
                                <div key={element.name} className="flex">
                                    {element.render({
                                        onChange: (value: any) => {
                                            this.onChange(element.name, value);
                                        },
                                        value: this.state.values[element.name],
                                        values: this.state.values
                                    })}
                                </div>
                            })}
                        </div>
                    ) : (
                        <div key={element.name}>
                            {React.cloneElement(element.render({
                                onChange: (value: any) => {
                                    this.onChange(element.name, value);
                                },
                                value: this.state.values[element.name],
                                values: this.state.values
                            }),
                                { autoFocus: i === 0 }
                            )}
                        </div>
                    )
                })}
                {this.state.messages.length > 0 && (
                    <div className="validation-messages">
                        {this.state.messages.map((message, index) => (
                            <div key={index} className="message">
                                <i className="fas fa-exclamation fa-fw fa-sm" />
                                <Typography variant="body2" style={{ color: '#fff' }}>
                                    {message}
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}
                <div className="buttons">
                    <Button.Secondary onClick={this.props.onCancel}>
                        Cancel
                    </Button.Secondary>
                    <Button.Primary onClick={() => {
                        this.validate() && this.props.onSubmit(this.state.values);
                    }}>
                        {this.props.submitButtonValue ?? 'Submit'}
                    </Button.Primary>
                </div>
            </div>
        );
    }
}

export default SimpleForm;