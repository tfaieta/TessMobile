import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import Variables from './Variables';

import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');

// used as a lightbox to create highlight

class Highlight extends Component{


    constructor(props) {
        super(props);
        const {highlightTime} = this.props;
        const {podcastID} = this.props;
        this.state = {
            highlightName: 'Highlight from ' + Variables.state.podcastTitle,
            description: '',
            podcastID: podcastID,
            startTime: highlightTime[0],
            endTime: highlightTime[1],
        }

    }

    done(){
        Navigation.dismissLightBox();
    }



    render() {
        return (
            <View>
                <View style={{borderRadius: width/18.75, backgroundColor: '#fff', marginHorizontal: width, borderWidth: 0.1,}}>
                <TouchableOpacity onPress={this.done}>
                    <Icon style={{
                        fontSize: width/13.39,
                        alignSelf: 'flex-end',
                        backgroundColor: 'transparent',
                        color: '#79797990',
                        marginHorizontal: width/37.5,
                    }} name="ios-close">
                    </Icon>
                </TouchableOpacity>
                <Text style = {styles.textTitle}>Save Highlight</Text>

                <View>
                    <Text style={styles.textHeader}>HIGHLIGHT NAME:</Text>
                    <TextInput
                        style={styles.input}
                        ref='input1'
                        placeholder={'Enter Name'}
                        placeholderTextColor='#3e4164'
                        autoCapitalize={'sentences'}
                        autoCorrect={true}
                        returnKeyType="next"
                        value={this.state.highlightName}
                        onChangeText={(text) => {this.setState({highlightName: text})}}
                        onSubmitEditing={() => {
                            console.warn("next")
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.textHeader}>DESCRIPTION:</Text>
                    <TextInput
                        style={styles.input}
                        ref='input2'
                        placeholder={'Enter Description'}
                        placeholderTextColor='#3e4164'
                        autoCapitalize={'sentences'}
                        autoCorrect={true}
                        returnKeyType="done"
                        value={this.state.description}
                        onChangeText={(text) => {this.setState({description: text})}}
                        onSubmitEditing={() => {
                            console.warn("make")
                        }}
                    />
                </View>



                <TouchableOpacity style={{marginTop: height/13.34, marginVertical: height/66.7, marginHorizontal: width/4.17, borderRadius: 7, backgroundColor: '#506dcf', padding: width/46.88, paddingHorizontal: height/15}} onPress={this.done}>
                    <Text style= {styles.textButton}>Make Edits</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginVertical: height/66.7, marginBottom: height/13.34, marginHorizontal: width/4.17, borderRadius: 7, backgroundColor: '#3e4164', padding: width/46.88, paddingHorizontal: width/15}} onPress={()=>{

                    const title = this.state.highlightName;
                    const description = this.state.description;
                    const startTime = this.state.startTime;
                    const endTime = this.state.endTime;
                    const podcastID = this.state.podcastID;

                    if(title != ''){

                        const {currentUser} = firebase.auth();
                        firebase.database().ref(`users/${currentUser.uid}/highlights/`).push({title, description, startTime, endTime, podcastID}).then((snap) => {

                            ref = snap.ref;
                            key = snap.key;

                            ref.update({key});
                            firebase.database().ref(`users/${currentUser.uid}/activity`).push({action: 'highlight', id: currentUser.uid + '~' + key, user: currentUser.uid, time: firebase.database.ServerValue.TIMESTAMP});
                        });

                        var ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/stats`);
                        ref.once("value", function(snapshot) {
                            if(snapshot.val()){
                                if(snapshot.val().highlights){
                                    ref.update({highlights: snapshot.val().highlights + 1})
                                }
                                else{
                                    ref.update({highlights: 1})
                                }
                            }
                            else{
                                ref.update({highlights: 1})
                            }
                        });

                        const user = currentUser.uid;
                        Analytics.logEvent('createHighlight', {
                            'user_id': user
                        });

                    }

                    console.warn("Created highlight: " + this.state.highlightName + ": "  + this.state.description + " " + this.state.startTime + " " + this.state.endTime);
                    Navigation.dismissLightBox();

                }}>
                    <Text style= {styles.textButton}>Save Highlight</Text>
                </TouchableOpacity>
                </View>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        padding: width/9.38,
        borderRadius: width/18.75,
        borderWidth: 0.1,
        borderColor: 'black',
        marginHorizontal: width/18.75
    },
    textTitle:{
        color: '#52525e',
        fontSize: width/15.63,
        marginBottom: height/66.7,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
    },
    textButton:{
        color: '#fff',
        fontSize: width/23.44,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
    },
    textHeader:{
        color: '#2A2A30',
        fontSize: width/26.79,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'left',
        marginTop: height/26.68,
        marginHorizontal: width/44.47,
    },

    input: {
        height: height/16.68,
        backgroundColor: 'transparent',
        color: '#3e4164',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/20.83,
        marginHorizontal: width/25,
    },

});

export default Highlight;