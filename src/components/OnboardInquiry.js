import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView, Platform, TouchableOpacity, AlertIOS} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import FadeInView from './FadeInView';
import Variables from "./Variables";
import InterestList from './InterestList';
var {height, width} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';

// From the Animated Gradient to the Inquiry 
// Uses InterestList component to render all categories

class OnboardInquiry extends Component{

    componentWillUnmount(){
        clearTimeout(this.timeout)
    }

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: true,
            tabBarHidden: true,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 22, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-Bold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: false,
            topBarShadowColor: 'transparent',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
            drawUnderNavBar: Platform.OS === 'ios',
            navBarTranslucent: Platform.OS === 'ios',
            navBarNoBorder: true,

        });

        this.state = {
            loading: true,
            showAlert: false,
            text: '',
            message: '',
        };

        this.timeout = setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 4000)

    }


    render() {
        if(this.state.loading){
            let bgGradient = {
                colors: ['#203a43', '#2b5876', '#4e4376']
            };
            let duration = 2000;

            return (
                    <AnimatedLinearGradient
                        style={styles.container}
                        customColors={bgGradient.colors}
                        points={{start: {x: 0.5, y: 0}, end: {x: 0.5, y: 1}}}
                        >
                        <View style={{flex: 1, alignContent: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
                            <Text style={styles.gradientText}>Let's try to find your favorite podcasts!</Text>
                        </View>
                    </AnimatedLinearGradient>
            );
        }
        else{
            return (
                <View style={styles.container}>
                    <FadeInView>
                        <ScrollView>
                            <Text style={styles.title}>What kind of podcasts are you interested in?</Text>

                            <InterestList/>

                            <TouchableOpacity onPress={() =>{
                                if (Variables.state.interest === undefined || Variables.state.interest.length == 0) {
                                    if (Platform.OS === 'ios') {
                                        // Use AlertIOS - This will work on IOS
                                        AlertIOS.alert(
                                            'Nothing Selected',
                                            'Please select an interest',
                                            { cancelable: true }

                                        );
                                    } else {
                                        // Use AwesomeAlert - This will work on Android
                                        this.setState({
                                            showAlert: true,
                                            text: "Nothing Selected",
                                            message: "Please select an interest"
                                        })
                                    }
                                }
                                else {
                                    this.props.navigator.push({
                                        screen: 'OnboardInterest',
                                        animationType: 'fade',
                                    });
                                }
                            }}>
                                <View style={styles.nextContainer}>
                                    <Text style={styles.text}>Next</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() =>{
                                this.props.navigator.push({
                                    screen: 'OnboardSearch',
                                    title: 'Search',
                                });
                            }} >
                                <Text style={styles.titleSmall}>Search Instead?</Text>
                            </TouchableOpacity>
                        </ScrollView>


                        <PlayerBottom navigator={this.props.navigator}/>
                    </FadeInView>
                </View>

            );
        }
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F5F4F9',
    },
    nextContainer:{
        backgroundColor: '#3e4164',
        paddingVertical: height/50,
        paddingHorizontal: width/50,
        marginHorizontal: width/3.5,
        marginTop: height/30,
        marginBottom: height/90,
        borderRadius: height/120
    },
    title: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/16,
        marginTop: height/20,
        marginBottom: height/55,
        marginHorizontal: height/50
    },
    gradientText: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18,
    },
    titleSmall: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/30,
        marginVertical: height/66.7,
        paddingBottom: height/30,
        textDecorationLine: 'underline'
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18,
    },
});


export default OnboardInquiry;
