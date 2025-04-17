import Content from "../content";
import Chip from "../chip";
import { removeResourceLink, updateMdtState } from "main/mdt/actions";
import AddVehiclesModal from "../modals/add-vehicles-modal";

export default (props: any) => {
    const parentId = props.parent.id;
    const showAdd = props.showAdd || function () { return true };

    return (
        <Content
            autoHeight={true}
            flexRow={true}
            title="Vehicles"
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
                            const data = {
                                existingTags: props.vehicles && props.vehicles.length > 0 && props.vehicles.map((vehicle: any) => { return vehicle.vin }) || [],
                                resourceId: parentId,
                                resourceGet: props.resourceGet,
                                resourceKey: props.resourceKey,
                                resourceStore: props.resourceStore,
                                resourceType: props.resourceType,
                                refreshIncident: props.refreshIncident
                            };

                            return updateMdtState({
                                modal: (state: any) => {
                                    return (
                                        <AddVehiclesModal
                                            {...state}
                                            {...data}
                                        />
                                    )
                                },
                                modalStyle: { minWidth: '35%' }
                            });
                        }}
                        style={{ textAlign: 'center' }}
                    />
                )
            )}
        >
            {!!parentId && props.vehicles && props.vehicles.length > 0 && props.vehicles.filter((item, index, self) => {
                return index === self.findIndex(obj => obj.id === item.id);
            }).map((vehicle: any) => {
                return (
                    <Chip
                        key={vehicle.id}
                        icon="car"
                        label={`${vehicle.plate} - ${vehicle.model} - ${vehicle?.owner ?? 'Unknown Owner'} - ${vehicle.reason}`}
                        textColor="black"
                        bgColor="white"
                        style={{ marginRight: 8, marginBottom: 8 }}
                        onDelete={() => {
                            return removeResourceLink(
                                vehicle.resource_link_id,
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