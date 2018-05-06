import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');


// custom static nav bar, used throughout app

export default class CustomNavbar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (

            <View style={styles.container}>


                    <View style={{flex: 1, alignItems: 'flex-start'}}>
                        <Icon style={{
                            fontSize: 18,
                            backgroundColor: 'transparent',
                            color: '#506dcf',
                            marginHorizontal: 10,
                        }} name="search"/>
                    </View>

                    <TouchableOpacity style={{flex:1,justifyContent: 'center', alignItems: 'center', marginLeft: 10}} onPress={() => {
                        const {currentUser} = firebase.auth();
                        const user = currentUser.uid;
                        Analytics.logEvent('goToSearch', {
                            'user_id': user
                        });
                        this.props.navigator.push({
                            screen: 'Search',
                            title: 'Search',
                            animated: true,
                            animationType: 'fade',
                        })
                    }}>
                        <Text style={styles.text}>Search</Text>
                    </TouchableOpacity>

                    <View style={{flex: 1, flexDirection: 'row', alignSelf:'flex-end'}}>
                        <TouchableOpacity onPress={() => {
                            const {currentUser} = firebase.auth();
                            const user = currentUser.uid;
                            Analytics.logEvent('goToCreate', {
                                'user_id': user
                            });
                            this.props.navigator.push({
                                screen: 'RecordFirst',
                                title: 'Create a Podcast'
                            })
                        }}>
                            <Icon style={{
                                flex: 1,
                                fontSize: 20,
                                backgroundColor: 'transparent',
                                color: '#506dcf',
                                marginHorizontal: 10,
                            }} name="microphone"/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            const {currentUser} = firebase.auth();
                            const user = currentUser.uid;
                            Analytics.logEvent('goToProfile', {
                                'user_id': user
                            });
                            this.props.navigator.push({
                                screen: 'Account',
                                title: 'Profile'
                            })

                        }}>
                            <Icon style={{
                                flex: 1,
                                fontSize: 20,
                                backgroundColor: 'transparent',
                                color: '#506dcf',
                                marginHorizontal: 10,
                            }} name="user-circle"/>
                        </TouchableOpacity>
                    </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        alignSelf: 'center',
    },
    text: {
        flex:1,
        fontSize: 14,
        paddingRight: width/1.98,
        color: '#3e4164',
        textAlign: 'left',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
    }
});

