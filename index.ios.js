/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import app from './src/app';

export default class tess extends Component {
  render() {
    return (
        <app />


    );
  }
}



AppRegistry.registerComponent('tess', () => app);
