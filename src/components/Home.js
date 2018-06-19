import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet, ListView, ScrollView, TouchableOpacity, Linking, RefreshControl, AsyncStorage, ActivityIndicator, Platform, Dimensions} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';
import Player from "./Player";
import ListItemCard from "./ListItemCard";
var Analytics = require('react-native-firebase-analytics');


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

        Variables.state.homeFollowedContent = [];
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);

        refFol.once("value", function (snapshot) {
            snapshot.forEach(function (data) {

                firebase.database().ref(`users/${data.key}/podcasts`).limitToLast(3).once("value", function (snap) {
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

                    if(snap.val()){
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

                                AsyncStorage.setItem("currentPodcast", id);
                                AsyncStorage.setItem("currentTime", startTime.toString());

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

                                AsyncStorage.setItem("currentPodcast", id);
                                AsyncStorage.setItem("currentTime", startTime.toString());

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
                    }


                })

            }, 3000);

        }
    };



    componentWillUnmount(){
        Linking.removeEventListener('url', this.handleOpenURL);

        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
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
            navBarHideOnScroll: true,
            navBarButtonColor: '#007aff',
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            loading: true,
            dataSource: dataSource.cloneWithRows(Variables.state.homeFollowedContent),
            refreshing: false,
        };
        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.homeFollowedContent),})},1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.homeFollowedContent), loading: false})},2500);

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


                            console.warn("Profile Image: " + profileImage);


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



                        // create account for user if it doesn't exist
                        // reserve username & create user if needed
                        firebase.database().ref(`users`).child(usernameData).once("value", function (snapshot) {
                            if(snapshot.val()){
                                if(snapshot.val().username && snapshot.val().bio && snapshot.val().profileImage){
                                    console.warn("Account Exists: " + usernameData)
                                }
                                else{
                                    firebase.database().ref(`users`).child(usernameData).child("/username").update({username});
                                    firebase.database().ref(`users`).child(usernameData).child("/bio").update({bio});
                                    firebase.database().ref(`users`).child(usernameData).child("/profileImage").update({profileImage});
                                    firebase.database().ref(`usernames`).child(usernameData.toLowerCase()).update({username: usernameData.toLowerCase()});
                                }
                            }
                            else{
                                firebase.database().ref(`users`).child(usernameData).child("/username").update({username});
                                firebase.database().ref(`users`).child(usernameData).child("/bio").update({bio});
                                firebase.database().ref(`users`).child(usernameData).child("/profileImage").update({profileImage});
                                firebase.database().ref(`usernames`).child(usernameData.toLowerCase()).update({username: usernameData.toLowerCase()});
                            }
                        });



                        // category
                        let category = '';
                        if(doc.getElementsByTagName('itunes:category').length > 0){
                            category = doc.getElementsByTagName('itunes:category')[0].getAttribute('text');
                        }
                        const podcastCategory = category;
                        console.warn("Category: " + podcastCategory);



                        // get info for each episode
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
                            console.warn("Title: " + title[0].textContent);
                            let podcastTitle = title[0].textContent;

                            //description
                            const description = items[i].getElementsByTagName('description');
                            console.warn("Description: " + description[0].textContent);
                            let podcastDescription = description[0].textContent;

                            //length
                            let length = '';
                            if(items[i].getElementsByTagName('itunes:duration').length > 0){
                                length = "itunes duration:" + items[i].getElementsByTagName('itunes:duration');
                                length = length.replace("itunes duration:", "");
                                length = length.replace("<itunes:duration>", "");
                                length = length.replace("</itunes:duration>", "");
                            }
                            const podcastLength = length;
                            console.warn("Length: " + podcastLength);

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

                            // get url -> upload
                            if(items[i].getElementsByTagName('enclosure').length > 0){
                                var link = items[i].getElementsByTagName('enclosure')[0].getAttribute('url');
                                console.warn("URL: " + link);
                                const podcastURL = link;


                                // upload to database if doesn't exist (follow podcastCreate)
                                firebase.database().ref(`podcasts`).orderByChild("RSSID").equalTo(jointTitle.toString()).once("value", function (snapshot) {
                                    if(snapshot.val()){
                                        console.warn("EPISODE EXISTS")
                                    }
                                    else{
                                        let item = firebase.database().ref(`podcasts`).push({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes, RSSID, podcastLength, time: firebase.database.ServerValue.TIMESTAMP});
                                        const ref = item.ref;
                                        const id = item.key;
                                        ref.update({id});
                                        firebase.database().ref(`/users/${podcastArtist}`).child('podcasts').child(id).update({id});

                                    }

                                });


                            }
                            // another way of getting url -> upload
                            else if(items[i].getElementsByTagName('link').length > 0){
                                var link = items[i].getElementsByTagName('link');
                                console.warn("URL: " + link[0].textContent);
                                const podcastURL = link[0].textContent;


                                // upload to database if doesn't exist (follow podcastCreate)
                                firebase.database().ref(`podcasts`).orderByChild("RSSID").equalTo(jointTitle.toString()).once("value", function (snapshot) {
                                    if(snapshot.val()){
                                        console.warn("EPISODE EXISTS")
                                    }
                                    else{
                                        let item = firebase.database().ref(`podcasts`).push({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes, RSSID, podcastLength, time: firebase.database.ServerValue.TIMESTAMP});
                                        const ref = item.ref;
                                        const id = item.key;
                                        ref.update({id});
                                        firebase.database().ref(`/users/${podcastArtist}`).child('podcasts').child(id).update({id});

                                    }

                                });

                            }
                            else{
                                console.warn("Error: no download url")
                            }
                        }
                    });
            });
        });





    }


    _onRefresh() {
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.setState({
            refreshing: true,
            loading: false,
            dataSource: dataSource.cloneWithRows(Variables.state.homeFollowedContent),
        });

        const {currentUser} = firebase.auth();

        Variables.state.homeFollowedContent = [];
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);

        refFol.once("value", function (snapshot) {
            snapshot.forEach(function (data) {

                firebase.database().ref(`users/${data.key}/podcasts`).limitToLast(3).once("value", function (snap) {
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

        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.homeFollowedContent), refreshing: false})},1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.homeFollowedContent), refreshing: false})},3500);

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



    renderRowCard = (podcast) => {
        return <ListItemCard podcast={podcast} navigator={this.props.navigator}/>
    };




    render() {

        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style={{paddingVertical: height/33.35, alignSelf:'center'}} color='#3e4164' size ="large" />
                </View>
            )
        }
        else if(Variables.state.homeFollowedContent.length > 0){
                return (
                    <View
                        style={styles.container}>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                        >
                            <View style={{marginLeft: -width/37.5}}>
                                <ListView
                                    enableEmptySections
                                    dataSource={this.state.dataSource}
                                    renderRow={this.renderRowCard}
                                />
                            </View>

                            {this.renderRSSFetcher()}

                            <View style={{paddingBottom: height/33.35}} />

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
                            />
                        }
                    >
                        <View style={{ backgroundColor: '#fff', marginHorizontal: width/37.5, borderRadius: 10, width: width-20, marginTop: height/33.35, paddingVertical: height/33.35}}>
                            <Text style={styles.titleTop}>Follow podcasts to populate your feed!</Text>
                            <TouchableOpacity onPress={() => {
                                this.props.navigator.switchToTab({
                                    tabIndex: 1
                                });
                            }}>
                                <Text style={styles.titleBrowse}>Go to Browse</Text>
                            </TouchableOpacity>
                        </View>

                        {this.renderRSSFetcher()}

                    </ScrollView>

                    <Player/>
                    <PlayerBottom navigator={this.props.navigator}/>
                </View>

            );

        }


    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },


    title: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        marginTop: height/66.7,
        paddingLeft: width/18.75,
        backgroundColor: 'transparent',
    },
    titleTop: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/18.75,
        marginHorizontal: width/18.75,
        backgroundColor: 'transparent',
    },


    title2: {
        color: '#9496A3',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/23.44,
        marginTop: height/66.7,
        paddingBottom: height/66.7,
        paddingLeft: width/18.75,
        backgroundColor: 'transparent',
        marginRight: width/33.5
    },


    titleBrowse: {
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        marginTop: height/26.68,
        marginHorizontal: width/18.75,
        backgroundColor: 'transparent',
    },

    titleFetch: {
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/26.79,
        marginTop: height/133.4,
        marginBottom: height/44.47,
        marginHorizontal: width/18.75,
        backgroundColor: 'transparent',
    },


});


export default Home;