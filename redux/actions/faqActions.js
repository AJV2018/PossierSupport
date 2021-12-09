import { INIT_FAQS, SET_SUB_CATEGORIES, SET_SUPPORT_SECTIONS } from "../types";

export const setSupportSectionsAction = (payload) => ({
    type: SET_SUPPORT_SECTIONS,
    payload
})

export const setSubCatsAction = (payload) => ({
    type: SET_SUB_CATEGORIES,
    payload
})

export const initFaqsAction = (payload) => ({
    type: INIT_FAQS,
    payload
})


