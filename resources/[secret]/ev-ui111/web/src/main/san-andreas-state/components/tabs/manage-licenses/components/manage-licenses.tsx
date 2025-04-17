import React from "react";
import Content from "main/san-andreas-state/components/content";
import Paper from "main/san-andreas-state/components/paper";
import { nuiAction } from "lib/nui-comms";

export default (props: any) => {
    const options = [];

    props.licenses.forEach((license: License) => {
        if (props.permissions.includes('grant_license') || (license.name === 'Drivers License' && props.permissions.includes('grant_drivers_license') || (license.name === 'Weapons License' && props.permissions.includes('grant_weapons_license')))) {
            options.push(license);
        }
    });

    return (
        <Content
            burger={[
                {
                    isForm: true,
                    fields: [
                        {
                            label: 'Name',
                            name: 'name',
                            default: ''
                        }
                    ],
                    onSubmit: async (name: string) => {
                        const results = await props.search('name', name);
                        return results.meta;
                    },
                    label: 'Search by Name'
                },
                {
                    isForm: true,
                    fields: [
                        {
                            label: 'ID',
                            name: 'id',
                            default: ''
                        }
                    ],
                    onSubmit: async (stateId: number) => {
                        const results = await props.search('id', stateId);
                        return results.meta;
                    },
                    label: 'Search by State ID'
                }
            ]}
            heading="People"
        >
            {props.characters && props.characters.map((character: Character) => {
                const actions: any = [
                    {
                        label: "View Licenses",
                        onClick: () => props.getLicenses(character)
                    }
                ];

                if (options.length > 0) {
                    actions.push({
                        fields: [
                            {
                                label: 'License',
                                name: 'id',
                                type: 'select',
                                options: options,
                                default: options[0].id
                            }
                        ],
                        label: 'Grant License',
                        isForm: true,
                        onSubmit: async (license) => {
                            const results = await nuiAction('ev-ui:grantLicense', { license: license, target_id: character.id });
                            props.updateState({ characterLicensesFor: 0 });
                            return results.meta;
                        }
                    });
                }

                return (
                    <React.Fragment key={character.id}>
                        <hr />
                        <Paper
                            key={character.id}
                            actions={actions}
                            heading={`${character.first_name} ${character.last_name}`}
                        />
                        {props.characterLicensesFor === character.id && (
                            <>
                                {props.characterLicenses.map((license: License) => {
                                    const name = license.name;
                                    const licenseActions = [];

                                    if ((props.permissions.includes('revoke_license') || name === 'Drivers License' && props.permissions.includes('revoke_drivers_license') || name === 'Weapons License' && props.permissions.includes('revoke_weapons_license'))) {
                                        licenseActions.push({
                                            label: 'Revoke',
                                            isConfirm: true,
                                            onConfirm: async () => {
                                                const results = await nuiAction('ev-ui:revokeLicense', { license: license, target_id: character.id });
                                                props.updateState({ characterLicensesFor: 0 });
                                                return results.meta;
                                            }
                                        })
                                    }

                                    return (
                                        <Paper
                                            key={license.id}
                                            actions={licenseActions}
                                            heading={name}
                                            headingExtra={!license.status ? 'Revoked' : '' }
                                        />
                                    )
                                })}
                            </>
                        )}
                    </React.Fragment>
                )
            })}
        </Content>
    )
}