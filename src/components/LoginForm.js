import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity  } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import LinearGradient from 'react-native-linear-gradient';
import { Actions } from 'react-native-router-flux';


class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(this.onLoginFail.bind(this));

  }

  onLoginFail() {
    this.setState({ error: 'Incorrect Username or Password', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
    Actions.Main();
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
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
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
          />



          <TextInput style ={styles.input}
            secureTextEntry
            placeholder="password"
            label="Password"
            placeholderTextColor="rgba(255,255,255,0.8)"
            returnKeyType="go"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />


        <Text style={styles.errorTextStyle}>
          {this.state.error}
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

export default LoginForm;