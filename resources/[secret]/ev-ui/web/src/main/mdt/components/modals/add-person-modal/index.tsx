import React from 'react';
import Modal from './modal';
import { mdtAction } from 'main/mdt/actions';

class AddPersonModal extends React.Component<any> {
    timeout = null;

    state = {
        profiles: [],
        searchValue: ''
    };

    onSearchChange = async (searchValue: string) => {
        this.setState({ searchValue: searchValue });
        clearTimeout(this.timeout);
        const results = await mdtAction('getCivilianProfiles', { name: searchValue }, [
            {
                id: 1,
                name: 'Devlin Weloper',
                profile_image_url: 'https://i.imgur.com/ttNVaPp.png',
                summary: 'Something happened...',
                parole_end_timestamp: 1606499463,
                driving_license_points_start_date: 0,
                drivers_points: 0,
                is_wanted: false,
                licenses: [],
                tags: [],
                evidence: [],
                priors: [
                    {
                        name: 'Hellogasdqweuiotzxcnmqwertyuioplmnbxczasd',
                        count: 1,
                    }
                ]
            }
        ]);
        this.setState({ profiles: results.data }); //this context was getting lost cuz of the timeout
    }

    render() {
        return (
            <Modal {...this.props} onSearchChange={this.onSearchChange} searchValue={this.state.searchValue} profiles={this.state.profiles} />
        )
    }
}

export default AddPersonModal;