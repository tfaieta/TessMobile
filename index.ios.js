import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import firebase from 'firebase';
import StartUp from './src/components/StartUp';
import Router from './src/Router';


export default class tess extends Component {
    componentWillMount() {
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
    return (

        <Router />


    );
  }
}



AppRegistry.registerComponent('tess', () => tess);
