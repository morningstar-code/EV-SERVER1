import { nuiAction } from "lib/nui-comms";
import { storeObj } from "lib/redux";
import { closePhoneModal, setPhoneModalError, setPhoneModalLoading } from "main/phone/actions";
import { devData } from "main/phone/dev-data";
import store from "./store";

export const getNewsAppState = () => {
    return storeObj.getState()[store.key];
}

export const updateNewsAppState = (data: any) => {
    Object.keys(data).forEach((key) => {
        storeObj.dispatch({
            type: 'ev-ui-action',
            store: store.key,
            key: key,
            data: data[key],
        });
    });
}

export async function updateArticlePage(paramTypeId?: any, bool?: any) {
    const typeId = paramTypeId === -1 ? 1 : paramTypeId;
    const articleType = getNewsAppState().articleTypes.find(type => type.id === typeId);

    updateNewsAppState({ selectedArticleType: articleType });

    const results = await nuiAction<ReturnData>('ev-ui:getArticles', { type_id: typeId }, { returnData: devData.getArticles(typeId) });

    const updateData = {
        list: results.data
    } as any;

    if (!bool) {
        updateData.page = 'home';
    }

    updateNewsAppState({
        ...updateData,
    });
}

export async function getMusicCharts() {
    const results = await nuiAction<ReturnData>('ev-ui:getMusicCharts', {}, { returnData: devData.getMusicCharts() });

    updateNewsAppState({
        music: results.data
    });
}

export async function saveArticle(bool = false) {
    const state = getNewsAppState();
    setPhoneModalLoading();

    const isCreate = state?.article?.id === -1;
    const action = `ev-ui:${isCreate ? 'create' : 'edit'}Article`;

    const results = await nuiAction<ReturnData>(action, { article: state?.article });

    if (results.meta.ok) {
        isCreate || editArticle(false);
        updateArticlePage(state?.selectedArticleType?.id, isCreate || bool);
        closePhoneModal();
        return;
    }

    setPhoneModalError(results.meta.message, true);
}

export async function getArticleContent(article: any) {
    setPhoneModalLoading();

    const results = await nuiAction<ReturnData>('ev-ui:getArticleContent', { article: article }, { returnData: devData.getArticleContent() });

    if (results.meta.ok) {
        updateNewsAppState({
            article: results.data,
            page: 'editing'
        });

        closePhoneModal(false);
    } else {
        setPhoneModalError(results.meta.message, true);
    }
}

export async function editArticle(...args: any) {
    const state = getNewsAppState();

    const isUnlocked = !(args.length > 0 && void 0 !== args[0]) || args[0];

    if (isUnlocked || state.unlocked) {
        isUnlocked && setPhoneModalLoading();
        const article = state.article;
        const results = await nuiAction<ReturnData>('ev-ui:startEditArticle', { article: article, unlock: isUnlocked }, { returnData: article });
        if (results.meta.ok) {
            updateNewsAppState({ article: results.data, unlocked: isUnlocked });
            closePhoneModal(false);
            return;
        }
        return setPhoneModalError('Article is being edited by someone else', true);
    }

    return;
}

export async function publishArticle() {
    const article = getNewsAppState().article;

    await nuiAction<ReturnData>('ev-ui:publishArticle', { article: article });

    saveArticle();
}

export async function unpublishArticle() {
    const article = getNewsAppState().article;

    await nuiAction<ReturnData>('ev-ui:unpublishArticle', { article: article });

    saveArticle(true); //The true is what makes it not go back to the home page (maybe remove)
}