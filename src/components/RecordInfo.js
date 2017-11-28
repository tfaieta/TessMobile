import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {podTime, totalTime} from './Record';
import Variables, {podcastPlayer} from './Variables';
import { connect } from 'react-redux';
import { podcastUpdate} from '../actions';
import {AudioUtils} from 'react-native-audio';
import firebase from 'firebase';
import {podcastCreate} from "../actions/PodcastActions";
import SimplePicker from 'react-native-simple-picker';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from "react-native-linear-gradient/index.android";
import Slider from 'react-native-slider';




let podFile = AudioUtils.DocumentDirectoryPath + '/test.aac';


const labels = ['News', 'Fitness', 'Gaming', 'Society & Culture', 'Sports', 'Entertainment', 'Comedy', 'Lifestyle', 'Science & Nature', 'Tech', 'Travel', 'Learn Something', 'Storytelling', 'Other'];
const options = ['News', 'Fitness', 'Gaming', 'Society & Culture', 'Sports', 'Entertainment', 'Comedy', 'Lifestyle', 'Science & Nature', 'Tech', 'Travel', 'Learn Something', 'Storytelling', 'Other'];



class RecordInfo extends Component{

    constructor(props) {
        super();
        this.tick = this.tick.bind(this);
        this.play=this.play.bind(this);
        const {currentUser} = firebase.auth();
        let userID = currentUser.uid;
        props = {
            podcastTitle: Variables.state.podcastTitle,
            podcastDescription: Variables.state.podcastDescription,
            podcastCategory: Variables.state.podcastCategory,
            podcastArtist: userID
        };
        Variables.setPodcastFile("test.aac");
    }

    state = {
        totalTime: totalTime,
        podcastCategory: 'Select a Category',
        isPlaying:false,
        interval: null,
        currentTime: 0,
        loading: false
    };

    componentWillMount(){
        const {currentUser} = firebase.auth();
        let userID = currentUser.uid;
        this.props.podcastUpdate({prop: 'podcastArtist', value: userID});
    }

    componentWillUnmount() {
        this.setState({
            interval: clearInterval(this.state.interval)
        });
    }


    tick() {
        this.setState({ currentTime: podcastPlayer.currentTime})

    }

    Cancel = () => {
        this.props.navigator.push({
            screen: 'RecordFirst',
            animated: true,
            animationType: 'fade',
            navigatorStyle: {
                tabBarHidden: false,
            },
        });
    };

    play =()=> {
        this.setState({
            isPlaying: true,
            interval: setInterval(this.tick, 250)
        });
        Variables.play();
    };


    pause=()=> {
        this.setState({
            isPlaying: false,
            interval: clearInterval(this.state.interval)
        });
        Variables.pause();
    };


