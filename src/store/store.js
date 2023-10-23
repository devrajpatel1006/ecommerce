import { createStore } from "redux";
import cartReducer from "../components/Cart/reducers/cartReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(cartReducer,composeWithDevTools());

export default store;
