import React from 'react';
import Input from 'components/input/input';
import Text from 'components/text/text';
import useStyles from '../../index.styles';
import Button from 'components/button/button';

const permissions = [
    ['config.charges', 'Config -> Edit Charges'],
    ['tags.createCategory', 'Tags -> Create Category'],
    ['reports.viewCategory', 'Reports -> View Category'],
    ['reports.editCategory', 'Reports -> Edit Category'],
];

export default (props: any) => {
    const classes = useStyles(props);
    const [permission, setPermission] = React.useState('');
    const [id, setId] = React.useState('');

    return props.permissionsLoaded ? (
        <div>
            <div className={classes.modalGroup}>
                <div className={classes.modalItem}>
                    <Text variant="body2">
                        Permissions
                    </Text>
                </div>
                <div className={classes.modalItem}>
                    <Input.Select
                        items={permissions.map((p: any) => {
                            const [key, value] = p;
                            return {
                                id: key,
                                name: value
                            };
                        })}
                        label="Permission"
                        onChange={setPermission}
                        value={permission}
                    />
                    <div style={{ marginTop: 8, marginBottom: 8 }} />
                    <Input.Text
                        label="ID"
                        icon="id-card-alt"
                        onChange={setId}
                        value={id}
                    />
                    <div style={{ marginTop: 8, marginBottom: 8 }} />
                    <Button.Primary onClick={() => {
                        props.savePermissionData(
                            JSON.stringify({
                                id: id,
                                name: permission,
                            })
                        );
                        setPermission('');
                        setId('');
                    }}>
                        Save
                    </Button.Primary>
                </div>
                <div className={classes.modalItem}>
                    <Text variant="body1">
                        Current:
                    </Text>
                    {props.currentPermissionsList.map((p: any) => {
                        const foundPermission = permissions.find((perm: any) => perm[0] === p[0]);

                        return (
                            <Text
                                key={p}
                                variant="body2"
                            >
                                {foundPermission[1]} - {p[1]}
                            </Text>
                        )
                    })}
                </div>
            </div>
        </div>
    ) : (
        <div>
            <div className={classes.modalGroup}>
                <div className={classes.modalItem}>
                    <Text variant="body2">
                        Permissions
                    </Text>
                </div>
            </div>
        </div>
    )
}