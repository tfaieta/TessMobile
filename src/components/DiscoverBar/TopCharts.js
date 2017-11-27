/**
 * Created by nickruspantini on 6/29/17.
 */
import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';



class TopCharts extends Component{


    render() {
        return (
            <ScrollView style={styles.container}>

                <TouchableOpacity>
                        <Text style={styles.title} >    coming soon...</Text>
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
        marginTop:10,
        marginLeft: 20,
        flex:1,
        textAlign: 'left',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 20,
        backgroundColor: 'transparent'
    },

});

export default TopCharts;