import { combineReducers } from "redux";
import dimensionReducer from "./dimensionReducer";
import faqReducer from "./faqReducer";
import loaderReducer from "./loaderReducer";
import snackbarReducer from "./snackbarReducer";
import storeDetailsReducer from "./storeDetailsReducer";

const rootReducer = combineReducers({
    dimensions: dimensionReducer,
    faqs: faqReducer,
    loading: loaderReducer,
    snackBar: snackbarReducer,
    storeDetails: storeDetailsReducer
})

export default rootReducer;