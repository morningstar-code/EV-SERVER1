import React from 'react';
import AppWrapper from 'components/ui-app/ui-app';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import store from './store';
import Card from './components/card';
import './tcg-card.scss';

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    onEvent = (data: any) => {

        data?.hide && this.onHide();

        if (data.cards && data.cards.length) {
            this.onShow(data);
        }
    }

    onShow = (data?: any) => {
        const audio = this.state.audioHover;

        audio.autoplay = false;
        audio.controls = false;
        audio.volume = 0;
        audio.loop = true;

        let audioPath = '';

        if (data.sfx && data.sfx.baseUrl) {
            audioPath = data.sfx.baseUrl;
        } else if (this.state.sfx && this.state.sfx.baseUrl) {
            audioPath = this.state.sfx.baseUrl;
        }

        if (audioPath && audio.src !== `${audioPath}holo-hover.ogg`) {
            audio.pause();
            audio.src = `${audioPath}holo-hover.ogg`;
        }

        audio.play();

        this.setState({
            show: true,
            ...data
        });

        if (this.state.displayTimeout) {
            clearTimeout(this.state.displayTimeout);
        }

        if (!data.displayCase) {
            let time = 3500;

            if (data.cards && data.cards.length && data.cards[0].burn) {
                time = 10000
            }

            const timeout = setTimeout(() => {
                this.setState({ show: false });
            }, time);

            this.setState({ displayTimeout: timeout });
        }
    }

    onHide = () => {
        if (this.state.show) {
            this.state.audioHover.pause();
            this.setState({
                show: false,
                burn: false,
                burnt: false,
                cards: []
            });
        }
    }

    onHoverEnterHolo = () => {
        this.state.audioHover.volume = 0.333 * this.state.settings.volume;
        if (this.state.audioHoverTimeout) {
            clearTimeout(this.state.audioHoverTimeout);
        }
    }

    onHoverLeaveHolo = () => {
        this.state.audioHover.volume = Math.max(0, this.state.audioHover.volume - 0.025);

        if (this.state.audioHover.volume > 0) {
            const timeout = setTimeout(() => {
                this.onHoverLeaveHolo();
            }, 50);

            this.setState({ audioHoverTimeout: timeout });
        } else {
            this.setState({ audioHoverTimeout: null });
        }
    }

    state = {
        show: false,
        sfx: { baseUrl: '' },
        settings: {
            showCardSelf: true,
            specificVoices: true,
            holoSparkles: true,
            enabledSfxPacks: {
                cronus: true,
                ott: true,
                cathfawr: true,
                '_no-vo': true,
                'leslie-lingberg': true
            },
            volume: 0.65,
            tutorialStep: 0
        },
        displayTimeout: null,
        audioHover: new Audio(),
        audioHoverTimeout: null,
        cards: [],
        displayCase: false,
        bountyBoard: false
    }

    render() {
        return (
            <AppWrapper
                name="tcg-card"
                style={{
                    pointerEvents: this.state.show && this.state.displayCase ? 'all' : 'none'
                }}
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
                onEvent={this.onEvent}
            >
                {this.state.show && (
                    <div className={`tcg-card tcg-card--${this.state.displayCase ? 'display-case' : 'show'}`}>
                        {this.state.bountyBoard && (
                            <div className="tcg-card__headline">
                                $ Bounty Board $
                            </div>
                        )}
                        {this.state.cards && this.state.cards.map((card: any) => (
                            <Card
                                key={card.id}
                                {...card}
                                onHoverEnterHolo={this.onHoverEnterHolo}
                                onHoverLeaveHolo={this.onHoverLeaveHolo}
                            />
                        ))}
                        {this.state.bountyBoard && (
                            <div className="tcg-card__tip">
                                Bounty cards must be holographic and are worth extra $$$.
                            </div>
                        )}
                    </div>
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);