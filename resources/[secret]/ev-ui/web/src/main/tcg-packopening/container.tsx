import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { nuiAction } from 'lib/nui-comms';
import Card from '../tcg-card/components/card';
import "./tcg-packopening.scss";

class Container extends React.Component<any> {
    keyUpHandler = (e: any) => {
        if (e.code === 'Space' && !this.state.rr) {
            const cards = this.state.cards;

            for (let i = 0; i < cards.length; i++) {
                const card = cards[i];

                if (!this.state.cardsFlipped[card.id]) {
                    this.flipCard(card.id);
                }
            }
        }
    }

    randomFromArray = (arr: any) => {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    onEvent = (data = {} as any) => {
        this.setState({
            showActions: true,
            ...data
        });
    }

    onShow = (data?: any) => {
        if (data?.cards) {
            data.cardsFlipped = {};
            const cards = data?.cards;

            for (let i = 0; i < cards?.length; i++) {
                const card = cards[i];

                data.cardsFlipped[card.id] = false;

                if (data?.prints[card.id]) {
                    this.playSound(card.printId, card.rarity, card.holo, false);
                }
            }
        }

        const audio = this.state.audioHover;

        audio.autoplay = false;
        audio.controls = false;
        audio.volume = 0;
        audio.loop = true;

        let audioPath = '';

        if (data?.sfx && data?.sfx.baseUrl) {
            audioPath = data?.sfx.baseUrl;
        } else if (this.state.sfx && this.state.sfx.baseUrl) {
            audioPath = this.state.sfx.baseUrl;
        }

        if (audioPath && audio.src !== `${audioPath}holo-hover.ogg`) {
            audio.pause();
            audio.src = `${audioPath}holo-hover.ogg`;
        }

        audio.play();

        const audio7CardPack = this.state.audio7CardPack;

        audio7CardPack.autoplay = false;
        audio7CardPack.controls = false;
        audio7CardPack.volume = 1 * (data?.settings?.volume || this.state.settings.volume);
        audio7CardPack.loop = false;

        if (data?.cards?.length === 7 && audio7CardPack.src !== `${audioPath}7-card-pack.ogg`) {
            audio7CardPack.pause();
            audio7CardPack.src = `${audioPath}7-card-pack.ogg`;

            setTimeout(() => {
                audio7CardPack.play();
            }, 750);
        }

        const audioChannels = this.state.audioChannels;

        for (let i = 0; i < audioChannels.length; i++) {
            const channel = audioChannels[i];

            channel.volume = 1 * (data?.settings?.volume || this.state.settings.volume);
        }

        const enabledSfxPacks = Object.entries(data?.settings?.enabledSfxPacks || this.state.settings.enabledSfxPacks).filter(([, enabled]) => enabled).map(([pack]) => pack);

        data.sfx.sfxPack = this.randomFromArray(enabledSfxPacks[Math.floor(Math.random() * enabledSfxPacks.length)]);
        data.rr = data?.cards?.length < 7 && Math.random() < 0.001;

        this.setState({
            show: true,
            ...data
        });

        data?.rr && setTimeout(this.setupRRAudio, 15);

        if (data?.rr || data?.autoFlip) {
            setTimeout(this.autoFlip, 2500);
        }
    }

    onHide = () => {
        if (this.state.show) {
            this.state.audioHover.pause();
            this.setState({
                show: false,
                binderId: null,
                binderSlotId: null,
                binderName: null
            });
        }
    }

    onHideClose = () => {
        nuiAction('ev-ui:close-pack-opening');
        nuiAction('ev-ui:closeApp');
        this.onHide();
    }

    onHideOpenInventory = () => {
        this.setState({ showActions: false });
        nuiAction('ev-ui:tcgOpenInventory');
        this.onHideClose();
    }

    onHideOpenBinder = () => {
        this.setState({ showActions: false });
        this.onHideClose();
        nuiAction('ev-ui:tcgOpenBinder', {
            printSetId: this.state.printSetId,
            binderId: this.state.binderId,
            binderSlotId: this.state.binderSlotId,
            binderName: this.state.binderName
        });
    }

    autoFlip = () => {
        if (this.state.rr || this.state.autoFlip) {
            const count = this.flippedCardCount() as any;

            if (count < this.state.cards.length) {
                this.flipCard(this.state.cards[count].id);
                setTimeout(this.autoFlip, 4000);
            } else {
                this.setState({ rr: false });
            }
        }
    }

    openAnother = () => {
        this.setState({ showActions: false });
        nuiAction('ev-ui:tcgOpenAnother', {
            printSetId: this.state.printSetId,
            binderId: this.state.binderId,
            binderSlotId: this.state.binderSlotId,
            binderName: this.state.binderName
        });
    }

    setupRRAudio = () => {
        for (let i = 0; i < 6; i++) {
            const audio = this.state.audioChannels[i];
            audio.pause();
            audio.src = `${this.state.sfx.baseUrl}special-rr/rr-${i + 1}.ogg`;
        }
    }

    flippedCardCount = () => {
        return Object.values(this.state.cardsFlipped).reduce((a: any, b: any) => a + b);
    }

    playSound = (printId: any, rarity: any, holo: any, p4?: boolean) => {
        const arg4 = !(p4 === undefined);
        let audioPath = '';

        if (this.state.sfx) {
            const sfx = this.state.sfx;
            if (this.state.rr && arg4) {
                const count = this.flippedCardCount() as any;
                audioPath = `special-rr/rr-${count}.ogg`;
            } else {
                if (this.state.settings.specificVoices && sfx.specific && sfx.specific[printId]) {
                    const randomIdx = this.randomFromArray(sfx.specific[printId]);
                    audioPath = `specific-card/${printId.replace(/:/g, '-')}/${randomIdx}`;
                } else {
                    if (sfx.pack && sfx[sfx.sfxPack]) {
                        const pack = sfx.pack[sfx.sfxPack];
                        if (pack[`${rarity}-${holo}`]) {
                            const randomIdx = this.randomFromArray(pack[`${rarity}-${holo}`]);
                            audioPath = `pack/${sfx.sfxPack}/${rarity}-${holo}/${randomIdx}`;
                        } else {
                            if (pack[holo] && rarity !== 'secret') {
                                const randomIdx = this.randomFromArray(pack[holo]);
                                audioPath = `pack/${sfx.sfxPack}/${holo}/${randomIdx}`;
                            } else {
                                if (pack[rarity]) {
                                    const randomIdx = this.randomFromArray(pack[rarity]);
                                    audioPath = `pack/${sfx.sfxPack}/${rarity}/${randomIdx}`;
                                }
                            }
                        }
                    }
                }
            }

            if (!audioPath && sfx.specific && sfx.specific['_default']) {
                audioPath = sfx.specific['_default'];
            }
        }

        if (audioPath) {
            let currentAudioChannel = this.state.currentAudioChannel;
            const audio = this.state.audioChannels[currentAudioChannel];

            audio.pause();
            audio.src = `${this.state.sfx.baseUrl}${audioPath}`;

            const audioChannels = this.state.audioChannels;

            for (const channel of audioChannels) {
                if (currentAudioChannel === Number(channel)) {
                    audioChannels[channel].volume = 1 * this.state.settings.volume
                } else if (!audioPath.includes('generic-flip')) {
                    audioChannels[channel].volume = 0.5 * this.state.settings.volume
                }

                this.setState({ audioChannels: audioChannels });
            }

            arg4 && audio.play();

            if (++currentAudioChannel >= 6) {
                currentAudioChannel = 0;
            }

            this.setState({ currentAudioChannel: currentAudioChannel });
        }
    }

    onHoverEnterHolo = () => {
        const audio = this.state.audioHover;
        audio.volume = 0.333 * this.state.settings.volume;

        this.setState({ audioHover: audio });

        if (this.state.audioHoverTimeout) {
            clearTimeout(this.state.audioHoverTimeout);
        }
    }

    onHoverLeaveHolo = () => {
        const audio = this.state.audioHover;
        audio.volume = Math.max(0, this.state.audioHover.volume - 0.025);

        this.setState({ audioHover: audio });

        if (this.state.audioHover.volume > 0) {
            const timeout = setTimeout(this.onHoverLeaveHolo, 50);

            this.setState({ audioHoverTimeout: timeout });
        } else {
            this.setState({ audioHoverTimeout: null });
        }
    }

    flipCard = (id: any) => {
        const cardsFlipped = this.state.cardsFlipped;

        cardsFlipped[id] = true;

        this.setState({ cardsFlipped: cardsFlipped });
    }

    showCard = (info: any) => {
        nuiAction('ev-ui:tcgShowCard', {
            itemInfo: info
        });
    }

    state = {
        show: false,
        printSetId: '',
        printSets: {},
        prints: {},
        cards: [],
        cardsFlipped: {},
        sfx: {
            baseUrl: '',
            specific: {},
            pack: {},
            sfxPack: 'cronus'
        },
        settings: {
            showCardSelf: true,
            specificVoices: true,
            holoSparkles: true,
            enabledSfxPacks: {
                '_no-vo': true,
                cronus: true,
                ott: true,
                cathfawr: true,
                'leslie-lingberg': true
            },
            volume: 0.11
        },
        audioChannels: [],
        audioHover: new Audio(),
        audioHoverTimeout: null,
        audio7CardPack: new Audio,
        currentAudioChannel: 0,
        binderId: null,
        binderSlotId: null,
        binderName: null,
        canOpenAnother: false,
        showActions: false,
        rr: false,
        autoFlip: false
    }

    componentDidMount() {
        window.addEventListener('keyup', this.keyUpHandler);

        // for (let i = 0; i < 6; i++) {
        //     const audio = new Audio();
        //     audio.autoplay = false;
        //     audio.controls = false;
        //     audio.volume = 1 * this.state.settings.volume;
        //     audio.loop = false;
        //     this.state.audioChannels.push(audio);
        // }
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.keyUpHandler);

        // for (let i = 0; i < 6; i++) {
        //     const audio = this.state.audioChannels[i];
        //     audio.pause();
        // }
    }

