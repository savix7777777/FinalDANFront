import {CHANGE_STYLE,CHANGE_STYLE_PANEL_STATE,CHANGE_MODAL_STATE,SAVE_CHOOSE_TEMPLATE_CHANGES,SAVE_MONGODB_STYLE_ID,GET_PROJECT_DATA} from "./actions";


export const createChangeStyle = (payload) => {
    return {type: CHANGE_STYLE, payload};
};


export const createModalState = () => {
    return {type: CHANGE_MODAL_STATE};
};


export const createStylePanelState = () => {
    return {type: CHANGE_STYLE_PANEL_STATE};
};


export const createChooseTemplateChanges = (payload) => {
    console.log(payload);
    return {type: SAVE_CHOOSE_TEMPLATE_CHANGES, payload}
};


export const createMongoDBId = (payload) => {
    return {type: SAVE_MONGODB_STYLE_ID, payload}
};


export const getProjectDataToStor = (payload) => {
    return {type: GET_PROJECT_DATA, payload};
};