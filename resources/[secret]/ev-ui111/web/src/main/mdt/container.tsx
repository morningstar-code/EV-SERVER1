import React from "react";
import store from "./store";
import { connect } from "react-redux";
import AppWrapper from "components/ui-app/ui-app";
import MDT from "./components";
import { compose } from "lib/redux";
import { mdtAction, setMdtOfficers } from "./actions";
import { nuiAction } from "lib/nui-comms";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            character: state.character
        }
    }
});

class Container extends React.Component<any, { refresh: boolean, show: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = {
            refresh: true, //false / true (HAVE TO MAKE REFRESH THINGY WORK)
            show: false
        }
    }

    onEvent = (event: any) => {
        this.props.updateState(event);
    }

    onShow = async (data = {} as any) => {
        let publicApp: any = false;

        if (data?.publicApp) {
            publicApp = data?.publicApp;
        }

        Promise.all([
            mdtAction('getTagCategories', {}, [
                {
                    id: 1,
                    name: 'other',
                    color: 'white',
                    color_text: 'black',
                    icon: 'tag',
                },
                {
                    id: 2,
                    name: 'asd',
                    color: 'white',
                    color_text: 'black',
                    icon: 'tag',
                },
            ]),
            mdtAction('getTags', {}, [
                {
                    id: 1,
                    category_id: 1,
                    text: 'hi',
                },
                {
                    id: 2,
                    category_id: 1,
                    text: 'hi',
                },
            ]),
            mdtAction('getOfficerProfiles', {}, [
                {
                    character_id: 2,
                    name: 'anoobmaster69',
                    callsign: '669',
                    profile_image_url:
                        'https://i.imgur.com/ttNVaPp.png',
                    department: 'BCSO',
                    rank: 'Sergeant',
                    roles: [],
                },
                {
                    character_id: 1,
                    alias: 'Dw',
                    name: 'znoobmaster69',
                    callsign: '669',
                    profile_image_url:
                        'https://i.imgur.com/ttNVaPp.png',
                    department: 'LSPD',
                    rank: 'Sergeant',
                    roles: [ //Probs contains just an array of role ids, and then they grab the role info from _mdt_profile_officer_role
                        {
                            id: 1,
                            icon: 'user-tag',
                            name: 'JTF',
                            color_text: 'black',
                            color: 'white',
                        },
                    ],
                    permissions: [
                        JSON.stringify({
                            name: 'tags.createCategory',
                            id: 0,
                        }),
                    ],
                },
                {
                    character_id: 1,
                    alias: 'Dw',
                    name: 'bnoobmaster69',
                    callsign: '669',
                    profile_image_url:
                        'https://i.imgur.com/ttNVaPp.png',
                    department: 'LSPD',
                    rank: 'Sergeant',
                    roles: [
                        {
                            id: 1,
                            icon: 'user-tag',
                            name: 'JTF',
                            color_text: 'black',
                            color: 'white',
                        },
                    ],
                    permissions: [
                        JSON.stringify({
                            name: 'tags.createCategory',
                            id: 0,
                        }),
                    ],
                },
            ]),
            mdtAction('hasConfigPermission', {}, true), //Returns string[] of permissions (e.g. ["tags.createCategory"]) or a stringified array like above
            nuiAction('ev-mdt:getUnitInformation', {}, { returnData: [] }),
            mdtAction('getCerts', {}, [
                {
                    id: 1,
                    name: 'cert',
                    description: 'hi',
                },
                {
                    id: 1,
                    name: 'cert',
                    description: 'hi',
                },
            ]),
        ]).then((res) => {
            const tagCategories = res[0].data; //Tag categories
            const tags = res[1].data; //Tags
            const officers = res[2].data ?? []; //Officer profiles
            const permissions = res[3].data; //Permissions of the person opening the MDT
            const unitInformation = res[4].data ?? []; //On duty units data
            const certs = res[5].data ?? []; //Certs

            //console.log("tagCategories", tagCategories);
            //console.log("tags", tags);
            //console.log("officers", officers);
            //console.log("permissions", permissions);
            //console.log("unitInformation", unitInformation);
            //console.log("certs", certs);

            const mappedOfficers = officers.map((officer: any) => {
                officer.onDuty = unitInformation.find((unit: any) => unit.callsign === officer.character_id) !== null;
                return officer;
            }).sort((a: any, b: any) => {
                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            });

            //console.log("mappedOfficers", mappedOfficers);

            const mdtMyProfile = mappedOfficers.find((officer: any) => officer.character_id === this.props.character.id) || {}

            /*
            {
                rank: 'Chief of Police',
                department: 'LSPD',
                alias: 'Bozo',
                name: 'NoPixel Guy',
                callsign: '669',
                character_id: 1,
                profile_image_url: 'https://i.imgur.com/ttNVaPp.png',
                roles: [],
                permissions: [] //And the perms here is structured like { id: 0, name: "" }
            }
            */

            //console.log("mdtMyProfile", mdtMyProfile);

            setMdtOfficers(mappedOfficers);

            this.props.updateState({
                publicApp: publicApp,
                myProfile: mdtMyProfile,
                officers: [],
                permissions: {
                    ...permissions
                },
                tagCategories: tagCategories,
                tags: tags,
                certs: certs
            });

            this.setState({
                show: true
            });
        });
    }

    onHide = () => {
        this.setState({
            show: false
        });
    }

    componentDidMount() {
        //what goes here?
    }

    componentDidUpdate(prevProps: any) {
        //console.log("MDT componentDidUpdate", this.state.show);

        if (prevProps.publicApp !== this.props.publicApp) {
            this.setState({
                refresh: false
            });

            setTimeout(() => {
                this.setState({
                    refresh: true
                });
            }, 500);
        }
    }

    render() {
        return (
            <AppWrapper
                center={true}
                name="mdt"
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
                onEscape={this.onHide}
            >
                {this.state.refresh && (
                    <MDT {...this.props} show={this.state.show} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);