import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import { nuiAction } from 'lib/nui-comms';
import { baseStyles } from 'lib/styles';
import { ResponsiveHeight, ResponsiveWidth } from 'utils/responsive';
import { Typography } from '@mui/material';
import { formatCurrency } from 'lib/format';
import Button from 'components/button/button';
import ClothingGrabbable from './components/clothing-grabbable';
import ClothingToggles from './components/clothing-toggles';
import Sidebar from './components/sidebar';
import Dev from './components/pages/dev';
import Peds from './components/pages/peds';
import Tattoos from './components/pages/tattoos';
import ClothingPage from './components/clothing-page';
import ClthingSecondary from './components/clothing-secondary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        activeId: 1,
        show: false,
        showExitConfirm: false,
        cost: 0,
        isFree: false,
        isDev: false,
        type: 'clothing',
        data: {}
    }

    onHide = (type?: string) => {
        if (this.state.showExitConfirm) {
            nuiAction('ev-clothing:ui:close', {
                action: type ?? 'discard',
                cost: this.state?.isFree ? 0 : this.state?.cost ?? 0,
                type: this.state?.type ?? 'clothing'
            });
        }

        this.setState({ show: false });
    }

    onEscape = () => {
        if (!this.state.showExitConfirm) {
            this.setState({
                showExitConfirm: true
            });

            nuiAction('ev-clothing:closed', { fromEscape: true });
        }
    }

    onShow = (data: any) => {
        console.log('[CLOTHING] onShow', data);
        this.setState({
            show: true,
            showExitConfirm: false,
            activeId: data?.activeId ?? 1,
            type: data.type,
            data: data.data,
            cost: 0,
            isFree: data.isFree,
            isDev: data.isDev
        });
    }

    onEvent = (data: any) => {
        if (!data.fromEscape) return;

        this.setState({
            show: true,
            showExitConfirm: true
        });
    }

    createModules = () => {
        const modules = [];

        switch (this.state.type) {
            case 'clothing': {
                modules.push([
                    'clothing',
                    {
                        id: 1,
                        icon: <FontAwesomeIcon icon="tshirt" size="2x" fixedWidth />,
                        label: 'Clothing'
                    }
                ]);
                modules.push([
                    'accessories',
                    {
                        id: 2,
                        icon: <FontAwesomeIcon icon="vest-patches" size="2x" fixedWidth />,
                        label: 'Accessories'
                    }
                ]);
                modules.push([
                    'ped',
                    {
                        id: 10,
                        icon: <FontAwesomeIcon icon="people-arrows" size="2x" fixedWidth />,
                        label: 'Peds'
                    }
                ]);

                break;
            }
            case 'barber': {
                modules.push([
                    'parents',
                    {
                        id: 3,
                        icon: <FontAwesomeIcon icon="female" size="2x" fixedWidth />,
                        label: 'Parents'
                    }
                ]);
                modules.push([
                    'face',
                    {
                        id: 4,
                        icon: <FontAwesomeIcon icon="smile" size="2x" fixedWidth />,
                        label: 'Face'
                    }
                ]);
                modules.push([
                    'skin',
                    {
                        id: 5,
                        icon: <FontAwesomeIcon icon="meh-blank" size="2x" fixedWidth />,
                        label: 'Skin'
                    }
                ]);
                modules.push([
                    'hair',
                    {
                        id: 6,
                        icon: <FontAwesomeIcon icon="cut" size="2x" fixedWidth />,
                        label: 'Hair'
                    }
                ]);
                modules.push([
                    'makeup',
                    {
                        id: 7,
                        icon: <FontAwesomeIcon icon="palette" size="2x" fixedWidth />,
                        label: 'Makeup'
                    }
                ]);
                modules.push([
                    'backup',
                    {
                        id: 8,
                        icon: <FontAwesomeIcon icon="cloud-upload-alt" size="2x" fixedWidth />,
                        label: 'Backup'
                    }
                ]);

                break;
            }
            case 'tattoo': {
                modules.push([
                    'tattoo',
                    {
                        id: 9,
                        icon: <FontAwesomeIcon icon="paint-brush" size="2x" fixedWidth />,
                        label: 'Tattoos'
                    }
                ]);

                break;
            }
        }

        this.state.isDev && modules.push([
            'dev',
            {
                id: 11,
                icon: <FontAwesomeIcon icon="code" size="2x" fixedWidth />,
                label: 'Dev'
            }
        ]);

        return modules.map((module) => {
            return module[0], module[1];
        });
    }

    changeValue = async (type: string, action: string, values: any) => {
        console.log("[CLOTHING] changeValue", type, action, values);

        //TODO; This shit is a mess... (FUCK YOU SKY)

        // const data = {
        //     currentDrawables: {},
        //     currentProps: {},
        //     currentHair: {},
        //     currentHeadBlend: {},
        //     currentFace: {},
        //     currentOverlays: {},
        //     currentEyeColor: {},
        //     currentFade: {},
        //     currentTattoos: {}
        // };

        // switch (type) {
        //     case "drawable":
        //         data.currentDrawables[values.name] = [values.component, values.texture];
        //         break;
        //     case "prop":
        //         data.currentProps[values.name] = [values.component, values.texture];
        //         break;
        //     case "hairColors":
        //         data.currentHair = { ...values };
        //         break;
        //     case "headBlend":
        //         data.currentHeadBlend = { ...values };
        //         break;
        //     case "face":
        //         data.currentFace = { ...values };
        //         break;
        //     case "overlays":
        //         data.currentOverlays = { ...values };
        //         break;
        //     case "eyeColor":
        //         data.currentEyeColor = values;
        //         break;
        //     case "fade":
        //         data.currentFade = values;
        //         break;
        //     case "tattoo":
        //         data.currentTattoos = { ...values };
        //         break;
        //     default:
        //         break;
        // };

        console.log("[CLOTHING] changeValue values", values);

        const results = await nuiAction('ev-clothing:ui:onChange', {
            type: type, //hairColors
            action: action, //setComponent or setHairColor
            data: values
        }, { returnData: {
            data: values,
            cost: 25
        } });

        console.log("[CLOTHING] changeValue results", results);

        const resultsData = results?.data?.data ?? {};
        if (!resultsData?.overwriteData) {
            const data = {
                ...this.state.data,
                ...resultsData
            };

            console.log("[CLOTHING] No overwrite data, setting state", data, results?.data?.cost);

            return this.setState({
                data: {
                    ...data
                },
                cost: results?.data?.cost
            });
        }

        this.setState({
            data: {
                ...resultsData?.overwriteData
            },
            cost: results?.data?.cost
        });
    }

    render() {
        return (
            <AppWrapper
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    height: '100%'
                }}
                store={store}
                name="clothing"
                onEscape={this.onEscape}
                onEvent={this.onEvent}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <>
                        {this.state.showExitConfirm && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                pointerEvents: 'all',
                                left: 0,
                                right: 0,
                                margin: '0 auto',
                                zIndex: 2446
                            }}>
                                <div style={{
                                    width: ResponsiveWidth(500),
                                    height: ResponsiveHeight(140),
                                    padding: '1.5%',
                                    backgroundColor: baseStyles.bgPrimary(),
                                    borderRadius: '0.5vh',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between'
                                }}>
                                    {this.state.isFree ? (
                                        <Typography variant="h5" style={{ color: 'white' }}>
                                            Free
                                        </Typography>
                                    ) : (
                                        <Typography variant="h5" style={{ color: 'white' }}>
                                            Total: <span style={{ color: baseStyles.greenText }}>{formatCurrency(this.state.cost ?? 0)}</span>
                                        </Typography>
                                    )}
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Button.Primary onClick={() => this.onHide('cash')}>
                                            Pay Cash
                                        </Button.Primary>
                                        <Button.Primary onClick={() => this.onHide('bank')}>
                                            Pay Bank
                                        </Button.Primary>
                                        <Button.Secondary onClick={() => this.onHide('discard')}>
                                            Discard
                                        </Button.Secondary>
                                        <Button.Tertiary onClick={() => this.setState({ showExitConfirm: false })}>
                                            Go Back
                                        </Button.Tertiary>
                                    </div>
                                </div>
                            </div>
                        )}
                        <ClothingGrabbable />
                        <ClothingToggles />
                        <Sidebar
                            activeItem={this.state.activeId}
                            items={this.createModules()}
                            onMenuItemClick={(item: any) => this.setState({ activeId: item.id })}
                        >
                            <div style={{
                                display: 'flex',
                                backgroundColor: baseStyles.bgPrimary(),
                                width: ResponsiveWidth(412),
                                padding: 16,
                                zIndex: 2443,
                                position: 'fixed'
                            }}>
                                {!this.state.isFree && (
                                    <span style={{ color: baseStyles.greenText }}>
                                        {formatCurrency(this.state.cost ?? 0)}
                                    </span>
                                )}
                                <div style={{
                                    flex: 1,
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Button.Primary onClick={this.onEscape} style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                                        Pay
                                    </Button.Primary>
                                    <Button.Secondary onClick={this.onEscape} style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
                                        Exit
                                    </Button.Secondary>
                                </div>
                            </div>
                            <br />
                            <br />
                            {this.state.activeId === 1 && (
                                <ClothingPage {...this.state} changeValue={this.changeValue} variant="clothing" />
                            )}
                            {this.state.activeId === 2 && (
                                <ClothingPage {...this.state} changeValue={this.changeValue} variant="accessories" />
                            )}
                            {this.state.activeId === 3 && (
                                <ClthingSecondary {...this.state} changeValue={this.changeValue} variant="parents" />
                            )}
                            {this.state.activeId === 4 && (
                                <ClthingSecondary {...this.state} changeValue={this.changeValue} variant="face" />
                            )}
                            {this.state.activeId === 5 && (
                                <ClthingSecondary {...this.state} changeValue={this.changeValue} variant="skin" />
                            )}
                            {this.state.activeId === 6 && (
                                <ClthingSecondary {...this.state} changeValue={this.changeValue} variant="hair" />
                            )}
                            {this.state.activeId === 7 && (
                                <ClthingSecondary {...this.state} changeValue={this.changeValue} variant="makeup" />
                            )}
                            {this.state.activeId === 8 && (
                                <ClthingSecondary {...this.state} changeValue={this.changeValue} variant="backup" />
                            )}
                            {this.state.activeId === 9 && (
                                <Tattoos {...this.state} changeValue={this.changeValue} />
                            )}
                            {/* Barber */}
                            {this.state.activeId === 10 && (
                                <Peds {...this.state} changeValue={this.changeValue} />
                            )}
                            {this.state.activeId === 11 && (
                                <Dev {...this.state} changeValue={this.changeValue} />
                            )}
                        </Sidebar>
                    </>
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);