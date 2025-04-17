import Input from "components/input/input";
import SimpleForm from "components/simple-form";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions"

const businessPermissions = [
    'Hire',
    'Fire',
    'Change Role',
    'Pay Employee',
    'Pay External',
    'Charge External',
    'Property Keys',
    'Stash Access',
    'Craft Access',
    'View Logs',
];

const showroomBusinesses = {
    ottos_auto: ['Buy Car', 'Sales Executive'],
    tuner: ['Sales Executive'],
    pdm: ['Sales Executive']
}

export const GetBusinessPermissions = (code: string) => {
    return showroomBusinesses[code] ? businessPermissions.concat(showroomBusinesses[code]) : businessPermissions;
}

export const formatPermission = (permission: string) => {
    return permission.toLowerCase().replace(' ', '_');
}

export default (props: any) => {
    const elements: any = [
        {
            name: 'name',
            render: (prop: SimpleFormRender<string>) => {
                const onChange = prop.onChange;
                const value = prop.value;

                return (
                    <Input.Text
                        label="Name"
                        icon="tag"
                        onChange={onChange}
                        value={value}
                    />
                )
            },
            validate: ['text', 'Name']
        }
    ];

    (function (el, code) {
        GetBusinessPermissions(code).forEach((permission) => {
            el.push({
                name: permission,
                render: (prop: SimpleFormRender<boolean>) => {
                    const onChange = prop.onChange;
                    const value = prop.value;

                    return (
                        <Input.Checkbox
                            label={permission}
                            checked={value}
                            onChange={onChange}
                        />
                    )
                }
            });
        });
    })(elements, props.activeBusiness.code);

    openPhoneModal(
        <SimpleForm
            elements={elements}
            onCancel={() => {
                closePhoneModal(false);
            }}
            onSubmit={async (values) => {
                setPhoneModalLoading();
                const permissions = [];

                GetBusinessPermissions(props.activeBusiness.code).forEach((permission) => {
                    values[permission] && permissions.push(formatPermission(permission));
                });

                const results = await nuiAction('ev-ui:createBusinessRole', {
                    permissions: permissions,
                    name: values.name,
                    business: props.activeBusiness
                });

                if (results.meta.ok) {
                    closePhoneModal();
                    props.manageBusiness(props.activeBusiness);
                } else {
                    setPhoneModalError(results.meta.message);
                }
            }}
        />
    )
}