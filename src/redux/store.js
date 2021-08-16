import { createStore, combineReducers } from "redux";
import { bookReducer } from "./reducers/bookReducer";
import { cardReducer } from "./reducers/cardReducer";
import { visitorReducer } from "./reducers/visitorReducer";

const rootReducer = combineReducers({
    books: bookReducer,
    visitors: visitorReducer,
    cards: cardReducer,
});

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;