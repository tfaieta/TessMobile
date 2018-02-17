import React, {Component} from 'react';
import {View, Image, StatusBar, ActivityIndicator, Dimensions} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient/index.android";

import { Navigation } from 'react-native-navigation';






// first official screen of tess, from here it goes to home page if logged in or start up if not



var homeIcon;
Icon.getImageSource('ios-home-outline', 30, '#F5002A').then((source) => { homeIcon = source});
var homeIconSelected;
Icon.getImageSource('ios-home', 30, '#F5002A').then((source) => { homeIconSelected = source});

var discoverIcon;
Icon.getImageSource('ios-search-outline', 30, '#F5002A').then((source) => { discoverIcon = source});
var discoverIconSelected;
Icon.getImageSource('ios-search', 30, '#F5002A').then((source) => { discoverIconSelected = source});

var recordIcon;
Icon.getImageSource('ios-microphone-outline', 50, '#F5002A').then((source) => { recordIcon = source});
var recordIconSelected;
Icon.getImageSource('ios-microphone', 50, '#F5002A').then((source) => { recordIconSelected = source});

var libraryIcon;
Icon.getImageSource('ios-headset-outline', 30, '#F5002A').then((source) => { libraryIcon = source});
var libraryIconSelected;
Icon.getImageSource('ios-headset', 30, '#F5002A').then((source) => { libraryIconSelected = source});

var accountIcon;
Icon.getImageSource('ios-person-outline', 30, '#F5002A').then((source) => { accountIcon = source});
var accountIconSelected;
Icon.getImageSource('ios-person', 30, '#F5002A').then((source) => { accountIconSelected = source});



var {height, width} = Dimensions.get('window');


export default class InitialScreen extends Component{

    componentWillMount(){
        setTimeout(() => {
            firebase.auth().onAuthStateChanged(this.func);
        }, 1000);

    }

    func(){
        const {currentUser} = firebase.auth();

        if(currentUser){
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
                        screen: 'Discover',
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
                        screen: 'RecordFirst',
                        icon: recordIcon,
                        selectedIcon: recordIconSelected,
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
                        navBarHidden: true,
                        navigatorStyle: {screenBackgroundColor: '#fff'},
                        navigatorButtons: {screenBackgroundColor: '#fff'}
                    }
                ],
                tabsStyle: {
                    tabBarButtonColor: '#6a6b78',
                    tabBarSelectedButtonColor: '#5757FF',
                    tabBarBackgroundColor: '#fff',
                    initialTabIndex: 0,
                    tabBarTextFontFamily: 'HiraginoSans-W3',
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
        }
        else{
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'Startup',
                    navigatorStyle: {screenBackgroundColor: '#fff'},
                    navigatorButtons: {screenBackgroundColor: '#fff'}
                },
                appStyle: {
                    navBarHidden: true,
                    orientation: 'portrait',
                    bottomTabBadgeTextColor: 'white',
                    bottomTabBadgeBackgroundColor: 'white',
                    hideBackButtonTitle: true/false
                },
                animationType: 'slide-down'
            });
        }
        
    }


    render() {
        return (
            <LinearGradient

                colors={['#5555ff', '#9687ff' ]}
                start={{x: 0.0, y: 0.0}} end={{x: 0, y: 1}}
                style={{flex:1}}>
                <StatusBar hidden={true} />

                <Image
                    style={{width: 150, height: 168, borderColor: '#b9bad1', alignSelf: 'center', opacity: 1, marginTop: height / 6,}}
                    source={require('tess/src/images/White_Logo.png')}
                />

                <ActivityIndicator style={{marginTop: 60}} size="large" color='#fff'/>


            </LinearGradient>
        );
    }
}