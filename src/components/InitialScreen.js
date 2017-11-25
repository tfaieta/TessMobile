import React, {Component} from 'react';
import {View, Image, StatusBar, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';


import { Navigation } from 'react-native-navigation';


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




export default class InitialScreen extends Component{

    componentWillMount(){
        firebase.auth().onAuthStateChanged(this.func);
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
                    tabBarButtonColor: '#BBBCCD',
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
            <View style={{flex:1, backgroundColor: '#fff'}}>
                <StatusBar hidden={true} />

                <Image
                    style={{ alignSelf: 'center', height: 700, width:400, opacity: 1}}
                    source={require('tess/src/images/initialScreenSplash.png')}
                >
                <ActivityIndicator style={{marginTop:450}} size="large" color='#856cff'/>
                </Image>

            </View>
        );
    }
}