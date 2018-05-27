import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet, ListView, ScrollView, TouchableOpacity, Linking, RefreshControl, AsyncStorage, ActivityIndicator, Image, Platform, TouchableWithoutFeedback, TouchableHighlight, Dimensions} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { podcastFetchNew } from "../actions/PodcastActions";
import { connect } from 'react-redux';
import ListItemUsers from '../components/ListItemUsers';
import Icon from 'react-native-vector-icons/FontAwesome';
import Variables from "./Variables";
import firebase from 'firebase';
import Player from "./Player";
import SwipeCards from 'react-native-swipe-cards';
import ListItemCard from "./ListItemCard";
import SortableListView from 'react-native-sortable-listview';
var Analytics = require('react-native-firebase-analytics');


import { Navigation } from 'react-native-navigation';

var {height, width} = Dimensions.get('window');


var DomParser = require('react-native-html-parser').DOMParser;


// 1st tab, home page

class Home extends Component{

    componentDidMount(){

        if (Platform.OS === 'android') {
            Linking.getInitialURL().then(url => {
                this.navigate(url);
            });
        } else {
            Linking.addEventListener('url', this.handleOpenURL);
            Linking.getInitialURL().then((url) => {
                if (url) {
                    this.navigate(url);
                }
            }).catch(err => console.warn('An error occurred', err));
        }


        const {currentUser} = firebase.auth();

        Variables.state.widgets = [];
        firebase.database().ref(`users/${currentUser.uid}/widgets`).once("value", function (snapshot) {
            
            snapshot.forEach(function (data) {
                if(data.val())
                Variables.state.widgets[data.val().position] = data.val();
            })
            
        });


        var hasNewFromFollow = false;
        const newFromFollowRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("New From Following");
        newFromFollowRef.once("value", function (data) {
            if(data.val()){
                hasNewFromFollow = true;


                Variables.state.homeFollowedContent = [];
                const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);

                refFol.on("value", function (snapshot) {
                    snapshot.forEach(function (data) {

                        firebase.database().ref(`users/${data.key}/podcasts`).limitToLast(1).once("value", function (snap) {
                            snap.forEach(function (pod) {

                                firebase.database().ref(`podcasts/${pod.key}`).once("value", function (data2) {
                                    if(data2.val()){
                                        Variables.state.homeFollowedContent.push(data2.val());
                                        for(let i = Variables.state.homeFollowedContent.length-1; i > 0 && Variables.state.homeFollowedContent[i].id > Variables.state.homeFollowedContent[i-1].id; i--){
                                            let temp = Variables.state.homeFollowedContent[i-1];
                                            Variables.state.homeFollowedContent[i-1] = Variables.state.homeFollowedContent[i];
                                            Variables.state.homeFollowedContent[i] = temp;
                                        }
                                    }
                                })

                            });

                        });

                    })
                });


            }
        });


        var hasLatest = false;
        const latestRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("Latest");
        latestRef.once("value", function (data) {
            if(data.val()){
                hasLatest = true;


                Variables.state.newPodcasts = [];
                Variables.state.newPodcastsArtsts = [];
                const refNew = firebase.database().ref(`podcasts/`);

                refNew.limitToLast(250).once("value", function (snapshot) {
                    snapshot.forEach(function (data) {
                        if(data.val()){
                            if(Variables.state.newPodcastsArtsts.includes(data.val().podcastArtist)){
                                Variables.state.newPodcasts.splice(Variables.state.newPodcastsArtsts.indexOf(data.val().podcastArtist), 1);
                                Variables.state.newPodcastsArtsts.splice(Variables.state.newPodcastsArtsts.indexOf(data.val().podcastArtist), 1);
                                Variables.state.newPodcasts.push(data.val());
                                Variables.state.newPodcastsArtsts.push(data.val().podcastArtist);
                            }
                            else{
                                Variables.state.newPodcasts.push(data.val());
                                Variables.state.newPodcastsArtsts.push(data.val().podcastArtist)
                            }
                        }
                    });
                    Variables.state.newPodcasts.reverse();
                });


            }
        });


