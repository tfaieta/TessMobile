import React, { Component } from 'react';
import { View, StyleSheet, ListView, Alert, ScrollView, Text} from 'react-native';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import Variables from "./Variables";
import ListItem from "./ListItem";



class Activity extends Component{


    constructor(props){
        super(props);

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            loading: true,
            favorite: true,
            length: 0
        };

    }



    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
    };



    render() {
        return (
            <View
                style={styles.containerMain}>


                <ScrollView>

                    <Text style={styles.title}>Activity</Text>

                </ScrollView>


                <PlayerBottom navigator={this.props.navigator}/>


            </View>


        );
    }
}

const styles = StyleSheet.create({
    containerMain:{
        flex: 1,
        backgroundColor: '#f5f4f9',
        marginTop: 65
    },

    title: {
        backgroundColor: 'transparent',
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        paddingVertical: 10,
        marginBottom: 1,
    },

});


export default Activity;