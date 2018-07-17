import React, { Component } from 'react';
import { Text, View, StyleSheet,StatusBar, ScrollView, Modal, TouchableOpacity, Alert, Dimensions, Image, ActivityIndicator, AsyncStorage, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from './Variables';
import Slider from 'react-native-slider';
import firebase from 'firebase';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import MusicControl from 'react-native-music-control';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
var Analytics = require('react-native-firebase-analytics');

import { Navigation } from 'react-native-navigation';
import PlayerInfo from "./PlayerInfo";

var {height, width} = Dimensions.get('window');


// Not the actual Player, cosmetic features & controls

class PlayerBottom extends Component {
    constructor() {
        super();
    }


    componentWillUnmount(){
        clearInterval(this.interval);
        this.setModalVisible(false);
    }


    state = {
        isPlaying: !Variables.state.paused,
        currentTime: Variables.state.currentTime,
        podcastTitle: Variables.state.podcastTitle,
        podcastDescription: Variables.state.podcastDescription,
        comment: '',
        modalVisible: false,
        liked: false,
        likes: 12,
        profileImage: '',
        buffering: Variables.state.buffering,
        speed: Variables.state.podcastSpeed,
        highlight: false,
        highlightTime: [0, 1],
        scrollEnabled: true
    };

    componentDidMount() {

        MusicControl.enableBackgroundMode(true);

        MusicControl.handleAudioInterruptions(true);

        MusicControl.on('play', ()=> {
            Variables.state.paused = false;
            this.setState({
                isPlaying: true
            });

            MusicControl.updatePlayback({
                state: MusicControl.STATE_PLAYING,
                elapsedTime: Variables.state.currentTime
            });
        });

        MusicControl.on('pause', ()=> {
            Variables.state.paused = true;
            this.setState({
                isPlaying: false
            });

            MusicControl.updatePlayback({
                state: MusicControl.STATE_PAUSED,
                elapsedTime: Variables.state.currentTime
            });
        });

        MusicControl.on('skipForward', ()=> {

            MusicControl.updatePlayback({
                elapsedTime: (Variables.state.currentTime + 15),
            });
            Variables.state.seekForward = true;
        });

        MusicControl.on('skipBackward', ()=> {

            MusicControl.updatePlayback({
                elapsedTime: (Variables.state.currentTime - 15),
            });
            Variables.state.seekBackward = true;

        });

    }



    componentWillMount(){

        this.interval = setInterval(() => {
            this.setState({

            });
        }, 500);

    }



    play = () =>  {
        Variables.state.paused = false;
        this.setState({
            isPlaying: true
        });

        MusicControl.updatePlayback({
            state: MusicControl.STATE_PLAYING,
            elapsedTime: Variables.state.currentTime
        });

    };


    pause = () =>  {
        Variables.state.paused = true;
        this.setState({
            isPlaying: false
        });

        MusicControl.updatePlayback({
            state: MusicControl.STATE_PAUSED,
            elapsedTime: Variables.state.currentTime
        });


    };


    scrubForward = () => {
        Variables.state.seekForward = true;
    };

    scrubBackward = () => {
        Variables.state.seekBackward = true;
    };


    _renderSlider(currentTime){
        if(Variables.state.highlight){

            return(
                <Slider
                    minimumTrackTintColor='#5757FF'
                    maximumTrackTintColor='#E7E7F0'
                    thumbStyle={{width: 25, height: 25, borderRadius: 12.5, backgroundColor: '#506dcf', borderColor: '#506dcf', borderWidth: 2}}
                    animateTransitions = {true}
                    style={styles.sliderContainer}
                    step={0}
                    minimumValue={Variables.state.highlightStart}
                    maximumValue= { Math.abs( Variables.state.highlightEnd)}
                    value={ currentTime }
                    onValueChange={currentTime => {
                        Variables.state.seekTo = currentTime;
                        this.setState({
                            scrollEnabled: false
                        })
                    }}
                    onSlidingComplete={()=>{
                        this.setState({
                            scrollEnabled: true
                        })
                    }}
                />
            )

        }
        else{
            if(this.state.highlight){
                return(
                    <View style={{marginTop: height/133.4, marginBottom: -(height/26.68)}}>
                        <View style={{flexDirection: 'row',}}>
                            {this._renderCurrentTimeHighlight(this.state.highlightTime[0])}
                            {this._renderCurrentTimeHighlightEnd(this.state.highlightTime[1])}
                        </View>
                        <MultiSlider
                            values={[this.state.highlightTime[0], this.state.highlightTime[1]]}
                            snapped
                            min={0}
                            max={Math.abs(Variables.state.duration)}
                            step={1}
                            sliderLength={width-40}
                            selectedStyle={{
                                backgroundColor: '#506dcf',
                            }}
                            unselectedStyle={{
                                backgroundColor: '#E7E7F0',
                            }}
                            containerStyle={{
                                width:  width-40,
                                alignSelf: 'center'
                            }}
                            trackStyle={{
                                height: 4,
                                backgroundColor: '#506dcf',
                                width:  width-40,
                            }}
                            touchDimensions={{
                                height: 15,
                                width: 15,
                                borderRadius: 10,
                                color: '#3e4164',
                            }}
                            onValuesChange={(values) => {
                                Variables.state.paused = false;
                                clearTimeout(this.timeout);
                                if(this.state.highlightTime[0] != values[0]){
                                    Variables.state.seekTo = values[0];
                                }
                                else{
                                    Variables.state.seekTo = values[1]-10;
                                    this.timeout = setTimeout(() => {Variables.state.paused = true}, 10000)
                                }
                                this.setState({
                                    highlightTime: [values[0],values[1]]
                                });

                            }}

                        />
                    </View>
                )
            }
            else{
                return(
                    <Slider
                        minimumTrackTintColor='#5757FF'
                        maximumTrackTintColor='#E7E7F0'
                        thumbStyle={{width: 25, height: 25, borderRadius: 12.5, backgroundColor: '#506dcf', borderColor: '#506dcf', borderWidth: 2}}
                        animateTransitions = {true}
                        style={styles.sliderContainer}
                        step={0}
                        minimumValue={0}
                        maximumValue= { Math.abs( Variables.state.duration)}
                        value={ currentTime }
                        onValueChange={currentTime => {
                            Variables.state.seekTo = currentTime;
                            this.setState({
                                scrollEnabled: false
                            })
                        }}
                        onSlidingComplete={()=>{
                            this.setState({
                                scrollEnabled: true
                            })
                        }}
                    />

                )

            }
        }

    }

    _renderPodcastImage(profileImage){
        if(Variables.state.podcastTitle != ''){

            if (profileImage == ''){
                return(
                    <TouchableOpacity onPress={this.ExpandPlayer}>
                        <View style={{backgroundColor:'rgba(130,131,147,0.4)', height: width/8.3, width: width/8.3, borderRadius:4, borderWidth:1, borderColor:'rgba(320,320,320,1)'}}>
                            <Icon style={{
                                textAlign: 'center',
                                fontSize: width/15.63,
                                color: 'white',
                                marginTop: height/66.7
                            }} name="md-person">
                            </Icon>
                        </View>
                    </TouchableOpacity>
                )
            }
            else{
                return(
                    <View style={{backgroundColor:'transparent', alignSelf: 'center', height: width/8.3, width: width/8.3  }}>
                        <Image
                            style={{width: width/8.3, height: width/8.3, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 4, borderWidth: 0.1, borderColor: 'transparent'}}
                            source={{uri: profileImage}}
                        />
                    </View>
                )
            }

        }
    }

    _renderPlayButton(isPlaying, buffering) {
        if(Variables.state.podcastTitle != ''){

            if(buffering){
                return(
                    <ActivityIndicator style={{alignSelf:'center'}} color="#00000090" size ="small" />
                )
            }
            else{
                if (isPlaying) {
                    return (
                        <TouchableOpacity onPress={this.pause}>
                            <Icon style={{
                                textAlign: 'right',
                                marginRight: 0,
                                marginLeft: 0,
                                paddingTop: 0,
                                paddingRight: width/75,
                                fontSize: width/12.5,
                                color: '#00000090',
                            }} name="md-pause">
                            </Icon>
                        </TouchableOpacity>
                    );
                }
                else {
                    return (
                        <TouchableOpacity onPress={this.play}>
                            <Icon style={{
                                textAlign: 'right',
                                marginRight: 0,
                                marginLeft: 0,
                                paddingTop: 0,
                                paddingRight: width/75,
                                fontSize: width/12.5,
                                color: '#00000090',
                            }} name="md-play">
                            </Icon>
                        </TouchableOpacity>
                    );
                }
            }

        }

    }



    _renderPodcastInfo(){
        let profileName = Variables.state.currentUsername;

        if(Variables.state.podcastTitle =='') {
            //return nothing
        }
        else{

            var fixedTitle = '';
            if(Variables.state.podcastTitle.toString().length > height/22 ){
                fixedTitle = (Variables.state.podcastTitle.slice(0,height/22)+"...")
            }
            else{
                fixedTitle = Variables.state.podcastTitle;
            }

            var fixedUsername = '';
            if(profileName.length > height/26){
                fixedUsername =  (profileName.slice(0,height/20)+"...");
            }
            else{
                fixedUsername = profileName;
            }



            return (
                <View style={{marginTop: height/166.75}}>
                    <Text style={styles.playingText}>{fixedTitle}</Text>
                    <Text style={styles.playingText2}>{fixedUsername}</Text>
                </View>
            )
        }
    }

    _renderPodcastSpeed(speed){
        return(
            <TouchableOpacity onPress={this.setSpeed}>
                <Text style = {styles.podcastTextSpeed}>{speed.toFixed(2)}x</Text>
            </TouchableOpacity>
        )
    }

    setSpeed(){
        Navigation.showLightBox({
            screen: "SetPlayerSpeed",
            style: {
                backgroundBlur: "light",
                backgroundColor: "#44434470",
                tapBackgroundToDismiss: true,
            },

        });
    }



    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    ExpandPlayer = () => {
        const {currentUser} = firebase.auth();
        Analytics.logEvent('openPlayer', {
            'user_id': currentUser.uid
        });
        this.setModalVisible(true)
    };

    Close = () => {
        this.setModalVisible(!this.state.modalVisible)
    };




    _renderPlayButton2(isPlaying, buffering) {

        if (isPlaying) {

            if(buffering){
                return(
                    <ActivityIndicator style={{paddingVertical: height/66.7, alignSelf:'center'}} color='#2A2A30' size ="large" />
                )
            }
            else{
                return (
                    <TouchableOpacity onPress={this.pause}>
                        <Icon style={{textAlign:'center', fontSize: height/13.34, color:'#2A2A30' }}  name="ios-pause">
                        </Icon>
                    </TouchableOpacity>
                );
            }
        }
        else {
            return (
                <TouchableOpacity onPress={this.play}>
                    <Icon style={{textAlign:'center', fontSize: height/13.34, color:'#2A2A30' }}  name="md-play">
                    </Icon>
                </TouchableOpacity>
            );
        }
    }


    _renderPodcastTitle(isPlaying) {
        let podTitle = Variables.state.podcastTitle;
        if(podTitle.toString().length > width/5 ){
            podTitle = (podTitle.slice(0,width/5)+"...")
        }

        if (isPlaying) {
            return (
                <Text style={styles.podcastText}>{podTitle}</Text>
            );
        }
        if (Variables.state.podcastTitle =='') {
            return (
                <Text style={styles.podcastText}> </Text>
            );
        }
        else{
            return (
                <Text style={styles.podcastText}>{podTitle}</Text>
            );
        }
    }



    _renderPodcastImageBig(profileImage){
        if(Variables.state.podcastTitle != ''){

            if (profileImage == ''){
                return(
                    <TouchableHighlight underlayColor="#fff" onPress={this.onProfilePress} style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginBottom: 10, height: 140, width: 140, borderRadius:4, borderWidth:8, borderColor:'rgba(320,320,320,0.8)',  shadowOffset:{  width: 0,  height: 10}, shadowOpacity: 0.5, shadowRadius: 10,  }}>
                        <Icon style={{
                            textAlign: 'center',
                            fontSize: height/7.41,
                            color: 'white',
                            marginTop: 20,
                        }} name="md-person">
                        </Icon>
                    </TouchableHighlight>
                )
            }
            else{
                return(
                    <TouchableHighlight underlayColor="#fff" onPress={this.onProfilePress} style={{backgroundColor:'transparent', alignSelf: 'center', marginBottom: 10, height: height/4.75, width: height/4.75,  shadowOffset:{  width: 0,  height: 10}, shadowOpacity: 0.5, shadowRadius: 10,  }}>
                        <Image
                            style={{width: height/4.75, height:height/4.75,  alignSelf: 'center', opacity: 1, borderRadius: 4, borderWidth: 0.1, borderColor: 'transparent'}}
                            source={{uri: profileImage}}
                        />
                    </TouchableHighlight>
                )
            }

        }
    }



    // moved to PlayerInfo
    _renderDescription(){
        if (Variables.state.podcastTitle == ''){
            return(
                <View style={{ marginTop: 10}}>
                    <ScrollView style={{height: 70, marginHorizontal: 20, backgroundColor: '#c1cde0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth:0.1,}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                        <Text style={{ color:'#fff', fontSize: 16, paddingBottom: 15, fontFamily: 'Montserrat-SemiBold', textAlign: 'center'  }}>Select a Podcast to start listening....</Text>
                    </ScrollView>
                </View>
            )
        }
        else{
            return(
                <View style={{ marginTop: 10}}>
                    <ScrollView style={{height: 70, marginHorizontal: 20, backgroundColor:'#c1cde0', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth:0.1}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                        <Text style={{ color:'#fff', fontSize: 16, paddingBottom: 15, fontFamily: 'Montserrat-SemiBold' }}>{Variables.state.podcastDescription}</Text>
                    </ScrollView>
                </View>
            )
        }
    }


    _renderCategory(){

        if(Variables.state.podcastCategory.length>0){
            return(
                <TouchableOpacity onPress={this.onCategoryPress}>
                    <Text style={styles.podcastTextCat}>{Variables.state.podcastCategory}</Text>
                </TouchableOpacity>
            )
        }



    }


    _renderPodcastArtist(isPlaying) {
        let profileName = Variables.state.currentUsername;
        if(profileName.toString().length > width/10 ){
            profileName = (profileName.slice(0,width/10)+"...")
        }

        if(Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextArtist}> </Text>
            );
        }
        else{
            return (
                <Text onPress = {this.onProfilePress} style={styles.podcastTextArtist}>{profileName}</Text>
            );
        }

    }


    _renderFav(faved){
        if(Variables.state.podcastID){

            if(faved){
                return(
                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', fontSize: 28,color: '#506dcf' }} name="md-add" onPress={()=>{
                            const {currentUser} = firebase.auth();
                            const podcastTitle = Variables.state.podcastTitle;
                            const podcastDescription = Variables.state.podcastDescription;
                            const podcastCategory = Variables.state.podcastCategory;
                            const podcastArtist = Variables.state.podcastArtist;
                            const id = Variables.state.podcastID;

                            if(podcastTitle != ''){
                                if(podcastArtist != currentUser.uid){
                                    if(id){

                                        Alert.alert(
                                            'Remove from favorites?',
                                            '',
                                            [
                                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                {
                                                    text: 'Yes', onPress: () => {
                                                    firebase.database().ref(`users/${currentUser.uid}/favorites/${id}`).remove();
                                                    Variables.state.favorited = false;
                                                }
                                                },
                                            ],
                                            {cancelable: false}
                                        )

                                    }
                                    else{

                                        Alert.alert(
                                            'Remove from favorites?',
                                            '',
                                            [
                                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                {
                                                    text: 'Yes', onPress: () => {
                                                    firebase.database().ref(`users/${currentUser.uid}/favorites/${podcastTitle}`).remove();
                                                    Variables.state.favorited = false;
                                                }
                                                },
                                            ],
                                            {cancelable: false}
                                        )

                                    }

                                }
                                else{
                                    Alert.alert(
                                        'Cannot favorite your own podcast',
                                        '',
                                        [
                                            {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},

                                        ],
                                        {cancelable: false}
                                    )
                                }
                            }

                        }}>
                        </Icon>
                    </TouchableOpacity>
                )
            }
            else{
                return(
                    <TouchableOpacity>
                        <Icon style={{textAlign:'center', fontSize: width/13.39, color:'#BBBCCD' }} name="md-add" onPress={()=>{
                            const {currentUser} = firebase.auth();
                            const podcastTitle = Variables.state.podcastTitle;
                            const podcastDescription = Variables.state.podcastDescription;
                            const podcastCategory = Variables.state.podcastCategory;
                            const podcastArtist = Variables.state.podcastArtist;
                            const id = Variables.state.podcastID;

                            if(podcastTitle != ''){
                                if(podcastArtist != currentUser.uid){
                                    if(id){

                                        Alert.alert(
                                            'Add to favorites?',
                                            '',
                                            [
                                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                                {
                                                    text: 'Yes', onPress: () => {
                                                    firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(id).update({id});
                                                    Variables.state.favorited = true;
                                                }
                                                },
                                            ],
                                            {cancelable: false}
                                        )

                                    }


                                }
                                else{
                                    Alert.alert(
                                        'Cannot favorite your own podcast',
                                        '',
                                        [
                                            {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},

                                        ],
                                        {cancelable: false}
                                    )
                                }
                            }

                        }}>
                        </Icon>
                    </TouchableOpacity>
                )
            }

        }

    }


    _renderLikes(likers, liked){

        if(Variables.state.podcastTitle == ''){
            return;
        }
        if(Variables.state.podcastID != ''){

            if (liked) {
                return (
                    <TouchableOpacity onPress = {this.pressLike}>
                        <Icon style={{textAlign: 'center', fontSize: width/12, color: '#506dcf', marginRight: width/12.5}} name="md-happy">
                        </Icon>

                    </TouchableOpacity>
                )
            }
            else{
                return(
                    <TouchableOpacity onPress = {this.pressLike}>
                        <Icon style={{textAlign: 'center', fontSize: width/12, color: '#BBBCCD', marginRight: width/12.5}} name="md-happy">
                        </Icon>
                    </TouchableOpacity>
                )
            }

        }

    }




    _renderEndTime() {


        if(Variables.state.highlight){
            var num = ((Variables.state.duration - Variables.state.currentTime - (Variables.state.duration-Variables.state.highlightEnd)) % 60).toString();
            var num2 = ((Variables.state.duration - Variables.state.currentTime - (Variables.state.duration-Variables.state.highlightEnd)) / 60).toString();

        }
        else{
            var num = ((Variables.state.duration - Variables.state.currentTime) % 60).toString();
            var num2 = ((Variables.state.duration - Variables.state.currentTime) / 60).toString();

        }
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));


        if (Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextNum}></Text>
            );
        }
        else if(Number(num2) < 10){
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

    _renderCurrentTime(currentTime) {

        var num = ((currentTime) % 60).toString();
        var num2 = ((currentTime) / 60).toString();
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));


        if (Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextNum}></Text>
            );
        }
        else if (currentTime == -1){
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


    _renderCurrentTimeHighlight(currentTime) {

        var num = ((currentTime) % 60).toString();
        var num2 = ((currentTime) / 60).toString();
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));


        if (Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextNum}></Text>
            );
        }
        else if (currentTime == -1){
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
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft:  (((this.state.highlightTime[1] + this.state.highlightTime[0] / 2) * (width / Math.abs(Variables.state.duration))) / 2 - (width/20)) - ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft:  (((this.state.highlightTime[1] + this.state.highlightTime[0] / 2) * (width / Math.abs(Variables.state.duration))) / 2 - (width/20)) - ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:{seconds}</Text>
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
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft:  (((this.state.highlightTime[1] + this.state.highlightTime[0] / 2) * (width / Math.abs(Variables.state.duration))) / 2 - (width/20)) - ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft:  (((this.state.highlightTime[1] + this.state.highlightTime[0] / 2) * (width / Math.abs(Variables.state.duration))) / 2 - (width/20)) - ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:{seconds}</Text>
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
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft:  (((this.state.highlightTime[1] + this.state.highlightTime[0] / 2) * (width / Math.abs(Variables.state.duration))) / 2 - (width/20)) - ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft:  (((this.state.highlightTime[1] + this.state.highlightTime[0] / 2) * (width / Math.abs(Variables.state.duration))) / 2 - (width/20)) - ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:{seconds}</Text>
                );
            }
        }



    }

    _renderCurrentTimeHighlightEnd(currentTime) {

        var num = ((currentTime) % 60).toString();
        var num2 = ((currentTime) / 60).toString();
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));


        if (Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextNum}></Text>
            );
        }
        else if (currentTime == -1){
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
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft: ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft:  ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:{seconds}</Text>
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
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft: ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft:  ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:{seconds}</Text>
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
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft: ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={{
                        color: '#3e4164',
                        fontSize: width/23.44,
                        marginBottom: height/33.35,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        marginLeft:  ((this.state.highlightTime[1] - this.state.highlightTime[0]) / Math.abs(Variables.state.duration)) * (width/5),
                        fontFamily: 'Montserrat-Regular',
                    }}
                    >{minutes}:{seconds}</Text>
                );
            }
        }



    }


    renderHighlight = () => {

        if(this.state.highlight){
            return(
                <TouchableOpacity style = {{marginTop: height/28, marginBottom: height/28, marginHorizontal: width/4.17, borderRadius: 7, backgroundColor: '#3e4164', padding: width/75}} onPress={() => {
                    this.setState({highlight: false});
                    const highlightTime = this.state.highlightTime;
                    const podcastID = Variables.state.podcastID;
                    this.props.navigator.showLightBox({
                        screen: "Highlight", // unique ID registered with Navigation.registerScreen
                        passProps: {highlightTime, podcastID}, // simple serializable object that will pass as props to the lightbox (optional)
                        style: {
                            backgroundBlur: "light", // 'dark' / 'light' / 'xlight' / 'none' - the type of blur on the background
                            backgroundColor: '#54546080' // tint color for the background, you can specify alpha here (optional)
                        },
                        adjustSoftInput: "resize", // android only, adjust soft input, modes: 'nothing', 'pan', 'resize', 'unspecified' (optional, default 'unspecified')
                    });
                }}>
                    <Text style = {styles.highlightText}>Save Highlight</Text>
                </TouchableOpacity>

            )
        }
        else{
            return(
                <TouchableOpacity style = {{marginTop: height/28, marginBottom: height/28, marginHorizontal: width/4.17, borderRadius: 7, backgroundColor: '#506dcf', padding: width/75}} onPress={() => {
                    this.setState({highlight: true, highlightTime: [Variables.state.currentTime, Variables.state.currentTime + 500]});

                    const {currentUser} = firebase.auth();
                    const user = currentUser.uid;
                    Analytics.logEvent('highlight', {
                        'episodeID': Variables.state.podcastID,
                        'epispdeTitle': Variables.state.podcastTitle,
                        'episodeArtist': Variables.state.podcastArtist,
                        'user_id': user
                    });

                }}>
                    <Text style = {styles.highlightText}>Begin Highlight</Text>
                </TouchableOpacity>

            )
        }

    };


    onProfilePress = () => {
        const {navigator} = this.props;
        Variables.state.browsingArtist = Variables.state.podcastArtist;
        const rss = Variables.state.rss;
        setTimeout(() => {
        navigator.push({
            screen: 'UserProfile',
            title: Variables.state.currentUsername,
            animated: true,
            animationType: 'fade',
            passProps: {navigator, rss},
        });
        }, 450);
        this.Close();

    };


    pressLike = () => {
        const {currentUser} = firebase.auth();
        const user = currentUser.uid;

        if(Variables.state.podcastID != ''){

            if(Variables.state.liked){

                firebase.database().ref(`podcasts/${Variables.state.podcastID}/likes/${user}`).remove();

                this.setState({ liked: false, likes: Variables.state.likers.length});

                var refLike = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/stats`);
                refLike.once("value", function(snapshot) {
                    if(snapshot.val()){
                        if(snapshot.val().likes){
                            refLike.update({likes: snapshot.val().likes - 1})
                        }
                        else{
                            refLike.update({likes: 0})
                        }
                    }
                    else{
                        refLike.update({likes: 0})
                    }
                });
            }
            else if (!Variables.state.liked){

                Analytics.logEvent('like', {
                    'episodeID': Variables.state.podcastID,
                    'epispdeTitle': Variables.state.podcastTitle,
                    'episodeArtist': Variables.state.podcastArtist,
                    'user_id': user
                });

                firebase.database().ref(`podcasts/${Variables.state.podcastID}/likes`).child(user).update({user});
                firebase.database().ref(`users/${currentUser.uid}/activity`).push({action: 'like', id: Variables.state.podcastID, user: currentUser.uid, time: firebase.database.ServerValue.TIMESTAMP});


                this.setState({ liked: true, likes: Variables.state.likers.length});

                var ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/stats`);
                ref.once("value", function(snapshot) {
                    if(snapshot.val()){
                        if(snapshot.val().likes){
                            ref.update({likes: snapshot.val().likes + 1})
                        }
                        else{
                            ref.update({likes: 1})
                        }
                    }
                    else{
                        ref.update({likes: 1})
                    }
                });
            }

        }
    };


    onCategoryPress = () => {
        const {navigator} = this.props;
        let category = Variables.state.podcastCategory;

        setTimeout(() => {
            this.props.navigator.push({
                screen: 'Category',
                title: category,
                animated: true,
                animationType: 'fade',
                passProps: {category, navigator},
            });
        }, 450);
        this.Close();
    };


    goToMyQueue(){

        Navigation.showModal({
            screen: 'MyQueue',
        });

    }


    openPlayerOptions(){

        Navigation.showLightBox({
            screen: "PlayerOptions",
            style: {
                backgroundBlur: "dark",
                backgroundColor: '#3e416430',
                tapBackgroundToDismiss: true,
            },
        });

    }


    onSwipeUp(gestureState) {
        this.setModalVisible(true);
        const {currentUser} = firebase.auth();
        Analytics.logEvent('openPlayer', {
            'user_id': currentUser.uid
        });
    }

    onSwipeDown(gestureState) {
        this.setState({highlight: false});
        this.setModalVisible(!this.state.modalVisible)
    }

    onSwipeDelete(gestureState) {
        Variables.state.podcastTitle = '';
        Variables.state.podcastCategory = '';
        Variables.state.podcastArtist = '';
        Variables.state.podcastDescription = '';
        Variables.state.podcastCategory = '';
        Variables.state.podcastURL = '';
        AsyncStorage.setItem("currentTime", "0");
        AsyncStorage.setItem("currentPodcast", "");
        MusicControl.resetNowPlaying();

        const {currentUser} = firebase.auth();
        const user = currentUser.uid;
        Analytics.logEvent('closePlayer', {
            'user_id': user
        });
    }


    renderOpenPlayer(highlight){

        if(Variables.state.podcastTitle == ''){
            return(
                <View style = {styles.containerOutsideModal}>
                    <ScrollView
                        scrollEnabled={this.state.scrollEnabled}
                        style={styles.containerModal}
                        ref={ref => this.scroll = ref}
                        onScrollEndDrag={event => {
                            if(event.nativeEvent.contentOffset.y < -100){
                                this.Close();
                            }
                        }}>

                        <StatusBar
                            hidden={true}
                        />

                        <View style = {{flexDirection: 'row'}}>

                            <TouchableOpacity onPress={this.Close} style={{alignItems:'flex-start', flex: 1, marginVertical: height/66.7, marginHorizontal: width/18.75}}>
                                <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="ios-arrow-down">
                                </Icon>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.goToMyQueue} style={{alignItems:'flex-end', flex: 1, marginVertical: height/66.7, marginHorizontal: width/18.75}}>
                                <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="md-list-box">
                                </Icon>
                            </TouchableOpacity>

                        </View>


                        <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginBottom: height/66.7, height: width/2.68, width: width/2.68, borderRadius:4, borderWidth: 8, borderColor:'rgba(320,320,320,0.8)',  shadowOffset:{  width: 0,  height: 10}, shadowOpacity: 0.5, shadowRadius: 10,  }}>
                            <Icon style={{
                                textAlign: 'center',
                                fontSize: height/7.41,
                                color: 'white',
                                marginTop: height/33.35,
                            }} name="ios-sad">
                            </Icon>
                        </View>


                        <View style={{marginTop: height/66.7, flex:1}}>
                            <Text style={styles.podcastText}>Queue is Empty</Text>
                        </View>


                    </ScrollView>
                </View>


                )
        }
        else if(highlight){
            return(
                <View style = {styles.containerOutsideModal}>
                    <ScrollView
                        scrollEnabled={this.state.scrollEnabled}
                        style={styles.containerModal}
                        ref={ref => this.scroll = ref}
                        onScrollEndDrag={event => {
                            if(event.nativeEvent.contentOffset.y < -100){
                                this.Close();
                            }
                        }}
                    >

                        <StatusBar
                            hidden={true}
                        />

                        <View style = {{flexDirection: 'row'}}>

                            <TouchableOpacity onPress={this.Close} style={{alignItems:'flex-start', flex: 1, marginVertical: height/66.7, marginHorizontal: width/18.75}}>
                                <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="ios-arrow-down">
                                </Icon>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.goToMyQueue} style={{alignItems:'flex-end', flex: 1, marginVertical: height/66.7, marginHorizontal: width/18.75}}>
                                <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="md-list-box">
                                </Icon>
                            </TouchableOpacity>

                        </View>


                        {this._renderPodcastImageBig(Variables.state.userProfileImage)}


                        <View style={{marginVertical: height/28, flex: 1}}>
                            {this._renderPodcastTitle(Variables.state.isPlaying)}
                            <View style={{alignSelf: 'center'}}>
                                {this._renderPodcastArtist(Variables.state.isPlaying)}
                            </View>
                            {this._renderCategory()}
                        </View>


                        <View style={styles.centerContainerButtons}>

                            <View style={styles.leftContainerP}>
                                <TouchableOpacity onPress={this.scrubBackward}>
                                    <Icon style={{flex:1, textAlign:'center', fontSize: height/25, color:'#2A2A30' }} name="ios-rewind">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.middleContainer}>
                                <TouchableOpacity>
                                    {this._renderPlayButton2(!Variables.state.paused, Variables.state.buffering)}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.rightContainerP}>
                                <TouchableOpacity onPress={this.scrubForward}>
                                    <Icon style={{flex:1, textAlign:'center', fontSize: height/25,color:'#2A2A30' }} name="ios-fastforward">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                        </View>


                        <View style={styles.centerContainerPlayer}>

                            <View style={styles.leftContainer}>
                                {this._renderCurrentTime(Variables.state.currentTime - Variables.state.highlightStart)}
                            </View>

                            <View style={styles.rightContainer}>
                                {this._renderEndTime()}
                            </View>

                        </View>


                        {this._renderSlider(Variables.state.currentTime)}


                        <View style={{flexDirection: 'row', flex: 1, marginTop: 0}}>

                            <View style={{alignItems:'flex-start', flex: 1}}>
                                {this._renderPodcastSpeed(Variables.state.podcastSpeed)}
                            </View>

                            <View style={{alignItems: 'center', flex: 1}}>

                                <TouchableOpacity onPress={this.openPlayerOptions} style={{alignItems:'center', flex: 1}}>
                                    <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="ios-more">
                                    </Icon>
                                </TouchableOpacity>

                            </View>


                        </View>


                        <Text style={styles.highlightTitle}>Highlight Info</Text>
                        <Text style={styles.textDescription}>{Variables.state.podcastDescription}</Text>



                    </ScrollView>
                </View>
            )
        }
        else{
            return(
                <View style = {styles.containerOutsideModal}>
                    <ScrollView
                        scrollEnabled={this.state.scrollEnabled}
                        ref={ref => this.scroll = ref}
                        onScrollEndDrag={event => {
                            if(event.nativeEvent.contentOffset.y < -100){
                                this.Close();
                            }
                        }}
                        style={styles.containerModal}>

                        <StatusBar
                            hidden={true}
                        />

                        <View style = {{flexDirection: 'row'}}>

                            <TouchableOpacity onPress={this.Close} style={{alignItems:'flex-start', flex: 1, marginVertical: height/66.7, marginHorizontal: width/18.75}}>
                                <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="ios-arrow-down">
                                </Icon>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this.goToMyQueue} style={{alignItems:'flex-end', flex: 1, marginVertical: height/66.7, marginHorizontal: width/18.75}}>
                                <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="md-list-box">
                                </Icon>
                            </TouchableOpacity>

                        </View>


                        {this._renderPodcastImageBig(Variables.state.userProfileImage)}


                        <View style={{marginTop: height/35, flex:1}}>
                            {this._renderPodcastTitle(Variables.state.isPlaying)}
                            <View style={{alignSelf: 'center'}}>
                                {this._renderPodcastArtist(Variables.state.isPlaying)}
                            </View>
                            {this._renderCategory()}
                        </View>


                        {this.renderHighlight()}


                        <View style={styles.centerContainerButtons}>

                            <View style={styles.leftContainerP}>
                                <TouchableOpacity onPress={this.scrubBackward}>
                                    <Icon style={{flex: 1, textAlign:'center', fontSize: height/25, color:'#2A2A30' }} name="ios-rewind">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.middleContainer}>
                                <TouchableOpacity>
                                    {this._renderPlayButton2(!Variables.state.paused, Variables.state.buffering)}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.rightContainerP}>
                                <TouchableOpacity onPress={this.scrubForward}>
                                    <Icon style={{flex: 1, textAlign:'center', fontSize: height/25,color:'#2A2A30' }} name="ios-fastforward">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.centerContainerPlayer}>

                            <View style={styles.leftContainer}>
                                {this._renderCurrentTime(Variables.state.currentTime)}
                            </View>

                            <View style={styles.rightContainer}>
                                {this._renderEndTime()}
                            </View>

                        </View>


                        {this._renderSlider(Variables.state.currentTime)}


                        <View style={{flexDirection: 'row', flex: 1, marginTop: 0}}>

                            <View style={{alignItems:'flex-start', flex: 1}}>
                                {this._renderPodcastSpeed(Variables.state.podcastSpeed)}
                            </View>

                            <View style={{alignItems: 'center', flex:1}}>

                                <TouchableOpacity onPress={this.openPlayerOptions} style={{alignItems:'center', flex: 1}}>
                                    <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="ios-more">
                                    </Icon>
                                </TouchableOpacity>

                            </View>

                            <View style={{alignItems: 'flex-end', flex:1}}>
                                {this._renderLikes(Variables.state.likers, Variables.state.liked)}
                            </View>


                        </View>

                        <View style={{marginVertical: height/90}}>
                            {this.renderPodcastInfo()}
                        </View>

                        <TouchableOpacity onPress={() => {
                            this.scroll.scrollTo({x: 0, y: height-100, animated: true});
                        }}>
                            <View style={{marginTop: height/44.47}}>
                                <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#506dcf', }} name="md-chatboxes">
                                </Icon>
                            </View>
                        </TouchableOpacity>
                        <PlayerInfo navigator={this.props.navigator}/>


                    </ScrollView>
                </View>
            )
        }

    }

    renderPodcastInfo(){
        if(Variables.state.podcastsPlays == 1){
            if(Variables.state.likers.length == 1){
                return(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight underlayColor='#fff' onPress={this.pressLike} style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.likers.length} like</Text>
                        </TouchableHighlight>
                        <View style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.podcastsPlays} listen</Text>
                        </View>
                    </View>
                )
            }
            else{
                return(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight underlayColor='#fff' onPress={this.pressLike} style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.likers.length} likes</Text>
                        </TouchableHighlight>
                        <View style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.podcastsPlays} listen</Text>
                        </View>
                    </View>
                )
            }
        }
        else{
            if(Variables.state.likers.length == 1){
                return(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight underlayColor='#fff' onPress={this.pressLike} style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.likers.length} like</Text>
                        </TouchableHighlight>
                        <View style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.podcastsPlays} listens</Text>
                        </View>
                    </View>
                )
            }
            else{
                return(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight underlayColor='#fff' onPress={this.pressLike} style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.likers.length} likes</Text>
                        </TouchableHighlight>
                        <View style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.podcastsPlays} listens</Text>
                        </View>
                    </View>
                )
            }
        }
    }

    render() {
        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (

            <View style={styles.barContainer}>


                <GestureRecognizer
                    onSwipeUp={(state) => this.onSwipeUp(state)}
                    onSwipeLeft={(state) => this.onSwipeDelete(state)}
                    onSwipeRight={(state) => this.onSwipeDelete(state)}
                    config={config}
                >

                    <TouchableOpacity style={styles.centerContainer} onPress={this.ExpandPlayer}>

                        <View style={styles.leftContainer}>
                            {this._renderPodcastImage(Variables.state.userProfileImage)}
                        </View>

                        <View onPress={this.ExpandPlayer}>
                            {this._renderPodcastInfo()}
                        </View>

                        <View style={styles.rightContainer}>
                            <TouchableOpacity style={{marginRight: width/37.5}}>
                                {this._renderPlayButton(!Variables.state.paused, Variables.state.buffering)}
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>

                </GestureRecognizer>





                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {alert("Modal has been closed.")}}
                    >

                        {this.renderOpenPlayer(Variables.state.highlight)}


                    </Modal>




            </View>



        )
    }

}


