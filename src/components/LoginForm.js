import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity  } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';

export let profileNameL='';

class LoginForm extends Component {

    onEmailChange(text){
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }




  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });


  }



  renderButton() {
    if (this.props.loading) {
      return (
      <View style={{paddingTop: 30}} >
      <Spinner size="large" />
      </View>
      )
    }

    return (
       <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonContainer}>
          <Text style={styles.textStyle}>
          Sign in
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


           <TextInput style ={styles.input}
               placeholder = "username or email"
               placeholderTextColor="rgba(255,255,255,0.8)"
               returnKeyType='next'
               onSubmitEditing={() => this.passwordInput.focus()}
               keyboardType="email-address"
               autoCapitalize="none"
               autoCorrect={false}
                label="Email"
                value={this.props.email}
                onChangeText={this.onEmailChange.bind(this)}
          />



          <TextInput style ={styles.input}
            secureTextEntry
            placeholder="password"
            label="Password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            returnKeyType="go"
            value={this.props.password}
            onChangeText={this.onPasswordChange.bind(this)}
          />


        <Text style={styles.errorTextStyle}>
          {this.props.error}
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
    fontSize: 20,
    alignSelf: 'center',
    color: 'rgba(300,10,10,1)'
  },

  container: {
      flex: 1,
      backgroundColor: '#856cff',
      padding: 20,
      paddingTop: 80
      },

      input: {
          height: 40,
          backgroundColor: 'rgba(170,170,170,0.5)',
          marginBottom: 10,
          color: '#FFF',
          paddingHorizontal: 10
      },

      buttonContainer: {
          paddingVertical: 15,
          paddingHorizontal: 15,
          marginBottom:5,
          backgroundColor: '#595bc8'
      },

      buttonText: {
          textAlign: 'center',
          color: '#FFFFFF',
          fontWeight: '700'
       },

       formContainer4: {
       paddingTop: 10,
       paddingBottom: 10,
       backgroundColor: '#3B5998'
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
    const { email, password, error, loading } = auth;

    return { email, password, error, loading};
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);