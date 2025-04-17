import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import "./tcg-binder.scss";
import Tutorial from "./components/tutorial";
import Spread from "./components/spread";
import { TextField } from "@mui/material";
import Settings from "./components/settings";

class Container extends React.Component<any> {
    onEvent = (data = {} as any) => {

    }

    loadSets = () => {

    }

    updateSettings = () => {

    }

    insertInventoryCards = () => {

    }

    toggleRarity = (p1: any, p2: any) => {

    }

    toggleHolo = (p1: any, p2: any) => {

    }

    updateSearch = () => {

    }

    updateBinderName = () => {

    }

    onShow = (data = {} as any) => {

    }

    onHide = () => {

    }

    onHoverEnterHolo = () => {

    }

    onHoverLeaveHolo = () => {

    }

    chooseTab = (tab: any) => {

    }

    printKeywords = () => {

    }

    filterCard = () => {

    }

    getBestRarityHolo = () => {

    }

    spreadOutCards = () => {

    }

    closeSpread = () => {

    }

    updateMarkedForSaleCards = () => {

    }

    markCardForSale = () => {

    }

    showCard = () => {

    }

    withdrawCard = () => {

    }

    containsNewCard = () => {

    }

    getNewCardIds = () => {

    }

    containsCardMarkedForSale = () => {

    }

    getMarkedForSaleCardIds = (p1: any) => {

    }

    onHoverEnterNew = () => {

    }

    isFiltered = () => {

    }

    printSetLength = () => {
        return Object.keys(this.state.printSets).length;
    }

    outputCard = (print: any) => {

    }

    mouseDownHandler = () => {

    }

    state = {
        setsLastModified: '',
        show: false,
        spreadPrint: null,
        spreadPrintId: null,
        printSets: {},
        activeTab: 'civs',
        cards: {},
        sfx: { baseUrl: '' } as any,
        audioHover: new Audio(),
        audioHoverTimeout: null,
        settings: {
            showCardSelf: true,
            specificVoices: true,
            holoSparkles: true,
            enabledSfxPacks: {
                '_no-vo': true,
                cronus: true,
                ott: true,
                cathfawr: true,
                'leslie-lingberg': true,
            },
            volume: 0.65,
            tutorialStep: 0,
        },
        binderId: null,
        binderSlotId: null,
        binderName: '',
        filter: {
            rarity: new Set([
                'common',
                'uncommon',
                'rare',
                'secret',
                'promo',
            ]),
            holo: new Set(['none', 'reverse', 'holo']),
            query: '',
        },
        binderNewCards: new Set(),
        cardsMarkedForSale: new Set()
    }

