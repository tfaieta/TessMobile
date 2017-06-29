import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';


class Record extends Component{

    render() {
        return (
            <View
                style={styles.container}>
                <Text style={styles.title }>Create Audio</Text>
                <StatusBar
                    barStyle="light-content"
                />
                <TouchableOpacity  style={styles.container}>


                <Icon style={{textAlign:'center', marginRight:120,marginLeft: 120, marginTop: 100, fontSize: 120,color:'#ea5454' }} name="ios-radio-button-on">
                </Icon>
                </TouchableOpacity>
                <Text style={styles.title2}>Press to Record</Text>



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
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    title2: {
        color: '#804cc8',
        marginTop:60,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

});

export default Record;