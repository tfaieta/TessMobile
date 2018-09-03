import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions, Alert, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {podTime, totalTime} from './Record';
import Variables from './Variables';
import { connect } from 'react-redux';
import { podcastUpdate} from '../actions';
import {AudioUtils} from 'react-native-audio';
import firebase from 'firebase';
import {podcastCreate} from "../actions/PodcastActions";
import SimplePicker from 'react-native-simple-picker';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from "react-native-linear-gradient/index.android";
import Slider from 'react-native-slider';





// 2nd Record Page (to set podcast info)


let podFile = AudioUtils.DocumentDirectoryPath + '/test.aac';


const labels = ['News', 'Fitness', 'Gaming', 'Society & Culture', 'Sports', 'Entertainment', 'Comedy', 'Music', 'Lifestyle', 'Religion & Spirituality', 'Science & Nature', 'Tech', 'Travel', 'Learn Something', 'Storytelling', 'Other'];
const options = ['News', 'Fitness', 'Gaming', 'Society & Culture', 'Sports', 'Entertainment', 'Comedy', 'Music', 'Lifestyle', 'Religion & Spirituality', 'Science & Nature', 'Tech', 'Travel', 'Learn Something', 'Storytelling', 'Other'];


var {height, width} = Dimensions.get('window');

class RecordInfo extends Component{

