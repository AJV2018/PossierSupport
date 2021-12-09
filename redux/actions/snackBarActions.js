import { CLOSE_SNACK_BAR, OPEN_SNACK_BAR } from "../types";

export const openSnackBarAction = (payload) => ({
    type: OPEN_SNACK_BAR,
    payload
})

export const closeSnackBarAction = () => ({
    type: CLOSE_SNACK_BAR,
})

