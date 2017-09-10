import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    PODCAST_UPDATE,
    PODCAST_CREATE,
    PODCAST_FETCH_SUCCESS
} from './types';

export const podcastUpdate = ({prop, value}) => {
    return {
        type: PODCAST_UPDATE,
        payload: {prop, value}
    };
};

export const podcastCreate = ({ podcastTitle, podcastDescription }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/podcast`)
            .push({podcastTitle, podcastDescription})
            .then(() => {
            dispatch({ type: PODCAST_CREATE });
            Actions.RecordSuccess();
            });
    };

};


export const podcastFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/podcast`)
            .on('value', snapshot => {
                dispatch({ type: PODCAST_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};