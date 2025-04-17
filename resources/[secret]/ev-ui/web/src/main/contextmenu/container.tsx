import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import { nuiAction } from 'lib/nui-comms';
import ContextMenu from './components/contextmenu';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        show: false
    }

    onShow = (eventData?: any) => {
        this.props.updateState({
            menus: [],
            oldMenus: []
        });

        this.props.updateState({
            active: true,
            showButton: true,
            menus: eventData.options ?? [],
            position: eventData.position ?? 'right'
        });
    }

    onHide = () => {
        this.props.updateState({
            active: false,
            showButton: false,
            menus: [],
            oldMenus: []
        });
    }

    handleActionClick = (action, key, disabled, children, backButton, extraAction) => {
        if (backButton === true) {
            this.props.updateState({
                active: false,
                showButton: false
            });
            setTimeout(() => {
                this.props.updateState({
                    active: true,
                    showButton: true,
                    menus: this.props.oldMenus
                });
            }, 100)
            return
        }
        if (action !== undefined) {
            if (disabled === undefined || disabled === false) {
                nuiAction('ev-ui:closeApp', {}).then(cb => {
                    if (cb.meta.ok === true) {
                        nuiAction(`${action}`, { key: key }).then(result => {
                            if (result.meta.ok === true) {
                                nuiAction('ev-ui:applicationClosed', { name: "contextmenu", fromEscape: false }).then(result => {
                                    if (result.meta.ok === true) {
                                        this.props.updateState({
                                            active: false,
                                            showButton: false,
                                            menus: [],
                                            oldMenus: []
                                        });
                                    }
                                })
                            }
                        })
                    }
                })
            }
        } else {
            if (children !== undefined) {
                this.props.updateState({
                    active: false,
                    showButton: false
                });
                setTimeout(() => {
                    if (extraAction !== undefined) {
                        nuiAction(`${extraAction}`, { key: key })
                    }

                    if (this.props.oldMenus.length === 0) {
                        this.props.updateState({
                            oldMenus: this.props.menus
                        });
                    }
                    let arr = children
                    let array = {
                        title: "Go Back",
                        backButton: true
                    }
                    let newArr = [array].concat(arr)
                    this.props.updateState({
                        active: true,
                        showButton: true,
                        menus: newArr
                    });
                }, 100)
            }
        }
    }

    render() {
        return (
            <AppWrapper
                closeOnError={true}
                name="contextmenu"
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
                style={{ zIndex: 0 }}
            >
                {this.props.active && this.props.showButton && (
                    <ContextMenu {...this.props} handleActionClick={this.handleActionClick} />
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);