/**
 * Created by nickruspantini on 6/13/17.
 */
import React, {Component} from 'react';
import { View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import { Header } from './components/common';
import LoginForm from './components/LoginForm';
import StartUp from './components/StartUp';



class App extends Component {
    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyCMCsGc-foyjeiknZt9Nw5Sh8NrC2azZUg',
                authDomain: 'tess-36c94.firebaseapp.com',
            databaseURL: 'https://tess-36c94.firebaseio.com',
            projectId: 'tess-36c94',
            storageBucket: 'tess-36c94.appspot.com',
            messagingSenderId: '1071246914359'
        });
    }

    render() {
        return(
            <View>

                <StartUp/>


            </View>

        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default App;