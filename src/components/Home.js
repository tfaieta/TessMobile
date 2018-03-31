import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet, ListView, ScrollView, TouchableOpacity, Linking, RefreshControl, TouchableHighlight, Dimensions} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { podcastFetchNew} from "../actions/PodcastActions";
import { connect } from 'react-redux';
import ListItemUsers from '../components/ListItemUsers';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "./Variables";
import firebase from 'firebase';
import Player from "./Player";
import SwipeCards from 'react-native-swipe-cards';
import ListItemCard from "./ListItemCard";
import SortableListView from 'react-native-sortable-listview'



var {height, width} = Dimensions.get('window');


var DomParser = require('react-native-html-parser').DOMParser;




// 1st tab, home page

class Home extends Component{


    componentDidMount(){
        const {currentUser} = firebase.auth();


        Variables.state.widgets = [];
        firebase.database().ref(`users/${currentUser.uid}/widgets`).on("value", function (snapshot) {
            
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


        this.timeout9 = setTimeout(() => {this.setState({hasNewFromFollowing: hasNewFromFollow})}, 1000);
        this.timeout10 = setTimeout(() => {this.setState({hasLatest: hasLatest})}, 1000);
        this.timeout11 = setTimeout(() => {this.setState({hasFromTess: hasFromTess})}, 1000);
        this.timeout12 = setTimeout(() => {this.setState({hasSelectedByTess: hasSelectedByTess})}, 1000);
        this.timeout13 = setTimeout(() => {this.setState({hasTech: hasTech})}, 1000);



    }



    componentWillUnmount(){
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
            widgets: Variables.state.widgets,
            scroll: true,

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
        this.timeout1 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent), data: Variables.state.homeFollowedContent, dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory), widgets: Variables.state.widgets})},2000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},2400);
        this.timeout3 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},3800);
        this.timeout4 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},3200);

        this.timeout5 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent), dataSourceTech: dataSource.cloneWithRows(Variables.state.currCategory)})},6000);
        this.timeout6 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},6400);
        this.timeout7 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},6800);
        this.timeout8 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},7200);
    }



    renderRowNewPodcasts(podcast) {
        return <ListItemUsers podcast={podcast} />;
    }

    renderRowCard(podcast) {
        return <ListItemCard podcast={podcast} />;
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
                            size = items.length
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

                            //rss = true, need to tell firebase it's an rss podcast
                            const rss = true;

                            //category
                            const podcastCategory = ''; // no category

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
                                        firebase.database().ref(`podcasts`).push({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes, RSSID})
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
                                        firebase.database().ref(`podcasts`).push({podcastTitle, podcastDescription, podcastURL, podcastArtist, rss, podcastCategory, likes, RSSID})
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
        const {currentUser} = firebase.auth();


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


        this.timeout9 = setTimeout(() => {this.setState({hasNewFromFollowing: hasNewFromFollow})}, 1000);
        this.timeout10 = setTimeout(() => {this.setState({hasLatest: hasLatest})}, 1000);
        this.timeout11 = setTimeout(() => {this.setState({hasFromTess: hasFromTess})}, 1000);
        this.timeout12 = setTimeout(() => {this.setState({hasSelectedByTess: hasSelectedByTess})}, 1000);
        this.timeout13 = setTimeout(() => {this.setState({hasTech: hasTech})}, 1000);




    }



    pressFitness = () => {
        this.props.navigator.push({
            screen: 'Fitness',
            animated: true,
            animationType: 'fade',
        });
    };
    pressCurrEvents = () => {
        this.props.navigator.push({
            screen: 'News',
            animated: true,
            animationType: 'fade',
        });
    };
    pressTech = () => {
        this.props.navigator.push({
            screen: 'Tech',
            animated: true,
            animationType: 'fade',
        });
    };
    pressTravel = () => {
        this.props.navigator.push({
            screen: 'Travel',
            animated: true,
            animationType: 'fade',
        });
    };


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
                <TouchableOpacity style = {{marginVertical: 40, marginHorizontal: 10, backgroundColor: '#506dcf',}} onPress = {this.rssFetch}>
                    <Text style = {{color: "#fff", fontSize: 22, textAlign: 'center', padding: 15}}>Fetch RSS Feeds</Text>
                </TouchableOpacity>
            )
        }
    }


    _renderWidget2(rawData, data, title){
        if(rawData.length > 0){


            return(
                <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignSelf:'flex-start'}}>
                            <Text style={styles.title}>{title}</Text>
                        </View>

                        <View style={{alignSelf:'flex-end', flex:1}}>
                            <TouchableOpacity onPress={() => {

                                let data = rawData;

                                this.props.navigator.push({
                                    screen: 'ViewAll',
                                    title: title,
                                    passProps: {data},
                                });


                            }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                <Text style={styles.viewAll}>View all</Text>
                                <Icon style={{
                                    fontSize: 16,
                                    backgroundColor: 'transparent',
                                    marginTop: 20,
                                    color: '#506dcf',
                                    marginLeft: 10,
                                    marginRight: 15,
                                }} name="ios-arrow-forward">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        enableEmptySections
                        dataSource={data}
                        renderRow={this.renderRowNewPodcasts}
                    />

                </View>
            );


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

    }


    _renderWidget = (position, data) => {
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
                                    fontSize: 16,
                                    backgroundColor: 'transparent',
                                    marginTop: 20,
                                    color: '#506dcf',
                                    marginLeft: 10,
                                    marginRight: 15,
                                }} name="ios-arrow-forward">
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




    render() {

        if(this.state.widgets.length > 0){

            return (
                <View
                    style={styles.container}>


                    <ScrollView
                        // set scrollEnabled to state that turns to false when sortablelistview is activated
                        scrollEnabled={this.state.scroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    >


                        <SwipeCards
                            cards={this.state.data}
                            renderCard={(cardData) => <ListItemCard podcast={cardData} />}
                            dragY={false}
                            smoothTransition={true}
                            hasMaybeAction={false}
                            onClickHandler={()=>{}}
                            showYup={false}
                            showNope={false}
                            showMaybe={false}
                            yupText="Add to Queue"
                            yupStyle={styles.textContainer}
                            yupTextStyle={styles.yupTitle}
                            nopeText="No Thanks"
                            nopeStyle={styles.textContainer}
                            nopeTextStyle={styles.nopeTitle}
                            renderNoMoreCards={() =>
                                <View style = {{marginHorizontal: 10, marginVertical: 7}}>
                                    <View style={{ backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 10, width: width-20, paddingVertical: 60 }}>
                                        <Text style={styles.titleCard}>You're all caught up!</Text>
                                    </View>
                                </View>
                            }
                        />


                        <SortableListView
                            style={{flex:1}}
                            data={this.state.widgets}
                            order={Object.keys(this.state.widgets)}
                            onMoveStart={() => {this.setState({scroll:false})}}
                            onMoveEnd={() => {this.setState({scroll:true})}}
                            onMoveCancel={() => {this.setState({scroll:true})}}
                            renderRow={(row) => {

                                let data = Variables.state.widgets;
                                let position = row.position;


                                if(data[position]){

                                    var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                                    let input = dataSource.cloneWithRows(this.returnList(data[position].title));


                                    return(
                                        <TouchableHighlight underlayColor="#fff" style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
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
                                                                fontSize: 16,
                                                                backgroundColor: 'transparent',
                                                                marginTop: 10,
                                                                color: '#506dcf',
                                                                marginLeft: 10,
                                                                marginRight: 15,
                                                            }} name="ios-arrow-forward">
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

                            }}
                        />




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
                        </View>



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
                        // set scrollEnabled to state that turns to false when sortablelistview is activated
                        scrollEnabled={this.state.scroll}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    >


                        <SwipeCards
                            cards={this.state.data}
                            renderCard={(cardData) => <ListItemCard podcast={cardData} />}
                            dragY={false}
                            smoothTransition={true}
                            hasMaybeAction={false}
                            onClickHandler={()=>{}}
                            showYup={false}
                            showNope={false}
                            showMaybe={false}
                            yupText="Add to Queue"
                            yupStyle={styles.textContainer}
                            yupTextStyle={styles.yupTitle}
                            nopeText="No Thanks"
                            nopeStyle={styles.textContainer}
                            nopeTextStyle={styles.nopeTitle}
                            renderNoMoreCards={() =>
                                <View style = {{marginHorizontal: 10, marginVertical: 7}}>
                                    <View style={{ backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 10, width: width-20, paddingVertical: 60 }}>
                                        <Text style={styles.titleCard}>You're all caught up!</Text>
                                    </View>
                                </View>
                            }
                        />


                        <SortableListView
                            style={{flex:1}}
                            data={this.state.widgets}
                            order={Object.keys(this.state.widgets)}
                            onMoveStart={() => {this.setState({scroll:false})}}
                            onMoveEnd={() => {this.setState({scroll:true})}}
                            onMoveCancel={() => {this.setState({scroll:true})}}
                            renderRow={(row) => {

                                let data = Variables.state.widgets;
                                let position = row.position;


                                if(data[position]){

                                    var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                                    let input = dataSource.cloneWithRows(this.returnList(data[position].title));


                                    return(
                                        <TouchableHighlight underlayColor="#fff" style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5}}>
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
                                                                fontSize: 16,
                                                                backgroundColor: 'transparent',
                                                                marginTop: 10,
                                                                color: '#506dcf',
                                                                marginLeft: 10,
                                                                marginRight: 15,
                                                            }} name="ios-arrow-forward">
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

                            }}
                        />




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
                        </View>



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
    titleCard: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
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
        fontSize: 16,
        marginVertical: 20,
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


});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, {podcastFetchNew}) (Home);