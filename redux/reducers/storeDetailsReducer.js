import { SET_STORE_DATA } from "../types"

const initialState = {
    name: '',
    phone: '',
    store: ''
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

        case SET_STORE_DATA:
            return { ...state, ...payload }

        default:
            return state
    }
}