const styles = StyleSheet.create({
    barContainer:{
        flex: 1,
        backgroundColor: '#ffffff',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset:{  width: 0,  height: -3},
        shadowRadius: 5,
    },
    playingText:{
        color: '#3e4164',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/31.25,
        textAlign: 'left',
        paddingLeft: width/37.5
    },
    playingText2:{
        color: '#00000090',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/34,
        textAlign: 'left',
        paddingLeft: width/37.5
    },
    listView: {
        paddingTop: height/33.35,
        backgroundColor: '#F5FCFF',
    },
    sliderContainer: {
        width: width-40,
        alignSelf: 'center'
    },
    audioProgress: {
        marginTop: 0,
        flexDirection: 'row'
    },
    emptyProgress: {
        width: width/1.34,
        height: height/83.38,
        backgroundColor: '#575757',
    },
    leftContainer: {
        paddingLeft: width/37.5,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    leftContainerP: {
        flex:1,
        marginTop: height/66.7,
        paddingLeft: 0,
        justifyContent: 'center',
        alignItems:'flex-end',
    },
    centerContainer: {
        marginTop: height/133.4,
        flexDirection: 'row',
    },

    centerContainerPlayer: {
        flexDirection: 'row',
    },
    centerContainerButtons: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: height/66.7,
        paddingBottom: height/66.7,
    },
    rightContainer: {
        flex: 1,
        paddingRight: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rightContainerP: {
        flex: 1,
        paddingRight: 0,
        marginTop: height/66.7,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    container:{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 0,
    },

    containerModal:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },

    containerOutsideModal:{
        flex: 1,
        backgroundColor: 'transparent',
    },


    homeContainer:{
        marginTop: -(height/44.47),
    },

    title: {
        color: '#3e4164',
        marginTop: height/9.53,
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/15,
        backgroundColor: 'transparent',
        paddingBottom: height/66.7
    },
    title2: {
        color: 'rgba(1,170,170,1)',
        flex: 1,
        textAlign: 'center',
        fontSize: width/18.75,
    },

    podcastText:{
        color: '#3e4164',
        fontSize: width/25,
        marginTop: height/133.4,
        marginHorizontal: width/37.5,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
    textDescription:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/27,
        backgroundColor: 'transparent',
        marginBottom: height/60,
        marginHorizontal: width/18.75,
        paddingBottom: height/33.35,
    },
    highlightTitle:{
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/20,
        backgroundColor: 'transparent',
        marginLeft: height/33.35,
        marginTop: height/28,
        marginBottom: height/66.7
    },

    seeMore:{
        color: '#506dcf',
        fontSize: width/26.79,
        marginBottom: height/133.4,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
    podcastTextNum:{
        color: '#BBBCCD',
        fontSize: width/23.44,
        marginTop: height/133.4,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginHorizontal: width/25,
        fontFamily: 'Montserrat-Regular',
    },

    podcastHighlightNum:{
        color: '#3e4164',
        fontSize: width/26.79,
        marginBottom: height/33.35,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
    textLike:{
        color: '#506dcf',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily:  'Montserrat-Bold',
        fontSize: width/26.79,
        backgroundColor: 'transparent',
        marginTop: height/66.7,
        marginHorizontal: width/18.75,
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    podcastTextLikes:{
        color: '#BBBCCD',
        fontSize: width/23.44,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    podcastTextLikesActive:{
        color: '#BBBCCD',
        fontSize: width/23.44,
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    podcastTextArtist:{
        color:'#3e4164',
        fontSize: width/25,
        marginHorizontal: width/37.5,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
        marginTop: height/111.17,
    },
    podcastTextSpeed:{
        color: '#828393',
        fontSize: width/18.75,
        marginHorizontal: width/12.5,
        marginTop: height/133.4,
        backgroundColor: 'transparent',
        textAlign: 'center'
    },

    podcastTextCat:{
        color:'#828393',
        fontSize: width/26.79,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
        marginTop: height/111.17,
    },

    input: {
        height: height/16.68,
        width: width/1.25,
        marginBottom: height/66.7,
        color:'#FFF',
        paddingHorizontal: width/37.5,
        fontSize: width/17.05,
        alignSelf: 'center',
        textAlign: 'center'
    },

    highlightText: {
        color:'#fff',
        fontSize: width/23.44,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
    }


});


export default PlayerBottom;