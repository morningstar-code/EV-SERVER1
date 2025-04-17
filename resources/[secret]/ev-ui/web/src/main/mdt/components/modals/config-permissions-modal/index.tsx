import React from 'react';
import Modal from './modal';
import { mdtAction } from 'main/mdt/actions';

class ConfigPermissionsModal extends React.Component<any> {
    state = {
        currentPermissions: [],
        currentPermissionsList: [],
        permissionsLoaded: false
    };

    savePermissionData = async (permission: any) => {
        this.setState({ permissionsLoaded: false });
        await mdtAction('addRolePermission', { permission: permission, roleId: this.props.roleId });
        this.getPermissions();
    }

    getPermissions = async () => {
        const results = await mdtAction('getRolePermissions', { roleId: this.props.roleId }, [
            '{"name": "config.charges", "id": "" }',
        ]);
        const currentPermissions = results.data ?? [];
        const currentPermissionsList = currentPermissions.map((permission: any) => {
            return [
                JSON.parse(permission.permission).name,
                JSON.parse(permission.permission).id
            ];
        });

        this.setState({
            currentPermissions: currentPermissions,
            currentPermissionsList: currentPermissionsList,
            permissionsLoaded: true
        });
    }

    componentDidMount() {
        this.getPermissions();
    }

    render() {
        return (
            <Modal {...this.props} {...this.state} savePermissionData={this.savePermissionData} />
        )
    }
}

export default ConfigPermissionsModal;