import React, { Component } from 'react';
import { Text, View, StyleSheet,Image, TouchableOpacity,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { volume } from './Home';
import Sound from 'react-native-sound';
import {podFile, podTime} from './Record';
import Variables from './Variables';





class RecordSuccess extends Component{

    state = {
        title: Variables.state.podcastTitle,
        description: Variables.state.podcastDescription,
    };


    Cancel = () => {
        Actions.RecordFirstPage();
    };



    preview = () =>  {


        setTimeout(() => {
            var sound = new Sound(podFile, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });

            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');

                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    };



    render() {
        return (
            <View
                style={styles.container}>

                <Image
                    style={{width: 375, height:667, position: 'absolute', alignSelf: 'center', opacity: 1}}
                    source={require('tess/src/images/record-back.png')}
                >



                <View style={styles.buttonContainer}>


                            <Text  style={styles.title}> Upload Successful</Text>





                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.preview}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#fff' }} name="ios-play">
                            <Text  style={styles.contentTitle}>  {this.state.title}</Text>
                        </Icon>
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.buttonMore} onPress={this.Cancel}>
                        <Text  style={styles.contentTitle}>Record More</Text>
                    </TouchableOpacity>
                </View>


                </Image>

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
        color: '#fff',
        fontSize: 25,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
    },

    contentTitle: {
        color: '#fff',
        fontSize: 20,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',

    },

    input: {
        height: 40,
        backgroundColor: 'rgba(170,170,170,0.4)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
    },

    input2: {
        height: 120,
        backgroundColor: 'rgba(170,170,170,0.4)',
        marginBottom: 10,
        color:'#FFF',
        paddingHorizontal: 10,
    },

    buttonPreview: {
        backgroundColor: '#ee617c',
        alignItems: 'center',
        paddingBottom: 15,
        marginHorizontal: 15,
        borderWidth:0.1,
        borderRadius: 10,
        marginTop:20,
    },

    buttonMore: {
        backgroundColor: '#5757FF',
        alignItems: 'center',
        paddingTop: 15,
        marginHorizontal: 15,
        borderWidth:0.1,
        borderRadius: 10,
        marginTop:10,
    },

    buttonContainer: {
        marginTop: 100,
    }

});

export default RecordSuccess;