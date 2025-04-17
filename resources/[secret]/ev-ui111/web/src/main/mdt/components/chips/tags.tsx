import Content from "../content";
import Chip from "../chip";
import { removeResourceLink, updateMdtState } from "main/mdt/actions";
import CreateTagModal from "../modals/create-tag-modal";

export default (props: any) => {
    const parentId = props.parent.id;
    const showAdd = props.showAdd || function () { return true };

    return (
        <Content
            autoHeight={true}
            flexRow={true}
            title="Tags"
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
                            updateMdtState({
                                modal: (state: any) => {
                                    const data = {
                                        existingTags: props.tags && props.tags.length > 0 && props.tags.map((tag: any) => tag.id) || [],
                                        resourceId: parentId,
                                        resourceGet: props.resourceGet,
                                        resourceKey: props.resourceKey,
                                        resourceStore: props.resourceStore,
                                        resourceType: props.resourceType
                                    }

                                    return (
                                        <CreateTagModal {...state} {...data} />
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
            {!!parentId && props.tags && props.tags.length > 0 && props.tags.filter((item, index, self) => {
                return index === self.findIndex(obj => obj.id === item.id);
            }).map((t: any) => {
                return (
                    <Chip
                        key={t.id}
                        icon={t.icon}
                        label={t.text}
                        textColor={t.color_text}
                        bgColor={t.color}
                        style={{ marginRight: 8, marginBottom: 8 }}
                        iconSize="lg"
                        onDelete={() => {
                            return removeResourceLink(
                                t.resource_link_id,
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