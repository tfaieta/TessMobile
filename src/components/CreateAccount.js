import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity  } from 'react-native';
import { Spinner } from './common';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, createUser } from '../actions';
import {Sae } from 'react-native-textinput-effects';
import Icon from 'react-native-vector-icons/Ionicons';


export let profileName='';

class CreateAccount extends Component {
    state = {
        confirmPassword: '',
        confirmPasswordError: ''
    };


    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onConfirmPasswordChange(text) {
        this.setState({ confirmPassword: text})
    }


    onButtonPress() {
        const { email, password } = this.props;

        this.props.createUser({ email, password });


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
            <View

                start={{x: 1, y: 0.25}} end={{x: 0.5, y: 1.2}}
                locations={[0,1]}
                colors={['#804cc8', '#595bc8']}
                style={styles.container}>





                <Sae
                    label={'Email Address'}
                    labelStyle={{ color: '#FFF' }}
                    iconClass={Icon}
                    iconName={'md-mail'}
                    iconColor={'white'}
                    inputStyle={{ color: '#FFF' }}
                    // TextInput props
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


                <Sae
                    ref='SecondInput'
                    label={'Password'}
                    labelStyle={{ color: '#FFF' }}
                    iconClass={Icon}
                    iconName={'md-lock'}
                    iconColor={'white'}
                    inputStyle={{ color: '#FFF' }}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry
                    returnKeyType="next"
                    value={this.props.password}
                    onChangeText={this.onPasswordChange.bind(this)}
                    onSubmitEditing={(event) => {
                        this.refs.ThirdInput.focus();
                    }}
                />


                <Sae
                    ref='ThirdInput'
                    label={'Confirm Password'}
                    labelStyle={{ color: '#FFF' }}
                    iconClass={Icon}
                    iconName={'md-lock'}
                    iconColor={'white'}
                    inputStyle={{ color: '#FFF' }}
                    // TextInput props
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    secureTextEntry
                    returnKeyType='go'
                    value={this.state.confirmPassword}
                    onChangeText={this.onConfirmPasswordChange.bind(this)}
                    onSubmitEditing={() => this.onButtonPress()}

                />





                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>
                <Text style={styles.errorTextStyle}>
                    {this.state.confirmPasswordError}
                </Text>

                <View >
                    {this.renderButton()}
                </View>


            </View>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        alignSelf: 'center',
        color: 'rgba(300,10,10,1)',
        marginTop: 15,
    },

    container: {
        flex: 1,
        backgroundColor: 'rgba(1,170,170,1)',
        padding: 20,
        paddingTop: 80
    },

    input: {
        height: 40,
        backgroundColor: 'rgba(170,170,170,0.7)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },


    buttonContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginBottom:5,
        marginTop: 10,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 100,
        borderColor: '#FFF',
        backgroundColor: '#856cff'
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
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
    }


};

const mapStateToProps = ({ auth }) => {
    const { email, password, error } = auth;

    return { email, password, error};
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, createUser })(CreateAccount);