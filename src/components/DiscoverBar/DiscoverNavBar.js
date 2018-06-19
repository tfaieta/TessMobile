/*
    This is the Discover Nav Bar, this component is used on screens with one title navigation with a white
    background.

    It is used in:
    TopCharts.js,
    Categories.js.
 */


import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';

var {height} = Dimensions.get('window');

export default class DiscoverNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: height/14.49,
        flex: 1,
        marginTop: height/93.09
     },
    button: {
        alignSelf: 'center',
    },
    text: {
        fontSize: height/30.79,
        color: '#3e4164',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    }
});

