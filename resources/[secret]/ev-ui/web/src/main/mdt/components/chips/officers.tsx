import Content from "../content";
import Chip from "../chip";
import { removeResourceLink, updateMdtState } from "main/mdt/actions";
import OfficersModal from "../modals/officers-modal";

export default (props: any) => {
    const parentId = props.parent.id;

    return (
        <Content
            autoHeight={true}
            flexRow={true}
            title="Officers Involved"
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
                            const data: any = {
                                existingTags: props.officers && props.officers.length > 0 && props.officers.map((officer: any) => { return officer.character_id }) || [],
                                resourceId: parentId, //parentId is the incident's database id
                                resourceGet: props.resourceGet, //getIncident
                                resourceKey: props.resourceKey, //incident
                                resourceStore: props.resourceStore, //myStoreKey
                                resourceType: props.resourceType //incident
                            }

                            return updateMdtState({
                                modal: (state: any) => {
                                    return (
                                        <OfficersModal
                                            {...state}
                                            {...data}
                                        />
                                    )
                                },
                                modalStyle: { minWidth: '50%' }
                            });
                        }}
                        style={{ textAlign: 'center' }}
                    />
                )
            )}
        >
            {!!parentId && props.officers && props.officers.length > 0 && props.officers.filter((item, index, self) => {
                return index === self.findIndex(obj => obj.character_id === item.character_id);
            }).map((officer: any) => {
                return (
                    <Chip
                        key={officer.character_id}
                        label={`(${officer.callsign}) ${officer.name}`}
                        textColor="black"
                        bgColor="white"
                        style={{ marginRight: 8, marginBottom: 8 }}
                        onDelete={() => {
                            return removeResourceLink(
                                officer.resource_link_id, //resource_link_id is the database id of the incident
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