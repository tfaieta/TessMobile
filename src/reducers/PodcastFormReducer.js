import {
    PODCAST_UPDATE,
    PODCAST_CREATE
} from "../actions/types";

const INITIAL_STATE = {
    podcastTitle: '',
    podcastDescription: '',
    podcastCategory: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PODCAST_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case PODCAST_CREATE:
            return INITIAL_STATE;
        default:
            return state;
    }
}