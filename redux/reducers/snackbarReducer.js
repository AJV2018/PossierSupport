import { CLOSE_SNACK_BAR, OPEN_SNACK_BAR } from "../types"

const initialState = {
    show: false,
    message: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case OPEN_SNACK_BAR:
            return { ...state, ...payload }

        case CLOSE_SNACK_BAR:
            return initialState

        default:
            return state
    }
}
