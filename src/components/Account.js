import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import LinearGradient from 'react-native-linear-gradient';


class Account extends Component{

    render() {
        return (
            <View
                style={styles.container}>
                <Text style={styles.title }>My Account</Text>
                <StatusBar
                    barStyle="light-content"
                />



            </View>



        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    }

});

export default Account;