  static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'light',
        tabBarHidden: true,
        statusBarColor: '#3e279b',
    };


    constructor(props) {
        super();

        const {currentUser} = firebase.auth();
        let userID = currentUser.uid;
        props = {
            podcastTitle: Variables.state.podcastTitle,
            podcastDescription: Variables.state.podcastDescription,
            podcastCategory: Variables.state.podcastCategory,
            podcastArtist: userID
        };
    }

    state = {
        totalTime: totalTime,
        podcastCategory: 'Select a Category',
        isPlaying:false,
        interval: null,
        currentTime: 0,
        loading: false,
        uploadProgress: 10
    };


    componentWillMount(){
        Variables.state.podcastURL = podFile;
        Variables.state.podcastArtist = firebase.auth().currentUser.uid;
        Variables.state.repeat = true;
        Variables.state.seekTo = 0;
        Variables.state.paused = true;
        Variables.state.userProfileImage = '';
        Variables.state.podcastCategory = '';
        Variables.state.podcastDescription = '';

        const {currentUser} = firebase.auth();
        let userID = currentUser.uid;
        this.props.podcastUpdate({prop: 'podcastArtist', value: userID});
        Variables.state.podcastSpeed = 1.0;

        this.interval = setInterval(() => {
            if(this.state.loading){
                if(Variables.state.uploadProgress <= 100.00 && Variables.state.uploadProgress > 10){
                    this.setState({
                        uploadProgress: Variables.state.uploadProgress
                    })
                }
            }

            this.setState({
                currentTime: Variables.state.currentTime,
            })

        }, 200)
    }



    componentWillUnmount(){
        Variables.state.repeat = false;
        clearInterval(this.interval);
    }



    Cancel = () => {

        Alert.alert(
            'Are you sure you want to go back?',
            'All recording progress will be lost.',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => {

                    Variables.state.paused = true;
                    this.setState({
                        isPlaying: false
                    });
                    Variables.state.podcastURL = '';

                    this.props.podcastUpdate({prop: 'podcastDescription', value: ''});
                    this.props.podcastUpdate({prop: 'podcastTitle', value: ''});
                    this.props.podcastUpdate({prop: 'podcastCategory', value: ''});

                    this.props.navigator.popToRoot({
                        animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
                        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
                    });


                }
                },
            ],
            { cancelable: false }
        );

    };

    play =()=> {
        Variables.state.paused = false;
        this.setState({
            isPlaying: true
        });
    };


    pause=()=> {
        Variables.state.paused = true;
        this.setState({
            isPlaying: false
        });
    };


    Upload = () => {

        Variables.state.repeat = false;
        Variables.state.paused = true;
        this.setState({
            isPlaying: false
        });


        const { podcastTitle, podcastDescription, podcastCategory, podcastArtist, navigator} = this.props;


        if(podcastTitle == '' || podcastDescription == '' || podcastCategory == ''){
            if(podcastTitle == ''){
                this.dropdown.alertWithType("custom", "", "Please enter a Title.")
            }
            else if(podcastDescription == ''){
                this.dropdown.alertWithType("custom", "", "Please enter a Description.")
            }
            else if(podcastCategory == ''){
                this.dropdown.alertWithType("custom", "", "Please select a Category.")
            }
        }
        else {

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
            const podcastLength = Variables.state.duration;

            this.setState({loading: true});
            this.props.podcastCreate({podcastTitle, podcastDescription, podcastCategory, podcastArtist, podcastLength, navigator});
        }
    };



    _renderCurrentTime(currentTime) {

        var num = ((currentTime) % 60).toString();
        var num2 = ((currentTime) / 60).toString();
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));



        if (currentTime == -1){
            return (
                <Text style={styles.podcastTextNum}>0:00</Text>
            )
        }
        else if(Number(num2) < 10){
            var minutes = num2.slice(0,1);
            Number(minutes.slice(0,1));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:{seconds}</Text>
                );
            }
        }
        else if(Number(num2) < 100){
            var minutes = num2.slice(0,2);
            Number(minutes.slice(0,2));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:{seconds}</Text>
                );
            }
        }
        else{
            var minutes = num2.slice(0,3);
            Number(minutes.slice(0,3));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:{seconds}</Text>
                );
            }
        }


    }



    _renderEndTime() {
        var num = ((Variables.state.duration - Variables.state.currentTime) % 60).toString();
        var num2 = ((Variables.state.duration - Variables.state.currentTime) / 60).toString();
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));



        if(Number(num2) < 10){
            var minutes = num2.slice(0,1);
            Number(minutes.slice(0,1));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:{seconds}</Text>
                );
            }
        }
        else if(Number(num2) < 100){
            var minutes = num2.slice(0,2);
            Number(minutes.slice(0,2));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:{seconds}</Text>
                );
            }
        }
        else{
            var minutes = num2.slice(0,3);
            Number(minutes.slice(0,3));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:{seconds}</Text>
                );
            }
        }

    }

    _renderSlider(currentTime){
        return(
            <Slider
                minimumTrackTintColor='#5757FF'
                maximumTrackTintColor='#fff'
                thumbStyle={{width: width/18.75, height: width/18.75, borderRadius: width/37.5, backgroundColor: '#5757FF', borderColor: '#FFF', borderWidth: 2}}
                animateTransitions = {true}
                style={styles.sliderContainer}
                step={0}
                minimumValue={0}
                maximumValue= { Math.abs(Variables.state.duration)}
                value={ Math.abs(currentTime) }
                onValueChange={currentTime => Variables.state.seekTo = currentTime}
            />
        )
    };


    _renderPlayButton(isPlaying){
        if(isPlaying){
            return(
                <TouchableOpacity onPress={this.pause}>
                <Icon style={{
                    textAlign: 'right',
                    fontSize: width/10.71,
                    marginHorizontal: width/37.5,
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
                    fontSize: width/10.71,
                    marginHorizontal: width/37.5,
                    color: '#fff',
                    backgroundColor: 'transparent',
                }} name="ios-play">
                </Icon>
                </TouchableOpacity>
            )
        }
    }



    _renderUploadButton(loading, uploadProgress){
        if(loading){

            return(
                    <View style={{flex:1, flexDirection:'row'}}>
                        <View style={{width: (width / 100) * (uploadProgress), alignContent:'flex-start', backgroundColor: '#5757FF', marginVertical: height/55.58}} >
                            <ActivityIndicator style={{paddingVertical: height/66.7, alignSelf:'center'}} color="#fff" size ="small" />
                        </View>
                        <View style={{width: (width - (width / 100) * (uploadProgress) ), marginVertical: height/55.58, flex:1, alignContent:'flex-end', backgroundColor: '#929acb70'}}/>
                    </View>
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
                start={{x: 0.0, y: 0.0}} end={{x: 0, y: 0.75}}
                style={styles.container}>


                <ScrollView   scrollEnabled={false}>


                <View style={{flexDirection: 'row', paddingVertical: height/133.4}}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: height/33.35}}>
                        <TouchableOpacity onPress={this.Cancel}>
                            <Icon style={{
                                textAlign:'left', marginLeft: width/37.5, fontSize: width/12.5, color:'#fff'
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



                    <View style={{flexDirection: 'row', paddingBottom: height/22.23, marginTop: height/66.7}}>
                        <View style={{marginTop: height/66.7, alignItems: 'flex-start'}}>
                                {this._renderPlayButton(this.state.isPlaying)}
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end',}}>
                            <Text  style={styles.contentTime}>{this._renderCurrentTime(Variables.state.currentTime)}</Text>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center', marginHorizontal: width/25}}>
                            {this._renderSlider(Variables.state.currentTime)}
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end',}}>
                            <Text  style={styles.contentTime}>{this._renderEndTime()}</Text>
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
                    maxLength={75}
                    underlineColorAndroid = 'transparent'
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
                    underlineColorAndroid = 'transparent'
                    maxLength={500}
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
                        <Text style={{ color: '#fff', marginTop: height/66.7, fontSize: width/23.44, marginLeft: width/37.5, fontFamily: 'Montserrat-Regular', }}>Categories</Text>
                        <Text
                            style={{ color: '#BBBCCD', marginTop: height/66.7, fontSize: width/23.44, marginLeft: width/12.5, fontFamily: 'Montserrat-Regular', }}
                            onPress={() => {
                                this.refs.picker1.show();
                            }}
                        >
                            {this.state.podcastCategory}
                        </Text>
                        <Icon style={{
                            flex: 1,
                            textAlign: 'right',
                            fontSize: width/20.83,
                            marginRight: width/37.5,
                            marginTop: width/37.5,
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
                        fontSize: width/17.05,
                        color: 'black',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontFamily: 'Montserrat-Regular',
                    }}
                    onSubmit={itemValue => {
                        this.props.podcastUpdate({prop: 'podcastCategory', value: itemValue});
                        this.setState({podcastCategory: itemValue})
                    }}
                    />

                    <View style={{height: height/667, marginVertical: height/44.47, backgroundColor: '#fff', marginHorizontal: width/25, borderRadius: 10, borderWidth: 0.1}}/>




                <View style={styles.buttonContainer}>

                    {this._renderUploadButton(this.state.loading, this.state.uploadProgress)}

                <TouchableOpacity style={styles.buttonCancel} onPress={this.Cancel}>
                    <Text  style={styles.contentTitle}>Cancel</Text>
                </TouchableOpacity>

                </View>


                </ScrollView>

                <DropdownAlert titleStyle={{color:'#fff'}} messageStyle={{color: '#fff'}} containerStyle={{backgroundColor: '#ee5865'}} ref={ref => this.dropdown = ref} showCancel={true} />
            </LinearGradient>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: height/66.7,
    },

    title: {
        color: '#9a5e9a',
        marginTop: height/9.53,
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/15,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: '#FFF',
        fontSize: width/20.83,
        marginTop: height/66.7,
        paddingBottom: width/37.5,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',

    },

    contentTime: {
        color: '#FFF',
        fontSize: width/15,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        marginLeft: width/37.5,
        marginTop: height/66.7

    },

    input: {
        height: height/16.68,
        backgroundColor: 'transparent',
        marginBottom: height/66.7,
        color: '#FFF',
        paddingHorizontal: width/37.5,
    },

    input2: {
        height: height/5.56,
        backgroundColor: 'transparent',
        marginBottom: 0,
        color:'#FFF',
        paddingHorizontal: width/37.5,
        fontSize: width/20.83,
    },

    buttonPreview: {
        backgroundColor: '#e8952f',
        alignItems: 'center',
        paddingBottom: height/44.47,
    },

    buttonUpload: {
        backgroundColor: '#506dcf',
        alignItems: 'center',
        paddingTop: height/133.4,
        marginHorizontal: width/25,
        borderWidth:0.1,
        borderRadius: 10,
        marginBottom: height/133.4
    },

    buttonCancel: {
        backgroundColor: '#d15564',
        alignItems: 'center',
        paddingTop: height/133.4,
        marginHorizontal: 15,
        borderWidth:0.1,
        borderRadius: 10,
        marginBottom: height/133.4
    },

    buttonContainer: {
        marginTop: 0,
    },

    timeContainer: {
        flex: 1,
        alignItems: 'center',
    },

    progressText: {
        marginTop: 0,
        fontSize: width/25,
        fontFamily: 'Montserrat-Regular',
        color: "#FFF",
    },

    header: {
        marginTop: width/15,
        marginLeft: -(width/10.71),
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/20.83,
        backgroundColor: 'transparent',
    },
    boxHeader:{
        color: '#fff',
        textAlign: 'left',
        marginLeft: width/25,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/31.25,
        backgroundColor: 'transparent',
    },
    sliderContainer: {
        width: width/1.8,
        height: height/13.34,
        marginTop: height/166.75,
        alignSelf: 'center'
    },
    podcastTextNum:{
        color: '#fff',
        fontSize: width/31.25,
        marginTop: height/133.4,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginHorizontal: width/37.5,
        fontFamily: 'Montserrat-SemiBold',
    },

});

const mapStateToProps = (state) => {
  const { podcastTitle, podcastDescription, podcastCategory, podcastArtist} = state.podcastForm;

  return { podcastTitle, podcastDescription, podcastCategory, podcastArtist}
};


export default connect(mapStateToProps, { podcastUpdate, podcastCreate })(RecordInfo);