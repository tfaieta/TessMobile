/**
 * Created by nickruspantini on 6/29/17.
 */
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';


class Categories extends Component{


    render() {
        return (
            <View style={styles.container}>


                <TouchableOpacity >
                    <Text >Top Charts</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                    <Text >Top Charts</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                    <Text >Top Charts</Text>
                </TouchableOpacity>




            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'red',
        marginTop: 200,
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

});

export default Categories;