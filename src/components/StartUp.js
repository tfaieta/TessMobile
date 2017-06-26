/**
 * Created by nickruspantini on 6/6/17.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, StatusBar, TextInput, TouchableOpacity, Alert, Button, KeyboardAvoidingView} from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';
import LoginForm from './LoginForm';
import CreateAccount from './CreateAccount';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper'



export  default class Login extends Component{





    _handleButtonPressLogin = () => {
        Actions.LoginForm();
    };

    _handleButtonPressCreate = () => {
        Actions.CreateAccount();
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





/*
    _handleButtonPressFB = async () => {
        try {
            const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                '820280631481558', // Replace with your own app id in standalone app
                { permissions: ['public_profile'] }
            );

            switch (type) {
                case 'success': {
                    // Get the user's name using Facebook's Graph API
                    const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                    const profile = await response.json();
                    Alert.alert(
                        'Logged in!',
                        `Hi ${profile.name}!`,
                    );
                    break;
                }
                case 'cancel': {
                    Alert.alert(
                        'Cancelled!',
                        'Login was cancelled!',
                    );
                    break;
                }
                default: {
                    Alert.alert(
                        'Oops!',
                        'Login failed!',
                    );
                }
            }
        } catch (e) {
            Alert.alert(
                'Oops!',
                'Login failed!',
            );
        }
    };
    */



    render() {
        return (

            <Swiper style={styles.wrapper} showsButtons>

                <View style={styles.slide1}>
                    <Text style={styles.text}>Welcome to</Text>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('tess/src/images/logo.png')}
                        />
                        <Text style={styles.text }>Swipe to find out more</Text>

                    </View>
                </View>



                <View style={styles.slide2}>
                    <Text style={styles.text}>Tess is a podcast platform</Text>
                </View>


                <View style={styles.slide3}>
                    <Text style={styles.text}>A place to easily listen to or create podcasts</Text>
                </View>

                


                <View style={styles.slide4}>

                <View style={styles.formContainer2}>
                    <TouchableOpacity onPress={this._handleButtonPressCreate} style={styles.buttonContainer}>
                        <Text style={styles.text}>
                            Get Started
                        </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.formContainer3}>
                    <TouchableOpacity onPress={this._fbAuth} style={styles.buttonContainer}>
                        <Text style={styles.text}>
                            Login with Facebook
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.smallText}>Already have an account?</Text>
                    <TouchableOpacity onPress={this._handleButtonPressLogin} style={styles.buttonContainer}>
                        <Text style={styles.text}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>



                </View>


            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#595bc8',
    },
    logoContainer: {
        alignItems: 'center',
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
        backgroundColor: 'transparent',
        paddingVertical: 5,
        paddingHorizontal: 5,
        marginBottom:5
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
    },
    formContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent',

    },
    formContainer2: {
        paddingTop: 100,
        paddingBottom: 10,
        backgroundColor: 'transparent',

    },
    formContainer3: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent',

    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 20,
    },

    wrapper: {
    },

    slide1: {
        paddingTop: 160,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#804cc8'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#856cff'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(1,170,170,1)'
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#69bbd9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    smallText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: 30,
        marginRight: 30,
    }


});