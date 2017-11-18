import React, { Component } from 'react';
import {podFile, podTime} from './Record';
import firebase from 'firebase';
import {
    Player,
} from 'react-native-audio-toolkit';


export var podcastPlayer = new Player(podFile, {continuesToPlayInBackground : true});
podcastPlayer.prepare();



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
        profileImage: '',
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
        if(podcastPlayer.isPlaying){
            Variables.state.currentTime = podcastPlayer.currentTime;
        }
    }

    static setPodcastFile(podFile){
        Variables.state.podcastArtist = firebase.auth().currentUser.uid;
        podcastPlayer.destroy();
        podcastPlayer = new Player(podFile, {continuesToPlayInBackground : true, wakeLock: true});
        podcastPlayer.volume = 1;
    }



    componentWillMount()   {

        podcastPlayer = new Player(podFile, {continuesToPlayInBackground : true, wakeLock: true});


    }


    static play()   {

        Variables.state.isPlaying = true;
        Variables.state.interval = setInterval(this.tick, 250);

        podcastPlayer.play();

    };


    static pause()   {

        Variables.state.isPlaying = false;
        Variables.state.interval = clearInterval(Variables.state.interval);

        podcastPlayer.pause();


    };




}

export default Variables;

