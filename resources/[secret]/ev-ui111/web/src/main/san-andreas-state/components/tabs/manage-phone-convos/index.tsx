import Button from "components/button/button";
import Text from "components/text/text";
import React from "react";
import Content from "../../content";
import { PhoneLogType } from "./enums/types";
import useStyles from "./index.styles";

export default (props: any) => {
    const classes = useStyles();
    const [selectedNumber, setSelectedNumber] = React.useState('');
    const [selectedType, setSelectedType] = React.useState(PhoneLogType.PHONE_MESSAGE_LOGS);
    const [showExportModal, setShowExportModal] = React.useState(false);
    const [conversations, setConversations] = React.useState({});

    const fetchPhoneLogs = async (type: PhoneLogType) => { }

    const handleExport = async () => { }

    return (
        <Content
            heading="Phone Conversations"
            burger={[
                {
                    isForm: true,
                    onSubmit: fetchPhoneLogs(PhoneLogType.PHONE_MESSAGE_LOGS),
                    label: 'Phone Message Logs',
                    fields: [
                        {
                            label: 'Phone Number',
                            name: 'phoneNumber',
                            default: '',
                        },
                    ]
                },
                {
                    isForm: true,
                    onSubmit: fetchPhoneLogs(PhoneLogType.PHONE_CALL_LOGS),
                    label: 'Phone Call Logs',
                    fields: [
                        {
                            label: 'Phone Number',
                            name: 'phoneNumber',
                            default: '',
                        },
                    ]
                }
            ]}
        >
            <div className={classes.btnContainer}>
                {Object.keys(conversations).length > 0 && (
                    <Button.Primary onClick={() => setShowExportModal(true)}>
                        Export All
                    </Button.Primary>
                )}
            </div>
            {Object.keys(conversations).map((id: string, key: number) => (
                <div key={key}>
                    <div className={classes.detailsWrapper}>
                        <Text>
                            From: {conversations[id].from}
                        </Text>
                        <Text>
                            To: {conversations[id].to}
                        </Text>
                    </div>
                </div>
            ))}
            {showExportModal && (
                <></> //TODO;
            )}
        </Content>
    )
}