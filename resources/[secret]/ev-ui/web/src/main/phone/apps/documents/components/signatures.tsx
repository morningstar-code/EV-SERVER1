import React from 'react';
import { nuiAction } from 'lib/nui-comms';
import { devData } from 'main/phone/dev-data';
import AppContainer from 'main/phone/components/app-container';
import Button from 'components/button/button';
import { Typography } from '@mui/material';
import moment from 'moment';
import './signatures.scss';
import { closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalError, setPhoneModalLoading } from 'main/phone/actions';
import SimpleForm from 'components/simple-form';
import Input from 'components/input/input';

export default class Signatures extends React.Component<any> {
    getSignatures = async () => {
        const results = await nuiAction('ev-ui:getDocumentSignatures', { document: this.props.document }, { returnData: devData.getDocumentSignatures() });

        const signaturesToRender = [];
        const maxSignatures = this.props.selectedDocumentType.max_signatures;

        for (let i = 0; i < maxSignatures; i += 1) {
            signaturesToRender.push(results.data[i] || null);
        }

        this.props.updateState({
            signatures: results.data,
            signaturesToRender: signaturesToRender
        });
    }

    signDocument = async () => {
        openConfirmModal(
            async () => {
                closePhoneModal();

                await nuiAction('ev-ui:signDocument', { document: this.props.document });

                this.getSignatures();
            }
        );
    }

    requestSignature = async () => {
        openPhoneModal(
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
                onSubmit={async (values) => {
                    setPhoneModalLoading();

                    const results = await nuiAction('ev-ui:requestDocumentSignature', {
                        signee_id: Number(values.id),
                        document: this.props.document
                    });

                    if (results.meta.ok) {
                        closePhoneModal();
                        this.getSignatures();
                        return;
                    }

                    return setPhoneModalError(results.meta.message);
                }}
            />
        );
    }

    componentDidMount() {
        this.getSignatures();
    }

    render() {
        const maxSignatures = this.props.selectedDocumentType.max_signatures;
        const mySignature = this.props.signatures.find(signature => signature.id === this.props.character.id);
        const canSign = mySignature && !mySignature.timestamp;
        const canRequestSignature = !this.props.signaturesToRender[maxSignatures - 1];

        return (
            <AppContainer
                fadeIn={false}
                onClickBack={() => this.props.updateState({ page: 'editing' })}
                style={{ overflowY: 'auto' }}
            >
                <div className="documents-signatures-container">
                    <div className="signatures">
                        <div className="wrapper">
                            {canSign && (
                                <Button.Primary onClick={this.signDocument} className="sign-me">
                                    Sign Document
                                </Button.Primary>
                            )}
                            {canRequestSignature && (
                                <Button.Secondary onClick={this.requestSignature} className="sign-me">
                                    Request Signature
                                </Button.Secondary>
                            )}
                            {this.props.signaturesToRender.map((signature: any, index: number) => (
                                <div key={index} className="signature">
                                    <div className="dot">
                                        <Typography variant="h6" style={{ color: '#fff' }}>
                                            {index + 1}
                                        </Typography>
                                    </div>
                                    <div className="signee">
                                        <Typography variant="body1" style={{ color: '#fff' }}>
                                            {signature ? `${signature.first_name} ${signature.last_name}` : 'Unsigned'}
                                        </Typography>
                                        {!!signature && !signature.timestamp && (
                                            <Typography variant="body2" style={{ color: '#fff' }}>
                                                Requested
                                            </Typography>
                                        )}
                                        {!!signature && signature.timestamp && (
                                            <Typography variant="body2" style={{ color: '#fff' }}>
                                                {moment(signature.timestamp * 1000).fromNow()}
                                            </Typography>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </AppContainer>
        )
    }
}