import React, { FunctionComponent } from "react";
import AppContainer from "main/phone/components/app-container";
import { ComponentPaper } from "components/paper";
import { ComponentIcon } from "components/component-icon";
import { ComponentDetails } from "components/component-details";
import { closePhoneModal, openPhoneModal } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import useStyles from "./security-cams.styles";
import Input from "components/input/input";

const SecurityCams: FunctionComponent<any> = (props) => {
    const classes = useStyles();

    return (
        <AppContainer>
            <div className={classes.wrapper}>
                {props.cams && props.cams.length > 0 && props.cams.map((cam: any) => (
                    <ComponentPaper
                        key={cam.key}
                        actions={[
                            {
                                icon: 'eye',
                                title: 'View',
                                onClick: () => props.viewCamera(cam.key)
                            },
                            {
                                icon: 'user-plus',
                                title: 'Share',
                                onClick: () => {
                                    openPhoneModal(
                                        <SimpleForm
                                            elements={[
                                                {
                                                    name: 'camera',
                                                    render: (prop: SimpleFormRender<string>) => {
                                                        const onChange = prop.onChange;
                                                        const value = prop.value;

                                                        return (
                                                            <Input.Text
                                                                label="State ID"
                                                                icon="user-plus"
                                                                onChange={onChange}
                                                                value={value}
                                                            />
                                                        )
                                                    },
                                                    validate: ['number', 'State ID']
                                                }
                                            ]}
                                            onCancel={() => {
                                                closePhoneModal(false);
                                            }}
                                            onSubmit={(values) => {
                                                closePhoneModal(false);
                                            }}
                                        />
                                    )
                                }
                            }
                        ]}
                    >
                        <ComponentIcon icon="camera" />
                        <ComponentDetails title={cam.name} />
                    </ComponentPaper>
                ))}
            </div>
        </AppContainer>
    )
}

export default SecurityCams;