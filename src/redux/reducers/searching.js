import { SEARCH } from "../actionTypes";

const initialState = {
    searchVal: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH: {
            const { content } = action.payload;
            return {
                ...state,
                searchVal: content
            };
        }
        default:
            return state;
    }
}
