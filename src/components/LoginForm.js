/**
 * Created by nickruspantini on 6/7/17.
 */
import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';

export default class LoginForm extends Component {
    render() {
        return (
        <View style={styles.container}>
        <StatusBar
            barStyle="light-content"
            />
            <TextInput
            placeholder = "username or email"
            placeholderTextColor="rgba(255,255,255,0.8)"
            returnKeyType='next'
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style ={styles.input}
            />
             <TextInput
             placeholder= "password"
             placeholderTextColor="rgba(255,255,255,0.8)"
             returnKeyType="go"
             secureTextEntry
             style ={styles.input}
             ref={(input) => this.passwordInput = input}
             />


             <TouchableOpacity style={styles.buttonContainer}>
                <Text style ={styles.buttonText}>LOGIN</Text>
             </TouchableOpacity>

        </View>
        );
    }
}

const styles = StyleSheet.create({
container: {
    padding: 20

    },
    input: {
        height: 40,
        backgroundColor: 'rgba(170,170,170,0.5)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#4b2eaa',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
     }
});