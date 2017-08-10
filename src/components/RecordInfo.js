import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { volume } from './Home';
import Sound from 'react-native-sound';
import PlayerBottom from './PlayerBottom';
import {podFile, podTime} from './Record';



export let podcastTitle = '';
export let podcastDescription = '';

class RecordInfo extends Component{

    state = {
        title: podcastTitle,
        description: podcastDescription,
    };


    Cancel = () => {
        Actions.pop();
    };


    Upload = () => {
        podcastTitle = this.state.title;
        podcastDescription = this.state.description;
        Actions.RecordSuccess();
    };


    preview = () =>  {
        podcastTitle = this.state.title;
        podcastDescription = this.state.description;

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
    }



    render() {
        return (
            <View
                style={styles.container}>

                <TextInput
                    style ={styles.input}
                    placeholder = "Podcast Title"
                    placeholderTextColor='#FFF'
                    returnKeyType='next'
                    label="Title"
                    value={this.state.title}
                    onChangeText={title => this.setState({ title })}
                />



                <TextInput
                    style ={styles.input2}
                    placeholder = "Podcast Description"
                    placeholderTextColor='#FFF'
                    returnKeyType='done'
                    label="Description"
                    value={this.state.description}
                    onChangeText={description => this.setState({ description })}
                />


                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonPreview}  onPress={this.preview}>
                    <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#804cc8' }} name="ios-play">
                    <Text  style={styles.contentTitle}> Preview</Text>
                    </Icon>
                </TouchableOpacity>



                <TouchableOpacity style={styles.buttonUpload} onPress={this.Upload}>
                <Text  style={styles.contentTitle}>Upload</Text>
                </TouchableOpacity>



                <TouchableOpacity style={styles.buttonCancel} onPress={this.Cancel}>
                    <Text  style={styles.contentTitle}>Cancel</Text>
                </TouchableOpacity>
                </View>





                <PlayerBottom/>

            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#804cc8',
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
        color: '#FFF',
        fontSize: 25,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',

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
        backgroundColor: '#e8952f',
        alignItems: 'center',
        paddingBottom: 15,
    },

    buttonUpload: {
        backgroundColor: '#657ed4',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonCancel: {
        backgroundColor: '#69bbd9',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonContainer: {
        marginTop: 100,
    }

});

export default RecordInfo;