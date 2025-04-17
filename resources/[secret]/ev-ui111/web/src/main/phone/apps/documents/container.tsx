import React from 'react';
import store from './store';
import { compose } from 'lib/redux';
import { connect } from 'react-redux';
import { updateDocumentsPage } from './actions';
import MultiPager from 'main/phone/components/multi-pager';
import { isPortrait } from 'lib/character';
import Documents from './components/documents';
import Editor from './components/editor';
import Signatures from './components/signatures';

const { mapStateToProps, mapDispatchToProps } = compose(store, {
    mapStateToProps: (state: any) => {
        return {
            game: state.game,
            phone: state.phone
        }
    }
});

const Pages = {
    home: 0,
    editing: 1,
    signatures: 2
};

class Container extends React.Component<any> {
    componentDidMount() {
        this.props.page && this.props.page === 'home' && updateDocumentsPage(-1);
        this.props.page && this.props.page === 'signatures' && updateDocumentsPage(2);
    }

    render() {
        if (!this.props.selectedDocumentType ||
            !this.props.selectedDocumentType.id
        ) {
            return null;
        }

        return (
            <MultiPager
                activeIndex={Pages[this.props.page]}
                landscapeOptions={isPortrait ? {} : {
                    indexLeft: 0,
                    indexRight: this.props.page === 'signatures' ? 2 : 1,
                    hideRight: this.props.page !== 'editing' && this.props.page !== 'signatures',
                    split: true
                }}
                pages={[
                    {
                        index: 0,
                        content: <Documents {...this.props} />
                    },
                    {
                        index: 1,
                        content: this.props.page !== 'editing' ? null : <Editor {...this.props} />
                    },
                    {
                        index: 2,
                        content: this.props.page !== 'signatures' ? null : (
                            <Signatures {...this.props} />
                        )
                    }
                ]}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);