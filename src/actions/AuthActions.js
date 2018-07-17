import firebase from 'firebase';
import { Navigation } from 'react-native-navigation';
import {Dimensions} from 'react-native';
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

var {height, width} = Dimensions.get('window');



var homeIcon;
Icon.getImageSource('home', width/14.42, '#b1b3c8').then((source) => { homeIcon = source});
var homeIconSelected;
Icon.getImageSource('home', width/12.5, '#506dcf').then((source) => { homeIconSelected = source});

var discoverIcon;
Icon.getImageSource('compass', width/12.5, '#b1b3c8').then((source) => { discoverIcon = source});
var discoverIconSelected;
Icon.getImageSource('compass', width/11.03, '#506dcf').then((source) => { discoverIconSelected = source});

var libraryIcon;
FontAwesome.getImageSource('bars', width/17.05, '#b1b3c8').then((source) => { libraryIcon = source});
var libraryIconSelected;
FontAwesome.getImageSource('bars', width/14.42, '#506dcf').then((source) => { libraryIconSelected = source});

var notificationsIcon;
FontAwesome.getImageSource('bell', width/17.05, '#b1b3c8').then((source) => { notificationsIcon = source});
var notificationsIconSelected;
FontAwesome.getImageSource('bell', width/14.42, '#506dcf').then((source) => { notificationsIconSelected = source});



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
                                            top: height/133.4,
                                            left: 0,
                                            bottom: -(height/133.4),
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
                                            top: height/133.4,
                                            left: 0,
                                            bottom: -(height/133.4),
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
                                            top: height/133.4,
                                            left: 0,
                                            bottom: -(height/133.4),
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
                                            top: height/133.4,
                                            left: 0,
                                            bottom: -(height/133.4),
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
                                passProps: {
                                },
                                animationType: 'slide-down'
                            });
            })


            .catch(() => loginUserFail(dispatch));

    };
};

export const createUser = ({email, password, username, loading}) => {
    return (dispatch) => {
        dispatch({ type: USER_CREATE});


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {

                firebase.database().ref(`usernames`).child(username.toLowerCase()).update({username: username.toLowerCase()});

                firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/username')
                    .update({   username: username });


                loginUserSuccess(dispatch, user);

                // W/O this the ActivityIndicator won't show on CreateAccount.js
                this.props.loading = false;
                firebase.auth().signInWithEmailAndPassword(email, password);

                firebase.auth().currentUser.sendEmailVerification().then(function() {
                    // Email sent.
                    console.warn("Success")
                }).catch(function(error) {
                    // An error happened.
                    console.warn("Error")
                })

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
                                                top: height/133.4,
                                                left: 0,
                                                bottom: -(height/133.4),
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
                                                top: height/133.4,
                                                left: 0,
                                                bottom: -(height/133.4),
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
                                                top: height/133.4,
                                                left: 0,
                                                bottom: -(height/133.4),
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
                                                top: height/133.4,
                                                left: 0,
                                                bottom: -(height/133.4),
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
                });
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