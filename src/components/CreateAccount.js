import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Spinner } from './common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, createUser, usernameChanged } from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient/index.android";
import {Input} from "./common/Input";


export let profileName='';

class CreateAccount extends Component {
    state = {
        confirmPassword: '',
        confirmPasswordError: '',
    };


    onUsernameChange(text){
        this.props.usernameChanged(text);
    }

    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }



    onButtonPress() {

        const { email, password, username } = this.props;

        this.props.createUser({ email, password, username });



    }



    renderButton() {
        if (this.props.loading) {
            return(
            <View style={{paddingTop: 30}} >
                <Spinner size="large" />
            </View>
            )
        }
        return(

            <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonContainer}>
                <Text style={styles.textStyle}>
                Sign Up
                </Text>
            </TouchableOpacity>
        );

    }

    render() {
        return (
            <LinearGradient

                colors={['#5555FF', '#9787FF' ]}
                style={styles.container}>

                <TouchableOpacity style={{backgroundColor: 'rgba(300,300,300,0.2)', borderRadius: 120, borderWidth: 0.1,  width: 120, height: 120, alignItems: 'center', alignSelf:'center', marginBottom: 20 }}>
                    <Icon style={{
                        textAlign: 'center',
                        marginTop: 45,
                        fontSize: 30,
                        flex:1,
                        color: '#FFF'
                    }} name="md-camera">
                    </Icon>
                </TouchableOpacity>



                <View style={styles.inputContainer}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignItems:'flex-start', flex:1,}}>
                            <Icon style={{
                                textAlign: 'center',
                                marginTop: 18,
                                marginLeft: 10,
                                fontSize: 22,
                                color: 'rgba(300,300,300,0.7)'
                            }} name="md-contact">
                            </Icon>
                        </View>
                        <View style={{alignItems: 'flex-end', flex:8}}>
                        <TextInput
                            style={styles.input}
                            placeholder={'USERNAME'}
                            placeholderTextColor='rgba(300,300,300,0.7)'

                            autoCapitalize={'none'}
                            autoCorrect={false}
                            returnKeyType='next'
                            value={this.props.username}
                            onChangeText={this.onUsernameChange.bind(this)}
                            onSubmitEditing={(event) => {
                                this.refs.FirstInput.focus();
                            }}
                        />
                        </View>
                    </View>
                </View>


                <View style={styles.inputContainer}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignItems:'flex-start', flex:1,}}>
                            <Icon style={{
                                textAlign: 'center',
                                marginTop: 18,
                                marginLeft: 10,
                                fontSize: 22,
                                color: 'rgba(300,300,300,0.7)'
                            }} name="md-mail">
                            </Icon>
                        </View>
                        <View style={{alignItems: 'flex-end', flex:8}}>
                            <TextInput
                                ref='FirstInput'
                                style={styles.input}
                                placeholder={'EMAIL'}
                                placeholderTextColor='rgba(300,300,300,0.7)'

                                autoCapitalize={'none'}
                                autoCorrect={false}
                                returnKeyType='next'
                                keyboardType="email-address"
                                value={this.props.email}
                                onChangeText={this.onEmailChange.bind(this)}
                                onSubmitEditing={(event) => {
                                    this.refs.SecondInput.focus();
                                }}
                            />
                        </View>
                    </View>
                </View>


                <View style={styles.inputContainer}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignItems:'flex-start', flex:1,}}>
                            <Icon style={{
                                textAlign: 'center',
                                marginTop: 18,
                                marginLeft: 10,
                                fontSize: 22,
                                color: 'rgba(300,300,300,0.7)'
                            }} name="md-key">
                            </Icon>
                        </View>
                        <View style={{alignItems: 'flex-end', flex:8}}>
                            <TextInput
                                ref='SecondInput'
                                style={styles.input}
                                placeholder={'PASSWORD'}
                                placeholderTextColor='rgba(300,300,300,0.7)'

                                autoCapitalize={'none'}
                                autoCorrect={false}
                                secureTextEntry
                                returnKeyType="next"
                                value={this.props.password}
                                onChangeText={this.onPasswordChange.bind(this)}
                                onSubmitEditing={(event) => {
                                    this.onButtonPress()
                                }}
                            />
                        </View>
                    </View>
                </View>




                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
                <Text style={styles.errorTextStyle}>
                    {this.state.confirmPasswordError}
                </Text>

                <View >
                    {this.renderButton()}
                </View>


            </LinearGradient>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 18,
        alignSelf: 'center',
        color: 'rgba(300,10,10,1)',
        marginTop: 15,
        backgroundColor: 'transparent'
    },

    container: {
        flex: 1,
        backgroundColor: 'rgba(1,170,170,1)',
        padding: 20,
        paddingTop: 80
    },

    input: {
        height: 40,
        backgroundColor: 'transparent',
        marginTop:10,
        marginBottom: 5,
        color: 'rgba(300,300,300,0.9)',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 14,
        paddingHorizontal: 10,
    },

    buttonContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginTop: -10,
        marginBottom:5,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        borderColor: '#FFF',
        backgroundColor: '#fff'
    },

    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    },

    formContainer: {
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
    },

    textStyle: {
        textAlign: 'center',
        color: '#5555FF',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 18,
    },

    inputContainer: {
        backgroundColor:"rgba(300,300,300,0.2)",
        marginVertical: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
        borderWidth:0.1,
        borderRadius:10
    },


};

const mapStateToProps = ({ auth }) => {
    const { email, password, username, error } = auth;

    return { email, password, username, error};
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, createUser, usernameChanged })(CreateAccount);