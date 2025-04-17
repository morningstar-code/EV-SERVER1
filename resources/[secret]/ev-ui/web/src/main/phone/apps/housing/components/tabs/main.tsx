import React, { FunctionComponent } from "react";
import { Typography } from "@mui/material";
import { ComponentPaper } from "components/paper";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";
import { formatCurrency } from "lib/format";
import { nuiAction } from "lib/nui-comms";

const Main: FunctionComponent<any> = (props) => {
    return (
        <div style={{ width: '100%' }}>
            <div style={{ width: '100%' }}>
                <Typography variant="body1" style={{ color: '#fff' }}>
                    Current
                </Typography>
                <ComponentPaper
                    style={{ width: '100%' }}
                    actions={[
                        {
                            icon: 'map-marked',
                            title: 'Set GPS',
                            onClick: () => {
                                nuiAction('ev-ui:housingSetGps', {
                                    name: props.currentApartment.streetName
                                });
                            }
                        }
                    ]}
                >
                    <ComponentIcon icon="house-user" />
                    <ComponentDetails title={`Room: ${props.currentApartment.roomNumber}`} description={props.currentApartment.streetName} />
                </ComponentPaper>
            </div>
            <div style={{ width: '100%' }}>
                <Typography variant="body1" style={{ color: '#fff' }}>
                    Available
                </Typography>
                {props.apartmentTypes && props.apartmentTypes.length > 0 && props.apartmentTypes.filter(a => a.apartmentType !== props.currentApartment.roomType).map((a: any) => {
                    return (
                        <ComponentPaper
                            key={a.apartmentType}
                            style={{ width: '100%' }}
                            actions={[
                                {
                                    icon: 'dollar-sign',
                                    title: 'Upgrade!',
                                    onClick: function () {
                                        return props.upgradeApartment(
                                            a.apartmentType
                                        )
                                    }
                                },
                                {
                                    icon: 'map-marked',
                                    title: 'Set GPS',
                                    onClick: () => { }
                                }
                            ]}
                        >
                            <ComponentIcon icon="home" />
                            <ComponentDetails title={formatCurrency(a.apartmentPrice)} description={a.apartmentStreet} />
                        </ComponentPaper>
                    )
                })}
            </div>
        </div>
    )
}

export default Main;