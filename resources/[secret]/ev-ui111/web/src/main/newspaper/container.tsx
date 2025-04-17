import React from "react";
import AppWrapper from "components/ui-app/ui-app";
import { nuiAction } from "lib/nui-comms";
import { devData } from "main/dev-data";
import { Typography } from "@mui/material";
import { fromNow } from "lib/date";
import "./newspaper.scss";
import { compose } from "lib/redux";
import store from "./store";
import { connect } from "react-redux";

const { mapStateToProps, mapDispatchToProps } = compose(store);

class Container extends React.Component<any> {
    state = {
        drugs: '',
        lockups: [],
        recentElections: [],
        show: false,
        stonks: '',
        taxes: [],
        upcomingElections: [],
    }

    onShow = async () => {
        const results = await nuiAction('ev-ui:getNewspaperContent', {}, { returnData: devData.getNewspaperContent() });

        this.setState({
            ...results.data,
            show: true
        });
    }

    onHide = () => {
        this.setState({ show: false });
    }

    render() {
        return (
            <AppWrapper
                center={true}
                closeOnError={true}
                name="newspaper"
                onError={this.onHide}
                onEscape={this.onHide}
                onHide={this.onHide}
                onShow={this.onShow}
            >
                {this.state.show && (
                    <div className="newspaper-wrapper">
                        <div className="newspaper">
                            <div className="content">
                                <div className="header">
                                    <div className="alert-box">City Alert: We have had multiple reports of injuries from spinning newspapers. Be careful!</div>
                                    <div className="title">Los Santos Post</div>
                                </div>
                                <div className="subhead">
                                    <span>Edition: 49,726</span>
                                    <span>The Second Best Selling Newspaper in the World</span>
                                    <span>Current News</span>
                                </div>
                                <div className="columns">
                                    <div className="column">
                                        <div className="headline">Upcoming Elections</div>
                                        <div className="subheadline">GIVE THEM HOPE</div>
                                        <div className="column-content">
                                            {this.state.upcomingElections.map((election: any, index: number) => (
                                                <div key={index} className="election">
                                                    <span>{election.title}</span>
                                                    <span>
                                                        <Typography variant="body2" style={{ color: 'black' }}>
                                                            {fromNow(new Date(election.date).getTime())}
                                                        </Typography>
                                                    </span>
                                                    <span>{election.description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="headline">Recent Elections</div>
                                        <div className="subheadline">DESTROY THEIR HOPE</div>
                                        <div className="column-content">
                                            {this.state.recentElections.map((election: any, index: number) => (
                                                <div key={index} className="election">
                                                    <span>{election.title}</span>
                                                    <span>
                                                        <Typography variant="body2" style={{ color: 'black' }}>
                                                            {fromNow(new Date(election.date).getTime())}
                                                        </Typography>
                                                    </span>
                                                    <span>{election.description}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="headline">Lockups</div>
                                        <div className="subheadline">PD Gang W's</div>
                                        <div className="column-content">
                                            {this.state.lockups.map((lockup: any, index: number) => (
                                                <div key={index} className="lockup">
                                                    <span>{lockup.name}{" "}</span>
                                                    was sentenced to
                                                    <span>{" "}{lockup.duration}{" "}</span>
                                                    {" "}month(s).
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="column column-dbl">
                                        <div className="dbl">
                                            <div className="headline">Drugs</div>
                                            <div className="subheadline">by Joe Mama</div>
                                            <div className="column-content">
                                                {this.state.drugs}
                                            </div>
                                        </div>
                                        <div className="dbl">
                                            <div className="headline">Stonks</div>
                                            <div className="subheadline">On The Rise?</div>
                                            <div className="column-content">
                                                {this.state.stonks}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="subhead">
                                    <div className="taxes">
                                        Recent Tax Changes:
                                        {this.state.taxes.map((tax: any, index: number) => (
                                            <span key={index}>{tax.type} - {tax.level}%</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </AppWrapper>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);