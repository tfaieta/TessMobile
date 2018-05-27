import React, { Component } from 'react';
import {podFile, podTime} from './Record';
import MusicControl from 'react-native-music-control';
import firebase from 'firebase';




// Contains global variables used throughout the app

class Variables extends Component{


    static state = {

        // global variables
        isPlaying: false,
        podProgress: 0,
        uploadProgress: 0,
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
        rss: false,
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
        myTracking: [],  // holds my tracked podcasts
        userFollowing: [],
        userTracking: [],  // holds user's tracked podcasts
        newFollowedContent: [],
        homeFollowedContent: [],
        selectedByTess: [],
        fromTess : [],
        topCharts: [],
        recentlyPlayed: [], // my recently played
        userRecentlyPlayed: [], // user recently played
        myQueue: [],    // stores episodes for queue
        playlists: [],  // stores all playlists
        widgets: [],    // stores the titles of widgets for home page, in correct order
        tracking: false, // bool of whether user is tracking certain podcast
        myPlayTime: 0, // my seconds listened
        myTrackingAmount: 0, // number of my tracks
        myHighlightsAmount: 0, // number of my highlights
        myLikesAmount: 0,  // number of my likes
        myCommentsAmount: 0, // number of my comments
        mySharesAmount: 0,  // number of my shares
        userPlayTime: 0, // user seconds listened
        userTrackingAmount: 0, // number of user tracks
        userHighlightsAmount: 0, // number of user highlights
        userLikesAmount: 0,  // number of user likes
        userCommentsAmount: 0, // number of user comments
        userSharesAmount: 0, // number of user shares
        highlight: false, // whether item playing is a highlight or not
        highlightStart: 0,  // start time for current highlight
        highlightEnd: 0,  // end time for current highlight
        catchUp: [],    // stores episodes needed to catch up (obtained from tracking)
        catchUpLength: [],    // stores number of episodes needed to catch up (obtained from tracking)


        // player variables
        podcastURL: '',
        podcastSpeed: 1.0,
        duration: 0,
        paused: false,
        currentTime: 0,
        repeat: true,
        seekForward: false,
        seekBackward: false,
        seekTo: 0,
        buffering: false,


};



    static setPodcastFile(podFile){
        Variables.state.podcastArtist = firebase.auth().currentUser.uid;

        MusicControl.resetNowPlaying();

        Variables.state.podcastURL = podFile;

        setTimeout(() => {
            MusicControl.setNowPlaying({
                title: Variables.state.podcastTitle,
                artwork: Variables.state.userProfileImage,
                artist: Variables.state.currentUsername,
                album: Variables.state.podcastCategory,
                genre: Variables.state.podcastCategory,

                state: MusicControl.STATE_PLAYING,
                speed: 1, // Playback Rate
                elapsedTime: Variables.state.currentTime,
                duration: Variables.state.duration
            });
            MusicControl.enableControl('play', true);
            MusicControl.enableControl('pause', true);
            MusicControl.enableControl('stop', false);
            MusicControl.enableControl('skipBackward', true, {interval: 15});
            MusicControl.enableControl('skipForward', true, {interval: 15});

        }, 1000);

    }



    static play()   {

        Variables.state.paused = false;

    };


    static pause()   {

        Variables.state.paused = true;

    };


}

export default Variables;

