import Button from "components/button/button";
import Checkmark from "components/checkmark/checkmark";
import Input from "components/input/input";
import Spinner from "components/spinner/spinner";
import Text from "components/text/text";
import React from "react";
import useStyles from "../index.styles";

export default (props: any) => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState(false);
    const [fields, setFields] = React.useState<any>((props.fields || []).reduce((a: any, b: any) => {
        return {
            ...a,
            [b.name]: b.default
        }
    }, {}));

    const classes = useStyles();

    const submitModal = async () => {
        if (!error) {
            setLoading(true);
            setError('');
            setSuccess(false);

            if (!props.isConfirm) {
                const gennedFields = {};
                props.fields.forEach((field: any) => {
                    gennedFields[field.name] = fields[field.name];
                    field.type === 'date' && (gennedFields[field.name] = Math.round(fields[field.name].getTime() / 1000));
                });

                const results = await props.onSubmit(gennedFields);

                if (results.ok) {
                    setLoading(false);
                    setError('');
                    setSuccess(true);
                    setTimeout(() => {
                        props.onCancel();
                    }, 1500);
                    return;
                }

                setLoading(false);
                setError(results.message);
                return;
            }

            const results = await props.onSubmit();

            if (results.ok) {
                setLoading(false);
                setError('');
                setSuccess(true);
                setTimeout(() => {
                    props.onCancel();
                }, 1500);
                return;
            }

            setLoading(false);
            setError(results.message);
            return;
        }

        return setError('');
    }

    const state = !props.isConfirm && !loading && !success && !error;

    return (
        <div className={classes.formWrapper}>
            <div className={classes.inputWrapper}>
                {loading && (
                    <div className={classes.loading}>
                        <Spinner />
                    </div>
                )}
                {error && (
                    <div className={classes.loading}>
                        <Text variant="body1">
                            {error}
                        </Text>
                    </div>
                )}
                {success && (
                    <div className={classes.loading}>
                        <Checkmark />
                    </div>
                )}
                {state && props.fields.map((field: any) => (
                    <div key={field.label} className={classes.inputFieldWrapper}>
                        {(!field.type || field.type === 'text') && (
                            <Input.Text
                                icon="pen"
                                label={field.label}
                                onChange={(value: any) => {
                                    return setFields({
                                        ...fields,
                                        [field.name]: value
                                    });
                                }}
                                value={fields[field.name] ?? fields[field.name]?.default}
                                placeholder={fields[field.name]?.default || ''}
                            />
                        )}
                        {field.type === 'checkbox' && (
                            <Input.Checkbox
                                label={field.label}
                                onChange={(value: any) => {
                                    return setFields({
                                        ...fields,
                                        [field.name]: value
                                    });
                                }}
                                checked={fields[field.name] || false}
                            />
                        )}
                        {field.type === 'date' && (
                            <Input.DatePicker
                                label={field.label}
                                onChange={(value: any) => {
                                    return setFields({
                                        ...fields,
                                        [field.name]: value
                                    });
                                }}
                                value={fields[field.name] || new Date()}
                            />
                        )}
                        {field.type === 'select' && (
                            <Input.Select
                                items={field.options}
                                label={field.label}
                                onChange={(value: any) => {
                                    setFields({
                                        ...fields,
                                        [field.name]: value
                                    });
                                }}
                                value={fields[field.name] || field.options[0].id}
                            />
                        )}
                    </div>
                ))}
                {!loading && !error && !success && props.isConfirm && (
                    <div className={classes.loading}>
                        <Text variant="body1">
                            Are you sure? This action cannot be undone
                        </Text>
                    </div>
                )}
            </div>
            {!loading && !success && (
                <div className={classes.actionsWrapper}>
                    <Button.Secondary size="small" onClick={props.onCancel}>
                        Cancel
                    </Button.Secondary>
                    <Button.Primary size="small" onClick={submitModal}>
                        {error ? 'Ok Pal' : 'Submit'}
                    </Button.Primary>
                </div>
            )}
        </div>
    )
}