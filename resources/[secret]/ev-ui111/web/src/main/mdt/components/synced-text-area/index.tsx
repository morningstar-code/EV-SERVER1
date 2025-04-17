import { FunctionComponent, useEffect, useRef } from "react";
import { QuillBinding } from "y-quill";
import Quill from "quill";
import Delta, { Op } from "quill-delta";
import QuillCursors from "quill-cursors";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import "quill/dist/quill.core.css";
import "quill/dist/quill.bubble.css";
import { getCharacter } from "lib/character";
import useStyles from "../index.styles";

Quill.register("modules/cursors", QuillCursors);

const textEditorProps = {
    theme: "bubble",
    formats: ["bold", "italic", "underline", "strike", "blockquote", "list", "header", "clean", "background", "color"],
    modules: {
        toolbar: [["bold", "italic", "underline", "strike", "blockquote", {
            background: []
        }, {
                color: []
            }], [{
                list: "ordered"
            }, {
                list: "bullet"
            }], [{
                header: [1, 2, 3, 4, 5, 6, false]
            }], ["clean"]],
        clipboard: {
            matchVisual: false
        }
    }
};

const SyncedTextArea: FunctionComponent<{
    roomName: string;
    className: string;
    initialValue: Op[];
    readOnly: boolean;
    onTextChange?: (editor: any, delta: any, oldDelta: any, source: any) => void;
    onSelectionChange?: (editor: any, range: any, oldRange: any, source: any) => void;
    placeholder: string;
}> = (props) => {
    const classes = useStyles(props);

    const boundsRef = useRef<HTMLDivElement>(null);
    let editor: Quill;
    let wsProvider: WebsocketProvider;
    let binding: QuillBinding;

    const mergedProps = {
        as: "div",
        ...textEditorProps,
        ...props
    } as any;

    const { as, initialValue, ref, onReady, onTextChange, onSelectionChange, debug, modules, placeholder, readOnly, theme, formats, bounds, scrollingContainer, strict, ...otherProps } = mergedProps;

    const onTextChangeFunction = (delta: any, oldDelta: any, source: any) => {
        if (props.onTextChange) {
            props.onTextChange(editor, delta, oldDelta, source);
        }
    };

    const onSelectionChangeFunction = (range: any, oldRange: any, source: any) => {
        if (props.onSelectionChange) {
            props.onSelectionChange(editor, range, oldRange, source);
        }
    };

    const getRandomColor = () => ["blue", "red", "orange", "green"][Math.floor(Math.random() * 4)];

    const onMessage = (e: MessageEvent) => {
        if (e.data?.resource === 'mdt' && !!e.data?.type) {
            return e.data?.type;
        }
    };

    useEffect(() => {
        if (props.initialValue && editor) {
            editor.setContents(new Delta(props.initialValue));
        }
    }, [props.initialValue]);

    useEffect(() => {
        const createEditor = () => {
            window.addEventListener('message', onMessage);

            if (binding) {
                binding.destroy();
            }

            if (props.readOnly) {
                editor = new Quill(boundsRef.current, {
                    ...textEditorProps,
                    bounds: boundsRef.current
                });

                if (props.initialValue) {
                    editor.setContents(new Delta(props.initialValue));
                }
            } else {
                const doc = new Y.Doc();
                const color = getRandomColor();

                wsProvider = new WebsocketProvider('ws://localhost:9999/', 'document-sync', doc, {
                    params: {
                        room: props.roomName,
                        userName: `${getCharacter()?.first_name} ${getCharacter()?.last_name}`,
                        color: color
                    },
                    resyncInterval: 500
                });

                wsProvider.awareness.setLocalStateField('user', {
                    name: `${getCharacter()?.first_name} ${getCharacter()?.last_name}`,
                    color: color
                });

                const type = doc.getText(props.roomName);

                editor = new Quill(boundsRef.current, {
                    ...textEditorProps,
                    bounds: boundsRef.current,
                    modules: {
                        ...textEditorProps.modules,
                        cursors: true
                    },
                    placeholder: props.placeholder
                });

                binding = new QuillBinding(type, editor, wsProvider.awareness);

                editor.disable();

                wsProvider.on('synced', async () => {
                    console.log("We syncing...!")

                    clearInterval(wsProvider._resyncInterval);

                    if (wsProvider.doc.share.get(props.roomName)?._length === 0 && props.initialValue != null) {
                        editor.setContents(new Delta(props.initialValue));
                    }

                    if (!props.readOnly) {
                        console.log("Not readonly enable!")
                        editor.enable();
                    }
                });
            }

            editor.on('text-change', onTextChangeFunction);
            editor.on('selection-change', onSelectionChangeFunction);

            if (boundsRef.current && typeof boundsRef.current === 'function') {
                (boundsRef as any).current(editor);
            }

            if (onReady) {
                onReady(editor);
            }
        };

        createEditor();

        return () => {
            window.removeEventListener('message', onMessage);

            editor.off('text-change', onTextChangeFunction);
            editor.off('selection-change', onSelectionChangeFunction);

            if (binding) {
                binding.destroy();
            }

            if (wsProvider) {
                wsProvider.awareness.setLocalStateField('user', null);
                wsProvider.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (!wsProvider || wsProvider.synced) {
            const type = props.readOnly ? 'disable' : 'enable';
            editor[type]();
        }
    }, [props.readOnly]);

    return (
        <div
            id="bounds"
            ref={boundsRef}
            className={`quill ${props.className} ${classes.syncedDescription}`}
            style={{
                width: '100%',
                color: '#ffffff8c !important'
            }}
            as={as}
            {...otherProps}
        />
    );
};

export default SyncedTextArea;