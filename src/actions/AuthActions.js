import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    USERNAME_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    USER_CREATE
} from "./types"



export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };

};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };

};

export const usernameChanged = (text) => {
    return {
        type: USERNAME_CHANGED,
        payload: text
    };

};

export const loginUser = ({email, password}) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER});


        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user);
                Actions.Main();
            })


            .catch(() => loginUserFail(dispatch));

    };
};

export const createUser = ({email, password, username}) => {
    return (dispatch) => {
        dispatch({ type: USER_CREATE});


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                loginUserSuccess(dispatch, user);
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {


                    let curUser = firebase.auth().currentUser;
                    curUser.updateProfile({
                        displayName: username

                    });


                    Actions.Main();


                })





            })

            .catch(() => loginUserFail(dispatch));





    };


};

const loginUserFail = (dispatch) => {
    dispatch({type: LOGIN_USER_FAIL });
};

const  loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });
};