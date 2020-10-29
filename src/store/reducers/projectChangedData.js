export default (state= {},action) => {
    switch (action.type){
        case 'SAVE_CHOOSE_TEMPLATE_CHANGES':
            return Object.assign(state,action.payload);
        default:
            return state;
    }
};