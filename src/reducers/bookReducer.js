export const bookReducer = (state, action) => {
    switch (action.type) {
        case "ADD_BOOK":
            return [...state, action.data];
        case "REMOVE_BOOK":
            return state.filter(s => s.id !== action.data);
        case "LOAD_BOOK":
            return action.data;
        case "UPDATE_ONE_BOOK":
            const newBookState = [...state];
            const i = newBookState.findIndex(nbs => nbs._id === action.data._id);
            newBookState[i] = action.data;
            return newBookState;
        default:
            return state;
    }
}