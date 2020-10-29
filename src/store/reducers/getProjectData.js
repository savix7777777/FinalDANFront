export default (state= {},action) => {
    switch (action.type){
        case 'GET_PROJECT_DATA':
            return Object.assign(state,action.payload);
        default:
            return state;
    }
};