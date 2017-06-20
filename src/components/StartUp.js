/**
 * Created by nickruspantini on 6/6/17.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, StatusBar, TextInput, TouchableOpacity, Alert, Button, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';
import CreateAccount from './CreateAccount';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';

export  default class Login extends Component{

    _handleButtonPressLogin = () => {
        Actions.LoginForm();
    };

    _handleButtonPressCreate = () => {
        Actions.CreateAccount();
    };


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



    render() {
        return (
            <LinearGradient
                behavior="padding"
                start={{x: 1, y: 0.25}} end={{x: 0.5, y: 1.2}}
                locations={[0,1]}
                colors={['#804cc8', '#595bc8']}
                style={styles.container}>

                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('tess/src/images/logo.png')}
                    />
                    <Text style={styles.title }>Simplified Audio</Text>

                </View>

                <StatusBar
                    barStyle="light-content"
                />

                <View style={styles.formContainer}>
                    <TouchableOpacity onPress={this._handleButtonPressLogin} style={styles.buttonContainer}>
                        <Text style={styles.textStyle}>
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer2}>
                    <TouchableOpacity onPress={this._handleButtonPressCreate} style={styles.buttonContainer}>
                        <Text style={styles.textStyle}>
                            Create New Account
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer3}>
                    <TouchableOpacity onPress={this._handleButtonPressFB} style={styles.buttonContainer}>
                        <Text style={styles.textStyle}>
                            Login with Facebook
                        </Text>
                    </TouchableOpacity>
                </View>


            </LinearGradient>
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
        flexGrow: 2,
    },
    logo: {
        marginTop:70,
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
        backgroundColor: '#856cff',

    },
    formContainer2: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'rgba(1,170,170,1)',

    },
    formContainer3: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#3B5998',

    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 20,
    }


});