export const visitorReducer = (state, action) => {
    switch (action.type) {
        case "ADD_VISITOR":
            return [...state, action.data];
        case "UPDATE_ONE_VISITOR":
            const newVisitorState = [...state];
            const i = newVisitorState.findIndex(nvs => nvs._id === action.data._id);
            newVisitorState[i] = action.data;
            return newVisitorState;
        case "LOAD_VISITOR":
            return action.data;
        default:
            return state;
    }
}