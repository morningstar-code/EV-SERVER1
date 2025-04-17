import React from "react";
import Modal from "./modal";

class ConfirmModal extends React.Component<any> {
    timeout = null;

    state = {
        searchValue: ''
    }

    render() {
        return (
            <Modal {...this.props} />
        )
    }
}

export default ConfirmModal;