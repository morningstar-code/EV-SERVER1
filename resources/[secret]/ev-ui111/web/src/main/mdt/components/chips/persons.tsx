import Content from "../content";
import Chip from "../chip";
import { openAddPersonsModal, removeResourceLink } from "main/mdt/actions";

export default (props: any) => {
    const parentId = props.parent.id;
    const showAdd = props.showAdd || function () { return true };

    return (
        <Content
            autoHeight={true}
            flexRow={true}
            title="Persons Involved"
            actions={(
                !!parentId && showAdd() && (
                    <Chip
                        noLabel={true}
                        icon="plus"
                        textColor="white"
                        bgColor="black"
                        size="small"
                        iconSize="lg"
                        onClick={() => {
                            return openAddPersonsModal({
                                existingTags: props.persons && props.persons.length > 0 && props.persons.map((person: any) => { return person.character_id }) || [],
                                resourceId: parentId,
                                resourceGet: props.resourceGet,
                                resourceKey: props.resourceKey,
                                resourceStore: props.resourceStore,
                                resourceType: props.resourceType
                            });
                        }}
                        style={{ textAlign: 'center' }}
                    />
                )
            )}
        >
            {!!parentId && props.persons && props.persons.length > 0 && props.persons.filter((item, index, self) => {
                return index === self.findIndex(obj => obj.character_id === item.character_id);
            }).map((person: any) => {
                return (
                    <Chip
                        key={person.character_id}
                        label={person.name}
                        textColor="black"
                        bgColor="white"
                        style={{ marginRight: 8, marginBottom: 8 }}
                        onDelete={() => {
                            return removeResourceLink(
                                person.resource_link_id, //same id?
                                parentId, //same id?
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