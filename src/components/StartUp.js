/**
 * Created by nickruspantini on 6/6/17.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity,} from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux';

import AppIntro from 'react-native-app-intro';
import Icon from 'react-native-vector-icons/Ionicons';




export  default class Login extends Component{




    _handleButtonPressLogin = () => {
        Actions.LoginForm();
    };

    _handleButtonPressCreate = () => {
        Actions.CreateAccount();
    };

    _overrideLogin = () => {
        Actions.Main();
    };



    _fbAuth = () => {
        LoginManager.logInWithReadPermissions(['public_profile']).then(function(result) {
            if (result.isCancelled){
                console.log('Login cancelled');
            } else {
                console.log('Login success: ' + result.grantedPermissions);
                Actions.Main();
            }


        }, function (error) {
            console.log('An error occurred' + error) ;
        }  )
    };







    render() {
        return (
            <View>


                <View style={styles.container}>
            <AppIntro style={styles.wrapper}
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={5}
                    loop={false}
                    showsPagination={false}
                      showDoneButton={false}
                      showDots={false}
                      showSkipButton={false}
            >

                <View style={styles.slide1}>
                    <View level={20} style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('tess/src/images/logo.png')}
                        />

                    </View>
                    <View level = {-20} style={styles.textContainer}>
                        <Text style={styles.textforSlide1 }>Swipe to see what we're about</Text>
                    </View>
                </View>



                <View style={styles.slide2}>
                    <View level = {20}>
                        <Icon style={{textAlign:'center', fontSize: 80,color:'#FFF' }} name="md-microphone">
                        </Icon>
                    </View>
                    <View level={-20}>
                    <Text style={styles.text}>Tess is a podcast platform</Text>
                    </View>
                </View>


                <View style={styles.slide3}>
                    <View level = {20}>
                        <Icon style={{textAlign:'center', fontSize: 80,color:'#FFF' }} name="md-headset">
                        </Icon>
                    </View>
                    <View level = {-20}>
                    <Text style={styles.text}>A place to easily listen to or create podcasts</Text>
                    </View>
                </View>


                <View style={styles.slide4}>
                    <View level = {20}>
                        <Icon style={{textAlign:'center', fontSize: 80,color:'#FFF' }} name="ios-radio-button-on">
                        </Icon>
                    </View>
                    <View level = {-20}>
                    <Text style={styles.text}>Record with the touch of a button</Text>
                    </View>
                </View>






            </AppIntro>
                </View>



            <View style={{marginTop: 430}}>
                <View style={styles.formContainer2}>
                    <TouchableOpacity onPress={this._handleButtonPressCreate} style={styles.buttonContainer}>
                        <Text style={styles.smallText}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.formContainer3}>
                    <TouchableOpacity onPress={this._fbAuth} style={styles.buttonContainer2}>
                        <Text style={styles.smallText}>
                            Login with Facebook
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>

                    <TouchableOpacity onPress={this._handleButtonPressLogin} style={styles.buttonContainer3}>
                        <Text style={styles.smallText2}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>




            </View>


            </View>
        );
    }
}

//noinspection JSAnnotator
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#595bc8',
    },
    logoContainer: {
        alignItems: 'center',

    },
    textContainer: {
        flex: 1
    },
    logo: {
        marginTop:10,
        width: 250,
        height: 200
    },
    title: {
        color: '#ffffff',
        marginTop: -10,
        width: 200,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(170,170,170,0.5)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#e8952f',
        paddingVertical: 30,
        paddingHorizontal: 5,
    },
    buttonContainer2: {
        backgroundColor: '#657ed4',
        paddingVertical: 30,
        paddingHorizontal: 5,
    },
    buttonContainer3: {
        backgroundColor: 'rgba(1,170,170,1)',
        paddingVertical: 30,
        paddingHorizontal: 5,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '900'
    },

    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 30,
    },
    formContainer: {
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'rgba(200,200,200,0.3)',
        marginLeft: 0,
        marginRight: 0,
    },
    formContainer2: {
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'rgba(200,200,200,0.3)',
        marginLeft: 0,
        marginRight: 0,
    },
    formContainer3: {
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'rgba(200,200,200,0.3)',
        marginLeft: 0,
        marginRight: 0,
    },

    wrapper: {
    },

    slide1: {
        paddingTop: 0,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#e8952f'
    },
    slide2: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        backgroundColor: '#657ed4'
    },
    slide3: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        backgroundColor: 'rgba(1,170,170,1)'
    },
    slide4: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        backgroundColor: '#69bbd9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 30,
        paddingBottom:20,
        marginRight: 30,
    },
    textforSlide1: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 30,
        marginRight: 30,
        paddingTop: 60,

    },
    smallText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    smallText2: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    smallerText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 30,
        marginRight: 30,
    },


});