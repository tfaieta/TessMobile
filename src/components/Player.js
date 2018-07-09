import React, { Component } from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import Variables from './Variables';
import Video from 'react-native-video';
import firebase from 'firebase';

// Actual Player (not cosmetic)

class Player extends Component{

    componentWillMount(){

        AsyncStorage.getItem("currentPodcast").then((value) => {
            if(value){

                const {currentUser} = firebase.auth();

                firebase.database().ref(`podcasts/${value}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        if(snapshot.val().RSSID){

                            firebase.database().ref(`/users/${snapshot.val().podcastArtist}/username`).orderByChild("username").once("value", function(snap) {
                                if(snap.val()){
                                    Variables.state.currentUsername = snap.val().username;
                                }
                                else {
                                    Variables.state.currentUsername = snapshot.val().podcastArtist;
                                }
                            });

                            firebase.database().ref(`podcasts/${snapshot.val().id}/likes`).on("value", function (snap) {
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


                            firebase.database().ref(`podcasts/${snapshot.val().id}/plays`).on("value", function (snap) {
                                Variables.state.podcastsPlays = 0;
                                snap.forEach(function (data) {
                                    if (data.val()) {
                                        Variables.state.podcastsPlays++;
                                    }
                                });
                            });

                            Variables.pause();
                            Variables.setPodcastFile(snapshot.val().podcastURL);
                            Variables.state.isPlaying = false;
                            Variables.state.podcastTitle = snapshot.val().podcastTitle;
                            Variables.state.podcastArtist = snapshot.val().podcastArtist;
                            Variables.state.podcastCategory = snapshot.val().podcastCategory;
                            Variables.state.podcastDescription = snapshot.val().podcastDescription;
                            Variables.state.podcastID = snapshot.val().id;
                            Variables.state.favorited = false;
                            Variables.state.userProfileImage = '';
                            Variables.state.isPlaying = true;
                            Variables.state.rss = true;

                            firebase.database().ref(`users/${snapshot.val().podcastArtist}/profileImage`).once("value", function (snap) {
                                if(snap.val()){
                                    Variables.state.userProfileImage = snap.val().profileImage
                                }
                            });


                        }
                        else{

                            firebase.database().ref(`/users/${snapshot.val().podcastArtist}/username`).orderByChild("username").once("value", function(snap) {
                                if(snap.val()){
                                    Variables.state.currentUsername = snap.val().username;
                                }
                                else {
                                    Variables.state.currentUsername = snapshot.val().podcastArtist;
                                }
                            });

                            firebase.database().ref(`podcasts/${value}/likes`).on("value", function (snap) {
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


                            firebase.database().ref(`podcasts/${value}/plays`).on("value", function (snap) {
                                Variables.state.podcastsPlays = 0;
                                snap.forEach(function (data) {
                                    if (data.val()) {
                                        Variables.state.podcastsPlays++;
                                    }
                                });
                            });


                            firebase.storage().ref(`/users/${snapshot.val().podcastArtist}/${value}`).getDownloadURL().catch(() => {console.warn("file not found")})
                                .then(function(url) {
                                    Variables.pause();
                                    Variables.setPodcastFile(url);
                                    Variables.state.isPlaying = false;
                                    Variables.state.podcastTitle = snapshot.val().podcastTitle;
                                    Variables.state.podcastArtist = snapshot.val().podcastArtist;
                                    Variables.state.podcastCategory = snapshot.val().podcastCategory;
                                    Variables.state.podcastDescription = snapshot.val().podcastDescription;
                                    Variables.state.podcastID = value;
                                    Variables.state.favorited = false;
                                    Variables.state.userProfileImage = '';
                                    Variables.state.isPlaying = true;
                                });


                            const storageRef = firebase.storage().ref(`/users/${snapshot.val().podcastArtist}/image-profile-uploaded`);
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


                            firebase.database().ref(`users/${currentUser.uid}/favorites`).on("value", function (snap) {
                                snap.forEach(function (data) {
                                    if(data.key == value){
                                        Variables.state.favorited = true;
                                    }
                                })
                            })

                        }
                    }

                })

            }
        }).done();


        AsyncStorage.getItem("currentTime").then((value) => {
            if(value){
                Variables.state.seekTo = parseInt(value);
                Variables.state.currentTime = parseInt(value);
            }

        }).done();


        this.interval = setInterval(() => {
            this.setState({
                podcastURL: Variables.state.podcastURL,
                paused: Variables.state.paused,
            })
        }, 250)
    }


    componentWillUnmount(){
        clearInterval(this.interval)
    }


    constructor(props) {
        super(props);
        this.state = {
            podcastURL: Variables.state.podcastURL,
            speed: Variables.state.podcastSpeed,
            volume: 1,
            muted: false,
            paused: Variables.state.paused,
            repeat: Variables.state.repeat,
            currentTime: Variables.state.currentTime,

        };
    }



    onProgress = (data) => {

        var ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/stats`);
        ref.once("value", function(snapshot) {
            if(snapshot.val()){
                if(snapshot.val().playTime){
                    ref.update({playTime: snapshot.val().playTime + .25})
                }
                else{
                    ref.update({playTime: 0})
                }
            }
            else{
                ref.update({playTime: 0})
            }

        });


        Variables.state.buffering = false;
        Variables.state.currentTime = data.currentTime;

        this.setState({
            podcastURL: Variables.state.podcastURL,
            speed: Variables.state.podcastSpeed,
            paused: Variables.state.paused,
            repeat: Variables.state.repeat,
            currentTime: data.currentTime,
        });

        AsyncStorage.setItem("currentTime", data.currentTime.toString());

        if(Variables.state.seekForward == true){
            this.player.seek(Variables.state.currentTime + 15);
            Variables.state.seekForward = false;
        }
        if(Variables.state.seekBackward == true){
            this.player.seek(Variables.state.currentTime - 15);
            Variables.state.seekBackward = false;
        }

        if(Variables.state.seekTo != 0){
            Variables.state.currentTime = Variables.state.seekTo;
            this.player.seek(Variables.state.seekTo);
            Variables.state.seekTo = 0;
        }

        if(Variables.state.highlight){
            if(Variables.state.currentTime >= Variables.state.highlightEnd){
                this.onEnd();
            }
        }
    };

    onBuffer(){
      Variables.state.buffering = true;
    }
    onError(){
        console.warn("ERROR!")
    }
    onEnd(){
        const {currentUser} = firebase.auth();
        const user = currentUser.uid;

        Variables.state.podcastURL = '';
        Variables.state.podcastTitle = '';
        Variables.state.podcastDescription = '';
        Variables.state.podcastCategory = '';
        Variables.state.highlight = false;
        Variables.state.highlightStart = 0;
        Variables.state.highlightEnd = 0;


        firebase.database().ref(`users/${currentUser.uid}/queue`).limitToFirst(1).once("value", function (snapshot) {

           snapshot.forEach(function (key) {
               if(key.val()){

                   firebase.database().ref(`podcasts/${key.val().id}`).on("value", function (mainSnap) {

                       const {id} = mainSnap.val();
                       AsyncStorage.setItem("currentPodcast", id);
                       AsyncStorage.setItem("currentTime", "0");

                       if(mainSnap.val().rss){

                           Variables.setPodcastFile(mainSnap.val().podcastURL);


                           firebase.database().ref(`/users/${mainSnap.val().podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                               if(snap.val()){
                                   Variables.state.currentUsername = snap.val().username;
                               }
                               else {
                                   Variables.state.currentUsername = mainSnap.val().podcastArtist;
                               }
                           });


                           firebase.database().ref(`podcasts/${mainSnap.val().id}/likes`).on("value", function (snap) {
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



                           firebase.database().ref(`podcasts/${mainSnap.val().id}/plays`).on("value", function (snap) {
                               Variables.state.podcastsPlays = 0;
                               snap.forEach(function (data) {
                                   if (data.val()) {
                                       Variables.state.podcastsPlays++;
                                   }
                               });
                           });


                           firebase.database().ref(`podcasts/${mainSnap.val().id}/plays`).child(user).update({user});



                           firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).once("value", function (snap) {
                               snap.forEach(function (data) {
                                   if(data.val().id == mainSnap.val().id){
                                       firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/${data.key}`).remove()
                                   }
                               });
                               firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).push({id});
                           });


                           Variables.pause();
                           Variables.state.isPlaying = false;
                           Variables.state.podcastTitle = mainSnap.val().podcastTitle;
                           Variables.state.podcastArtist = mainSnap.val().podcastArtist;
                           Variables.state.podcastID = mainSnap.val().id;
                           Variables.state.podcastDescription = mainSnap.val().podcastDescription;
                           Variables.state.podcastCategory = mainSnap.val().podcastCategory;
                           Variables.state.favorited = false;
                           Variables.state.userProfileImage = '';
                           Variables.play();
                           Variables.state.isPlaying = true;


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
                                   if(data.key == mainSnap.val().id){
                                       Variables.state.favorited = true;
                                   }
                               })
                           })


                       }
                       else{

                           firebase.storage().ref(`/users/${mainSnap.val().podcastArtist}/${mainSnap.val().id}`).getDownloadURL().catch(() => {console.warn("file not found")})
                               .then(function(url) {
                                   Variables.setPodcastFile(url);
                               });


                           firebase.database().ref(`/users/${mainSnap.val().podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                               if(snap.val()){
                                   Variables.state.currentUsername = snap.val().username;
                               }
                               else {
                                   Variables.state.currentUsername = mainSnap.val().podcastArtist;
                               }
                           });


                           firebase.database().ref(`podcasts/${mainSnap.val().id}/likes`).on("value", function (snap) {
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



                           firebase.database().ref(`podcasts/${mainSnap.val().id}/plays`).on("value", function (snap) {
                               Variables.state.podcastsPlays = 0;
                               snap.forEach(function (data) {
                                   if (data.val()) {
                                       Variables.state.podcastsPlays++;
                                   }
                               });
                           });


                           firebase.database().ref(`podcasts/${mainSnap.val().id}/plays`).child(user).update({user});



                           firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).once("value", function (snap) {
                               snap.forEach(function (data) {
                                   if(data.val().id == mainSnap.val().id){
                                       firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/${data.key}`).remove()
                                   }
                               });
                               firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).push({id});
                           });


                           Variables.pause();
                           Variables.state.isPlaying = false;
                           Variables.state.podcastTitle = mainSnap.val().podcastTitle;
                           Variables.state.podcastArtist = mainSnap.val().podcastArtist;
                           Variables.state.podcastID = mainSnap.val().id;
                           Variables.state.podcastDescription = mainSnap.val().podcastDescription;
                           Variables.state.podcastCategory = mainSnap.val().podcastCategory;
                           Variables.state.favorited = false;
                           Variables.state.userProfileImage = '';
                           Variables.play();
                           Variables.state.isPlaying = true;


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
                                   if(data.key == mainSnap.val().id){
                                       Variables.state.favorited = true;
                                   }
                               })
                           })

                       }


                   });


                   firebase.database().ref(`users/${currentUser.uid}/queue/${key.key}`).remove()

               }

           });

        });

    }
    onLoadStart(){
        Variables.state.buffering = true;
    }
    onLoad = (data) => {
        Variables.state.duration = data.duration;
        Variables.state.buffering = false;
    };



    _renderPlayer = () => {
        if(this.state.podcastURL){
            return(
                <Video source={{uri: this.state.podcastURL}}   // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}                                      // Store reference
                       rate={this.state.speed}                              // 0 is paused, 1 is normal.
                       volume={this.state.volume}                            // 0 is muted, 1 is normal.
                       muted={this.state.muted}                           // Mutes the audio entirely.
                       paused={this.state.paused}                          // Pauses playback entirely.
                       repeat={this.state.repeat}                           // Repeat forever.
                       playInBackground={true}                // Audio continues to play when app entering background.
                       playWhenInactive={true}                // [iOS] Video continues to play when control or notification center are shown.
                       ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                       progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                       onLoadStart={this.onLoadStart}            // Callback when video starts to load
                       onLoad={this.onLoad}               // Callback when video loads
                       onProgress={this.onProgress}               // Callback every ~250ms with currentTime
                       onEnd={this.onEnd}                      // Callback when playback finishes
                       onError={this.onError}               // Callback when video cannot be loaded
                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                       onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                   />
            )
        }
    };


render() {
    return (
        <View>
            {this._renderPlayer()}
        </View>


    );
}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 0,
    },


});

export default Player;