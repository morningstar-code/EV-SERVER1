import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import { ComponentPaper } from "components/paper";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";
import Button from "components/button/button";
import { nuiAction } from "lib/nui-comms";
import { closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { formatCurrency } from "lib/format";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import Text from "components/text/text";

const Properties: FunctionComponent<any> = (props) => {
    const ownedProperties = props.properties.filter((p: any) => !!p.is_owner);
    const accessProperties = props.properties.filter((p: any) => !p.is_owner);

    const getIconByCategory = (data: any) => {
        switch (data.cat) {
            case 'housing':
                return 'house-user';
            case 'warehouse':
                return 'warehouse';
            case 'office':
                return 'briefcase';
            case 'shop':
                return 'store';
            default:
                return '';
        }
    }

    const generateActions = (data: any) => {
        const actions = [];

        actions.push({
            icon: 'map-marked',
            title: 'Set GPS',
            onClick: () => {
                nuiAction('ev-ui:housingSetGps', {
                    name: data.name
                });
            }
        });

        actions.push({
            icon: data.is_locked ? 'lock' : 'lock-open',
            title: data.is_locked ? 'Unlock' : 'Lock',
            onClick: async () => {
                await nuiAction('ev-ui:housingToggleLock', {
                    name: data.name,
                    action: data.is_locked ? 'unlock' : 'lock'
                });

                props.getProperties();
                closePhoneModal(false);
            }
        });

        actions.push({
            icon: 'edit',
            title: 'Edit Property',
            onClick: async () => {
                setPhoneModalLoading();
                const results = await nuiAction('ev-ui:housingEditProperty', {
                    name: data.name
                });
                if (results.meta.ok) {
                    props.updateState({
                        editMode: true,
                        availableEditOptions: results.data
                    });
                    closePhoneModal(false);
                } else {
                    setPhoneModalError(results.meta.error, true);
                }
            }
        });

        if (!data.is_owner) {
            actions.push({
                icon: 'key',
                title: 'Remove Key',
                onClick: async () => {
                    const results = await nuiAction('ev-ui:housingSelfRemoveKey', {
                        name: data.name
                    });
                    if (results.meta.ok) {
                        props.updateState({
                            editMode: true,
                            availableEditOptions: results.data
                        });
                        closePhoneModal(false);
                    } else {
                        setPhoneModalError(results.meta.error, true);
                    }
                }
            });
        }

        if (data.is_owner) {
            actions.push({
                icon: 'dollar-sign',
                title: 'Sell Property',
                onClick: async () => {
                    openConfirmModal(
                        async () => {
                            await nuiAction('ev-ui:housingSellProperty', {
                                name: data.name
                            });
                            closePhoneModal();
                            props.getProperties();
                        },
                        'Sell at 50% value?'
                    )
                }
            });

            actions.push({
                icon: 'key',
                title: 'Keys',
                onClick: () => {
                    openPhoneModal(
                        <div>
                            <Text variant="body1">
                                Add:
                            </Text>
                            <SimpleForm
                                elements={[
                                    {
                                        name: 'id',
                                        render: (prop: SimpleFormRender<number>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.CityID
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )
                                        }
                                    }
                                ]}
                                onCancel={() => {
                                    return closePhoneModal(false);
                                }}
                                onSubmit={async (values: any) => {
                                    setPhoneModalLoading();

                                    const results = await nuiAction('ev-ui:housingAddKey', {
                                        name: data.name,
                                        state_id: Number(values.id)
                                    });

                                    if (results.meta.ok) {
                                        props.getProperties();
                                        closePhoneModal();
                                    } else {
                                        setPhoneModalError(results.meta.message);
                                    }
                                }}
                            />
                            <hr style={{ margin: '10px 0' }} />
                            <SimpleForm
                                elements={[
                                    {
                                        name: 'id',
                                        render: (prop: SimpleFormRender<string>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            const mappedKeys = data?.keys && data?.keys?.length > 0 ? data.keys.map((key: any) => {
                                                return {
                                                    id: key.id,
                                                    name: `${key.first_name} ${key.last_name}`
                                                }
                                            }) : [];

                                            return (
                                                <Input.Select
                                                    items={mappedKeys}
                                                    label="Remove"
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )
                                        }
                                    }
                                ]}
                                onCancel={() => {
                                    return closePhoneModal(false);
                                }}
                                onSubmit={async (values: any) => {
                                    setPhoneModalLoading();

                                    const results = await nuiAction('ev-ui:housingRemoveKey', {
                                        name: data.name,
                                        state_id: Number(data.keys.find((key: any) => key.id === values.id).character_id)
                                    });

                                    if (results.meta.ok) {
                                        props.getProperties();
                                        closePhoneModal();
                                    } else {
                                        setPhoneModalError(results.meta.message, true);
                                    }
                                }}
                            />
                        </div>
                    )
                }
            });

            actions.push({
                icon: 'cog',
                title: 'Furniture Access',
                onClick: () => {
                    openPhoneModal(
                        <div>
                            <Text variant="body1">
                                Add:
                            </Text>
                            <SimpleForm
                                elements={[
                                    {
                                        name: 'id',
                                        render: (prop: SimpleFormRender<number>) => {
                                            const onChange = prop.onChange;
                                            const value = prop.value;

                                            return (
                                                <Input.CityID
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            )
                                        }
                                    }
                                ]}
                                onCancel={() => {
                                    return closePhoneModal(false);
                                }}
                                onSubmit={async (values: any) => {
                                    setPhoneModalLoading();

                                    const results = await nuiAction('ev-ui:housingAddAccess', {
                                        name: data.name,
                                        state_id: Number(values.id)
                                    });

                                    if (results.meta.ok) {
                                        closePhoneModal();
                                    } else {
                                        setPhoneModalError(results.meta.message, true);
                                    }
                                }}
                            />
                        </div>
                    )
                }
            });
        }

        return actions;
    }

    const editCurrentLocation = async () => {
        setPhoneModalLoading();

        const results = await nuiAction('ev-ui:housingCheckCurrentLocation', {}, {
            returnData: {
                housingName: '11 Grove Street',
                housingCat: 'housing',
                housingPrice: 30000,
                isOwned: false
            }
        });

        if (results.meta.ok) {
            const data = results.data;
            const result = await nuiAction('ev-ui:housingEditCurrent', { name: data.housingName });
            if (result.meta.ok) {
                closePhoneModal();
            } else {
                setPhoneModalError(result.meta.message, true);
            }
        } else {
            setPhoneModalError(results.meta.message, true);
        }
    }

    const checkCurrentLocation = async () => {
        setPhoneModalLoading();

        const results = await nuiAction('ev-ui:housingCheckCurrentLocation', {}, {
            returnData: {
                housingName: '11 Grove Street',
                housingCat: 'housing',
                housingPrice: 30000,
                isOwned: false
            }
        });

        if (results.meta.ok) {
            const data = results.data;

            const purchaseLocation = async () => {
                setPhoneModalLoading();

                const res = await nuiAction('ev-ui:housingCurrentLocationPurchase', {
                    name: data.housingName
                });

                if (res.meta.ok) {
                    closePhoneModal();
                    props.getProperties();
                } else {
                    setPhoneModalError(res.meta.message, true);
                }
            }

            openPhoneModal(
                <div style={{ textAlign: 'left' }}>
                    <Typography variant="body2" style={{ color: 'white' }}>
                        Name:
                    </Typography>
                    <Typography variant="body1" style={{ color: 'white', marginBottom: 8 }}>
                        {results.data.housingName}
                    </Typography>
                    <Typography variant="body2" style={{ color: 'white' }}>
                        Category:
                    </Typography>
                    <Typography variant="body1" style={{ color: 'white', marginBottom: 8 }}>
                        {results.data.housingCat}
                    </Typography>
                    <Typography variant="body2" style={{ color: 'white' }}>
                        Price:
                    </Typography>
                    <Typography variant="body1" style={{ color: 'white', marginBottom: 8 }}>
                        {formatCurrency(results.data.housingPrice)}
                    </Typography>
                    {results.data.isOwned ? (
                        <div className="flex flex-centered">
                            <Typography variant="body2" style={{ color: 'white' }}>
                                Already Owned
                            </Typography>
                        </div>
                    ) : (
                        <div className="flex flex-centered">
                            <Button.Primary onClick={purchaseLocation}>
                                Purchase Property
                            </Button.Primary>
                        </div>
                    )}
                    <div className="flex flex-centered" style={{ marginTop: 8 }}>
                        <Button.Secondary onClick={() => closePhoneModal(false)}>
                            Cancel
                        </Button.Secondary>
                    </div>
                </div>
            )
        } else {
            setPhoneModalError(results.meta.message, true);
        }
    }

    return (
        <div style={{ width: '100%' }}>
            {props.editMode ? (
                <>
                    <div className="flex flex-centered" style={{ margin: '16px 0' }}>
                        <Button.Primary onClick={() => {
                            props.updateState({
                                editMode: false,
                                availableEditOptions: {}
                            });
                            nuiAction('ev-ui:housingEditPropertyStop');
                        }}>
                            Leave Edit Mode
                        </Button.Primary>
                    </div>
                    <hr />
                    <div className="flex flex-centered" style={{ flexDirection: 'column' }}>
                        {props.availableEditOptions.garage && (
                            <div style={{ marginBottom: 16 }}>
                                <Button.Primary onClick={() => nuiAction('ev-ui:housingEditPropertyConfig', { type: 'garage' })}>
                                    Place Garage Here
                                </Button.Primary>
                            </div>
                        )}
                        {props.availableEditOptions.stash && (
                            <div style={{ marginBottom: 16 }}>
                                <Button.Primary onClick={() => nuiAction('ev-ui:housingEditPropertyConfig', { type: 'inventory' })}>
                                    Place Stash Here
                                </Button.Primary>
                            </div>
                        )}
                        {props.availableEditOptions.backdoor && (
                            <div style={{ marginBottom: 16 }}>
                                <Button.Primary onClick={() => nuiAction('ev-ui:housingEditPropertyConfig', { type: 'backdoor' })}>
                                    Place Backdoor Here
                                </Button.Primary>
                            </div>
                        )}
                        {props.availableEditOptions.wardrobe && (
                            <div style={{ marginBottom: 16 }}>
                                <Button.Primary onClick={() => nuiAction('ev-ui:housingEditPropertyConfig', { type: 'char-changer' })}>
                                    Place Wardrobe Here
                                </Button.Primary>
                            </div>
                        )}
                        {props.availableEditOptions.crafting && (
                            <div style={{ marginBottom: 16 }}>
                                <Button.Primary onClick={() => nuiAction('ev-ui:housingEditPropertyConfig', { type: 'crafting' })}>
                                    Place Crafting Here
                                </Button.Primary>
                            </div>
                        )}
                        {props.availableEditOptions.furniture && (
                            <div style={{ marginBottom: 16 }}>
                                <Button.Primary onClick={() => nuiAction('ev-ui:housingEditPropertyConfig', { type: 'furniture' })}>
                                    Open Furniture
                                </Button.Primary>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="block flex-centered" style={{ margin: '16px 0' }}>
                        <Button.Primary onClick={checkCurrentLocation}>
                            View Current Location
                        </Button.Primary>
                    </div>
                    <div className="block flex-centered" style={{ margin: '4px 0', width: '100%' }}>
                        <Button.Primary onClick={editCurrentLocation} style={{ margin: '0px 5px' }}>
                            <i className="fas fa-edit fa-fw fa-1x" />
                        </Button.Primary>
                    </div>
                    <div style={{ width: '100%' }}>
                        {ownedProperties.length > 0 && (
                            <Typography variant="body1" style={{ color: '#fff' }}>
                                Owned
                            </Typography>
                        )}
                        {ownedProperties && ownedProperties.length > 0 && ownedProperties.map((property: any) => (
                            <ComponentPaper
                                key={property.name}
                                style={{ width: '100%' }}
                                actions={generateActions(property)}
                            >
                                <ComponentIcon icon={getIconByCategory(property)} />
                                <ComponentDetails title={property.name} description={property.cat} />
                            </ComponentPaper>
                        ))}
                    </div>
                    <div style={{ width: '100%' }}>
                        {accessProperties.length > 0 && (
                            <Typography variant="body1" style={{ color: '#fff' }}>
                                Access
                            </Typography>
                        )}
                        {accessProperties && accessProperties.length > 0 && accessProperties.map((property: any) => (
                            <ComponentPaper
                                key={property.name}
                                style={{ width: '100%' }}
                                actions={generateActions(property)}
                            >
                                <ComponentIcon icon={getIconByCategory(property)} />
                                <ComponentDetails title={property.name} description={property.cat} />
                            </ComponentPaper>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Properties;