import React, { FunctionComponent } from "react";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import Input from "components/input/input";
import { formatPermission, GetBusinessPermissions } from "../create-role-modal";
import Button from "components/button/button";
import { nuiAction } from "lib/nui-comms";

export default (props: any) => {
    const EditRole: FunctionComponent = () => {
        const [role, setRole] = React.useState(props.roles[0].id);
        const [permissions, setPermissions] = React.useState(props.roles[0].permissions);
        const foundRole = props.roles.find((r: any) => {
            return r.id === role;
        });

        React.useEffect(() => {
            setPermissions(foundRole.permissions);
        }, [role, foundRole.permissions]);

        return (
            <div style={{ width: '100%' }}>
                <div>
                    <Input.Select
                        label="Role"
                        onChange={setRole}
                        value={role}
                        items={props.roles}
                    />
                </div>
                <div className="flex">
                    {GetBusinessPermissions(props.activeBusiness.code).map((permission) => {
                        return (
                            <div className="flex">
                                <Input.Checkbox
                                    checked={permissions.includes(formatPermission(permission))}
                                    onChange={(value) => {
                                        return (function (checked, formattedPermission) {
                                            const newPermissions = [...permissions];

                                            if (checked) {
                                                newPermissions.push(formattedPermission);
                                            } else {
                                                const index = newPermissions.indexOf(formattedPermission);
                                                newPermissions.splice(index, 1);
                                            }

                                            setPermissions(newPermissions);
                                        })(value, formatPermission(permission))
                                    }}
                                    label={permission}
                                />
                            </div>
                        )
                    })}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', marginBottom: 0 }}>
                    <Button.Secondary onClick={() => closePhoneModal(false)}>
                        Cancel
                    </Button.Secondary>
                    <Button.Primary onClick={async () => {
                        setPhoneModalLoading();

                        const results = await nuiAction('ev-ui:editBusinessRole', {
                            role_id: role,
                            permissions: permissions,
                            business: props.activeBusiness
                        });

                        if (results.meta.ok) {
                            closePhoneModal();
                            props.manageBusiness(props.activeBusiness);
                        } else {
                            setPhoneModalError(results.meta.message)
                        }
                    }}>
                        Save
                    </Button.Primary>
                </div>
            </div>
        )
    }

    openPhoneModal(
        <EditRole />
    )
}