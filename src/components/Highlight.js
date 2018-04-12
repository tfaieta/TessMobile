import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import Variables from './Variables';

import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';




// used as a lightbox to create highlight

class Highlight extends Component{


    constructor(props) {
        super(props);
        this.state = {
            highlightName: '',
            description: ''

        }

    }

    done(){
        Navigation.dismissLightBox();
    }



    render() {
        return (
            <View>
                <View style={{borderRadius: 20, backgroundColor: '#fff', marginHorizontal: 20, borderWidth: 0.1,}}>
                <TouchableOpacity onPress={this.done}>
                    <Icon style={{
                        fontSize: 28,
                        alignSelf: 'flex-end',
                        backgroundColor: 'transparent',
                        color: '#79797990',
                        marginHorizontal: 10,
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



                <TouchableOpacity style={{marginTop: 50, marginVertical: 10, marginHorizontal: 90, borderRadius: 7, backgroundColor: '#506dcf', padding: 8, paddingHorizontal: 25}}>
                    <Text style= {styles.textButton}>Make Edits</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginVertical: 10, marginBottom: 50, marginHorizontal: 90, borderRadius: 7, backgroundColor: '#3e4164', padding: 8, paddingHorizontal: 25}}>
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
        padding: 40,
        borderRadius: 20,
        borderWidth: 0.1,
        borderColor: 'black',
        marginHorizontal: 20
    },
    textTitle:{
        color: '#52525e',
        fontSize: 24,
        marginBottom: 10,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
    },
    textButton:{
        color: '#fff',
        fontSize: 16,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
    },
    textHeader:{
        color: '#2A2A30',
        fontSize: 14,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'left',
        marginTop: 25,
        marginHorizontal: 15,
    },

    input: {
        height: 40,
        backgroundColor: 'transparent',
        color: '#3e4164',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        marginHorizontal: 15,
    },

});

export default Highlight;