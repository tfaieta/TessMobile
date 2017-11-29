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
import Icon from 'react-native-vector-icons/Ionicons';


var homeIcon;
Icon.getImageSource('ios-home-outline', 30, '#F5002A').then((source) => { homeIcon = source});
var homeIconSelected;
Icon.getImageSource('ios-home', 30, '#F5002A').then((source) => { homeIconSelected = source});

var discoverIcon;
Icon.getImageSource('ios-search-outline', 30, '#F5002A').then((source) => { discoverIcon = source});
var discoverIconSelected;
Icon.getImageSource('ios-search', 30, '#F5002A').then((source) => { discoverIconSelected = source});

var recordIcon;
Icon.getImageSource('ios-microphone-outline', 30, '#F5002A').then((source) => { recordIcon = source});
var recordIconSelected;
Icon.getImageSource('ios-microphone', 30, '#F5002A').then((source) => { recordIconSelected = source});

var libraryIcon;
Icon.getImageSource('ios-headset-outline', 30, '#F5002A').then((source) => { libraryIcon = source});
var libraryIconSelected;
Icon.getImageSource('ios-headset', 30, '#F5002A').then((source) => { libraryIconSelected = source});

var accountIcon;
Icon.getImageSource('ios-person-outline', 30, '#F5002A').then((source) => { accountIcon = source});
var accountIconSelected;
Icon.getImageSource('ios-person', 30, '#F5002A').then((source) => { accountIconSelected = source});



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
                        },
                        {
                            screen: 'Discover',
                            icon: discoverIcon,
                            selectedIcon: discoverIconSelected,
                            iconInsets: {
                                top: 5,
                                left: 0,
                                bottom: -5,
                                right: 0
                            },
                            navBarHidden: true
                        },
                        {
                            screen: 'RecordFirst',
                            icon: recordIcon,
                            selectedIcon: recordIconSelected,
                            iconInsets: {
                                top: 5,
                                left: 0,
                                bottom: -5,
                                right: 0
                            },
                            navBarHidden: true
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
                            navBarHidden: true
                        },
                        {
                            screen: 'Account',
                            icon: accountIcon,
                            selectedIcon: accountIconSelected,
                            iconInsets: {
                                top: 5,
                                left: 0,
                                bottom: -5,
                                right: 0
                            },
                            navBarHidden: true
                        }
                    ],
                    tabsStyle: {
                        tabBarButtonColor: '#6a6b78',
                        tabBarSelectedButtonColor: '#5757FF',
                        tabBarBackgroundColor: '#fff',
                        initialTabIndex: 0,
                        tabBarTextFontFamily: 'HiraginoSans-W3',
                        paddingTop: 25, paddingBottom:10, marginHorizontal: 10, borderRadius: 10, borderWidth:2, borderColor: 'rgba(100,100,100,0.1)'
                    },
                    appStyle: {
                        navBarHidden: true,
                        orientation: 'portrait',
                        bottomTabBadgeTextColor: 'white',
                        bottomTabBadgeBackgroundColor: 'white',
                        hideBackButtonTitle: true/false
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
                            },
                            {
                                screen: 'Discover',
                                icon: discoverIcon,
                                selectedIcon: discoverIconSelected,
                                iconInsets: {
                                    top: 5,
                                    left: 0,
                                    bottom: -5,
                                    right: 0
                                },
                                navBarHidden: true
                            },
                            {
                                screen: 'RecordFirst',
                                icon: recordIcon,
                                selectedIcon: recordIconSelected,
                                iconInsets: {
                                    top: 5,
                                    left: 0,
                                    bottom: -5,
                                    right: 0
                                },
                                navBarHidden: true
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
                                navBarHidden: true
                            },
                            {
                                screen: 'Account',
                                icon: accountIcon,
                                selectedIcon: accountIconSelected,
                                iconInsets: {
                                    top: 5,
                                    left: 0,
                                    bottom: -5,
                                    right: 0
                                },
                                navBarHidden: true
                            }
                        ],
                        tabsStyle: {
                            tabBarButtonColor: '#6a6b78',
                            tabBarSelectedButtonColor: '#5757FF',
                            tabBarBackgroundColor: '#fff',
                            initialTabIndex: 0,
                            tabBarTextFontFamily: 'HiraginoSans-W3',
                            paddingTop: 25, paddingBottom:10, marginHorizontal: 10, borderRadius: 10, borderWidth:2, borderColor: 'rgba(100,100,100,0.1)'
                        },
                        appStyle: {
                            navBarHidden: true,
                            orientation: 'portrait',
                            bottomTabBadgeTextColor: 'white',
                            bottomTabBadgeBackgroundColor: 'white',
                            hideBackButtonTitle: true/false
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