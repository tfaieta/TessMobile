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
    };

    pushRecommend = (input) => {
        const user = firebase.auth().currentUser.uid;
        firebase.database().ref(`recommendedPods/${this.state.input}`).update({user});
    };

    Back= () => {
        this.props.navigator.popToRoot({
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
                                backgroundColor: 'transparent',
                                color: '#506dcf',
                                marginHorizontal: width/41.1,
                                marginBottom: height/85,
                            }} name="ios-arrow-back"/>
                        </View>
                    </TouchableOpacity>
                </View>
                <FormLabel>Recommended Podcast</FormLabel>
                <FormInput onChangeText={input => this.setState({input: input})}
                           returnKeyType="go"
                           onSubmitEditing={() => this.pushRecommend()}
                           />
                <Button title='Submit' style={{paddingTop: height/60}} onPress={this.pushRecommend}/>
                <PlayerBottom navigator={this.props.navigator}/>
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
        color: '#3e4164',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/44.47,
        backgroundColor: 'transparent',
        marginHorizontal: height/33.35,

    },
    backColor:{
        backgroundColor:  '#fff',
        flexDirection: 'row',
        marginTop: height/33.35,
    },

    containerSearch:{
        marginLeft: height/66.7,
        marginTop: height/33.35,
        width: height/1.942,
        backgroundColor: '#fff',
        borderColor:'#fff',
        borderWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
    },
    backButtonContainer:{
        paddingTop: height/23.821,
        paddingLeft: height/66.7,
    },

    containerList: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: height/1334,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },


    containerMain:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: height/26.68,
        paddingBottom: height/33.35,
        marginLeft: height/33.35,

    },

    container2: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: height/66.7,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: height/1334,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    title2: {
        color: '#2A2A30',
        flex:1,
        marginTop: height/33.35,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/44.35,
        backgroundColor: 'transparent'
    },
    titleOther: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/44.47,
        backgroundColor: 'transparent',
        marginHorizontal: height/33.35,

    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/44.47,
        backgroundColor: 'transparent',
        marginLeft: height/33.35,
    },

    header: {
        marginTop: height/26.68,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/37.06,
        backgroundColor: 'transparent',

    },

    containerOther: {
        paddingHorizontal: 0,
        paddingVertical: height/66.7,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: height/1334,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 7,
        paddingLeft: 2,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        paddingRight: height/333.5,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height/222.33,
        marginHorizontal: -100,
    },
    textRequest: {
        color: '#3e4164',
        textAlign: 'center',
        flex:1,
        paddingBottom: height/45.58,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/45.35,
    },
    bar: {
        flex: 1,
        height: height/14,
        width: width,
        backgroundColor: '#fff',
    },


});

export default Recommend;