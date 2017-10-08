import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import Sound from 'react-native-sound';
import {podTime, totalTime} from './Record';
import Variables from './Variables';
import { connect } from 'react-redux';
import { podcastUpdate} from '../actions';
import {AudioUtils} from 'react-native-audio';
import firebase from 'firebase';
import {podcastCreate} from "../actions/PodcastActions";



let podFile = AudioUtils.DocumentDirectoryPath + '/test.aac';


class RecordInfo extends Component{

    constructor(props) {
        const {currentUser} = firebase.auth();
        let userID = currentUser.uid;
        super(props);
        props = {
            podcastTitle: Variables.state.podcastTitle,
            podcastDescription: Variables.state.podcastDescription,
            podcastCategory: Variables.state.podcastCategory,
            podcastArtist: userID
        };
        this.props.podcastUpdate({prop: 'podcastArtist', value: userID});
    }

    state = {
        totalTime: totalTime,
        podcastCategory: ''
    };



    Cancel = () => {
        Actions.pop();
    };


    Upload = () => {

        Variables.setPodcastFile(podFile);
        Variables.state.podcastTitle = this.props.podcastTitle;
        Variables.state.podcastDescription = this.props.podcastDescription;
        Variables.state.podcastCategory = this.props.podcastCategory;



        const { podcastTitle, podcastDescription, podcastCategory, podcastArtist} = this.props;

        this.props.podcastCreate({podcastTitle, podcastDescription, podcastCategory, podcastArtist});
    };




    preview = () =>  {
        Variables.setPodcastFile(podFile);
        Variables.state.podcastTitle = this.props.podcastTitle;
        Variables.state.podcastDescription = this.props.podcastDescription;
        Variables.state.podcastCategory = this.props.podcastCategory;

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

    _renderTime(){
        var num = (this.state.totalTime / 60).toString();
        num = num.slice(0,1);
        Number(num);
        var num2 = (this.state.totalTime % 60).toString();
        num2 = num2.slice(0,2);
        Number(num2);
            if(this.state.totalTime < 10){
            return (
                <Text style={styles.progressText}>{num2.slice(0,1)}s</Text>
            )
        }
        else if (this.state.totalTime < 60){
            return (
                <Text style={styles.progressText}>{num2}s</Text>
            )
        }
        else {
            return(
                <Text style={styles.progressText}>{num}m {num2}s</Text>
            )
        }
    }



    render() {
        return (
            <View
                style={styles.container}>

                <TextInput
                    ref='input1'
                    style ={styles.input}
                    placeholder = "Podcast Title..."
                    placeholderTextColor='#FFF'
                    returnKeyType='next'
                    label="Title"
                    value={this.props.podcastTitle}
                    onChangeText={text => this.props.podcastUpdate({prop: 'podcastTitle', value: text})}
                    maxLength={50}
                    onSubmitEditing={(event) => {
                        this.refs.input2.focus();
                    }}
                />



                <TextInput
                    ref='input2'
                    style ={styles.input2}
                    placeholder = "Podcast Description..."
                    placeholderTextColor='#FFF'
                    returnKeyType='done'
                    label="Description"
                    value={this.props.podcastDescription}
                    onChangeText={text => this.props.podcastUpdate({prop: 'podcastDescription', value: text})}
                    multiline={true}
                    maxLength={500}
                />

                <Picker style = {{ marginTop: -20, flex:1}} selectedValue={this.props.podcastCategory} onValueChange={itemValue => this.props.podcastUpdate({prop: 'podcastCategory', value: itemValue})}>
                    <Picker.Item color= "white" label="Select a category..." value="none" />
                    <Picker.Item color= '#64fffc' label="Current Events" value="current" />
                    <Picker.Item color= '#6cff52' label="Fitness" value="fitness" />
                    <Picker.Item color= '#ffd038' label="Politics" value="politics" />
                    <Picker.Item color= '#ff5442' label="Gaming" value="gaming" />
                    <Picker.Item color= '#7fa5ff' label="Sports" value="sports" />
                    <Picker.Item color= '#fdff53' label="Entertainment" value="entertainment" />
                    <Picker.Item color= '#3aff97' label="Life" value="life" />
                    <Picker.Item color= '#ff5e95' label="Fashion" value="fashion" />
                    <Picker.Item color= '#bd59ff' label="Trends" value="trends" />
                    <Picker.Item color= '#ff861c' label="Cars" value="cars" />
                    <Picker.Item color= '#aeb1a7' label="Misc" value="misc" />
                </Picker>




                <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonPreview}  onPress={this.preview}>
                    <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#804cc8' }} name="ios-play">
                    <Text  style={styles.contentTitle}> Preview  {this._renderTime()}</Text>

                    </Icon>
                </TouchableOpacity>




                <TouchableOpacity style={styles.buttonUpload} onPress={this.Upload}>
                <Text  style={styles.contentTitle}>Upload</Text>
                </TouchableOpacity>



                <TouchableOpacity style={styles.buttonCancel} onPress={this.Cancel}>
                    <Text  style={styles.contentTitle}>Cancel</Text>
                </TouchableOpacity>
                </View>


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
        backgroundColor: 'rgba(170,170,170,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
    },

    input2: {
        height: 120,
        backgroundColor: 'rgba(170,170,170,0.2)',
        marginBottom: 10,
        color:'#FFF',
        paddingHorizontal: 10,
        fontSize: 18,
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
        marginTop: 50,
    },

    timeContainer: {
        flex:1,
        alignItems: 'center',
    },

    progressText: {
        marginTop: 0,
        fontSize: 20,
        fontFamily: 'Futura',
        color: "#FFF",
    },

});

const mapStateToProps = (state) => {
  const { podcastTitle, podcastDescription, podcastCategory, podcastArtist} = state.podcastForm;

  return { podcastTitle, podcastDescription, podcastCategory, podcastArtist}
};


export default connect(mapStateToProps, { podcastUpdate, podcastCreate })(RecordInfo);