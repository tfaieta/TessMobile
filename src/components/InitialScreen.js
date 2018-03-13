import React, {Component} from 'react';
import {View, Image, StatusBar, ActivityIndicator, Dimensions} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient/index.android";

import { Navigation } from 'react-native-navigation';






// first official screen of tess, from here it goes to home page if logged in or start up if not



var homeIcon = require('tess/src/images/iconHome.png');
var homeIconSelected = require('tess/src/images/iconHome.png');

var discoverIcon = require('tess/src/images/iconDiscover.png');
var discoverIconSelected = require('tess/src/images/iconDiscover.png');

var libraryIcon = require('tess/src/images/iconLibrary.png');
var libraryIconSelected = require('tess/src/images/iconLibrary.png');

var notificationsIcon = require('tess/src/images/iconNotifications.png');
var notificationsIconSelected = require('tess/src/images/iconNotifications.png');


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
                        screen: 'Account',
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