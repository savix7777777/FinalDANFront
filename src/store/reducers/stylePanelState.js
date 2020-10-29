export default (state = false, action)=> {
    switch (action.type) {
        case 'CHANGE_STYLE_PANEL_STATE':
            return !state;
        default:
            return state;
    }
}