import React from "react";
import { compose } from "lib/redux";
import { connect } from "react-redux";
import store from "./store";
import AppWrapper from "components/ui-app/ui-app";
import Spinner from "components/spinner/spinner";
import { formatCurrency } from "lib/format";
import ShowroomIntro from "./components/showroom-intro";
import ShowroomStats from "./components/showroom-stats";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/dev-data";
import { shops } from "./shops.config";
import "./showroom.scss";

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            gameShowroomPurchaseBtn: state.game.showroomPurchaseBtn
        }
    }
});

function filterByIndexOf(firstIndex, secondIndex, arr) {
    return arr.indexOf(firstIndex) === secondIndex
}

const modelsLoaded = {};

interface ShowroomState {
    currentPosition: number;
    selectedClass: string;
    showPurchaseBtn: boolean;
    shop: string;
    show: boolean;
    showContent: boolean;
    showIntro: boolean;
    showSpinner: boolean;
    data: any;
    groups: any;
    selectedCar: any;
    selectedGroup: any;
    stats: any;
}

class Container extends React.Component<any, ShowroomState> {
    changing = false;

    state = {
        currentPosition: 0,
        selectedClass: null,
        showPurchaseBtn: false,
        shop: null,
        show: false,
        showContent: false,
        showIntro: true,
        showSpinner: false,
        data: null,
        groups: null,
        selectedCar: null,
        selectedGroup: null,
        stats: null
    }

