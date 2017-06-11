/**
 * Created by nickruspantini on 6/6/17.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, KeyboardAvoidingView} from 'react-native';
import LoginForm from './LoginForm';
import LinearGradient from 'react-native-linear-gradient';

export  default class Login extends Component{
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
                    <Text style={styles.title }>Audio Reimagined</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm/>
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
        fontSize: 16,
        backgroundColor: 'transparent'
    }


});