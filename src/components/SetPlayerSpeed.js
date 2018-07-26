import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Variables from './Variables';
import Slider from 'react-native-slider';

import { Navigation } from 'react-native-navigation';




// used as a lightbox to set the playback speed

class SetPlayerSpeed extends Component{


    constructor(props) {
        super(props);
        this.state = {
            speed: Variables.state.podcastSpeed
        }

    }

    done(){
        Navigation.dismissLightBox();
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.textTitle}>Playback Speed: {this.state.speed.toFixed(2)}</Text>
                <Slider
                    minimumTrackTintColor='#506dcf'
                    maximumTrackTintColor='#E7E7F0'
                    thumbStyle={{width: 25, height: 50,  backgroundColor: '#fff', borderColor: '#506dcf', borderWidth: 2}}
                    animateTransitions = {true}
                    style={styles.sliderContainer}
                    step={0.1}
                    minimumValue={0.2}
                    maximumValue= {2}
                    value={ this.state.speed }
                    onValueChange={ (speed) => {
                        Variables.state.podcastSpeed = speed;
                        this.setState({speed: speed})
                    }}
                />
                <TouchableOpacity onPress={this.done}>
                <Text style= {styles.textDone}>Done</Text>
                </TouchableOpacity>
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 20,
        borderWidth: 0.1,
        borderColor: 'black'
    },
    textTitle:{
        color: '#2A2A30',
        fontSize: 20,
        marginVertical: 10,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    },
    textDone:{
        color: '#828393',
        fontSize: 14,
        marginTop: 30,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    }


});

export default SetPlayerSpeed;