        var hasSelectedByTess = false;
        const selectedByTessRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("Selected By Tess");
        selectedByTessRef.once("value", function (data) {
            if(data.val()){
                hasSelectedByTess = true;


                Variables.state.selectedByTess = [];

                //TheMaddyIce
                firebase.database().ref(`users/upwadf76CrOBee8aSwzcCZR4kM33/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Two Bros and a Pod
                firebase.database().ref(`users/JHPYRdcWtOheHCkrddZjJaLXtPg2/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Big Tay
                firebase.database().ref(`users/1F1q9gRKWyMQ8cSATXqGT4PnCaK2/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Tim Dulak
                firebase.database().ref(`users/3tHL3dIcINUdMeKZn6ckf81e2Sk2/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Joey Bradfield
                firebase.database().ref(`users/gdGuN9v14qU9pSHXSk1KbDGlUsu1/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Dom Gold
                firebase.database().ref(`users/6px5go2E3USvYvkcNQejkLkJx3H3/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Eat the fruit
                firebase.database().ref(`users/7ubx6NftyyQbAwufE7BquuSJ6gJ3/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Abbey
                firebase.database().ref(`users/P2HAtFE3YKXe8uP9Mu1HyCE2cD83/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //ShakDaddy
                firebase.database().ref(`users/u1osicyhjcR5j3EHx6m1SMe2LpJ3/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Nick Ruspantini
                firebase.database().ref(`users/pgIx9JAiq9aQWcyUZX8AuIdqNmP2/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Tony
                firebase.database().ref(`users/sJsB8XK4XRZ8tNpeGC14JNsa6Jj1/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


            }
        });


        var hasFromTess = false;
        const fromTessRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("From Tess");
        fromTessRef.once("value", function (data) {
            if(data.val()){
                hasFromTess = true;


                Variables.state.fromTess = [];
                firebase.database().ref(`users/dlUCIXXnXGTgJZwYLE1KUYWGkQ73/podcasts`).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.fromTess.push(snapshot.val())
                            }
                        })
                    })
                });


            }
        });


        var hasTech = false;
        const techRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("Tech");
        techRef.once("value", function (data) {
            if(data.val()){
                hasTech = true;


                Variables.state.currCategory = [];
                const refCat = firebase.database().ref(`podcasts/`);

                refCat.on("value", function (snapshot) {
                    snapshot.forEach(function (data) {
                        if(data.val().podcastCategory == 'Tech') {
                            Variables.state.currCategory.push(data.val());
                        }
                    })
                });


            }
        });



        var hasRecent = false;
        const recentRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("Recently Played");
        recentRef.once("value", function (data) {
            if(data.val()){
                hasRecent = true;


                firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed`).limitToLast(20).on("value", function (snapshot) {
                    Variables.state.recentlyPlayed = [];
                    snapshot.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.val().id}`).on("value", function (data) {
                            if(data.val()){
                                Variables.state.recentlyPlayed.push(data.val())
                            }

                        })
                    });
                    Variables.state.recentlyPlayed.reverse();
                });

            }
        });





        this.timeout9 = setTimeout(() => {this.setState({hasNewFromFollowing: hasNewFromFollow, hasRecent: hasRecent})}, 1000);
        this.timeout10 = setTimeout(() => {this.setState({hasLatest: hasLatest})}, 1000);
        this.timeout11 = setTimeout(() => {this.setState({hasFromTess: hasFromTess})}, 1000);
        this.timeout12 = setTimeout(() => {this.setState({hasSelectedByTess: hasSelectedByTess})}, 1000);
        this.timeout13 = setTimeout(() => {this.setState({hasTech: hasTech})}, 1000);



    }

    handleOpenURL = (event) => {
        this.navigate(event.url);
    };
    navigate = (url) => {
        console.warn("starting");
        console.warn("url: " + url);
        const { navigator } = this.props;
        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];

        console.warn("route: " + route);
        console.warn("id: " + id);
        console.warn("route name: " + routeName);

        if (routeName === 'listen') {
            setTimeout(() => {


                Variables.state.highlight = false;
                firebase.database().ref(`podcasts/${id}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        const {podcastArtist} = snapshot.val();
                        const {podcastTitle} = snapshot.val();
                        const {podcastDescription} = snapshot.val();
                        const {podcastCategory} = snapshot.val();
                        const {id} = snapshot.val();
                        const {rss} = snapshot.val();
                        const {podcastURL} = snapshot.val();
                        const {currentUser} = firebase.auth();
                        const user = currentUser.uid;

                        Analytics.logEvent('play', {
                            'episodeID': id,
                            'epispdeTitle': podcastTitle,
                            'episodeArtist': podcastArtist,
                            'user_id': user
                        });


                        if(rss){

                            AsyncStorage.setItem("currentPodcast", id);
                            AsyncStorage.setItem("currentTime", "0");
                            Variables.state.seekTo = 0;
                            Variables.state.currentTime = 0;


                            firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                if(snap.val()){
                                    Variables.state.currentUsername = snap.val().username;
                                }
                                else {
                                    Variables.state.currentUsername = podcastArtist;
                                }
                            });

                            firebase.database().ref(`podcasts/${id}/likes`).on("value", function (snap) {
                                Variables.state.likers = [];
                                Variables.state.liked = false;
                                snap.forEach(function (data) {
                                    if (data.val()) {
                                        if(data.val().user == currentUser.uid){
                                            Variables.state.liked = true;
                                        }
                                        Variables.state.likers.push(data.val());
                                    }
                                });
                            });


                            firebase.database().ref(`podcasts/${id}/plays`).on("value", function (snap) {
                                Variables.state.podcastsPlays = 0;
                                snap.forEach(function (data) {
                                    if (data.val()) {
                                        Variables.state.podcastsPlays++;
                                    }
                                });
                            });


                            firebase.database().ref(`podcasts/${id}/plays`).child(user).update({user});



                            firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).once("value", function (snap) {
                                snap.forEach(function (data) {
                                    if(data.val().id == id){
                                        firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/${data.key}`).remove()
                                    }
                                });
                                firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).push({id});
                            });


                            Variables.pause();
                            Variables.setPodcastFile(podcastURL);
                            Variables.state.isPlaying = false;
                            Variables.state.podcastTitle = podcastTitle;
                            Variables.state.podcastArtist = podcastArtist;
                            Variables.state.podcastCategory = podcastCategory;
                            Variables.state.podcastDescription = podcastDescription;
                            Variables.state.podcastID = id;
                            Variables.state.favorited = false;
                            Variables.state.userProfileImage = '';
                            Variables.play();
                            Variables.state.isPlaying = true;
                            Variables.state.rss = true;


                            firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                                if(snapshot.val()){
                                    Variables.state.userProfileImage = snapshot.val().profileImage
                                }
                            });


                            firebase.database().ref(`users/${currentUser.uid}/favorites`).on("value", function (snapshot) {
                                snapshot.forEach(function (data) {
                                    if(data.key == id){
                                        Variables.state.favorited = true;
                                    }
                                })
                            })



                        }
                        else{
                            if(id){
                                AsyncStorage.setItem("currentPodcast", id);
                                AsyncStorage.setItem("currentTime", "0");
                                Variables.state.seekTo = 0;
                                Variables.state.currentTime = 0;

                                firebase.storage().ref(`/users/${podcastArtist}/${id}`).getDownloadURL().catch(() => {console.warn("file not found")})
                                    .then(function(url) {


                                        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                            if(snap.val()){
                                                Variables.state.currentUsername = snap.val().username;
                                            }
                                            else {
                                                Variables.state.currentUsername = podcastArtist;
                                            }
                                        });

                                        firebase.database().ref(`podcasts/${id}/likes`).on("value", function (snap) {
                                            Variables.state.likers = [];
                                            Variables.state.liked = false;
                                            snap.forEach(function (data) {
                                                if (data.val()) {
                                                    if(data.val().user == currentUser.uid){
                                                        Variables.state.liked = true;
                                                    }
                                                    Variables.state.likers.push(data.val());
                                                }
                                            });
                                        });


                                        firebase.database().ref(`podcasts/${id}/plays`).on("value", function (snap) {
                                            Variables.state.podcastsPlays = 0;
                                            snap.forEach(function (data) {
                                                if (data.val()) {
                                                    Variables.state.podcastsPlays++;
                                                }
                                            });
                                        });


                                        firebase.database().ref(`podcasts/${id}/plays`).child(user).update({user});



                                        firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).once("value", function (snap) {
                                            snap.forEach(function (data) {
                                                if(data.val().id == id){
                                                    firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/${data.key}`).remove()
                                                }
                                            });
                                            firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).push({id});
                                        });


                                        Variables.pause();
                                        Variables.setPodcastFile(url);
                                        Variables.state.isPlaying = false;
                                        Variables.state.podcastTitle = podcastTitle;
                                        Variables.state.podcastArtist = podcastArtist;
                                        Variables.state.podcastCategory = podcastCategory;
                                        Variables.state.podcastDescription = podcastDescription;
                                        Variables.state.podcastID = id;
                                        Variables.state.favorited = false;
                                        Variables.state.userProfileImage = '';
                                        Variables.play();
                                        Variables.state.isPlaying = true;
                                        Variables.state.rss = false;

                                        const storageRef = firebase.storage().ref(`/users/${Variables.state.podcastArtist}/image-profile-uploaded`);
                                        if(storageRef.child('image-profile-uploaded')){
                                            storageRef.getDownloadURL()
                                                .then(function(url) {
                                                    if(url){
                                                        Variables.state.userProfileImage = url;
                                                    }
                                                }).catch(function(error) {
                                                //
                                            });
                                        }

                                        firebase.database().ref(`users/${currentUser.uid}/favorites`).on("value", function (snapshot) {
                                            snapshot.forEach(function (data) {
                                                if(data.key == id){
                                                    Variables.state.favorited = true;
                                                }
                                            })
                                        })


                                    });
                            }
                            else{
                                firebase.storage().ref(`/users/${podcastArtist}/${podcastTitle}`).getDownloadURL().catch(() => {console.warn("file not found")})
                                    .then(function(url) {


                                        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                            if(snap.val()){
                                                Variables.state.currentUsername = snap.val().username;
                                            }
                                            else {
                                                Variables.state.currentUsername = podcastArtist;
                                            }
                                        });

                                        Variables.pause();
                                        Variables.setPodcastFile(url);
                                        Variables.state.isPlaying = false;
                                        Variables.state.podcastTitle = podcastTitle;
                                        Variables.state.podcastArtist = podcastArtist;
                                        Variables.state.podcastCategory = podcastCategory;
                                        Variables.state.podcastDescription = podcastDescription;
                                        Variables.state.podcastID = '';
                                        Variables.state.liked = false;
                                        Variables.state.favorited = false;
                                        Variables.state.likers = [];
                                        Variables.state.userProfileImage = '';
                                        Variables.play();
                                        Variables.state.isPlaying = true;
                                        Variables.state.rss = false;

                                        const storageRef = firebase.storage().ref(`/users/${Variables.state.podcastArtist}/image-profile-uploaded`);
                                        if(storageRef.child('image-profile-uploaded')){
                                            storageRef.getDownloadURL()
                                                .then(function(url) {
                                                    if(url){
                                                        Variables.state.userProfileImage = url;
                                                    }
                                                }).catch(function(error) {
                                                //
                                            });
                                        }


                                    });
                            }

                        }

                    }

                });

            }, 1500);
        }
        else if (routeName === 'highlight'){
            const userID = id.split('~')[0];
            const highlightID = id.split('~')[1];

            setTimeout(() => {
                firebase.database().ref(`users/${userID}/highlights/${highlightID}`).once("value", function (snap) {

                    firebase.database().ref(`podcasts/${snap.val().podcastID}`).once("value", function (snapshot) {

                        if(snapshot.val().rss){

                            const {podcastArtist} = snapshot.val();
                            const {podcastTitle} = snapshot.val();
                            const {podcastURL} = snapshot.val();
                            const {title} = snap.val();
                            const {podcastCategory} = snapshot.val();
                            const {id} = snapshot.val();
                            const {description} = snap.val();
                            const {key} = snap.val();
                            const {startTime} = snap.val();
                            const {endTime} = snap.val();

                            Variables.state.highlightStart = startTime;
                            Variables.state.highlightEnd = endTime;
                            Variables.state.seekTo = startTime;
                            Variables.state.currentTime = startTime;

                                AsyncStorage.setItem("currentPodcast", '');
                                AsyncStorage.setItem("currentTime", "0");

                                Variables.pause();
                                Variables.setPodcastFile(podcastURL);
                                Variables.state.isPlaying = false;
                                Variables.state.highlight = true;
                                Variables.state.rss = true;
                                Variables.state.podcastURL = podcastURL;
                                Variables.state.podcastArtist = podcastArtist;
                                Variables.state.podcastTitle = title;
                                Variables.state.podcastID = id;
                                Variables.state.podcastCategory = podcastCategory;
                                Variables.state.podcastDescription = description;
                                Variables.state.favorited = false;
                                Variables.play();
                                Variables.state.isPlaying = true;


                                Variables.state.userProfileImage = '';
                                firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                                    if (snapshot.val()) {
                                        Variables.state.userProfileImage = snapshot.val().profileImage
                                    }
                                });

                                firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
                                    if (snap.val()) {
                                        Variables.state.currentUsername = snap.val().username;
                                    }
                                    else {
                                        Variables.state.currentUsername = podcastArtist;
                                    }
                                });

                        }
                        else if(snapshot.val()){

                            const {podcastArtist} = snapshot.val();
                            const {podcastTitle} = snapshot.val();
                            const {title} = snap.val();
                            const {podcastCategory} = snapshot.val();
                            const {id} = snapshot.val();
                            const {description} = snap.val();
                            const {key} = snap.val();
                            const {startTime} = snap.val();
                            const {endTime} = snap.val();

                            Variables.state.highlightStart = startTime;
                            Variables.state.highlightEnd = endTime;
                            Variables.state.seekTo = startTime;
                            Variables.state.currentTime = startTime;

                                    AsyncStorage.setItem("currentPodcast", '');
                                    AsyncStorage.setItem("currentTime", "0");

                                    firebase.storage().ref(`/users/${podcastArtist}/${id}`).getDownloadURL().catch(() => {
                                        console.warn("file not found")
                                    })
                                        .then(function (url) {

                                            Variables.pause();
                                            Variables.setPodcastFile(url);
                                            Variables.state.highlight = true;
                                            Variables.state.rss = false;
                                            Variables.state.podcastURL = url;
                                            Variables.state.podcastArtist = podcastArtist;
                                            Variables.state.podcastTitle = title;
                                            Variables.state.podcastID = id;
                                            Variables.state.podcastCategory = podcastCategory;
                                            Variables.state.podcastDescription = description;
                                            Variables.state.favorited = false;
                                            Variables.play();
                                            Variables.state.isPlaying = true;

                                        });


                                    Variables.state.userProfileImage = '';
                                    const storageRef = firebase.storage().ref(`/users/${podcastArtist}/image-profile-uploaded`);
                                    if (storageRef.child('image-profile-uploaded')) {
                                        storageRef.getDownloadURL()
                                            .then(function (url) {
                                                if (url) {
                                                    Variables.state.userProfileImage = url;
                                                }
                                            }).catch(function (error) {
                                            //
                                        });
                                    }

                                    firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
                                        if (snap.val()) {
                                            Variables.state.currentUsername = (snap.val().username + ' • ' + podcastTitle).slice(0, 35) + '...';
                                        }
                                        else {
                                            Variables.state.currentUsername = podcastArtist;
                                        }
                                    });

                        }

                    });

                })

            }, 1500);

        }
    };



    componentWillUnmount(){
        Linking.removeEventListener('url', this.handleOpenURL);

        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
        clearTimeout(this.timeout4);
        clearTimeout(this.timeout5);
        clearTimeout(this.timeout6);
        clearTimeout(this.timeout7);
        clearTimeout(this.timeout8);
        clearTimeout(this.timeout9);
        clearTimeout(this.timeout10);
        clearTimeout(this.timeout11);
        clearTimeout(this.timeout12);
        clearTimeout(this.timeout13);
    }


    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            drawUnderTabBar: false,
            navBarCustomView: 'CustomNavbar',
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator
            },
            navBarButtonColor: '#007aff',
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            hasNewFromFollowing: false,
            hasLatest: false,
            hasFromTess: false,
            hasSelectedByTess: false,
            hasTech: false,
            hasRecent: false,
            widgets: Variables.state.widgets,
            scroll: true,
            order: Object.keys([]),
            loading: true,
            cardsLeft: Variables.state.homeFollowedContent.length,
            cardControl: false,

            data: Variables.state.homeFollowedContent,
            dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts),
            dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),
            dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess),
            dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess),
            dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory),
            url: '',
            refreshing: false,
            userProfileImage: ''
        };
        this.timeout1 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),  data: Variables.state.homeFollowedContent, cardsLeft: Variables.state.homeFollowedContent.length, dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory), widgets: Variables.state.widgets, order: Object.keys(this.state.widgets), })},1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts), loading: false})},1500);
        this.timeout3 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},3800);
        this.timeout4 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},3200);

        this.timeout5 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),  data: Variables.state.homeFollowedContent, cardsLeft: Variables.state.homeFollowedContent.length, dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory), widgets: Variables.state.widgets, order: Object.keys(this.state.widgets),})},3000);
        this.timeout6 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},6400);
        this.timeout7 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},6800);
        this.timeout8 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},7200);


    }


    
    rssFetch(){


        // loop for every rss feed in database
        firebase.database().ref('feeds').once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                console.warn(snap.val());

                fetch(snap.val())
                    .then((response) => response.text())
                    .then((responseData) => {

                        var doc = new DomParser().parseFromString(responseData,'text/html');
                        var items = doc.getElementsByTagName('item');
                        var channel = doc.getElementsByTagName("title");


                        // profile bio
                        var userBio = "";
                        let bio = "";
                        if(doc.getElementsByTagName("description").length > 0){
                            userBio = doc.getElementsByTagName("description");
                            bio = userBio[0].textContent;
                            bio = bio.replace("<p>", " ");
                            bio = bio.replace("</p>", " ");
                            bio = bio.replace("<a", " ");
                            bio = bio.replace("</a>", " ");
                            bio = bio.replace("href=", " ");
                            bio = bio.replace("rel=", " ");
                            bio = bio.replace("target=", " ");
                            bio = bio.replace("<em/>", " ");
                            bio = bio.replace("<em>", " ");
                            bio = bio.replace("&nbsp", " ");
                        }


                        // profile image
                        let profileImage = '';
                        if(doc.getElementsByTagName("image").length >0){
                            const image = doc.getElementsByTagName("image");
                            const pI = image[0].getElementsByTagName('url');
                            profileImage = pI[0].textContent;

                            console.warn(profileImage);

                        }

                        // profile username
                        let username = channel[0].textContent;
                        let usernameData = channel[0].textContent;
                        usernameData = usernameData.replace("#", " ");
                        usernameData = usernameData.replace("$", " ");
                        usernameData = usernameData.replace("[", " ");
                        usernameData = usernameData.replace("]", " ");
                        usernameData = usernameData.replace(".", "");
                        usernameData = usernameData.replace("http://", "");


                        // category
                        let category = '';
                        if(doc.getElementsByTagName('itunes:category').length > 0){
                            category = doc.getElementsByTagName('itunes:category')[0].getAttribute('text');
                        }
                        const podcastCategory = category;
                        console.warn(podcastCategory);



                        // create account for user if it doesn't exist
                        // reserve username & create user if needed
                        firebase.database().ref(`users`).child(usernameData).once("value", function (snapshot) {
                            if(snapshot.val()){
                                console.warn("Account Exists: " + usernameData)
                            }
                            else{
                                firebase.database().ref(`users`).child(usernameData).child("/username").update({username});
                                firebase.database().ref(`users`).child(usernameData).child("/bio").update({bio});
                                firebase.database().ref(`users`).child(usernameData).child("/profileImage").update({profileImage});
                                firebase.database().ref(`usernames`).child(usernameData.toLowerCase()).update({username: usernameData.toLowerCase()});
                            }
                        });



                        // get info for each podcast
                        // items.length gets max size of rss feed, 0 is most recent
                        let size = 0;
                        if(items.length >= 4){
                            size = 4;
                        }
                        else{
                            size = items.length-1
                        }
                        for (var i=size; i >= 0; i--) {

                            //artist
                            let podcastArtist = usernameData;

                            //title
                            const title = items[i].getElementsByTagName('title');
                            console.warn(title[0].textContent);
                            let podcastTitle = title[0].textContent;

                            //description
                            const description = items[i].getElementsByTagName('description');
                            console.warn(description[0].textContent);
                            let podcastDescription = description[0].textContent;
                            podcastDescription = podcastDescription.replace("<p>", " ");
                            podcastDescription = podcastDescription.replace("</p>", " ");
                            podcastDescription = podcastDescription.replace("<a", " ");
                            podcastDescription = podcastDescription.replace("&amp", " ");
                            podcastDescription = podcastDescription.replace("href=", " ");
                            podcastDescription = podcastDescription.replace("<em>", " ");
                            podcastDescription = podcastDescription.replace("</em>", " ");
                            podcastDescription = podcastDescription.replace("</a>", " ");
                            podcastDescription = podcastDescription.replace("<h2", " ");
                            podcastDescription = podcastDescription.replace("id=", " ");
                            podcastDescription = podcastDescription.replace("</h2>", " ");
                            podcastDescription = podcastDescription.replace("</p>", " ");
                            podcastDescription = podcastDescription.replace("<br>", " ");
                            podcastDescription = podcastDescription.replace("<div>", " ");
                            podcastDescription = podcastDescription.replace("</div>", " ");
                            podcastDescription = podcastDescription.replace("<ul>", " ");
                            podcastDescription = podcastDescription.replace("<li>", " ");
                            podcastDescription = podcastDescription.replace("</li>", " ");
                            podcastDescription = podcastDescription.replace("<strong>", " ");
                            podcastDescription = podcastDescription.replace("</strong>", " ");
                            podcastDescription = podcastDescription.replace("<sup>", " ");
                            podcastDescription = podcastDescription.replace("</sup>", " ");
                            podcastDescription = podcastDescription.replace("<br><br>", " ");
                            podcastDescription = podcastDescription.replace("<br>", " ");



                            //length
                            let length = '';
                            if(items[i].getElementsByTagName('itunes:duration').length > 0){
                                length = "itunes duration:" + items[i].getElementsByTagName('itunes:duration');
                                length = length.replace("itunes duration:", "");
                                length = length.replace("<itunes:duration>", "");
                                length = length.replace("</itunes:duration>", "");
                            }
                            const podcastLength = length;
                            console.warn(podcastLength);



                            //rss = true, need to tell firebase it's an rss podcast
                            const rss = true;



                            //likes = 0
                            const likes = 0;

                            //joint title (for database)
                            let jointTitle = podcastArtist + podcastTitle;
                            if(jointTitle.length > 60 ){
                                jointTitle = (jointTitle.slice(0,60))
                            }
                            jointTitle = jointTitle.replace("#", "_");
                            jointTitle = jointTitle.replace("$", "_");
                            jointTitle = jointTitle.replace("[", "_");
                            jointTitle = jointTitle.replace("]", "_");
                            jointTitle = jointTitle.replace(".", "_");
                            const RSSID = jointTitle;

                            //url
                            if(items[i].getElementsByTagName('enclosure').length > 0){
                                var link = items[i].getElementsByTagName('enclosure')[0].getAttribute('url');
                                console.warn(link);
                                const podcastURL = link;


                                // upload to database if doesn't exist (follow podcastCreate)
                                firebase.database().ref(`podcasts`).orderByChild("RSSID").equalTo(jointTitle.toString()).once("value", function (snapshot) {
                                    if(snapshot.val()){
                                        console.warn("EXISTS")
                                    }
                                    else{
                                        firebase.database().ref(`podcasts`).push({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes, RSSID, podcastLength})
                                            .then((snap) => {

                                                const ref = snap.ref;
                                                const id = snap.key;

                                                ref.update({id});
                                                firebase.database().ref(`/users/${podcastArtist}`).child('podcasts').child(id).update({id});

                                            });

                                    }

                                });



                                /*
                                firebase.database().ref(`podcasts`).child(jointTitle).once("value", function (snapshot) {
                                    if(snapshot.val()){
                                        console.warn("Podcast Exists")
                                    }
                                    else{
                                        firebase.database().ref(`podcasts`).child(jointTitle).update({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes})
                                            .then((snap) => {

                                                const ref = firebase.database().ref(`podcasts`).child(jointTitle);
                                                const id = jointTitle;

                                                ref.update({id});
                                                firebase.database().ref(`/users/${podcastArtist}`).child('podcasts').child(id).update({id});

                                            })
                                    }
                                });
                                */


                            }
                            //another way of getting url
                            else if(items[i].getElementsByTagName('link').length > 0){
                                var link = items[i].getElementsByTagName('link');
                                console.warn(link[0].textContent);
                                const podcastURL = link[0].textContent;


                                // upload to database if doesn't exist (follow podcastCreate)
                                firebase.database().ref(`podcasts`).orderByChild("RSSID").equalTo(jointTitle.toString()).once("value", function (snapshot) {
                                    if(snapshot.val()){
                                        console.warn("EXISTS")
                                    }
                                    else{
                                        firebase.database().ref(`podcasts`).push({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes, RSSID, podcastLength})
                                            .then((snap) => {

                                                const ref = snap.ref;
                                                const id = snap.key;

                                                ref.update({id});
                                                firebase.database().ref(`/users/${podcastArtist}`).child('podcasts').child(id).update({id});

                                            });

                                    }

                                });


                                /*
                                firebase.database().ref(`podcasts`).child(jointTitle).once("value", function (snapshot) {
                                    if(snapshot.val()){
                                        console.warn("Podcast Exists")
                                    }
                                    else{
                                        firebase.database().ref(`podcasts`).child(jointTitle).update({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes})
                                            .then((snap) => {

                                                const ref = firebase.database().ref(`podcasts`).child(jointTitle);
                                                const id = jointTitle;

                                                ref.update({id});
                                                firebase.database().ref(`/users/${podcastArtist}`).child('podcasts').child(id).update({id});

                                            })
                                    }
                                });
                                */


                            }
                            else{
                                console.warn("Error: no download url")
                            }
                        }


                    });






            });

        });



    }

    fetchData(){

        this.props.podcastFetchNew();

        this.creataDataSourceNewPodcasts(this.props);


        Variables.state.newPodcasts = [];
        Variables.state.newPodcastsArtsts = [];
        const refNew = firebase.database().ref(`podcasts/`);

        refNew.limitToLast(250).once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val()){
                    if(Variables.state.newPodcastsArtsts.includes(data.val().podcastArtist)){
                        Variables.state.newPodcasts.splice(Variables.state.newPodcastsArtsts.indexOf(data.val().podcastArtist), 1);
                        Variables.state.newPodcastsArtsts.splice(Variables.state.newPodcastsArtsts.indexOf(data.val().podcastArtist), 1);
                        Variables.state.newPodcasts.push(data.val());
                        Variables.state.newPodcastsArtsts.push(data.val().podcastArtist);
                    }
                    else{
                        Variables.state.newPodcasts.push(data.val());
                        Variables.state.newPodcastsArtsts.push(data.val().podcastArtist)
                    }
                }
            });
            Variables.state.newPodcasts.reverse();
        });



        Variables.state.homeFollowedContent = [];
        const {currentUser} = firebase.auth();
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);

        refFol.on("value", function (snapshot) {
            snapshot.forEach(function (data) {

                firebase.database().ref(`users/${data.key}/podcasts`).limitToLast(1).once("value", function (snap) {
                    snap.forEach(function (pod) {

                        firebase.database().ref(`podcasts/${pod.key}`).once("value", function (data2) {
                            if(data2.val()){
                                Variables.state.homeFollowedContent.push(data2.val());
                                for(let i = Variables.state.homeFollowedContent.length-1; i > 0 && Variables.state.homeFollowedContent[i].id > Variables.state.homeFollowedContent[i-1].id; i--){
                                    let temp = Variables.state.homeFollowedContent[i-1];
                                    Variables.state.homeFollowedContent[i-1] = Variables.state.homeFollowedContent[i];
                                    Variables.state.homeFollowedContent[i] = temp;
                                }
                            }
                        })

                    });

                });

            })
        });





        Variables.state.selectedByTess = [];

        //TheMaddyIce
        firebase.database().ref(`users/upwadf76CrOBee8aSwzcCZR4kM33/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Two Bros and a Pod
        firebase.database().ref(`users/JHPYRdcWtOheHCkrddZjJaLXtPg2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Big Tay
        firebase.database().ref(`users/1F1q9gRKWyMQ8cSATXqGT4PnCaK2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Tim Dulak
        firebase.database().ref(`users/3tHL3dIcINUdMeKZn6ckf81e2Sk2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Joey Bradfield
        firebase.database().ref(`users/gdGuN9v14qU9pSHXSk1KbDGlUsu1/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Dom Gold
        firebase.database().ref(`users/6px5go2E3USvYvkcNQejkLkJx3H3/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Eat the fruit
        firebase.database().ref(`users/7ubx6NftyyQbAwufE7BquuSJ6gJ3/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Abbey
        firebase.database().ref(`users/P2HAtFE3YKXe8uP9Mu1HyCE2cD83/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //ShakDaddy
        firebase.database().ref(`users/u1osicyhjcR5j3EHx6m1SMe2LpJ3/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Nick Ruspantini
        firebase.database().ref(`users/pgIx9JAiq9aQWcyUZX8AuIdqNmP2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Tony
        firebase.database().ref(`users/sJsB8XK4XRZ8tNpeGC14JNsa6Jj1/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });




        Variables.state.fromTess = [];
        firebase.database().ref(`users/dlUCIXXnXGTgJZwYLE1KUYWGkQ73/podcasts`).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.fromTess.push(snapshot.val())
                    }
                })
            })
        });

    }

    _onRefresh() {
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.setState({refreshing: true, widget: Variables.state.widgets,
            hasNewFromFollowing: false,
            hasLatest: false,
            hasFromTess: false,
            hasSelectedByTess: false,
            hasTech: false,
            hasRecent: false,
            widgets: Variables.state.widgets,
            scroll: true,
            order: Object.keys([]),
            loading: false,
            data: Variables.state.homeFollowedContent,
            dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts),
            dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),
            dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess),
            dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess),
            dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory),
            url: '',
            userProfileImage: ''
        });

        const {currentUser} = firebase.auth();
        Variables.state.widgets = [];
        firebase.database().ref(`users/${currentUser.uid}/widgets`).once("value", function (snapshot) {

            snapshot.forEach(function (data) {
                if(data.val())
                    Variables.state.widgets[data.val().position] = data.val();
            })

        });


        var hasNewFromFollow = false;
        const newFromFollowRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("New From Following");
        newFromFollowRef.once("value", function (data) {
            if(data.val()){
                hasNewFromFollow = true;


                Variables.state.homeFollowedContent = [];
                const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);

                refFol.on("value", function (snapshot) {
                    snapshot.forEach(function (data) {

                        firebase.database().ref(`users/${data.key}/podcasts`).limitToLast(1).once("value", function (snap) {
                            snap.forEach(function (pod) {

                                firebase.database().ref(`podcasts/${pod.key}`).once("value", function (data2) {
                                    if(data2.val()){
                                        Variables.state.homeFollowedContent.push(data2.val());
                                        for(let i = Variables.state.homeFollowedContent.length-1; i > 0 && Variables.state.homeFollowedContent[i].id > Variables.state.homeFollowedContent[i-1].id; i--){
                                            let temp = Variables.state.homeFollowedContent[i-1];
                                            Variables.state.homeFollowedContent[i-1] = Variables.state.homeFollowedContent[i];
                                            Variables.state.homeFollowedContent[i] = temp;
                                        }
                                    }
                                })

                            });

                        });

                    })
                });


            }
        });


        var hasLatest = false;
        const latestRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("Latest");
        latestRef.once("value", function (data) {
            if(data.val()){
                hasLatest = true;


                Variables.state.newPodcasts = [];
                Variables.state.newPodcastsArtsts = [];
                const refNew = firebase.database().ref(`podcasts/`);

                refNew.limitToLast(250).once("value", function (snapshot) {
                    snapshot.forEach(function (data) {
                        if(data.val()){
                            if(Variables.state.newPodcastsArtsts.includes(data.val().podcastArtist)){
                                Variables.state.newPodcasts.splice(Variables.state.newPodcastsArtsts.indexOf(data.val().podcastArtist), 1);
                                Variables.state.newPodcastsArtsts.splice(Variables.state.newPodcastsArtsts.indexOf(data.val().podcastArtist), 1);
                                Variables.state.newPodcasts.push(data.val());
                                Variables.state.newPodcastsArtsts.push(data.val().podcastArtist);
                            }
                            else{
                                Variables.state.newPodcasts.push(data.val());
                                Variables.state.newPodcastsArtsts.push(data.val().podcastArtist)
                            }
                        }
                    });
                    Variables.state.newPodcasts.reverse();
                });


            }
        });


        var hasSelectedByTess = false;
        const selectedByTessRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("Selected By Tess");
        selectedByTessRef.once("value", function (data) {
            if(data.val()){
                hasSelectedByTess = true;


                Variables.state.selectedByTess = [];

                //TheMaddyIce
                firebase.database().ref(`users/upwadf76CrOBee8aSwzcCZR4kM33/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Two Bros and a Pod
                firebase.database().ref(`users/JHPYRdcWtOheHCkrddZjJaLXtPg2/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Big Tay
                firebase.database().ref(`users/1F1q9gRKWyMQ8cSATXqGT4PnCaK2/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Tim Dulak
                firebase.database().ref(`users/3tHL3dIcINUdMeKZn6ckf81e2Sk2/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Joey Bradfield
                firebase.database().ref(`users/gdGuN9v14qU9pSHXSk1KbDGlUsu1/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Dom Gold
                firebase.database().ref(`users/6px5go2E3USvYvkcNQejkLkJx3H3/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Eat the fruit
                firebase.database().ref(`users/7ubx6NftyyQbAwufE7BquuSJ6gJ3/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Abbey
                firebase.database().ref(`users/P2HAtFE3YKXe8uP9Mu1HyCE2cD83/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //ShakDaddy
                firebase.database().ref(`users/u1osicyhjcR5j3EHx6m1SMe2LpJ3/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Nick Ruspantini
                firebase.database().ref(`users/pgIx9JAiq9aQWcyUZX8AuIdqNmP2/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


                //Tony
                firebase.database().ref(`users/sJsB8XK4XRZ8tNpeGC14JNsa6Jj1/podcasts`).limitToLast(1).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.selectedByTess.push(snapshot.val())
                            }
                        })
                    })
                });


            }
        });


        var hasFromTess = false;
        const fromTessRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("From Tess");
        fromTessRef.once("value", function (data) {
            if(data.val()){
                hasFromTess = true;


                Variables.state.fromTess = [];
                firebase.database().ref(`users/dlUCIXXnXGTgJZwYLE1KUYWGkQ73/podcasts`).once("value", function (data) {
                    data.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                            if(snapshot.val()){
                                Variables.state.fromTess.push(snapshot.val())
                            }
                        })
                    })
                });


            }
        });


        var hasTech = false;
        const techRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("Tech");
        techRef.once("value", function (data) {
            if(data.val()){
                hasTech = true;


                Variables.state.currCategory = [];
                const refCat = firebase.database().ref(`podcasts/`);

                refCat.on("value", function (snapshot) {
                    snapshot.forEach(function (data) {
                        if(data.val().podcastCategory == 'Tech') {
                            Variables.state.currCategory.push(data.val());
                        }
                    })
                });


            }
        });


        var hasRecent = false;
        const recentRef = firebase.database().ref(`users/${currentUser.uid}/widgets`).child("Recently Played");
        recentRef.once("value", function (data) {
            if(data.val()){
                hasRecent = true;


                firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed`).on("value", function (snapshot) {
                    Variables.state.recentlyPlayed = [];
                    snapshot.forEach(function (snap) {
                        firebase.database().ref(`podcasts/${snap.val().id}`).on("value", function (data) {
                            if(data.val()){
                                Variables.state.recentlyPlayed.push(data.val())
                            }

                        })
                    });
                    Variables.state.recentlyPlayed.reverse();
                });

            }
        });


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.timeout1 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),  data: Variables.state.homeFollowedContent, dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory), widgets: Variables.state.widgets, order: Object.keys(this.state.widgets),})},1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},2400);
        this.timeout3 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},3800);
        this.timeout4 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},3200);

        this.timeout5 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),  data: Variables.state.homeFollowedContent, dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory), widgets: Variables.state.widgets, order: Object.keys(this.state.widgets),})},3000);
        this.timeout6 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},6400);
        this.timeout7 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},6800);
        this.timeout8 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},7200);

        this.timeout9 = setTimeout(() => {this.setState({hasNewFromFollowing: hasNewFromFollow, hasRecent: hasRecent, refreshing: false})}, 1000);
        this.timeout10 = setTimeout(() => {this.setState({hasLatest: hasLatest})}, 1000);
        this.timeout11 = setTimeout(() => {this.setState({hasFromTess: hasFromTess})}, 1000);
        this.timeout12 = setTimeout(() => {this.setState({hasSelectedByTess: hasSelectedByTess})}, 1000);
        this.timeout13 = setTimeout(() => {this.setState({hasTech: hasTech})}, 1000);



    }

    pressTwit(){
        const url = 'https://twitter.com/discovertess';
        Linking.openURL(url).catch(err => console.warn('An error occurred', err));
    }

    pressInsta = () => {
        const url = 'https://www.instagram.com/discovertess/';
        Linking.openURL(url).catch(err => console.warn('An error occurred', err));
    };

    pressFB(){
        const url = 'https://www.facebook.com/discovertess/';
        Linking.openURL(url).catch(err => console.warn('An error occurred', err));
    }

    renderRSSFetcher(){
        const {currentUser} = firebase.auth();

        if(currentUser.uid == "pgIx9JAiq9aQWcyUZX8AuIdqNmP2" || currentUser.uid == "sJsB8XK4XRZ8tNpeGC14JNsa6Jj1"){
            return(
                <View style={{marginVertical: 10}}>
                    <TouchableOpacity onPress={this.rssFetch}>
                        <Text style={styles.titleFetch}>Fetch Feeds</Text>
                    </TouchableOpacity>
                </View>

            )
        }
    }



    returnList(title){
        if(title == "New From Following"){
            return Variables.state.homeFollowedContent;
        }
        else if(title == "Latest"){
            return Variables.state.newPodcasts;
        }
        else if(title == "From Tess"){
            return Variables.state.fromTess;
        }
        else if(title == "Selected By Tess"){
            return Variables.state.selectedByTess;
        }
        else if(title == "Tech"){
            return Variables.state.currCategory;
        }
        else if(title == "Recently Played"){
            return Variables.state.recentlyPlayed;
        }

    }


    renderWidget = (position, data) => {
        if(data[position]){

            var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
            let input = dataSource.cloneWithRows(this.returnList(data[position].title));


            return(
                <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignSelf:'flex-start'}}>
                            <Text style={styles.title}>{data[position].title}</Text>
                        </View>

                        <View style={{alignSelf:'flex-end', flex:1}}>
                            <TouchableOpacity onPress={() => {

                                const {title} = data[position];

                                this.props.navigator.push({
                                    screen: 'ViewAll',
                                    title: title,
                                    passProps: {data: this.returnList(data[position].title), title},
                                });


                            }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                <Text style={styles.viewAll}>View all</Text>
                                <Icon style={{
                                    fontSize: 18,
                                    backgroundColor: 'transparent',
                                    marginTop: 20,
                                    color: '#506dcf',
                                    marginLeft: 10,
                                    marginRight: 15,
                                }} name="angle-right">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        enableEmptySections
                        dataSource={input}
                        renderRow={this.renderRowNewPodcasts}
                    />

                </View>
            );


        }
    };



    renderRowNewPodcasts = (podcast) => {
        return <ListItemUsers podcast={podcast} navigator={this.props.navigator}  />;
    };


    swipe = () =>{
        this.setState({cardsLeft: this.state.cardsLeft - 1});
    };


    _renderProfileImage = () => {

            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', height: 130, width: 130, borderRadius: 4, borderWidth:8, borderColor:'rgba(320,320,320,0.8)' }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 80,
                        color: 'white',
                        marginTop: 20,
                    }} name="user-circle">
                    </Icon>
                </View>
            )

    };

    renderAddWidget(title){

        if(title == ''){
            return(
                <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>

                    <TouchableOpacity onPress={() => {
                        const {currentUser} = firebase.auth();
                        const user = currentUser.uid;
                        Analytics.logEvent('addWidgetPress', {
                            'user_id': user
                        });
                        this.props.navigator.push({
                            screen: 'AddWidget',
                            title: 'Add a Widget'
                        })
                    }}>
                        <Text style={styles.titleAdd}>Add a widget</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginTop: 5, marginBottom: 50}}>

                    <TouchableOpacity onPress={() => {
                        const {currentUser} = firebase.auth();
                        const user = currentUser.uid;
                        Analytics.logEvent('addWidgetPress', {
                            'user_id': user
                        });
                        this.props.navigator.push({
                            screen: 'AddWidget',
                            title: 'Add a Widget'
                        })
                    }}>
                        <Text style={styles.titleAdd}>Add a widget</Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }

    renderRowCard = (podcast) => {
        return (
            <View style = {{marginHorizontal: 10, marginBottom: 7}}>
                <View style={{ backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 10, width: width-20 }}>
                    <View>
                        <Text style={styles.titleCard}>{podcast.podcastTitle.toString().slice(0,35)}</Text>
                        <TouchableWithoutFeedback>
                            <View style={{padding: 10, flexDirection: 'row'}}>

                                <View style = {{alignSelf: 'center'}}>
                                    {this._renderProfileImage()}
                                </View>

                                <View style = {{alignSelf: 'center', flex:1, marginHorizontal: 10}}>
                                    <Text style={styles.artistTitle}>{podcast.podcastDescription.slice(0,140)}</Text>
                                    <View style={{flexDirection: 'row', marginTop: 15}}>
                                        <TouchableOpacity style= {{backgroundColor:'#3e4164', flex: 1, alignSelf: 'flex-start', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5, marginHorizontal: 7}} onPress={() => {


                                            const {currentUser} = firebase.auth();
                                            const user = currentUser.uid;
                                            const podcastTitle = podcast.podcastTitle;
                                            const podcastDescription = podcast.podcastDescription;
                                            const podcastCategory = podcast.podcastCategory;
                                            const rss = podcast.rss;
                                            const podcastURL = podcast.podcastURL;
                                            const podcastArtist = podcast.podcastArtist;
                                            const id = podcast.id;

                                            if(rss){

                                                AsyncStorage.setItem("currentPodcast", id);
                                                AsyncStorage.setItem("currentTime", "0");
                                                Variables.state.seekTo = 0;
                                                Variables.state.currentTime = 0;

                                                firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                                    if(snap.val()){
                                                        Variables.state.currentUsername = snap.val().username;
                                                    }
                                                    else {
                                                        Variables.state.currentUsername = podcastArtist;
                                                    }
                                                });

                                                firebase.database().ref(`podcasts/${id}/likes`).on("value", function (snap) {
                                                    Variables.state.likers = [];
                                                    Variables.state.liked = false;
                                                    snap.forEach(function (data) {
                                                        if (data.val()) {
                                                            if(data.val().user == currentUser.uid){
                                                                Variables.state.liked = true;
                                                            }
                                                            Variables.state.likers.push(data.val());
                                                        }
                                                    });
                                                });


                                                firebase.database().ref(`podcasts/${id}/plays`).on("value", function (snap) {
                                                    Variables.state.podcastsPlays = 0;
                                                    snap.forEach(function (data) {
                                                        if (data.val()) {
                                                            Variables.state.podcastsPlays++;
                                                        }
                                                    });
                                                });


                                                firebase.database().ref(`podcasts/${id}/plays`).child(user).update({user});



                                                firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).once("value", function (snap) {
                                                    snap.forEach(function (data) {
                                                        if(data.val().id == id){
                                                            firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/${data.key}`).remove()
                                                        }
                                                    });
                                                    firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).push({id});
                                                });


                                                Variables.pause();
                                                Variables.setPodcastFile(podcastURL);
                                                Variables.state.isPlaying = false;
                                                Variables.state.podcastTitle = podcastTitle;
                                                Variables.state.podcastArtist = podcastArtist;
                                                Variables.state.podcastCategory = podcastCategory;
                                                Variables.state.podcastDescription = podcastDescription;
                                                Variables.state.podcastID = id;
                                                Variables.state.favorited = false;
                                                Variables.state.userProfileImage = '';
                                                Variables.play();
                                                Variables.state.isPlaying = true;
                                                Variables.state.rss = true;



                                                firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                                                    if(snapshot.val()){
                                                        Variables.state.userProfileImage = snapshot.val().profileImage
                                                    }
                                                });


                                                firebase.database().ref(`users/${currentUser.uid}/favorites`).on("value", function (snapshot) {
                                                    snapshot.forEach(function (data) {
                                                        if(data.key == id){
                                                            Variables.state.favorited = true;
                                                        }
                                                    })
                                                })



                                            }
                                            else{
                                                if(id){
                                                    AsyncStorage.setItem("currentPodcast", id);
                                                    AsyncStorage.setItem("currentTime", "0");

                                                    firebase.storage().ref(`/users/${podcastArtist}/${id}`).getDownloadURL().catch(() => {console.warn("file not found")})
                                                        .then(function(url) {


                                                            firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                                                if(snap.val()){
                                                                    Variables.state.currentUsername = snap.val().username;
                                                                }
                                                                else {
                                                                    Variables.state.currentUsername = podcastArtist;
                                                                }
                                                            });

                                                            firebase.database().ref(`podcasts/${id}/likes`).on("value", function (snap) {
                                                                Variables.state.likers = [];
                                                                Variables.state.liked = false;
                                                                snap.forEach(function (data) {
                                                                    if (data.val()) {
                                                                        if(data.val().user == currentUser.uid){
                                                                            Variables.state.liked = true;
                                                                        }
                                                                        Variables.state.likers.push(data.val());
                                                                    }
                                                                });
                                                            });


                                                            firebase.database().ref(`podcasts/${id}/plays`).on("value", function (snap) {
                                                                Variables.state.podcastsPlays = 0;
                                                                snap.forEach(function (data) {
                                                                    if (data.val()) {
                                                                        Variables.state.podcastsPlays++;
                                                                    }
                                                                });
                                                            });


                                                            firebase.database().ref(`podcasts/${id}/plays`).child(user).update({user});



                                                            firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).once("value", function (snap) {
                                                                snap.forEach(function (data) {
                                                                    if(data.val().id == id){
                                                                        firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/${data.key}`).remove()
                                                                    }
                                                                });
                                                                firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).push({id});
                                                            });


                                                            Variables.pause();
                                                            Variables.setPodcastFile(url);
                                                            Variables.state.isPlaying = false;
                                                            Variables.state.podcastTitle = podcastTitle;
                                                            Variables.state.podcastArtist = podcastArtist;
                                                            Variables.state.podcastCategory = podcastCategory;
                                                            Variables.state.podcastDescription = podcastDescription;
                                                            Variables.state.podcastID = id;
                                                            Variables.state.favorited = false;
                                                            Variables.state.userProfileImage = '';
                                                            Variables.play();
                                                            Variables.state.isPlaying = true;
                                                            Variables.state.rss = false;


                                                            const storageRef = firebase.storage().ref(`/users/${Variables.state.podcastArtist}/image-profile-uploaded`);
                                                            if(storageRef.child('image-profile-uploaded')){
                                                                storageRef.getDownloadURL()
                                                                    .then(function(url) {
                                                                        if(url){
                                                                            Variables.state.userProfileImage = url;
                                                                        }
                                                                    }).catch(function(error) {
                                                                    //
                                                                });
                                                            }

                                                            firebase.database().ref(`users/${currentUser.uid}/favorites`).on("value", function (snapshot) {
                                                                snapshot.forEach(function (data) {
                                                                    if(data.key == id){
                                                                        Variables.state.favorited = true;
                                                                    }
                                                                })
                                                            })


                                                        });
                                                }
                                                else{
                                                    firebase.storage().ref(`/users/${podcastArtist}/${podcastTitle}`).getDownloadURL().catch(() => {console.warn("file not found")})
                                                        .then(function(url) {


                                                            firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                                                if(snap.val()){
                                                                    Variables.state.currentUsername = snap.val().username;
                                                                }
                                                                else {
                                                                    Variables.state.currentUsername = podcastArtist;
                                                                }
                                                            });

                                                            Variables.pause();
                                                            Variables.setPodcastFile(url);
                                                            Variables.state.isPlaying = false;
                                                            Variables.state.podcastTitle = podcastTitle;
                                                            Variables.state.podcastArtist = podcastArtist;
                                                            Variables.state.podcastCategory = podcastCategory;
                                                            Variables.state.podcastDescription = podcastDescription;
                                                            Variables.state.podcastID = '';
                                                            Variables.state.liked = false;
                                                            Variables.state.favorited = false;
                                                            Variables.state.likers = [];
                                                            Variables.state.userProfileImage = '';
                                                            Variables.play();
                                                            Variables.state.isPlaying = true;
                                                            Variables.state.rss = false;


                                                            const storageRef = firebase.storage().ref(`/users/${Variables.state.podcastArtist}/image-profile-uploaded`);
                                                            if(storageRef.child('image-profile-uploaded')){
                                                                storageRef.getDownloadURL()
                                                                    .then(function(url) {
                                                                        if(url){
                                                                            Variables.state.userProfileImage = url;
                                                                        }
                                                                    }).catch(function(error) {
                                                                    //
                                                                });
                                                            }

                                                        });
                                                }

                                            }



                                        }}>
                                            <Icon style={{
                                                textAlign: 'center',
                                                fontSize: 16,
                                                alignSelf: 'center',
                                                color: 'white',
                                            }} name="play">
                                                <Text style={styles.whiteTitle}> Play</Text>
                                            </Icon>
                                        </TouchableOpacity>
                                        <TouchableOpacity style= {{backgroundColor:'#3e4164', flex: 1, alignSelf: 'flex-end', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5, marginHorizontal: 7}} onPress={() => {

                                            const {currentUser} = firebase.auth();
                                            const  id  = podcast.id;

                                            firebase.database().ref(`users/${currentUser.uid}/queue/`).once("value", function (snap) {
                                                snap.forEach(function (data) {
                                                    if(data.val().id == id){
                                                        firebase.database().ref(`users/${currentUser.uid}/queue/${data.key}`).remove()
                                                    }
                                                });
                                                firebase.database().ref(`users/${currentUser.uid}/queue/`).push({id});
                                            });

                                        }}>
                                            <Icon style={{
                                                textAlign: 'center',
                                                fontSize: 16,
                                                alignSelf: 'center',
                                                color: 'white',
                                            }} name="plus">
                                                <Text style={styles.whiteTitle}> Queue</Text>
                                            </Icon>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>

        );
    };



    render() {

        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style={{paddingVertical: 20, alignSelf:'center'}} color='#3e4164' size ="large" />
                </View>
            )
        }
        else{

            if(this.state.widgets.length > 0){

                return (
                    <View
                        style={styles.container}>

                        <ScrollView
                            style={{paddingTop:10}}
                            scrollEnabled = {this.state.scroll}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />}
                        >

                            <View>
                                <ScrollView scrollEnabled = {false}>
                                    <SwipeCards
                                        cards={this.state.data}
                                        renderCard={this.renderRowCard}
                                        dragY={false}
                                        smoothTransition={true}
                                        hasMaybeAction={true}
                                        showYup={false}
                                        handleNope={() => {
                                            this.setState({cardsLeft: this.state.cardsLeft - 1});
                                            this.forceUpdate();
                                        }}
                                        handleYup={() => {
                                            this.setState({cardsLeft: this.state.cardsLeft - 1});
                                            this.forceUpdate();
                                        }}
                                        showNope={false}
                                        showMaybe={false}
                                        renderNoMoreCards={() =>
                                            <View style = {{marginHorizontal: 10, marginVertical: 7}}>
                                                <View style={{ backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 10, width: width-20, paddingVertical: 60 }}>
                                                    <Text style={styles.title}>You're all caught up!</Text>
                                                </View>
                                            </View>
                                        }
                                    />
                                </ScrollView>
                                <View style={{backgroundColor: '#d15564', width: 40, height: 40, marginTop: -6,
                                    borderRadius: 25, alignSelf: 'flex-end', position: 'absolute'}} >
                                    <Text style={styles.numLeftText}>
                                        {this.state.cardsLeft}
                                    </Text>
                                </View>
                            </View>

                        <SortableListView
                            style={{flex:1}}
                            data={this.state.widgets}
                            order={this.state.order}
                            activeOpacity={0.8}
                            onMoveStart={() => {this.setState({scroll:false})}}
                            onMoveEnd={() => {this.setState({scroll:true})}}
                            onMoveCancel={() => {this.setState({scroll:true})}}
                            onRowMoved={e => {
                                this.state.order.splice(e.to, 0, this.state.order.splice(e.from, 1)[0]);
                                this.forceUpdate();
                                for(let i = 0; i < this.state.order.length; i++){

                                    const {currentUser} = firebase.auth();
                                    let position = i;
                                    firebase.database().ref(`users/${currentUser.uid}/widgets/${this.state.widgets[this.state.order[i]].title}`).update({position})

                                }
                            }}

                            renderRow={(row) => {

                                let data = Variables.state.widgets;
                                let position = row.position;


                                if(data[position]){

                                    // Catch Up Widget
                                    if(data[position].title == "Catch Up"){
                                        return(
                                                <View>

                                                </View>
                                        )
                                    }

                                    else {

                                        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                                        let input = dataSource.cloneWithRows(this.returnList(data[position].title));

                                        return(
                                            <TouchableHighlight underlayColor='#fff' style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 12, marginVertical: 5}} {...this.props.sortHandlers}>
                                                <View>
                                                    <View style={{flexDirection:'row'}}>
                                                        <View style={{alignSelf:'flex-start'}}>
                                                            <Text style={styles.title}>{data[position].title}</Text>
                                                        </View>

                                                        <View style={{alignSelf:'flex-end', flex:1}}>
                                                            <TouchableOpacity onPress={() => {

                                                                const {title} = data[position];

                                                                this.props.navigator.push({
                                                                    screen: 'ViewAll',
                                                                    title: title,
                                                                    passProps: {data: this.returnList(data[position].title), title},
                                                                });


                                                            }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                                                <Text style={styles.viewAll}>View all</Text>
                                                                <Icon style={{
                                                                    fontSize: 18,
                                                                    backgroundColor: 'transparent',
                                                                    marginTop: 8,
                                                                    color: '#506dcf',
                                                                    marginLeft: 10,
                                                                    marginRight: 15,
                                                                }} name="angle-right">
                                                                </Icon>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>

                                                    <ListView
                                                        showsHorizontalScrollIndicator={false}
                                                        horizontal={true}
                                                        enableEmptySections
                                                        dataSource={input}
                                                        renderRow={this.renderRowNewPodcasts}
                                                    />
                                                </View>

                                            </TouchableHighlight>
                                        );

                                    }

                                }

                            }}
                        />



                        {this.renderAddWidget(Variables.state.podcastArtist)}
                        {this.renderRSSFetcher()}

                        </ScrollView>

                        <Player/>
                        <PlayerBottom navigator={this.props.navigator}/>

                    </View>

                );


            }
            else{

                return (
                    <View
                        style={styles.container}>

                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />}
                        >
                            <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
                                <Text style={styles.titleMini}>This is your home screen, you can add whatever you want.</Text>

                                <TouchableOpacity onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'AddWidget',
                                        title: 'Add a Widget'
                                    })
                                }}>
                                    <Text style={styles.titleAdd}>Add a widget</Text>
                                </TouchableOpacity>
                                {this.renderRSSFetcher()}
                            </View>
                        </ScrollView>


                        <Player/>
                        <PlayerBottom navigator={this.props.navigator}/>

                    </View>

                );

            }

        }


    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
    },
    homeContainer:{
        flex:1,
        marginTop: -15,

    },
    barContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 10
    },

    title: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        marginTop: 10,
        paddingLeft: 20,
        backgroundColor: 'transparent',
    },

    titleMini: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginTop: 20,
        paddingHorizontal: 20,
        marginHorizontal: 40,
        backgroundColor: 'transparent',
    },
    title2: {
        color: '#9496A3',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        backgroundColor: 'transparent',
        marginRight: 10
    },

    title3: {
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },

    titleAdd: {
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginVertical: 15,
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },
    titleFetch: {
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginTop: 5,
        marginBottom: 15,
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },

    viewAll: {
        color: '#506dcf',
        textAlign: 'right',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        marginTop: 10,
        paddingBottom: 10,
        backgroundColor: 'transparent',
    },

    catTitle: {
        fontSize: 18,
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
    },


    cardTitle: {
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#828393',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        backgroundColor: 'transparent',
    },
    whiteTitle: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        backgroundColor: 'transparent',
    },

    yupTitle: {
        color: '#3e4164',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        backgroundColor: 'transparent'
    },
    nopeTitle: {
        color: '#d15564',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        backgroundColor: 'transparent'
    },
    textContainer:{
        padding:10,
        backgroundColor: 'transparent',
        borderColor:'transparent'

    },

    titleCard: {
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginLeft: 10,
        marginTop: 10,
        backgroundColor: 'transparent'
    },


    numLeftText: {
        color: '#fff',
        textAlign: 'center',
        opacity: 1,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        marginTop: 8,
        backgroundColor: 'transparent'
    },

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, {podcastFetchNew}) (Home);