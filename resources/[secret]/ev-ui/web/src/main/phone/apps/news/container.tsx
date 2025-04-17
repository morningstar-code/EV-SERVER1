import { isPortrait } from "lib/character";
import { compose } from "lib/redux";
import { isEmployed } from "main/phone/actions";
import MultiPager from "main/phone/components/multi-pager";
import React from "react";
import { connect } from "react-redux";
import { getMusicCharts, getNewsAppState, updateArticlePage, updateNewsAppState } from "./actions";
import Articles from "./components/articles";
import Editor from "./components/editor";
import store from "./store";

const { mapStateToProps, mapDispatchToProps } = compose(store);

const Pages = {
    home: 0,
    editing: 1
};

class Container extends React.Component<any> {
    componentDidMount(): void {
        updateArticlePage(-1);
        updateNewsAppState({ isEditor: isEmployed(getNewsAppState().business) });
        getMusicCharts();
    }

    render() {
        return (
            <MultiPager
                activeIndex={Pages[this.props.page]}
                landscapeOptions={isPortrait ? {} : {
                    indexLeft: 0,
                    indexRight: 1,
                    hideRight: this.props.page !== 'editing',
                    split: true
                }}
                pages={[
                    {
                        index: 0,
                        content: <Articles {...this.props} />
                    },
                    {
                        index: 1,
                        content: this.props.page !== 'editing' ? null : <Editor {...this.props} />
                    }
                ]}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);