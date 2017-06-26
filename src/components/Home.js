import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, Slider} from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import LinearGradient from 'react-native-linear-gradient';

class Home extends Component{

    constructor(props) {
        super(props)
        this.state = { volume: 20}
    }
    getVal(val){

    }

    render() {
    return (
        <View
            style={styles.container}>
            <Text style={styles.title }>Featured Audio</Text>
            <StatusBar
                barStyle="light-content"
            />



            <View style={styles.barContainer}>
                <Slider
                    style={{ width: 300 }}
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                    value={this.state.volume}
                    onValueChange={val => this.setState({ volume: val })}
                    onSlidingComplete={ val => this.getVal(val)}
                />
                <Text style={styles.playingText}>Now Playing...</Text>
            </View>



        </View>



    );
}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
    },
    barContainer:{
        flex: 1,
        backgroundColor: '#575757',
        marginTop: 370,
        paddingTop: 10
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
    playingText:{
        color: 'white',
        fontSize: 15,
        marginLeft: 10
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },

});

export default Home;