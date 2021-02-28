import { SEARCH } from "./actionTypes";

export const search = content => ({
    type: SEARCH,
    payload: {
        content
    }
});
