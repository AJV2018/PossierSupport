import { Dimensions } from "react-native"
import { SET_DIMENSIONS } from "../types"
const initialState = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width
}

const dimensionReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_DIMENSIONS:
            return { ...state, ...payload }

        default:
            return state
    }
}

export default dimensionReducer;
