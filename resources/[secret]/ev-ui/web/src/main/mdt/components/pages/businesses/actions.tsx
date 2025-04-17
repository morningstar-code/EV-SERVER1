import { updateMdtState } from "main/mdt/actions"
import BusinessBankAccessModal from "../../modals/business-modals/bank-access";
import BusinessChangeOwnerModal from "../../modals/business-modals/change-owner";
import BusinessHistoryModal from "../../modals/business-modals/history";
import ChangeBusinessNameModal from "../../modals/business-modals/change-name";
import CreateBusinessModal from "../../modals/business-modals/create-business";

export const openMdtBusinessBankAccessModal = (state: any) => {
    updateMdtState({
        modal: (data: any) => <BusinessBankAccessModal {...data} {...state} />
    });
}

export const openMdtBusinessChangeOwnerModal = (state: any) => {
    updateMdtState({
        modal: (data: any) => <BusinessChangeOwnerModal {...data} {...state} />
    });
}

export const openMdtChangeBusinessNameModal = (state: any) => {
    updateMdtState({
        modal: (data: any) => <ChangeBusinessNameModal {...data} {...state} />
    });
}

export const openMdtBusinessHistoryModal = (state: any) => {
    updateMdtState({
        modal: (data: any) => <BusinessHistoryModal {...data} {...state} />,
        modalStyle: { minWidth: '60%' }
    });
}

export const openMdtCreateBusinessModal = (state: any) => {
    updateMdtState({
        modal: (data: any) => <CreateBusinessModal {...data} {...state} />
    });
}