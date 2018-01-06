import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import Variables from "./Variables";

import { Navigation } from 'react-native-navigation';


class PlayerInfo extends Component {

    constructor(props){
        super(props);

    }



    render(){

        if(Variables.state.likers.length > 1){
            return(
                <View style={styles.container}>

                    <Text style={styles.title}>Info</Text>

                    <View style={{height: 1.5, marginHorizontal: 20, backgroundColor: '#2A2A3060',}} />
                    <ScrollView style={styles.descriptionBox}>
                        <Text style={styles.textDescription}>{Variables.state.podcastDescription}</Text>
                    </ScrollView>
                    <View style={{height: 1.5, marginHorizontal: 20, backgroundColor: '#2A2A3060',}} />
                    <Text style={styles.textLike}>{Variables.state.likers.length} likes</Text>

                    <TouchableOpacity onPress = {() => {
                        Navigation.dismissModal();
                    }}>
                        <Text style={styles.textClose}>Close</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style={styles.container}>

                    <Text style={styles.title}>Info</Text>

                    <View style={{height: 1.5, marginHorizontal: 20, backgroundColor: '#2A2A3060',}} />
                    <ScrollView style={styles.descriptionBox}>
                        <Text style={styles.textDescription}>{Variables.state.podcastDescription}</Text>
                    </ScrollView>
                    <View style={{height: 1.5, marginHorizontal: 20, backgroundColor: '#2A2A3060',}} />
                    <Text style={styles.textLike}>{Variables.state.likers.length} like</Text>

                    <TouchableOpacity onPress = {() => {
                        Navigation.dismissModal();
                    }}>
                        <Text style={styles.textClose}>Close</Text>
                    </TouchableOpacity>
                </View>
            )
        }




    }


}




const styles = StyleSheet.create({

    container:{
        backgroundColor: '#fff',
    },
    textClose:{
        color: '#ff646e',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginTop: 120
    },
    title:{
        color: '#2A2A30',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 18,
        backgroundColor: 'transparent',
        marginTop: 30,
        marginBottom: 10
    },

    textDescription:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    textLike:{
        color: '#5757FF',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginTop: 20,
        marginHorizontal: 20,
    },
    descriptionBox:{
        backgroundColor: '#fff',
        marginHorizontal: 10,
        paddingVertical: 30,
        height: 200,
    }

});


export default PlayerInfo;