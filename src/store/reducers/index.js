import {combineReducers} from "redux";
import activeStyle from "./activeStyle";
import modalState from "./modalState";
import stylePanelState from "./stylePanelState";
import projectChangedData from "./projectChangedData";
import mongoDBId from "./mongoDBId";
import getProjectData from "./getProjectData";


export default combineReducers({
    activeStyle,
    modalState,
    stylePanelState,
    projectChangedData,
    mongoDBId,
    getProjectData,
});