    render() {
        return (
            <AppWrapper
                center={true}
                closeOnError={true}
                name="tcg-packopening"
                style={{ pointerEvents: this.state.show && !this.state.rr ? 'all' : 'none' }}
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
                onEvent={this.onEvent}
            >
                {this.state.show && (
                    <div className="tcg-packopening-wrapper">
                        {this?.state?.cards && this?.state?.cards.map((card: any) => (
                            <Card
                                {...card}
                                flipped={this?.state?.cardsFlipped[card.id]}
                                print={this?.state?.prints[card.printId]}
                                printSet={this?.state?.printSets[card.printSetId]}
                                playSound={this.playSound}
                                onHoverEnterHolo={this.onHoverEnterHolo}
                                onHoverLeaveHolo={this.onHoverLeaveHolo}
                                onFlipped={this.flipCard}
                                key={card.id}
                                showCard={this.showCard}
                            />
                        ))}
                        {this.state.showActions && Object.values(this.state.cardsFlipped).reduce((a: any, b: any) => a && b) && (
                            <div className="tcg-pack-actions">
                                <div className="tcg-pack-actions__buttons">
                                    {this.state.printSetId !== 'promo' && this.state.canOpenAnother && (
                                        <button onClick={this.openAnother} className="green">
                                            Open Another
                                        </button>
                                    )}
                                    {this.state.binderId && (
                                        <button onClick={this.onHideOpenBinder}>
                                            Open Binder
                                        </button>
                                    )}
                                    <button onClick={this.onHideOpenInventory}>
                                        Open Inventory
                                    </button>
                                    <button onClick={this.onHideClose}>
                                        Close
                                    </button>
                                </div>
                                {!this.state.binderId && (
                                    <div className="tcg-pack-actions__tip">
                                        You can drag and drop booster packs onto the binder to store them in the binder while opening.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </AppWrapper>
        )
    }
}

export default Container;