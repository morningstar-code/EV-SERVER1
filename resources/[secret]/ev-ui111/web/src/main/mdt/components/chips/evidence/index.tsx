import Chip from "../../chip";
import Content from "../../content";
import Evidence from "./evidence";
import { removeResourceLink, updateMdtState } from "main/mdt/actions";
import CreateAssignEvidenceModal from "../../modals/create-assign-evidence-modal";

export default (props: any) => {
    const parentId = props.parent.id;

    return (
        <Content
            autoHeight={true}
            flexRow={true}
            title="Evidence"
            actions={(
                !!parentId && (
                    <Chip
                        noLabel={true}
                        icon="plus"
                        textColor="white"
                        bgColor="black"
                        size="small"
                        iconSize="lg"
                        onClick={() => {
                            const data = {
                                resourceId: parentId,
                                resourceGet: props.resourceGet,
                                resourceKey: props.resourceKey,
                                resourceStore: props.resourceStore,
                                resourceType: props.resourceType
                            };

                            return updateMdtState({
                                modal: (state: any) => {
                                    return (
                                        <CreateAssignEvidenceModal
                                            {...state}
                                            {...data}
                                        />
                                    )
                                }
                            })
                        }}
                        style={{ textAlign: 'center' }}
                    />
                )
            )}
        >
            {!!parentId && props.evidence && props.evidence.length > 0 && props.evidence.sort((a: any, b: any) => {
                return a.cid ?? 0 - b.cid ?? 0
            }).map((evidence: any) => {
                return (
                    <Evidence
                        key={evidence.id}
                        evidence={evidence}
                        onDelete={() => {
                            return removeResourceLink(
                                evidence.resource_link_id,
                                parentId,
                                props.resourceGet,
                                props.resourceKey,
                                props.resourceStore
                            );
                        }}
                    />
                )
            })}
        </Content>
    )
}