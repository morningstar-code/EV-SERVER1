import React from 'react';
import Input from 'components/input/input';
import AppContainer from 'main/phone/components/app-container';
import store from '../store';
import { getArticleContent, updateArticlePage, updateNewsAppState } from '../actions';
import { AppBar, Tab, Tabs } from '@mui/material';
import Text from 'components/text/text';
import Article from './article';

export default (props: any) => {
    const [list, setList] = React.useState(props.list);
    const [page, setPage] = React.useState(0);

    React.useEffect(() => {
        setList(props.list);
    }, [props.list]);

    const isEditor = props.isEditor;

    const primaryActions = [];

    if (isEditor) {
        primaryActions.push({
            icon: 'edit',
            title: 'Create New',
            onClick: () => {
                updateNewsAppState({
                    article: store.initialState.article,
                    page: 'editing'
                });
            }
        });
    }

    return (
        <AppContainer
            primaryActions={primaryActions}
            search={{
                filter: ['title', 'author'],
                list: props.list,
                onChange: setList
            }}
            style={{
                backgroundImage: 'url(https://gta-assets.subliminalrp.net/images/lsbn-header.png)',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                paddingTop: 100,
                backgroundColor: '#262523'
            }}
        >
            {isEditor && (
                <div style={{ marginBottom: 16 }}>
                    <Input.Select
                        items={props.articleTypes}
                        label="Type"
                        onChange={(e: any) => updateArticlePage(e)}
                        value={props.selectedArticleType.id}
                    />
                </div>
            )}
            <AppBar
                position="static"
                color="default"
                style={{ marginBottom: 16 }}
            >
                <Tabs
                    centered={true}
                    value={page}
                    onChange={(e, value) => setPage(value)}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="inherit"
                >
                    <Tab
                        icon={<i className="fas fa-newspaper fa-fw fa-lg" />}
                    />
                    <Tab
                        icon={<i className="fas fa-music fa-fw fa-lg" />}
                    />
                </Tabs>
            </AppBar>
            {page === 0 && (
                <>
                    {list && list.length > 0 && list.map((article: any) => (
                        <Article
                            key={article.id}
                            article={article}
                            onClick={() => getArticleContent(article)}
                        />
                    ))}
                </>
            )}
            {page === 1 && (
                <div>
                    <div>
                        <Text variant="body1" style={{ textAlign: 'center', marginBottom: 8 }}>
                            Music (Last 7 Days)
                        </Text>
                    </div>
                    <div>
                        {props.music && props.music.length > 0 && props.music.map((track: any) => (
                            <div
                                key={track.title}
                                style={{
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    marginBottom: 8,
                                    borderTop: '1px solid #f3cb05'
                                }}
                            >
                                <Text variant="body1">
                                    {(Number(track.plays) / 1000).toFixed(1)}k plays - {track.title}
                                </Text>
                                <Text variant="body2">
                                    {track.artist}
                                </Text>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AppContainer>
    )
}