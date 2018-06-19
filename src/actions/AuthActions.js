import firebase from 'firebase';
import { Navigation } from 'react-native-navigation';
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    USERNAME_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER,
    USER_CREATE
} from "./types"
import Icon from 'react-native-vector-icons/Foundation';
var FontAwesome = require('react-native-vector-icons/FontAwesome');



var homeIcon;
Icon.getImageSource('home', 26, '#b1b3c8').then((source) => { homeIcon = source});
var homeIconSelected = require('tess/src/images/iconHome.png');
Icon.getImageSource('home', 30, '#506dcf').then((source) => { homeIconSelected = source});



var discoverIcon;
Icon.getImageSource('compass', 30, '#b1b3c8').then((source) => { discoverIcon = source});
var discoverIconSelected;
Icon.getImageSource('compass', 34, '#506dcf').then((source) => { discoverIconSelected = source});

var libraryIcon;
FontAwesome.getImageSource('bars', 22, '#b1b3c8').then((source) => { libraryIcon = source});
var libraryIconSelected;
FontAwesome.getImageSource('bars', 26, '#506dcf').then((source) => { libraryIconSelected = source});

var notificationsIcon;
FontAwesome.getImageSource('bell', 22, '#b1b3c8').then((source) => { notificationsIcon = source});
var notificationsIconSelected;
FontAwesome.getImageSource('bell', 26, '#506dcf').then((source) => { notificationsIconSelected = source});



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

                Navigation.startTabBasedApp({
                                tabs: [
                                    {
                                        screen: 'Home',
                                        icon: homeIcon,
                                        selectedIcon: homeIconSelected,
                                        iconInsets: {
                                            top: 5,
                                            left: 0,
                                            bottom: -5,
                                            right: 0
                                        },
                                        navBarHidden: true,
                                        navigatorStyle: {screenBackgroundColor: '#fff'},
                                        navigatorButtons: {screenBackgroundColor: '#fff'}
                                    },
                                    {
                                        screen: 'Browse',
                                        icon: discoverIcon,
                                        selectedIcon: discoverIconSelected,
                                        iconInsets: {
                                            top: 5,
                                            left: 0,
                                            bottom: -5,
                                            right: 0
                                        },
                                        navBarHidden: true,
                                        navigatorStyle: {screenBackgroundColor: '#fff'},
                                        navigatorButtons: {screenBackgroundColor: '#fff'}
                                    },
                                    {
                                        screen: 'Hub',
                                        icon: notificationsIcon,
                                        selectedIcon: notificationsIconSelected,
                                        iconInsets: {
                                            top: 5,
                                            left: 0,
                                            bottom: -5,
                                            right: 0
                                        },
                                        navBarHidden: true,
                                        navigatorStyle: {screenBackgroundColor: '#fff'},
                                        navigatorButtons: {screenBackgroundColor: '#fff'}
                                    },
                                    {
                                        screen: 'Library',
                                        icon: libraryIcon,
                                        selectedIcon: libraryIconSelected,
                                        iconInsets: {
                                            top: 5,
                                            left: 0,
                                            bottom: -5,
                                            right: 0
                                        },
                                        navBarHidden: true,
                                        navigatorStyle: {screenBackgroundColor: '#fff'},
                                        navigatorButtons: {screenBackgroundColor: '#fff'}
                                    },
                                ],
                                tabsStyle: {
                                    tabBarButtonColor: '#b1b3c8',
                                    tabBarSelectedButtonColor: '#506dcf',
                                    tabBarBackgroundColor: '#fff',
                                    tabBarHideShadow: true,
                                    initialTabIndex: 0,
                                    tabBarTextFontFamily: 'Montserrat-Regular',
                                },
                                appStyle: {
                                    navBarHidden: true,
                                    orientation: 'portrait',
                                    bottomTabBadgeTextColor: 'white',
                                    bottomTabBadgeBackgroundColor: 'white',
                                    hideBackButtonTitle: true/false,
                                     tabBarButtonColor: '#b1b3c8',
                                     tabBarSelectedButtonColor: '#506dcf',
                                },
                                passProps: {},
                                animationType: 'slide-down'
                            });
            })


            .catch(() => loginUserFail(dispatch));

    };
};

export const createUser = ({email, password, username}) => {
    return (dispatch) => {
        dispatch({ type: USER_CREATE});


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {

                firebase.database().ref(`usernames`).child(username.toLowerCase()).update({username: username.toLowerCase()});

                firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/username')
                    .update({   username: username });


                loginUserSuccess(dispatch, user);
                firebase.auth().signInWithEmailAndPassword(email, password)

                .then(() => {

                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/username')
                        .update({   username: username });


                    Navigation.startTabBasedApp({
                                    tabs: [
                                        {
                                            screen: 'Home',
                                            icon: homeIcon,
                                            selectedIcon: homeIconSelected,
                                            iconInsets: {
                                                top: 5,
                                                left: 0,
                                                bottom: -5,
                                                right: 0
                                            },
                                            navBarHidden: true,
                                            navigatorStyle: {screenBackgroundColor: '#fff'},
                                            navigatorButtons: {screenBackgroundColor: '#fff'}
                                        },
                                        {
                                            screen: 'Browse',
                                            icon: discoverIcon,
                                            selectedIcon: discoverIconSelected,
                                            iconInsets: {
                                                top: 5,
                                                left: 0,
                                                bottom: -5,
                                                right: 0
                                            },
                                            navBarHidden: true,
                                            navigatorStyle: {screenBackgroundColor: '#fff'},
                                            navigatorButtons: {screenBackgroundColor: '#fff'}
                                        },
                                        {
                                            screen: 'Hub',
                                            icon: notificationsIcon,
                                            selectedIcon: notificationsIconSelected,
                                            iconInsets: {
                                                top: 5,
                                                left: 0,
                                                bottom: -5,
                                                right: 0
                                            },
                                            navBarHidden: true,
                                            navigatorStyle: {screenBackgroundColor: '#fff'},
                                            navigatorButtons: {screenBackgroundColor: '#fff'}
                                        },
                                        {
                                            screen: 'Library',
                                            icon: libraryIcon,
                                            selectedIcon: libraryIconSelected,
                                            iconInsets: {
                                                top: 5,
                                                left: 0,
                                                bottom: -5,
                                                right: 0
                                            },
                                            navBarHidden: true,
                                            navigatorStyle: {screenBackgroundColor: '#fff'},
                                            navigatorButtons: {screenBackgroundColor: '#fff'}
                                        },
                                    ],
                                    tabsStyle: {
                                        tabBarButtonColor: '#b1b3c8',
                                        tabBarSelectedButtonColor: '#506dcf',
                                        tabBarBackgroundColor: '#fff',
                                        tabBarHideShadow: true,
                                        initialTabIndex: 0,
                                        tabBarTextFontFamily: 'Montserrat-Regular',
                                    },
                                    appStyle: {
                                        navBarHidden: true,
                                        orientation: 'portrait',
                                        bottomTabBadgeTextColor: 'white',
                                        bottomTabBadgeBackgroundColor: 'white',
                                        hideBackButtonTitle: true/false,
                                         tabBarButtonColor: '#b1b3c8',
                                         tabBarSelectedButtonColor: '#506dcf',
                                    },
                                    passProps: {},
                                    animationType: 'slide-down'
                                });


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