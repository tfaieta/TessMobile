import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet,StatusBar, ListView, ScrollView, TouchableOpacity, Image, Linking, RefreshControl} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { podcastFetchNew} from "../actions/PodcastActions";
import { connect } from 'react-redux';
import ListItemUsers from '../components/ListItemUsers';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "./Variables";
import firebase from 'firebase';
import Player from "./Player";


var DomParser = require('react-native-html-parser').DOMParser;




// 1st tab, home page

class Home extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true
    };

    componentDidMount(){

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



    componentWillReceiveProps(nextProps) {

        this.creataDataSourceNewPodcasts(nextProps);
    }


    creataDataSourceNewPodcasts({ podcast }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSourceNewPodcasts = ds.cloneWithRows(podcast);
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
    }


    constructor(props) {
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts),
            dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent),
            dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess),
            dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess),
            url: '',
            refreshing: false,
        };
        this.timeout1 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent)})},2000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},2400);
        this.timeout3 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},3800);
        this.timeout4 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},3200);

        this.timeout5 = setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent)})},6000);
        this.timeout6 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},6400);
        this.timeout7 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},6800);
        this.timeout8 = setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},7200);
    }



    renderRowNewPodcasts(podcast) {
        return <ListItemUsers podcast={podcast} />;
    }



    _selectedByTess(length){
        if (length > 0){
            return(
                <ListView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    enableEmptySections
                    dataSource={this.state.dataSourceSel}
                    renderRow={this.renderRowNewPodcasts}
                />
            )
        }
        else{
            return(
                <Text style = {styles.title3}>We are looking for content to select...</Text>
            )
        }
    }

    _newFromFollow(length){
        if(length > 0){


            return(
                <View>
                    <View style={{flexDirection:'row'}}>
                        <View style={{alignSelf:'flex-start'}}>
                            <Text style={styles.title}>From People You Follow</Text>
                        </View>

                        <View style={{alignSelf:'flex-end', flex:1}}>
                            <TouchableOpacity onPress={() => {
                                let data = Variables.state.homeFollowedContent;
                                let title = "From People You Follow ";

                                this.props.navigator.push({
                                    screen: 'ViewAll',
                                    animated: true,
                                    animationType: 'fade',
                                    passProps: {data, title},
                                });

                            }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                <Text style={styles.viewAll}>View all</Text>
                                <Icon style={{
                                    fontSize: 14,
                                    backgroundColor: 'transparent',
                                    marginTop: 20,
                                    color: '#5757FF',
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
                        dataSource={this.state.dataSourceFol}
                        renderRow={this.renderRowNewPodcasts}
                    />

                </View>
            );


        }

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
        this.setState({refreshing: true});

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});

        this.setState({
                dataSourceFol: dataSource.cloneWithRows([]),
                dataSource: dataSource.cloneWithRows([]),
                dataSourceSel: dataSource.cloneWithRows([]),
                dataSourceTess: dataSource.cloneWithRows([])
            });


            this.fetchData();
            this.setState({
                refreshing: false,
            });

            setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent)})},2000);
            setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},2400);
            setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},3800);
            setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},3200);

            setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent)})},5000);
            setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},5400);
            setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},5800);
            setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},6200);

            setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent)})},8000);
            setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},8400);
            setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},8800);
            setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},9200);

            setTimeout(() => {this.setState({dataSourceFol: dataSource.cloneWithRows(Variables.state.homeFollowedContent)})},11000);
            setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.newPodcasts)})},11400);
            setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},11800);
            setTimeout(() => {this.setState({dataSourceTess: dataSource.cloneWithRows(Variables.state.fromTess)})},12200);


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
                <TouchableOpacity style = {{marginVertical: 40, marginHorizontal: 10, backgroundColor: '#5757FF',}} onPress = {this.rssFetch}>
                    <Text style = {{color: "#fff", fontSize: 22, textAlign: 'center', padding: 15}}>Fetch RSS Feeds</Text>
                </TouchableOpacity>
            )
        }
    }


    render() {

            return (
                <View
                    style={styles.container}>

                    <StatusBar
                        barStyle="dark-content"
                    />


                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh.bind(this)}
                            />
                        }
                    >


                        {this._newFromFollow(Variables.state.homeFollowedContent.length)}




                        <View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'flex-start'}}>
                                    <Text style={styles.title}>Latest Episodes</Text>
                                </View>

                                <View style={{alignSelf:'flex-end', flex:1}}>
                                    <TouchableOpacity onPress={() => {
                                        let data = Variables.state.newPodcasts;
                                        let title = "Latest Episodes";

                                        this.props.navigator.push({
                                            screen: 'ViewAll',
                                            animated: true,
                                            animationType: 'fade',
                                            passProps: {data, title},
                                        });

                                    }} style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                        <Text style={styles.viewAll}>View all</Text>
                                        <Icon style={{
                                            fontSize: 14,
                                            backgroundColor: 'transparent',
                                            marginTop: 20,
                                            color: '#5757FF',
                                            marginLeft: 10,
                                            marginRight: 15,
                                        }} name="ios-arrow-forward">
                                        </Icon>
                                    </TouchableOpacity>
                                </View>

                            </View>


                            <ListView
                                ref={(ref) => this.listView = ref}
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                enableEmptySections
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRowNewPodcasts}
                            />
                        </View>



                        <View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'flex-start'}}>
                                    <Text style={styles.title}>Selected by Tess</Text>
                                </View>

                                <View style={{alignSelf:'flex-end', flex:1}}>
                                    <TouchableOpacity onPress={() => {
                                        let data = Variables.state.selectedByTess;
                                        let title = "Selected by Tess";

                                        this.props.navigator.push({
                                            screen: 'ViewAll',
                                            animated: true,
                                            animationType: 'fade',
                                            passProps: {data, title},
                                        });

                                    }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                        <Text style={styles.viewAll}>View all</Text>
                                        <Icon style={{
                                            fontSize: 14,
                                            backgroundColor: 'transparent',
                                            marginTop: 20,
                                            color: '#5757FF',
                                            marginLeft: 10,
                                            marginRight: 15,
                                        }} name="ios-arrow-forward">
                                        </Icon>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            {this._selectedByTess(Variables.state.selectedByTess.length)}

                        </View>



                        <View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'flex-start'}}>
                                    <Text style={styles.title}>Featured Categories</Text>
                                </View>

                            </View>

                        </View>


                        <ScrollView style={{height: 122, marginVertical: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>

                            <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressTech}>
                                <Image
                                    style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                                    source={require('tess/src/images/tech.jpeg')}
                                >
                                    <Icon style={{
                                        textAlign: 'center',
                                        marginTop: 30,
                                        fontSize: 30,
                                        backgroundColor: 'transparent',
                                        color: '#FFF'
                                    }} name="md-phone-portrait">
                                    </Icon>
                                    <Text style={styles.catTitle}>Tech</Text>
                                </Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressTravel}>
                                <Image
                                    style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                                    source={require('tess/src/images/travel.png')}
                                >
                                    <Icon style={{
                                        textAlign: 'center',
                                        marginTop: 30,
                                        fontSize: 30,
                                        backgroundColor: 'transparent',
                                        color: '#FFF'
                                    }} name="md-plane">
                                    </Icon>
                                    <Text style={styles.catTitle}>Travel</Text>
                                </Image>
                            </TouchableOpacity>


                            <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressFitness}>
                                <Image
                                    style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                                    source={require('tess/src/images/fitness.png')}
                                >
                                    <Icon style={{
                                        textAlign: 'center',
                                        marginTop: 30,
                                        fontSize: 30,
                                        backgroundColor: 'transparent',
                                        color: '#FFF'
                                    }} name="ios-flash">
                                    </Icon>
                                    <Text style={styles.catTitle}>Fitness</Text>
                                </Image>
                            </TouchableOpacity>

                            <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, marginRight: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressCurrEvents}>
                                <Image
                                    style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                                    source={require('tess/src/images/worldNews.png')}
                                >
                                    <Icon style={{
                                        textAlign: 'center',
                                        marginTop: 30,
                                        fontSize: 30,
                                        backgroundColor: 'transparent',
                                        color: '#FFF'
                                    }} name="md-globe">
                                    </Icon>
                                    <Text style={styles.catTitle}>News</Text>
                                </Image>
                            </TouchableOpacity>


                        </ScrollView>





                        <View style={{paddingBottom: 150}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{alignSelf:'flex-start'}}>
                                    <Text style={styles.title}>From Tess</Text>
                                </View>

                                <View style={{alignSelf:'flex-end', flex:1}}>
                                    <TouchableOpacity onPress={() => {

                                        let data = Variables.state.fromTess;
                                        let title = "From Tess";

                                        this.props.navigator.push({
                                            screen: 'ViewAll',
                                            animated: true,
                                            animationType: 'fade',
                                            passProps: {data, title},
                                        });


                                    }} style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}} >
                                        <Text style={styles.viewAll}>View all</Text>
                                        <Icon style={{
                                            fontSize: 14,
                                            backgroundColor: 'transparent',
                                            marginTop: 20,
                                            color: '#5757FF',
                                            marginLeft: 10,
                                            marginRight: 15,
                                        }} name="ios-arrow-forward">
                                        </Icon>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <Text style={styles.title2}>Hey, everyone! Thank you for downloading Tess. Your feedback is important. We look forward to hearing from you! Check out our updates on the beta below. </Text>

                            <ListView
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                enableEmptySections
                                dataSource={this.state.dataSourceTess}
                                renderRow={this.renderRowNewPodcasts}
                            />



                            <View style={{marginTop: 30, height: 2, backgroundColor: '#2A2A3040', marginHorizontal: 20}}/>
                            <Text style={styles.titleMini}>Follow us on social media to stay up to date!</Text>
                            <View style = {{flex:1, flexDirection: 'row', marginTop:20}}>

                                <TouchableOpacity style={{alignItems:'flex-start', flex: 1}} onPress={this.pressTwit}>
                                    <Icon style={{
                                        alignSelf: 'flex-end',
                                        fontSize: 48,
                                        backgroundColor: 'transparent',
                                        color:   "#9f60ff90",
                                    }} name="logo-twitter">
                                    </Icon>
                                </TouchableOpacity>

                                <TouchableOpacity style={{alignItems:'center', flex: 1}} onPress={this.pressInsta}>
                                    <Icon style={{
                                        fontSize: 48,
                                        backgroundColor: 'transparent',
                                        color:   "#9f60ff90",
                                    }} name="logo-instagram">
                                    </Icon>
                                </TouchableOpacity>


                                <TouchableOpacity style={{alignItems:'flex-end', flex: 1}} onPress={this.pressFB}>
                                    <Icon style={{
                                        alignSelf: 'flex-start',
                                        fontSize: 48,
                                        backgroundColor: 'transparent',
                                        color:   "#9f60ff90",
                                    }} name="logo-facebook">
                                    </Icon>
                                </TouchableOpacity>


                            </View>

                            {this.renderRSSFetcher()}

                        </View>


                    </ScrollView>




                    <Player/>
                    <PlayerBottom navigator={this.props.navigator}/>

                </View>

            );


}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 20,
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
        color: '#2A2A30',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        marginTop: 20,
        paddingLeft: 20,
        backgroundColor: 'transparent',
    },
    titleMini: {
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        marginTop: 30,
        paddingHorizontal: 20,
        marginHorizontal: 40,
        backgroundColor: 'transparent',
    },
    title2: {
        color: '#9496A3',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 16,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        backgroundColor: 'transparent',
        marginRight: 10
    },

    title3: {
        color: '#2A2A30',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 14,
        marginVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },

    viewAll: {
        color: '#5757FF',
        textAlign: 'right',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 12,
        marginTop: 20,
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
        fontFamily: 'Hiragino Sans',
    }


});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, {podcastFetchNew}) (Home);