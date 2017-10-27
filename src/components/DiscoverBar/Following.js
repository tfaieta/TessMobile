import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



class Following extends Component{


    render() {
        return (
            <ScrollView style={styles.container}>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20, fontSize: 60,color:'#b5b6cd'}} name="md-square">
                        <Text style={styles.title} >    FOLLOWING</Text>
                    </Icon>
                </TouchableOpacity>








            </ScrollView>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 0,
    },

    title: {
        color: '#2A2A30',
        marginLeft: 20,
        flex:1,
        textAlign: 'left',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 20,
        backgroundColor: 'transparent'
    },

});

export default Following;