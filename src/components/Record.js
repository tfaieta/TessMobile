import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Switch } from 'react-native-switch';

class Record extends Component{

    render() {
        return (
            <View
                style={styles.container}>
                <Text style={styles.title }>Create Audio</Text>

                <View style={styles.container2}>
                <Switch
                    value={true}
                    disabled={false}
                    activeText={'On'}
                    inActiveText={'Off'}
                    backgroundActive={'#a561ff'}
                    backgroundInactive={'#cacaca'}
                    circleActiveColor={'#804cc8'}
                    circleInActiveColor={'#804cc8'}
                />
                </View>
                <Text style={styles.title3 }>Broadcast to Public</Text>



                <StatusBar
                    barStyle="light-content"
                />
                <TouchableOpacity  style={styles.container}>


                <Icon style={{textAlign:'center', marginRight:120,marginLeft: 120, marginTop: 50, fontSize: 120,color:'#ea5454' }} name="ios-radio-button-on">
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
    container2:{
        flex: 1,
        alignItems: 'center',
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
    title3: {
        color: '#804cc8',
        marginTop:-80,
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 20,
        backgroundColor: 'transparent'
    },

});

export default Record;