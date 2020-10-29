export default (state = {}, action) => {
    switch (action.type) {
        case 'CHANGE_STYLE':
            return action.payload;

        default:
            return state;
    }
};