export default (state = false, action) => {
    switch (action.type) {
        case 'CHANGE_MODAL_STATE':
            return !state;
        default:
            return state;
    }
};