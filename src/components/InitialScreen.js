import React, {Component} from 'react';
import {View, StatusBar, Dimensions, Image, StyleSheet, Platform, Linking} from 'react-native';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Foundation';
import * as Animatable from 'react-native-animatable';
import app_logo from '../images/app_logo.png';
var FontAwesome = require('react-native-vector-icons/FontAwesome');
import { Navigation } from 'react-native-navigation';
var {height, width} = Dimensions.get('window');

// first official screen of tess, from here it goes to home page if logged in or start up if not

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


export default class InitialScreen extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true
    };

    componentWillMount(){

        // checks if there is an initial link
        // if logged in, continues to home
        // if not logged in, goes to preview player

        Linking.getInitialURL().then((url) => {
            if (url) {
                // opened app with url, handle url
                if (Platform.OS == 'android') {
                    this.timeout = setTimeout(() => {
                        firebase.auth().onAuthStateChanged(() => this.handleURL(url));
                    }, 2000)
                }
                else {
                    this.timeout = setTimeout(() => {
                        firebase.auth().onAuthStateChanged(() => this.handleURL((url)));
                    }, 1800)
                }
            }
            else{
                // continue as normal
                if (Platform.OS == 'android') {
                    this.timeout = setTimeout(() => {
                        firebase.auth().onAuthStateChanged(this.func);
                    }, 2000)
                }
                else {
                    this.timeout = setTimeout(() => {
                        firebase.auth().onAuthStateChanged(this.func);
                    }, 1800)
                }
            }
        }).catch(err => {
            // if error in reading url, continue as normal
            console.log(err);
            if (Platform.OS == 'android') {
                this.timeout = setTimeout(() => {
                    firebase.auth().onAuthStateChanged(this.func);
                }, 2000)
            }
            else {
                this.timeout = setTimeout(() => {
                    firebase.auth().onAuthStateChanged(this.func);
                }, 1800)
            }
        });


    }

    componentWillUnmount(){
        clearTimeout(this.timeout)
    }


    handleURL(url){
        const {currentUser} = firebase.auth();
        if(currentUser){
            // logged in, continue to home to handle the link
            if (Platform.OS == 'android') {
                this.timeout = setTimeout(() => {
                    firebase.auth().onAuthStateChanged(this.func);
                }, 2000)
            }
            else {
                this.timeout = setTimeout(() => {
                    firebase.auth().onAuthStateChanged(this.func);
                }, 1800)
            }
        }
        else{
            // not logged in, open preview player
            if (Platform.OS == 'android') {
                this.timeout = setTimeout(() => {
                    this.navigateToPreviewPlayer(url);
                }, 2000)
            }
            else {
                this.timeout = setTimeout(() => {
                    this.navigateToPreviewPlayer(url);
                }, 1800)
            }
        }
    }

    navigateToPreviewPlayer(url){
        const {navigator} = this.props;
        Navigation.showModal({
            screen: 'PlayerPreview',
            passProps: {url, navigator}
        });
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
                animationType: 'fade'
            });
        }
        else{
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'Login',
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
                animationType: 'fade'
            });
        }
    }

    render() {
        // Splash Screen Action + Animations
        const animateEffect = {
            0: {
                opacity: 0.9,
                scale: 1,
            },
            0.4: {
                opacity: 0.7,
                scale: 1,
            },
            0.8: {
                opacity: 1,
                scale: 1,
            },
            1: {
                opacity: 0.7,
                scale: 1,
            },
        };

        const duration = 2500;
        const durationiOS = 3000;


        if (Platform.OS == 'android') {
            return (
                <View style={styles.container}>
                    <View animation={animateEffect} duration={duration} style={styles.view}>
                        <Image
                            style={styles.image} source={app_logo}>
                        </Image>
                        <StatusBar hidden={true} />
                    </View>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <Animatable.View animation={animateEffect} duration={durationiOS} style={styles.view}>
                        <Image
                            style={styles.image}>
                            <Animatable.Image source={app_logo} duration={durationiOS} animation={animateEffect}/>
                        </Image>
                        <StatusBar hidden={true} />
                    </Animatable.View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff'
    },
    view: {
      justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    image:{
        justifyContent: 'center',
        alignItems: 'center',
    },

});