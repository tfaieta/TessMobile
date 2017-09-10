import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PodcastFormReducer from './PodcastFormReducer';
import PodcastReducer from './PodcastReducer';

export default combineReducers({
    auth: AuthReducer,
    podcastForm: PodcastFormReducer,
    podcast: PodcastReducer
});

