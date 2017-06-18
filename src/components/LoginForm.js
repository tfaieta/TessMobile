import React, { Component } from 'react';
import { Text, TextInput, View  } from 'react-native';
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
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
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
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <LinearGradient

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

        <CardSection>
          {this.renderButton()}
        </CardSection>

     </LinearGradient>
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
      backgroundColor: '#595bc8',
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
          backgroundColor: '#4b2eaa',
          paddingVertical: 15
      },

      buttonText: {
          textAlign: 'center',
          color: '#FFFFFF',
          fontWeight: '700'
       }
};

export default LoginForm;