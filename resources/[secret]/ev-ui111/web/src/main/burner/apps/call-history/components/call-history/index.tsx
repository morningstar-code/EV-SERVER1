import moment from "moment";
import React, { FunctionComponent } from "react";
import AppContainer from "main/burner/components/app-container";
import { ComponentDetails } from "components/component-details";
import { ComponentIcon } from "components/component-icon";
import { ComponentPaper } from "components/paper";
import { closeBurnerModal, openBurnerModal } from "main/burner/actions";
import SimpleForm from "components/simple-form";
import Input from "components/input/input";
import { callStart } from "../../events";
import MessageContactModal from "main/phone/apps/contacts/message-contact-modal";

const CallHistory: FunctionComponent<any> = (props) => {
    const [list, setList] = React.useState(props.list);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    return (
        <AppContainer
            emptyMessage={list.length === 0}
            primaryActions={[
                {
                    icon: 'phone',
                    onClick: () => {
                        return openBurnerModal(
                            <SimpleForm
                                elements={[
                                    {
                                        name: 'number',
                                        render: (props) => {
                                            const onChange = props.onChange;
                                            const value = props.value;

                                            return (
                                                <Input.Phone
                                                    onChange={onChange}
                                                    value={value}
                                                    useNormalInput={true}
                                                />
                                            )
                                        }
                                    }
                                ]}
                                onCancel={() => {
                                    closeBurnerModal(false);
                                }}
                                onSubmit={(values) => {
                                    callStart({ number: values.number });
                                    closeBurnerModal(false);
                                }}
                            />
                        )
                    },
                    title: 'Call Someone'
                }
            ]}
            search={{
                filter: ['name', 'number'],
                list: props.list,
                onChange: setList
            }}
        >
            {list && list.length > 0 && list.map((call, index) => {
                const actions = [
                    {
                        icon: 'phone',
                        onClick: () => {
                            callStart({ number: call.number });
                        },
                        title: 'Call'
                    },
                    {
                        icon: 'comment',
                        onClick: () => {
                            openBurnerModal(
                                <MessageContactModal number={call.number} />
                            )
                        },
                        title: 'Message'
                    },
                ]

                const title = call.number;

                return (
                    <ComponentPaper
                        key={index}
                        actions={actions}
                    >
                        <div className="image">

                            <ComponentIcon icon={call.direction === 'in' ? 'phone' : 'phone-alt'} />
                        </div>
                        <ComponentDetails
                            description={moment(call.timestamp * 1000).fromNow()}
                            title={title}
                        />
                    </ComponentPaper>
                )
            })}
        </AppContainer>
    )
}

export default CallHistory;