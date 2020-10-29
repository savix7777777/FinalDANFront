export default (state = '', action) => {
    switch (action.type) {
        case 'SAVE_MONGODB_STYLE_ID':
            return action.payload;
        default:
            return state;
    }
};