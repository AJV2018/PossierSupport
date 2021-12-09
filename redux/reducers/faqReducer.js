import { INIT_FAQS, SET_SUB_CATEGORIES, SET_SUPPORT_SECTIONS } from "../types"

const initialState = {
    catSection: [],
    subCats: []
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case INIT_FAQS:
            return { ...state, ...payload }
        case SET_SUPPORT_SECTIONS:
            return { ...state, faqSection: [...payload] }

        case SET_SUB_CATEGORIES:
            return { ...state, subCats: [...payload] }

        default:
            return state
    }
}
