import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import PlayerBottom from './PlayerBottom';

var {height, width} = Dimensions.get('window');

class Recommend extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'dark',
        statusBarColor: '#fff',

    };

    state = {
        input: '',
        buttonTitle: "Recommend",
        buttonSuccess: '#3e4164',
        buttonIcon: '',
    };

    pushRecommend = (input) => {
        const user = firebase.auth().currentUser.uid;

        let recommendation = this.state.input.toString().replace(".", " ");
        recommendation = recommendation.toString().replace(".", " ");
        recommendation = recommendation.toString().replace(".", " ");
        firebase.database().ref(`recommendedPods/${recommendation}`).update({user});

        this.setState({
            buttonTitle: "Success",
            buttonSuccess: '#16A085',
        });

        setTimeout(() => {
            this.setState({
                buttonTitle: "Recommend",
                buttonSuccess: '#3e4164',
            });
        }, 2000)

    };

    Back= () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.backColor}>

                    <TouchableOpacity style={styles.backButtonContainer} onPress={this.Back}>
                        <View>
                            <Icon style={{
                                fontSize: width/22.83,
                                
                                color: '#506dcf',
                                marginHorizontal: width/41.1,
                                marginBottom: height/85,
                            }} name="ios-arrow-back"/>
                        </View>
                    </TouchableOpacity>
                </View>
                <FormLabel  labelStyle={styles.label}>Recommended Podcast</FormLabel>
                <View style={styles.textContainer}>
                <Text style={styles.text}>We usually take 24 hours to add a recommended podcast to our library.
                    We appreciate your patience with us
                    while we work hard to create a podcasting experience that makes you a happy user.
                </Text>
                </View>
                <FormInput onChangeText={input => this.setState({input: input})}
                           returnKeyType="go"
                           onSubmitEditing={() => this.pushRecommend()}
                           placeholder='Podcast Name or Feed'
                           />
                <FormValidationMessage>This field is required</FormValidationMessage>
                <Button
                    title={this.state.buttonTitle}
                    style={{paddingTop: height/50}}
                    onPress={this.pushRecommend}
                    rounded={true}
                    fontFamily='Montserrat-Semibold'
                    backgroundColor={this.state.buttonSuccess}
                />
                <PlayerBottom navigator={this.props.navigator}/>
            </View>
        );
    }
    }

const styles = StyleSheet.create({
    container:{
        flex: 1,
        
    },
    backColor:{
        backgroundColor:  '#fff',
        flexDirection: 'row',
        marginTop: height/33.35,
    },
    backButtonContainer:{
        paddingTop: height/23.821,
        paddingLeft: height/66.7,
    },
    bar: {
        flex: 1,
        height: height/14,
        width: width,
        backgroundColor: '#fff',
    },
    label: {
        textAlign: 'center',
        fontSize: height/30,
        color: '#3e4164',
        fontFamily: 'Montserrat-Semibold',
        paddingBottom: height/30
    },
    text: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: height/50,
        fontFamily: 'Montserrat-Semibold',
        color: '#3e4164',
        paddingBottom: height/40,
        marginHorizontal: height/33.35
    },


});

export default Recommend;