    render() {
        return (
            <AppWrapper
                center={true}
                closeOnError={true}
                name="tcg-binder"
                style={{
                    pointerEvents: this.state.show ? 'all' : 'none'
                }}
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
                onEvent={this.onEvent}
            >
                {this.state.show && (
                    <div>
                        <div className="binder-hider" />
                        <div
                            className={`tcg-binder-wrapper binder${this.state.spreadPrint ? ' binder--spread' : ''}${this.state.settings.holoSparkles ? '' : ' binder--no-sparkles'}`}
                            onMouseDown={this.mouseDownHandler}
                        >
                            {this.state.binderName && (
                                <div className="binder__name">
                                    {this.state.binderName} Binder
                                </div>
                            )}
                            {this.state.binderId && (
                                <div className="binder__id">
                                    {this.state.binderId}
                                </div>
                            )}
                            <div className="binder__tabs">
                                {Object.keys(this.state.printSets).sort().map((set: any) => (
                                    <div
                                        key={set}
                                        className={`binder__tab${this.state.activeTab === set ? ' active' : ''}`}
                                        onClick={() => this.chooseTab(set)}
                                        data-tooltip={set}
                                    >
                                        <i className={`fas fa-${this.state.printSets[set].tabIcon}`} />
                                    </div>
                                ))}
                                <div
                                    className="binder__tab"
                                    onClick={this.insertInventoryCards}
                                    data-tooltip="Insert&nbsp;Inventory&nbsp;Cards"
                                >
                                    <i className="fas fa-sign-in-alt fa-rotate-180" />
                                </div>
                                <div
                                    className={`binder__tab${this.state.activeTab === 'settings' ? ' active' : ''}`}
                                    onClick={() => this.chooseTab('settings')}
                                    data-tooltip="settings"
                                >
                                    <i className="fas fa-cog" />
                                </div>
                            </div>
                            <div className="binder__wrapper">
                                {this.state.printSets[this.state.activeTab] && (
                                    <div className="binder__page">
                                        {this.state.printSets[this.state.activeTab].prints.map(this.outputCard)}
                                        {this.state.printSets[this.state.activeTab].secretPrints.map((print: any) => {
                                            return this.state.cards[print.id] && this.outputCard(print);
                                        })}
                                        {this.printSetLength() % 6 !== 0 && new Array(6 - (this.printSetLength() % 6)).fill('').map(() => (
                                            <div className="card-sleeve">
                                                <div className="card" />
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {this.state.activeTab === 'settings' && (
                                    <div className="binder__page binder__page--settings">
                                        <Settings
                                            updateSettings={this.updateSettings}
                                            updateBinderName={this.updateBinderName}
                                            binderName={this.state.binderName}
                                            sfxPacks={Object.keys(this.state.sfx.pack).sort().map((pack: any) => {
                                                return {
                                                    id: pack,
                                                    name: this.state.sfx.pack[pack]['_name']
                                                }
                                            })}
                                            {...this.state.settings}
                                        />
                                    </div>
                                )}
                            </div>
                            {this.state.spreadPrint && this.state.spreadPrintId && (
                                <div className="binder__spread" onClick={this.closeSpread}>
                                    <Spread
                                        print={this.state.spreadPrint}
                                        printSet={this.state.printSets[this.state.activeTab]}
                                        cards={this.state.cards[this.state.spreadPrintId]}
                                        onHoverEnterHolo={this.onHoverEnterHolo}
                                        onHoverLeaveHolo={this.onHoverLeaveHolo}
                                        markCardForSale={this.markCardForSale}
                                        markedForSaleCardIds={this.getMarkedForSaleCardIds(this.state.cards[this.state.spreadPrintId])}
                                        showCard={this.showCard}
                                        withdrawCard={this.withdrawCard}
                                    />
                                    <div className="binder__info">
                                        <div className="binder__info-control">
                                            <svg
                                                viewBox="0 0 387 512"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                strokeLinejoin="round"
                                                strokeMiterlimit="2"
                                            >
                                                <path
                                                    d="M193.8,24.9v178.7l-166.7,1.3l0.9-82.5L47.5,75l33.3-29.7l58.5-28.8L193.8,24.9L193.8,24.9z"
                                                    fill="#ff487c"
                                                />
                                                <path
                                                    d="M225.796 0h-63.578C74.227 0 3.02 71.208 3.02 158.69v190.733c0 87.99 71.207 159.198 159.198 159.198h63.578c87.483 0 158.69-71.207 158.69-159.198V158.69C384.486 71.207 313.279 0 225.796 0zM35.063 158.69c0-69.68 56.966-126.646 127.155-127.155h15.768v159.198H35.063V158.69zm317.888 190.733c-.508 70.19-57.474 127.155-127.155 127.663h-63.578c-70.19-.508-127.155-57.474-127.155-127.663V222.268h317.888v127.155zm0-158.69h-143.43V31.535h16.275c69.681.509 126.647 57.474 127.155 127.155v32.043z"
                                                    fill="#fff"
                                                    fillRule="nonzero"
                                                />
                                            </svg>
                                            Mark for Sale
                                        </div>
                                        <div className="binder__info-control">
                                            <svg
                                                viewBox="0 0 387 512"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                strokeLinejoin="round"
                                                strokeMiterlimit="2"
                                            >
                                                <path
                                                    d="M225.796 0h-63.578C74.227 0 3.02 71.207 3.02 158.69v190.732c0 87.992 71.207 159.198 159.198 159.198h63.578c87.482 0 158.69-71.206 158.69-159.198V158.69C384.485 71.207 313.277 0 225.795 0zM35.063 158.69c0-69.681 56.966-126.646 127.155-127.155h15.767v159.198H35.063V158.69zm317.888 190.732c-.509 70.19-57.474 127.155-127.155 127.664h-63.578c-70.19-.509-127.155-57.474-127.155-127.664V222.267h317.888v127.155zm0-158.689H209.52V31.535h16.276c69.68.509 126.646 57.474 127.155 127.155v32.043z"
                                                    fill="#fff"
                                                    fillRule="nonzero"
                                                />
                                                <path
                                                    d="M222.093 77.492c0-15.781-12.812-28.593-28.593-28.593-15.78 0-28.594 12.812-28.594 28.593v68.915c0 15.78 12.813 28.593 28.594 28.593s28.593-12.813 28.593-28.593V77.492z"
                                                    fill="#ff487c"
                                                />
                                            </svg>
                                            Show to Others
                                        </div>
                                        <div className="binder__info-control">
                                            <svg
                                                viewBox="0 0 387 512"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                strokeLinejoin="round"
                                                strokeMiterlimit="2"
                                            >
                                                <path
                                                    d="M193.753 24.906V203.61l166.688 1.33-.887-82.478-19.512-47.448-33.258-29.71-58.533-28.824-54.498 8.426z"
                                                    fill="#ff487c"
                                                />
                                                <path
                                                    d="M225.796 0h-63.578C74.227 0 3.02 71.208 3.02 158.69v190.733c0 87.99 71.207 159.198 159.198 159.198h63.578c87.483 0 158.69-71.207 158.69-159.198V158.69C384.486 71.207 313.279 0 225.796 0zM35.063 158.69c0-69.68 56.966-126.646 127.155-127.155h15.768v159.198H35.063V158.69zm317.888 190.733c-.508 70.19-57.474 127.155-127.155 127.663h-63.578c-70.19-.508-127.155-57.474-127.155-127.663V222.268h317.888v127.155zm0-158.69h-143.43V31.535h16.275c69.681.509 126.647 57.474 127.155 127.155v32.043z"
                                                    fill="#fff"
                                                    fillRule="nonzero"
                                                />
                                            </svg>
                                            Move to Inventory
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="binder__filter">
                                <div className="filter filter--rarity">
                                    <div
                                        className={`filter__tab ${this.state.filter.rarity.has('common') ? 'active' : ''}`}
                                        onClick={() => this.toggleRarity('rarity', 'common')}
                                        data-tooltip="common"
                                    >
                                        <i className="fas fa-circle" />
                                    </div>
                                    <div
                                        className={`filter__tab ${this.state.filter.rarity.has('uncommon') ? 'active' : ''}`}
                                        onClick={() => this.toggleRarity('rarity', 'uncommon')}
                                        data-tooltip="uncommon"
                                    >
                                        <i className="fas fa-square-full" style={{ transform: 'rotateZ(45deg) scale(0.75)' }} />
                                    </div>
                                    <div
                                        className={`filter__tab ${this.state.filter.rarity.has('rare') ? 'active' : ''}`}
                                        onClick={() => this.toggleRarity('rarity', 'rare')}
                                        data-tooltip="rare"
                                    >
                                        <i className="fas fa-star" />
                                    </div>
                                </div>
                                <div className="filter filter--holo">
                                    <div
                                        className={`filter__tab ${this.state.filter.holo.has('none') ? 'active' : ''}`}
                                        onClick={() => this.toggleHolo('holo', 'none')}
                                    >
                                        Non Holo
                                    </div>
                                    <div
                                        className={`filter__tab ${this.state.filter.holo.has('reverse') ? 'active' : ''}`}
                                        onClick={() => this.toggleHolo('holo', 'reverse')}
                                    >
                                        Reverse
                                    </div>
                                    <div
                                        className={`filter__tab ${this.state.filter.holo.has('holo') ? 'active' : ''}`}
                                        onClick={() => this.toggleHolo('holo', 'holo')}
                                    >
                                        Holo
                                    </div>
                                </div>
                                <div className="filter filter--search">
                                    <div className="filter__tab">
                                        <i className="fas fa-search" />
                                        {/* TODO; Input */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Tutorial
                            activeStep={this.state.settings.tutorialStep}
                            updateSettings={this.updateSettings}
                        />
                    </div>
                )}
            </AppWrapper>
        );
    }
}

export default Container;