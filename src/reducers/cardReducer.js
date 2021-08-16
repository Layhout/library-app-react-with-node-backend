export const cardReducer = (state, action) => {
    switch (action.type) {
        case "ADD_CARD":
            return state.concat(action.data);
        case "LOAD_CARD":
            return action.data;
        case "UPDATE_ONE_CARD":
            const newCardState = [...state];
            const i = newCardState.findIndex(ncs => ncs._id === action.data._id);
            newCardState[i] = action.data;
            return newCardState;
        default:
            return state;
    }
}