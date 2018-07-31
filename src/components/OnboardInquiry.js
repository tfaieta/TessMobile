import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView, Platform, TouchableOpacity} from 'react-native';
import FadeInView from './FadeInView';
import Variables from "./Variables";
var {height, width} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';

// Q1 of onboard process, containes all inquiries

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
                            <Text style={styles.title2}>Let's try to find your favorite podcasts!</Text>
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

                            <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('news')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#06beb6', '#48b1bf']} style={styles.linearGradient}>
                                        <Text style={styles.text}>news</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('business')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#0f2027', '#2c5364']} style={styles.linearGradient}>
                                        <Text style={styles.text}>business</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('inspo')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#f953c6', '#b91d73']} style={styles.linearGradient}>
                                        <Text style={styles.text}>inspo</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('learning')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#00b4db', '#0083b0']} style={styles.linearGradient}>
                                        <Text style={styles.text}>learning</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('comedy')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#11998e', '#38ef7d']} style={styles.linearGradient}>
                                        <Text style={styles.text}>comedy</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('health')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#7f00ff', '#e100ff']} style={styles.linearGradient}>
                                        <Text style={styles.text}>health</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('spiritual')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#396afc', '#2948ff']} style={styles.linearGradient}>
                                        <Text style={styles.text}>spiritual</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('philosophy')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#f2994a', '#f2c94c']} style={styles.linearGradient}>
                                        <Text style={styles.text}>philosophy</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('sports')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#41295a', '#2f0743']} style={styles.linearGradient}>
                                        <Text style={styles.text}>sports</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('tech')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#00c6ff', '#0072ff']} style={styles.linearGradient}>
                                        <Text style={styles.text}>tech</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('travel')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#f2709c', '#ff9472']} style={styles.linearGradient}>
                                        <Text style={styles.text}>travel</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('music')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#606c88', '#0072ff']} style={styles.linearGradient}>
                                        <Text style={styles.text}>music</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <View style={{flexDirection: 'row', marginHorizontal: width/20}}>
                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('science')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#4e54c8', '#8f94fb']} style={styles.linearGradient}>
                                        <Text style={styles.text}>science</Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.smallContainer} onPress={() => {
                                    Variables.state.interest.push('gaming')
                                }}>
                                    <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={['#ec008c', '#fc6767']} style={styles.linearGradient}>
                                        <Text style={styles.text}>gaming</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() =>{
                                this.props.navigator.push({
                                        screen: 'OnboardInterest',
                                        animationType: 'fade',
                                });
                                console.warn(Variables.state.interest)
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
    smallContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingVertical: height/70,
        paddingHorizontal: width/50,
        borderRadius: height/120
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
    title2: {
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
    linearGradient: {
        flex: 1,
        paddingHorizontal: width/25,
        paddingVertical: height/44.47,
        borderRadius: width/75
    },

});


export default OnboardInquiry;
