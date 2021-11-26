import counterReducer from "./counter";
import wishlistReducer from "./wishlist";
import { combineReducers } from "redux";

const allReducers= combineReducers({
    counter:counterReducer,
    wishlist:wishlistReducer
})

export default allReducers