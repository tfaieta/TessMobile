import React, { Component } from 'react';
import {podFile, podTime} from './Record';
import firebase from 'firebase';
import {
    Player,
} from 'react-native-audio-toolkit';
import MusicControl from 'react-native-music-control';


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
        podcastID: '',
        podcastsPlays: '',
        browsingArtist: '',
        bio: '',
        profileImage: '',
        onUserProfileImage: '',
        userProfileImage: '',
        favCategory: '',
        currentRef: '',
        username: '',
        userUsername: '',
        currentUsername: '',
        currentBio: '',
        currentFavCategory: '',
        searchWord: '',
        following: false,
        liked: false,
        favorited: false,
        usersFollowed: [],
        favPodcasts: [],
        myPodcasts: [],
        userPodcasts: [],
        currCategory: [],
        mySearches: [],
        likers: [],
        comments: [],
        followedContent: [],
        newPodcasts: [],
        newPodcastsArtsts: [],
        myFollowers: [],
        userFollowers: [],
        myFollowing: [],
        userFollowing: [],
        newFollowedContent: [],
        homeFollowedContent: [],
        selectedByTess: [],
        fromTess : [],
        topCharts: [],
        recentlyPlayed: [],

};


    static tick() {
        if(podcastPlayer.isPlaying){
            Variables.state.currentTime = podcastPlayer.currentTime;
        }
    }

    static setPodcastFile(podFile){
        Variables.state.podcastArtist = firebase.auth().currentUser.uid;
        podcastPlayer.destroy();
        MusicControl.resetNowPlaying();
        podcastPlayer = new Player(podFile, {continuesToPlayInBackground : true, wakeLock: true});
        podcastPlayer.volume = 1;

        setTimeout(() => {
            MusicControl.setNowPlaying({
                title: Variables.state.podcastTitle,
                artwork: Variables.state.userProfileImage,
                artist: Variables.state.currentUsername,
                album: Variables.state.podcastCategory,
                genre: Variables.state.podcastCategory,

                state: MusicControl.STATE_PLAYING,
                speed: 1, // Playback Rate
                elapsedTime: podcastPlayer.currentTime/1000,
                duration: podcastPlayer.duration/1000,
            });
            MusicControl.enableControl('play', true);
            MusicControl.enableControl('pause', true);
            MusicControl.enableControl('stop', false);
            MusicControl.enableControl('skipBackward', true, {interval: 15});
            MusicControl.enableControl('skipForward', true, {interval: 15});

        }, 1000);

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

