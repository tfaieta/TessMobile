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


                    <View style={{}}>
                        <Icon style={{
                            fontSize: width/22.83,
                            
                            color: '#506dcf',
                            marginHorizontal: width/41.1,
                        }} name="search"/>
                    </View>

                    <TouchableOpacity style={{ marginLeft: width/41.1, paddingRight: width/1.92,}} onPress={() => {
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

                    <View style={{flexDirection: 'row',}}>
                        <TouchableOpacity style={{paddingLeft: width/35, paddingRight: width/65 }} onPress={() => {
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
                                fontSize: width/18,
                                
                                color: '#506dcf',
                            }} name="microphone"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{paddingLeft: width/65, paddingRight: width/35 }} onPress={() => {
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
                                fontSize: width/18,
                                
                                color: '#506dcf',
                                marginHorizontal: width/41.1,
                            }} name="user-circle"/>
                        </TouchableOpacity>
                    </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: width/34,
        backgroundColor: '#fff'
    },
    button: {
        alignSelf: 'center',
    },
    text: {
        fontSize: width/27,
        color: '#3e4164',
        
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
    }
});

