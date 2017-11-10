/**
 * Created by nickruspantini on 6/6/17.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image, StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';



export default class InitialScreen extends Component{

    componentWillMount(){
        firebase.auth().onAuthStateChanged(this.func);
    }

    func(){
        const {currentUser} = firebase.auth();

        if(currentUser){
            Actions.Main()
        }
        else{
            Actions.StartUp();
        }
        
    }


    render() {
        return (
            <View>
                <StatusBar hidden={true} />

                <Image
                    style={{ alignSelf: 'center', height: 700, width:400, opacity: 1}}
                    source={require('tess/src/images/initialScreenSplash.png')}
                />

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },


});