    onShow = async (data: any) => {
        const curShop = data.shop;

        this.setState({
            shop: curShop,
            show: true,
            showIntro: true,
            showSpinner: true
        });

        const results = await nuiAction('ev-ui:showroomGetCarConfig', {}, { returnData: devData.showroomGetCarConfig() });

        const sortedData = results.data.sort((a, b) => {
            return a.group === b.group ? a.name < b.name ? -1 : 1 : a.group < b.group ? -1 : 1;
        });

        this.props.updateState({ cars: sortedData });

        const carData = sortedData.filter((car: any) => {
            return !!car.active && !!car[curShop] && car.group !== 'Job Vehicle' && car.group !== 'Ut' && !car.owner_only;
        });

        for (const car of carData) {
            try {
                if (car.showroom_image_url === undefined || car.showroom_image_url === null ||  car.showroom_image_url === '') {
                    car.showroom_image_url = `https://gta-assets.subliminalrp.net/images/showroom-vehicles/${car.model}.jpg`;
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (carData[0]) {
            const mappedVehicles = carData.map((car: any) => {
                return car.group;
            }).filter(filterByIndexOf).sort();

            const results = await nuiAction('ev-ui:showroomChangeCar', { model: carData[0].model }, { returnData: devData.showroomChangeCar() });

            setTimeout(() => {
                this.setState(
                    {
                        data: carData,
                        groups: mappedVehicles,
                        shop: curShop,
                        currentPosition: 0,
                        selectedCar: carData[0],
                        selectedClass: null,
                        selectedGroup: mappedVehicles[0],
                        showContent: false,
                        showIntro: false,
                        stats: results.data,
                        showPurchaseBtn: this.props.gameShowroomPurchaseBtn
                    },
                    function () {
                        this.setState({ showIntro: false, showSpinner: false, showContent: true });
                    }
                );
            }, 2500);
        }
    }

    onHide = () => {
        this.setState({
            show: false,
            showContent: false
        });
    }

    changePosition = async (pos: number, bool?: boolean) => {
        let currentPos = null;

        if (!this.changing) {
            this.changing = true;
            currentPos = bool ? pos : this.state.currentPosition + pos;

            if (!(currentPos < 0 || currentPos + 1 > this.state.data.length)) {
                const foundCar = this.state.data.find((car: any, index: number) => {
                    return index === currentPos;
                });

                const group = foundCar.group;
                const model = foundCar.model;

                this.setState({
                    currentPosition: currentPos,
                    selectedCar: this.state.data[currentPos],
                    selectedGroup: group,
                    showSpinner: !modelsLoaded[model]
                });

                const results = await nuiAction('ev-ui:showroomChangeCar', { model: model }, { returnData: devData.showroomChangeCar() });

                this.setState({
                    showSpinner: false,
                    stats: results.data
                });

                this.changing = false;
                modelsLoaded[model] = true;
            }

            this.changing = false;
        }
    }

    clickGroup = (group: any) => {
        const foundGroup = this.state.data.findIndex((car => car.group === group));
        this.changePosition(foundGroup, true);
    }

    filterClass = (carClass: string) => {
        if (carClass === 'All') {
            const carGroups = this.state.data.map((car: any) => car.group).filter(filterByIndexOf);
            carGroups.sort();

            return this.setState({
                groups: carGroups,
                selectedCar: this.state.data[0],
                selectedClass: null,
                selectedGroup: carGroups[0]
            });
        }

        const carData = this.state.data.filter((car: any) => car.vehClass === carClass);
        const carGroups = carData.map((car: any) => car.group).filter(filterByIndexOf);
        carGroups.sort();

        return this.setState({
            data: carData,
            groups: carGroups,
            selectedClass: carClass,
            currentPosition: 0,
            selectedCar: carData[0],
            selectedGroup: carGroups[0]
        });
    }

    purchaseCurrent = (car: any) => {
        nuiAction('ev-showrooms:catalogPurchasePublic', {
            car: car
        });
    }

    changePositionByCar = (index: number) => {
        if (this.state.currentPosition !== index) {
            if (this.state.currentPosition < index) {
                this.changePosition(index - this.state.currentPosition);
            } else {
                this.changePosition(-(this.state.currentPosition - index));
            }
        }
    }

    render() {
        const currentShopData = shops[this.state.shop];

        return (
            <AppWrapper
                center={true}
                closeOnError={true}
                store={store}
                name="showroom"
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <div className="showroom-wrapper">
                        {this.state.showSpinner && (
                            <div className="spinner-container">
                                <Spinner />
                            </div>
                        )}
                        {this.state.showIntro && (
                            <ShowroomIntro shop={currentShopData} />
                        )}
                        {this.state.showContent && (
                            <>
                                <div className="main">
                                    <ShowroomStats selectedCar={this.state.selectedCar} stats={this.state.stats} />
                                    <div className="selector-container">
                                        <div className="class-selector">
                                            <div className="available-classes"></div>
                                            <div className="price">
                                                <span>
                                                    {this.state.selectedCar ? formatCurrency(this.state.selectedCar.retail_price) : '$0.00'}
                                                </span>
                                                {!!this.state.showPurchaseBtn && this.state.shop === 'pdm' && (
                                                    <div onClick={() => this.purchaseCurrent(this.state.selectedCar)} className="btn" style={{ borderRadius: 5, backgroundColor: 'green', marginTop: 8, color: 'white', textAlign: 'center', fontSize: '80%', padding: '5px' }}>
                                                        Purchase
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="selector-spacer"></div>
                                        <div className="selector">
                                            <div className="position-container">
                                                {this.state.currentPosition + 1} / {this.state.data.length}
                                            </div>
                                            <div className="mclass-selector">
                                                {this.state.groups.map((group: any) => (
                                                    <div key={group} onClick={() => this.clickGroup(group)} className={`mclass ${this.state.selectedGroup === group ? 'mclass-selected' : ''}`}>
                                                        {group}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="showcase">
                                    {this.state.data.map((car: any, index: number) => {
                                        const leftCalc = 64 + 284 * (index - this.state.currentPosition);
                                        return (
                                            <div
                                                key={Math.random()}
                                                className={`car-container ${this.state.currentPosition === index ? 'car-container-selected' : ''}`}
                                                style={{ left: leftCalc, background: "#000 url('https://i.imgur.com/hgUhGkq.png')", backgroundImage: `url(${car.showroom_image_url})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', userSelect: 'none' }}
                                                onClick={() => this.changePositionByCar(index)}
                                            >
                                                <div className="top">
                                                    <span>{formatCurrency(car.retail_price)}</span>
                                                    {car.current_stock === 0 && (
                                                        <div className="limited">
                                                            <i className="fas fa-stop-circle fa-fw fa-2x" style={{ color: '#fff' }}></i>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="middle"></div>
                                                <div className="bottom">
                                                    <span>{'\xA0'}</span>
                                                    <span>{car.name}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="actions">
                                    <div className="btn" onClick={() => this.changePosition(-1)}>
                                        Previous
                                    </div>
                                    <div className="btn" onClick={() => this.changePosition(1)}>
                                        Next
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </AppWrapper>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);