import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Dimensions, Platform, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, createUser, usernameChanged } from '../actions';
import Icon from 'react-native-vector-icons/Ionicons';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient'
import DropdownAlert from 'react-native-dropdownalert';
import firebase from 'firebase';

var {height, width} = Dimensions.get('window');

let topMargin = 0;
if(Platform.OS === 'ios'){
    topMargin = height/10.26
}


export let profileName='';

class CreateAccount extends Component {

    static navigatorStyle = {
        statusBarHidden: false,
        navBarButtonColor: '#fff',
        navBarHidden: false,
        navBarTransparent: true,
        navBarTextColor: '#fff', // change the text color of the title (remembered across pushes)
        navBarTextFontSize: 22, // change the font size of the title
        navBarTextFontFamily: 'Montserrat-Bold', // Changes the title font
        drawUnderTabBar: false,
        navBarHideOnScroll: false,
        topBarElevationShadowEnabled: false,
        topBarShadowColor: 'transparent',
        drawUnderNavBar: true,
        navBarTranslucent: true,
        navBarNoBorder: true,
        navBarTitleTextCentered: true,
    };

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

        if(username != '') {
            firebase.database().ref(`usernames/`).child(username.toLowerCase()).once("value", function (snapshot) {
                if (snapshot.val()) {
                    console.warn(snapshot.val().username + " is taken");
                    this.dropdown.alertWithType("custom", "", "Username is taken.");
                    this.setState({modalVisible: false})
                }
                else {
                    this.props.createUser({email, password, username});
                }
            }.bind(this)).catch(() => {
                console.warn("error")
            });
        }
    }


    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };


    renderButton() {
        if (this.props.loading) {
            return (
                <View style={{paddingTop: height / 22.23}}>
                    <ActivityIndicator color='#fff' size="large"/>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={this.onButtonPress.bind(this)} style={styles.buttonContainer}>
                <Text style={styles.textStyle}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        );

    }

    render() {
        let bgGradient = {
            bg: ['#d15564', '#9a5e9a', '#506dcf']
        };
        let duration = 2500;

        return (
            <AnimatedLinearGradient
                style={styles.container}
                customColor={bgGradient.bg}
                speed={duration}>

                <ScrollView   scrollEnabled={false}>

                <View style={styles.spacing}>

                    <View style={styles.inputContainer}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{alignItems:'flex-start', flex: 1}}>
                                <Icon style={{
                                    textAlign: 'center',
                                    marginTop: height/37,
                                    marginLeft: width/33.5,
                                    fontSize: width/15.23,
                                    color: 'rgba(300,300,300,0.7)'
                                }} name="md-contact">
                                </Icon>
                            </View>
                            <View style={{alignItems: 'flex-end', flex: 8}}>
                            <TextInput
                                style={styles.input}
                                placeholder={'Username'}
                                placeholderTextColor='rgba(300,300,300,0.7)'
                                underlineColorAndroid = 'transparent'
                                maxLength={20}
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
                            <View style={{alignItems:'flex-start', flex: 1}}>
                                <Icon style={{
                                    textAlign: 'center',
                                    marginTop: height/37,
                                    marginLeft: width/33.5,
                                    fontSize: width/15.23,
                                    color: 'rgba(300,300,300,0.7)'
                                }} name="md-mail">
                                </Icon>
                            </View>
                            <View style={{alignItems: 'flex-end', flex: 8}}>
                                <TextInput
                                    ref='FirstInput'
                                    style={styles.input}
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
                            <View style={{alignItems:'flex-start', flex: 1}}>
                                <Icon style={{
                                    textAlign: 'center',
                                    marginTop: height/37,
                                    marginLeft: width/33.5,
                                    fontSize: width/15.23,
                                    color: 'rgba(300,300,300,0.7)'
                                }} name="md-key">
                                </Icon>
                            </View>
                            <View style={{alignItems: 'flex-end', flex: 8}}>
                                <TextInput
                                    ref='SecondInput'
                                    style={styles.input}
                                    placeholder={'Password'}
                                    placeholderTextColor='rgba(300,300,300,0.7)'
                                    underlineColorAndroid = 'transparent'
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
                </View>

                </ScrollView>

                <DropdownAlert titleStyle={{color:'#fff'}} messageStyle={{color: '#fff'}} containerStyle={{backgroundColor: '#ee5865'}} ref={ref => this.dropdown = ref} showCancel={true} />

            </AnimatedLinearGradient>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/21,
        alignSelf: 'center',
        color: 'rgba(300,10,10,1)',
        marginTop: height/133.4,
        backgroundColor: 'transparent'
    },

    container: {
        flex: 1,
        backgroundColor: 'rgba(1,170,170,1)',
        paddingBottom: height/33.35,
        paddingHorizontal: width/16.75
    },

    viewContainer: {
        flex: 1,
        marginTop: 60
    },

    input: {
        height: height/16.67,
        width: width/1.37,
        backgroundColor: 'transparent',
        marginTop: height/66.7,
        marginBottom: height/133.4,
        color: 'rgba(300,300,300,0.9)',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/24,
        paddingHorizontal: width/33.5,
    },

    buttonContainer: {
        flex: 1,
        paddingVertical: height/44.46,
        paddingHorizontal: width/22.23,
        borderWidth: 2,
        width: width/1.1,
        alignSelf: 'center',
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
        paddingTop: height/44.47,
        paddingBottom: height/44.47,
        borderBottomWidth: 1,
        padding: height/133.4,
        backgroundColor: '#fff',
    },

    textStyle: {
        textAlign: 'center',
        justifyContent: 'center',
        color: '#3e4164',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18.61,
    },

    inputContainer: {
        backgroundColor:"rgba(300,300,300,0.2)",
        marginVertical: height/133.4,
        paddingBottom: height/66.7,
        paddingHorizontal: width/33.5,
        width: width/1.1,
        alignSelf: 'center',
        borderWidth: 0.1,
        borderRadius: 10
    },
    header: {
        marginTop: height/26.68,
        marginLeft: -width/9.57,
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18.61,
        backgroundColor: 'transparent',

    },
    spacing: {
        marginTop: height/8.3375
    }
};

const mapStateToProps = ({ auth }) => {
    const { email, password, username, error, loading } = auth;

    return { email, password, username, error, loading};
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser, createUser, usernameChanged })(CreateAccount);