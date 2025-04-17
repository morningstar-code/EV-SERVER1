import Content from "../content";
import Chip from "../chip";
import { removeResourceLink, updateMdtState } from "main/mdt/actions";
import CreateAssignCertModal from "../modals/create-assign-cert-modal";

export default (props: any) => {
    const characterId = props.parent.character_id;
    const showAdd = props.showAdd || function () { return true };

    const removeCert = async (cert: any) => {
        const results = await removeResourceLink(
            cert.resource_link_id,
            characterId,
            props.resourceGet,
            props.resourceKey,
            props.resourceStore,
            'cert'
        );

        props.updateState({ certs: results.data.find((c) => c.character_id === props.parent.character_id)?.certs ?? [] });
    }

    const updateSelectedOfficer = (certs: any) => {
        props.updateState({ certs: certs });
    }

    return (
        <Content
            autoHeight={true}
            flexRow={true}
            title="Certs"
            actions={(
                !!characterId && showAdd() && (
                    <Chip
                        noLabel={true}
                        icon="plus"
                        textColor="white"
                        bgColor="black"
                        size="small"
                        iconSize="lg"
                        onClick={() => {
                            const data = {
                                existingCerts: props.existingCerts && props.existingCerts.length > 0 && props.existingCerts.map((cert: any) => { return cert.id }) || [],
                                resourceId: characterId,
                                resourceGet: props.resourceGet,
                                resourceKey: props.resourceKey,
                                resourceStore: props.resourceStore,
                                resourceType: props.resourceType,
                                updateSelectedOfficer: updateSelectedOfficer
                            }

                            return updateMdtState({
                                modal: (state: any) => {
                                    return (
                                        <CreateAssignCertModal
                                            {...state}
                                            {...data}
                                        />
                                    )
                                },
                                modalStyle: { minWidth: '60%' }
                            });
                        }}
                        style={{ textAlign: 'center' }}
                    />
                )
            )}
        >
            {!!characterId && props.certs && props.certs.length > 0 && props.certs.map((cert: any) => {
                return (
                    <Chip
                        key={cert.id}
                        icon="certificate"
                        label={cert.name}
                        textColor="black"
                        bgColor="white"
                        style={{ marginRight: 8, marginBottom: 8 }}
                        onDelete={showAdd() ? () => {
                            return removeCert(cert);
                        } : void 0}
                    />
                )
            })}
        </Content>
    )
}