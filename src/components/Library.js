import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { volume } from './Home';
import PlayerBottom from './PlayerBottom';

class Library extends Component{


    GoToQueue = () => {
        Actions.Queue();
    };

    constructor(props) {
        super(props)
        this.state = { volume}
    }
    getVolume(volume){
        return volume;
    }

    render() {
        return (
            <View
                style={styles.container}>
                <ScrollView>

                    <TouchableOpacity onPress={this.GoToQueue}>
                        <Text style={styles.contentTitle}>Saved</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.GoToQueue}>
                        <Text style={styles.contentTitle}>My Queue</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.GoToQueue}>
                        <Text style={styles.contentTitle}>Followed Creators</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.GoToQueue}>
                        <Text style={styles.contentTitle}>Recently Played</Text>
                    </TouchableOpacity>




                </ScrollView>

                <PlayerBottom/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 80,
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

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,
        fontStyle: 'normal',
        fontFamily: 'Futura',

    },

});

export default Library;