    Upload = () => {

        Variables.pause();
        this.setState({
            isPlaying: false,
            interval: clearInterval(this.state.interval)
        });


        const { podcastTitle, podcastDescription, podcastCategory, podcastArtist, navigator} = this.props;
        const {currentUser} = firebase.auth();


        firebase.database().ref(`/users/${currentUser.uid}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentUsername = snap.val().username;
            }
            else {
                Variables.state.currentUsername = podcastArtist;
            }
        });

        Variables.state.podcastTitle = podcastTitle;
        Variables.state.podcastDescription = podcastDescription;
        Variables.state.podcastCategory = podcastCategory;
        Variables.state.podcastArtist = podcastArtist;


        if(podcastTitle == '' || podcastDescription == '' || podcastCategory == '' || podcastTitle.toString().includes(".") || podcastTitle.toString().includes("#") || podcastTitle.toString().includes("$") || podcastTitle.toString().includes("[") || podcastTitle.toString().includes("]")){
            if(podcastTitle == ''){
                this.dropdown.alertWithType("custom", "", "Please enter a Title.")
            }
            else if(podcastDescription == ''){
                this.dropdown.alertWithType("custom", "", "Please enter a Description.")
            }
            else if(podcastCategory == ''){
                this.dropdown.alertWithType("custom", "", "Please select a Category.")
            }
            else{
                this.dropdown.alertWithType("custom", "", "Title cannot contain: .  #  $  [  ]")
            }
        }

        else {
            this.setState({loading: true});
            this.props.podcastCreate({podcastTitle, podcastDescription, podcastCategory, podcastArtist, navigator});
        }
    };



    _renderTime= (podcastPlayer)=>{
        var num = ((podcastPlayer.duration / 1000) / 60).toString();
        num = num.slice(0,1);
        Number(num);
        var num2 = ((podcastPlayer.duration /1000) % 60).toString();
        num2 = num2.slice(0,2);
        Number(num2);
            if((podcastPlayer.duration / 1000) < 10){
            return (
                <Text style={styles.progressText}>{num2.slice(0,1)}s</Text>
            )
        }
        else if ((podcastPlayer.duration / 1000) < 60){
            return (
                <Text style={styles.progressText}>{num2}s</Text>
            )
        }
        else {
            return(
                <Text style={styles.progressText}>{num}m {num2}s</Text>
            )
        }
    };

    _renderSlider(currentTime){
        return(
            <Slider
                minimumTrackTintColor='#5757FF'
                maximumTrackTintColor='#fff'
                thumbTintColor='#fff'
                thumbTouchSize={{width: 10, height: 10}}
                animateTransitions = {true}
                style={styles.sliderContainer}
                step={0}
                minimumValue={0}
                maximumValue= { Math.abs( podcastPlayer.duration)}
                value={ Math.abs(currentTime) }
                onValueChange={currentTime => podcastPlayer.seek(currentTime)}
            />
        )
    };


    _renderPlayButton(isPlaying){
        if(isPlaying){
            return(
                <TouchableOpacity onPress={this.pause}>
                <Icon style={{
                    textAlign: 'right',
                    fontSize: 40,
                    marginLeft: 20,
                    color: '#fff',
                    backgroundColor: 'transparent',
                }} name="ios-pause">
                </Icon>
                </TouchableOpacity>
            )
        }
        else {
            return(
                <TouchableOpacity onPress={this.play}>
                <Icon style={{
                    textAlign: 'right',
                    fontSize: 40,
                    marginLeft: 20,
                    color: '#fff',
                    backgroundColor: 'transparent',
                }} name="ios-play">
                </Icon>
                </TouchableOpacity>
            )
        }
    }



    _renderUploadButton(loading){
        if(loading){
            return(
                <TouchableOpacity style={styles.buttonUpload} onPress={this.Upload}>
                    <ActivityIndicator style={{paddingVertical: 10}} color="#fff" size ="large" />
                </TouchableOpacity>
            )
        }
        else{
            return(
                <TouchableOpacity style={styles.buttonUpload} onPress={this.Upload}>
                    <Text  style={styles.contentTitle}>Upload</Text>
                </TouchableOpacity>
            )
        }
    }



    render() {

        return (
            <LinearGradient

                colors={['#3e279b', '#5d539c' ]}
                style={styles.container}>



                <View style={{flexDirection: 'row', paddingVertical:5,  }}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this.Cancel}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 30,color:'#fff'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>Upload Podcast</Text>
                    </View>

                    <View>
                    </View>

                </View>



                    <View style={{flexDirection: 'row', paddingBottom: 30, marginTop: 10  }}>
                        <View style={{marginTop: 10, alignItems: 'flex-start'}}>
                                {this._renderPlayButton(this.state.isPlaying)}
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginHorizontal: 15}}>
                            {this._renderSlider(Variables.state.currentTime)}
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end',}}>
                            <Text  style={styles.contentTime}>{this._renderTime(podcastPlayer)}</Text>
                        </View>
                    </View>





                    <Text style={styles.boxHeader}>PODCAST TITLE:</Text>
                <TextInput
                    ref='input1'
                    style ={styles.input}
                    placeholder = ""
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


                    <Text style={styles.boxHeader}>DESCRIPTION:</Text>
                <TextInput
                    ref='input2'
                    style ={styles.input2}
                    placeholder = ""
                    placeholderTextColor='#FFF'
                    returnKeyType='done'
                    label="Description"
                    blurOnSubmit={true}
                    value={this.props.podcastDescription}
                    onChangeText={text => this.props.podcastUpdate({prop: 'podcastDescription', value: text})}
                    multiline={true}
                    maxLength={200}
                />




                    <Text style={styles.boxHeader}>SELECT A CATEGORY:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={{
                            textAlign: 'left',
                            fontSize: 20,
                            marginLeft: 10,
                            marginTop:10,
                            color: '#BBBCCD',
                            backgroundColor: 'transparent',
                        }} name="md-folder">
                        </Icon>
                        <Text style={{ color: '#fff', marginTop: 10, fontSize: 16, marginLeft: 10, fontFamily: 'Hiragino Sans', }}>Categories</Text>
                        <Text
                            style={{ color: '#BBBCCD', marginTop: 10, fontSize: 16, marginLeft: 30, fontFamily: 'Hiragino Sans', }}
                            onPress={() => {
                                this.refs.picker1.show();
                            }}
                        >
                            {this.state.podcastCategory}
                        </Text>
                        <Icon style={{
                            flex:1,
                            textAlign: 'right',
                            fontSize: 18,
                            marginRight: 10,
                            marginTop:10,
                            color: '#fff',
                            backgroundColor: 'transparent',
                        }} name="ios-arrow-forward"
                              onPress={() => {
                                  this.refs.picker1.show();
                              }}>
                        </Icon>
                    </View>


                    <SimplePicker
                    ref={'picker1'}
                    options={options}
                    labels={labels}
                    itemStyle={{
                        fontSize: 22,
                        color: 'black',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontFamily: 'Hiragino Sans',
                    }}
                    onSubmit={itemValue => {
                        this.props.podcastUpdate({prop: 'podcastCategory', value: itemValue});
                        this.setState({podcastCategory: itemValue})
                    }}
                    />

                    <View style={{height:1, marginVertical: 15, backgroundColor: '#fff', marginHorizontal:15, borderRadius:10, borderWidth:0.1}}/>




                <View style={styles.buttonContainer}>

                    {this._renderUploadButton(this.state.loading)}

                <TouchableOpacity style={styles.buttonCancel} onPress={this.Cancel}>
                    <Text  style={styles.contentTitle}>Cancel</Text>
                </TouchableOpacity>
                </View>



                <DropdownAlert titleStyle={{color:'#fff'}} messageStyle={{color: '#fff'}} containerStyle={{backgroundColor: '#ee5865'}} ref={ref => this.dropdown = ref} showCancel={true} />
            </LinearGradient>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 10,
    },

    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: '#FFF',
        fontSize: 18,
        marginTop:10,
        paddingBottom: 10,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',

    },

    contentTime: {
        color: '#FFF',
        fontSize: 25,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        marginLeft: 10,
        marginTop: 10

    },

    input: {
        height: 40,
        backgroundColor: 'transparent',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
    },

    input2: {
        height: 120,
        backgroundColor: 'transparent',
        marginBottom: 0,
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
        backgroundColor: '#5757FF',
        alignItems: 'center',
        paddingTop: 5,
        marginHorizontal: 15,
        borderWidth:0.1,
        borderRadius: 10,
        marginBottom:5
    },

    buttonCancel: {
        backgroundColor: '#ee617c',
        alignItems: 'center',
        paddingTop: 5,
        marginHorizontal: 15,
        borderWidth:0.1,
        borderRadius: 10,
        marginBottom: 5
    },

    buttonContainer: {
        marginTop: 0,
    },

    timeContainer: {
        flex:1,
        alignItems: 'center',
    },

    progressText: {
        marginTop: 0,
        fontSize: 15,
        fontFamily: 'Hiragino Sans',
        color: "#FFF",
    },

    header: {
        marginTop:25,
        marginLeft: -35,
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

    boxHeader:{
        color: '#fff',
        textAlign: 'left',
        marginLeft: 15,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 12,
        backgroundColor: 'transparent',
    },
    sliderContainer: {
        width: 190,
        height: 50,
        alignSelf: 'center'
    },

});

const mapStateToProps = (state) => {
  const { podcastTitle, podcastDescription, podcastCategory, podcastArtist} = state.podcastForm;

  return { podcastTitle, podcastDescription, podcastCategory, podcastArtist}
};


export default connect(mapStateToProps, { podcastUpdate, podcastCreate })(RecordInfo);