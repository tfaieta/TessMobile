import React, { Component } from 'react';
import Sound from 'react-native-sound';
import {podFile, podTime} from './Record';
import firebase from 'firebase';


export var PodcastFile = new Sound(podFile, '', (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
});



class Variables extends Component{
    constructor() {
        super();
        this.tick = this.tick.bind(this);
        this.play=this.play.bind(this);
    }
    static state = {
        isPlaying: false,
        podProgress: 0,
        currentTime: 0,
        interval: null,
        podcastTitle: '',
        podcastDescription: '',
        podcastCategory: '',
        podcastArtist: '',
        bio: '',
        favCategory: '',
        currentRef: '',
        username: '',
        currentUsername: '',
        currentBio: '',
        currentFavCategory: '',
        following: false,
        usersFollowed: [],
        favPodcasts: [],
        myPodcasts: [],
        userPodcasts: [],
        currCategory: [],

};


    static tick() {
        PodcastFile.getCurrentTime((seconds) => {
            Variables.state.currentTime = seconds;
        })
    }

    static setPodcastFile(podFile){

        Sound.enableInSilenceMode(true);
        Sound.setActive(true);
        Sound.setCategory('Playback', true);
        Sound.setMode('SpokenAudio');

        Variables.state.podcastArtist = firebase.auth().currentUser.uid;
        PodcastFile = new Sound(podFile, '', (error) => {
            if (error) {
                console.log('failed to load the sound', error);
                return;
            }
        });
    }



    componentWillMount()   {


        PodcastFile = new Sound(podFile, '', (error) => {


            if (error) {
                console.log('failed to load the sound', error);
            }
        });


    }


    static play()   {

        Variables.state.isPlaying = true;
        Variables.state.interval = setInterval(this.tick, 250);

        Sound.enableInSilenceMode(true);
        Sound.setActive(true);
        Sound.setCategory('Playback', true);
        Sound.setMode('SpokenAudio');

        PodcastFile.play((success) => {
            if (success) {
                Variables.state.isPlaying = false;
                Variables.state.interval = clearInterval(Variables.state.interval);
            }else {
                console.log('playback error');
            }
        });


    };


    static pause()   {

        Variables.state.isPlaying = false;
        Variables.state.interval = clearInterval(Variables.state.interval);
        PodcastFile.pause();


    };




}

export default Variables;

