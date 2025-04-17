import { useState } from "react";
import Input from "components/input/input";
import AppContainer from "main/phone/components/app-container";
import useStyles from "./editor.styles";
import RichMarkdownEditor from 'rich-markdown-editor';
import { closePhoneModal, openConfirmModal, openPhoneModal, setPhoneModalLoading } from "main/phone/actions";
import SimpleForm from "components/simple-form";
import { FindImagesInString } from "lib/images";
import Button from "components/button/button";
import { ClickAwayListener, Tooltip } from "@mui/material";
import "./editor.scss";
import { editArticle, publishArticle, saveArticle, unpublishArticle, updateArticlePage } from "../actions";
import { nuiAction } from "lib/nui-comms";

export default (props: any) => {
    const classes = useStyles();

    const handleUpdateArticle = (data: any) => {
        return props.updateState({
            article: {
                ...props.article,
                ...data
            }
        });
    }

    const removeImage = (pId: number) => {
        const filteredImages = props.article.images.filter((_: any, id: number) => id !== pId);
        props.updateState({
            article: {
                ...props.article,
                images: filteredImages
            }
        });
    }

    const isEditor = props.isEditor;
    const isDraft = props.selectedArticleType.id === 2;
    const invalidArticle = !props.article || props.article.id === -1;
    const validArticle = !invalidArticle && (!isEditor || !props.unlocked);

    const [imageOpen, setImageOpen] = useState(false);

    const primaryActions = [];
    const auxActions = [];

    if (!validArticle) {
        primaryActions.push({
            icon: 'cloud-upload-alt',
            onClick: () => saveArticle(),
            title: 'Save'
        });
    }

    if (validArticle && isEditor) {
        primaryActions.push({
            icon: 'pencil-alt',
            onClick: () => editArticle(),
            title: 'Edit Article'
        });
    }

    if (!invalidArticle && isEditor) {
        primaryActions.push({
            icon: 'images',
            onClick: () => {
                openPhoneModal(
                    <div>
                        <SimpleForm
                            defaultValues={{}}
                            elements={[
                                {
                                    name: 'url',
                                    render: (prop: SimpleFormRender<string>) => {
                                        const onChange = prop.onChange;
                                        const value = prop.value;

                                        return (
                                            <Input.Text
                                                label="Image URL"
                                                icon="image"
                                                onChange={onChange}
                                                value={value}
                                            />
                                        )
                                    }
                                }
                            ]}
                            onCancel={() => {
                                closePhoneModal(false);
                            }}
                            onSubmit={(values) => {
                                setPhoneModalLoading();

                                props.updateState({
                                    article: {
                                        ...props.article,
                                        images: [
                                            ...props.article.images,
                                            values.url
                                        ]
                                    }
                                });

                                closePhoneModal();
                            }}
                        />
                    </div>
                )
            },
            title: 'Add Images'
        });

        if (isDraft) {
            primaryActions.push({
                icon: 'share-alt',
                onClick: () => publishArticle(),
                title: 'Publish'
            });
        } else {
            primaryActions.push({
                icon: 'edit',
                onClick: () => unpublishArticle(),
                title: 'Unpublish'
            });
        }

        auxActions.push({
            icon: 'trash',
            onClick: () => {
                openConfirmModal(
                    async () => {
                        setPhoneModalLoading();

                        await nuiAction("ev-ui:deleteArticle", { article: props.article });

                        closePhoneModal();

                        updateArticlePage(props?.selectedArticleType?.id);
                    },
                    "Are you sure? This cannot be undone"
                )
            },
            title: 'Delete'
        });
    }

    return (
        <AppContainer
            fadeIn={false}
            onClickBack={() => {
                props.updateState({
                    page: 'home'
                });
                invalidArticle || editArticle(false);
            }}
            primaryActions={primaryActions}
            auxActions={auxActions}
            titularInput={(
                <Input.Text
                    icon="tags"
                    label="Title"
                    onChange={(e) => isEditor && handleUpdateArticle({ title: e })}
                    value={props?.article?.title}
                    disabled={isEditor}
                />
            )}
        >
            <div>
                {props?.article?.images && props?.article?.images.length > 0 && props?.article?.images.map((image: string, index: number) => {
                    return image.match(/.mp4/g) ? (
                        <div key={index}>
                            <div
                                key={Math.random()}
                                className="editor-image"
                                style={{ backgroundImage: `url(${image})` }}
                            >
                                <video
                                    autoPlay={false}
                                    controls={true}
                                    controlsList="nodownload"
                                    loop={true}
                                    id="myVideo"
                                >
                                    <source
                                        src={image}
                                        type="video/mp4"
                                    />
                                </video>
                            </div>
                            {!validArticle && isEditor && (
                                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                    <Button.Secondary size="small" onClikc={() => removeImage(index)}>
                                        Remove
                                    </Button.Secondary>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div key={index}>
                            <ClickAwayListener
                                key={Math.random()}
                                onClickAway={() => setImageOpen(false)}
                            >
                                <Tooltip
                                    style={{ backgroundColor: 'rgba(0, 0, 0, 0)', color: 'rgba(0, 0, 0, 0.87)', maxWidth: 'none', fontSize: '0.75rem', position: 'relative' }}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                    title={(
                                        <>
                                            <div onClick={() => setImageOpen(false)}>
                                                <img
                                                    alt={image}
                                                    src={image}
                                                    style={{ maxHeight: 600, maxWidth: 800 }}
                                                />
                                            </div>
                                        </>
                                    )}
                                    placement="left"
                                    open={imageOpen}
                                    onClose={() => setImageOpen(false)}
                                >
                                    <div
                                        className="editor-image"
                                        onClick={() => setImageOpen(!imageOpen)}
                                        style={{ backgroundImage: `url(${image})` }}
                                    />
                                </Tooltip>
                            </ClickAwayListener>
                            {!validArticle && isEditor && (
                                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                                    <Button.Secondary size="small" onClick={() => removeImage(index)}>
                                        Remove
                                    </Button.Secondary>
                                    {index !== 0 && (
                                        <div style={{ marginTop: 8 }}>
                                            <Button.Primary size="small" onClick={() => {
                                                return (function (imageId) {
                                                    const selectedImage = props.article.images[imageId];
                                                    const otherImages = props.article.images.filter((_, index) => index !== imageId);

                                                    props.updateState({
                                                        article: {
                                                            ...props.article,
                                                            images: [
                                                                selectedImage,
                                                                ...otherImages
                                                            ]
                                                        }
                                                    });
                                                })(index)
                                            }}>
                                                Make Header
                                            </Button.Primary>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className={classes.markdownWrapper}>
                <RichMarkdownEditor
                    key={props.article.id}
                    dark={true}
                    readOnly={validArticle}
                    onChange={(e) => handleUpdateArticle({ content: e() })}
                    placeholder="Article content goes here..."
                    defaultValue={props.article.content}
                    // onClickLink={() => { }}
                    // embeds={[]}
                    // tooltip={null}
                    style={{ background: 'transparent' }}
                />
            </div>
        </AppContainer>
    )
}