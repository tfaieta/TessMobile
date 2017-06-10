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
                    <Text style={styles.title }>Audio Reimagined</Text>
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
        backgroundColor: '#595bc8',
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
    },
    logo: {
        marginTop:40,
        width: 250,
        height: 250
    },
    title: {
        color: '#ffffff',
        marginTop: -10,

        width: 200,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 16
    }


});