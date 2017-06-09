/**
 * Created by nickruspantini on 6/6/17.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';

export  default class Login extends Component{
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require('tess/src/images/logo.png')}
                />

                    <Text style={styles.title}>Audio Reimagined</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm/>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(129,104,210)',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
    },
    logo: {
        marginTop:2,
        width: 200,
        height: 200
    },
    title: {
        color: '#ffffff',
        marginTop: -40,
        width: 160,
        textAlign: 'center',
        opacity: 0.85
    }


});