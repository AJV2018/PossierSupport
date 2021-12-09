import { SET_LOADING } from "../types"

const initialState = false

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_LOADING:
            return payload

        default:
            return state
    }
}
