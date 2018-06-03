import React, {Component} from 'react';
import {View, Image, StatusBar, ActivityIndicator, Dimensions} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Foundation';
var FontAwesome = require('react-native-vector-icons/FontAwesome');
import LinearGradient from "react-native-linear-gradient/index.android";

import { Navigation } from 'react-native-navigation';






// first official screen of tess, from here it goes to home page if logged in or start up if not



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


var {height, width} = Dimensions.get('window');


export default class InitialScreen extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true
    };

    componentWillMount(){
        this.timeout = setTimeout(() => {
            firebase.auth().onAuthStateChanged(this.func);
        }, 1000);

    }

    componentWillUnmount(){
        clearTimeout(this.timeout)
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
                        screen: 'Notifications',
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
        }
        else{
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'Startup',
                    navBarHidden: true,
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

                colors={['#d15564', '#9a5e9a', '#506dcf' ]}
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