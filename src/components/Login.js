import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StatusBar, Image, TextInput, ScrollView, Dimensions, AlertIOS, Platform, ActivityIndicator, Linking} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import { Navigation } from 'react-native-navigation';

var {height, width} = Dimensions.get('window');

/*
    User Login Page
 */

class Login extends Component {

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
    };

    componentDidMount(){
        Linking.addEventListener('url', this.handleLink);

    }
    componentWillUnmount(){
        Linking.removeEventListener('url', this.handleLink);
    }

    handleLink = (event) => {
        const url = event.url;
        const {navigator} = this.props;
        Navigation.showModal({
            screen: 'PlayerPreview',
            passProps: {url, navigator}
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            showAlert: false,
            text: '',
            message: '',
        };
    };

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

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };

    forgotPassword = () => {
        firebase.auth().sendPasswordResetEmail(this.props.email.trim())
            .then(function() {
                // Password reset email sent.
                if (Platform.OS === 'ios') {
                    // Use AlertIOS - This will work on IOS
                    AlertIOS.alert(
                        'Success',
                        'Check Your Email',
                        { cancelable: false }

                    );
                } else {
                    // Use AwesomeAlert - This will work on Android
                    this.setState({
                        showAlert: true,
                        text: "Success",
                        message: "Check your inbox"
                    })
                }
            }.bind(this))
            .catch(function(error) {
                // Error occurred. Inspect error.code.
                if (Platform.OS === 'ios') {
                    AlertIOS.alert(
                        'Error',
                        'Enter Valid Email',
                        { cancelable: false }
                );
                } else {
                    this.setState({
                        showAlert: true,
                        text: "Error",
                        message: "Please Enter a Valid Email"
                    })
                }
            }.bind(this));
    };

    _handleButtonPressCreate = () => {
        this.props.navigator.push({
            screen: 'CreateAccount',
            animated: true,
            animationType: 'fade',
            title: 'Create Account',
        });
    };

    renderButton() {
        if (this.props.loading) {
            return (
                <View style={{paddingTop: height/22.23}} >
                    <ActivityIndicator color='#fff' size ="large" />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonContainer}>
                <Text style={styles.textStyle}>
                    Login
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        let bgGradient = {
            bg: ['#d15564', '#9a5e9a', '#506dcf']
        };
        let duration = 3000;

        return (
            <AnimatedLinearGradient
                style={styles.container}
                customColors={bgGradient.bg}
                speed={duration}
                points={{start: {x: 0, y: 0}, end: {x: 1, y: 1}}}
            >

                <ScrollView   scrollEnabled={false}>

                <StatusBar hidden={false} barStyle="light-content" />


                <Image
                    style={styles.logo}
                    source={require('tess/src/images/White_Logo.png')}
                />


                <View style={styles.inputContainer}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignItems:'flex-start', flex: 1}}>
                            <Icon style={{
                                textAlign: 'center',
                                marginTop: height/37,
                                marginLeft: width/33.5,
                                fontSize: width/15.23,
                                color: 'rgba(300,300,300,0.7)',
                            }} name="md-mail">
                            </Icon>
                        </View>
                        <View style={{alignItems: 'center', flex: 8}}>
                            <TextInput
                                style={styles.inputEmail}
                                placeholder={'Email'}
                                placeholderTextColor='rgba(300,300,300,0.7)'
                                underlineColorAndroid = 'transparent'

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
                                marginTop: height/37,
                                marginLeft: width/33.5,
                                fontSize: width/15.23,
                                color: 'rgba(300,300,300,0.7)'
                            }} name="md-key">
                            </Icon>
                        </View>
                        <View style={{alignItems:'center', flex: 6, marginLeft: width/67}}>
                            <TextInput
                                style={styles.inputPassword}
                                ref='SecondInput'
                                placeholder={'Password'}
                                placeholderTextColor='rgba(300,300,300,0.7)'
                                underlineColorAndroid = 'transparent'

                                autoCapitalize={'none'}
                                autoCorrect={false}
                                secureTextEntry
                                returnKeyType="go"
                                value={this.props.password}
                                onChangeText={this.onPasswordChange.bind(this)}
                                onSubmitEditing={() => this.onButtonPress()}

                            />
                        </View>
                        <TouchableOpacity style={{alignItems: 'flex-end', flex: 3, marginTop: height/333.5}} onPress={this.forgotPassword}>
                            <Text style={styles.forgotText}>Forgot?</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <Text style={styles.errorTextStyle}>
                    {this.props.error}
                </Text>

                <View >
                    {this.renderButton()}
                </View>

                <TouchableOpacity  onPress={this._handleButtonPressCreate}>
                    <Text style={styles.textBottomStyle}>Sign Up</Text>
                </TouchableOpacity>
                </ScrollView>

                <AwesomeAlert
                    show={this.state.showAlert}
                    title={this.state.text}
                    message={this.state.message}
                    closeOnTouchOutside={true}
                    showConfirmButton={true}
                    confirmText="Okay"
                    confirmButtonColor="#3e4164"
                    onConfirmPressed={() => {
                        this.hideAlert();
                    }}
                />

            </AnimatedLinearGradient>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18.61,
        alignSelf: 'center',
        color: 'rgba(300,10,10,1)',
        marginTop: height/133.4,
        marginBottom: height/133.4,
    },

    container: {
        flex: 1,
        alignItems: 'center',
    },

    inputEmail: {
        height: height/16.67,
        width: width/1.37,
        marginTop: height/66.7,
        marginBottom: height/133.4,
        color: 'rgba(300,300,300,0.9)',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/24,
        paddingHorizontal: width/33.5,
        marginLeft: width/33.5
    },

    inputPassword: {
        height: height/16.67,
        width: width/2.05,
        marginTop: height/66.7,
        marginBottom: height/133.4,
        color: 'rgba(300,300,300,0.9)',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/24,
        paddingHorizontal: width/33.5,
        marginLeft: width/33.5
    },

    buttonContainer: {
        flex: 1,
        paddingVertical: height/44.46,
        paddingHorizontal: width/22.33,
        width: width/1.1,
        alignSelf: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 10,
        borderColor: '#FFF',
        backgroundColor: '#fff'
    },

    buttonText: {
        textAlign: 'center',
        color: '#5555FF',
    },

    formContainer4: {
        paddingTop: height/66.7,
        paddingBottom: height/66.7,
        backgroundColor: '#5555FF'
    },

    textStyle: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#3e4164',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18.61,
    },

    inputText: {
        textAlign: 'center',
        color: "rgba(300,300,300,0.7)",
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/24,
        marginTop: height/33.35,
        marginRight: width/33.5,
    },

    forgotText: {
        textAlign: 'center',
        color: "rgba(300,300,300,0.7)",
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/30,
        marginTop: height/33.35,
        marginRight: width/33.5,
    },

    inputContainer: {
        backgroundColor:"rgba(300,300,300,0.2)",
        marginVertical: height/133.4,
        width: width/1.1,
        alignSelf: 'center',
        paddingBottom: height/66.7,
        paddingHorizontal: width/33.5,
        borderWidth: 0.1,
        borderRadius: 10
    },
    textBottomStyle: {
        marginTop: height/33.35,
        textAlign: 'center',
        color: 'rgba(300,300,300,0.8)',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/22.33,
        backgroundColor: 'transparent'
    },
    textBottomStyleLight: {
        marginTop: height/33.35,
        textAlign: 'center',
        color: 'rgba(300,300,300,0.8)',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/28,
    },
    logo: {
        width: height/4.87,
        height: height/4.33,
        flex: 1,
        alignSelf: 'center',
        marginBottom: height/16.68,
        marginTop: height/12
    }


};

const mapStateToProps = ({ auth }) => {
    const { email, password, error, loading } = auth;

    return { email, password, error, loading};
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(Login);