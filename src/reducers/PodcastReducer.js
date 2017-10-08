import {
    PODCAST_FETCH_SUCCESS,
    PODCAST_FETCH_SUCCESS_NEW
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PODCAST_FETCH_SUCCESS:
            return action.payload;
        case PODCAST_FETCH_SUCCESS_NEW:
            return action.payload;
        default:
            return state;
    }
}