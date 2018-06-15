import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Variables from "./Variables";
import { Navigation } from 'react-native-navigation';
var Analytics = require('react-native-firebase-analytics');


// A single list item on Activity.js

class ListItemFollowed extends Component {

    componentWillMount(){
        const {user} = this.props;
        let profileImage = '';
        let rss = false;

        firebase.database().ref(`users/${user}/profileImage`).once("value", function (snapshot) {
            if(snapshot.val()){
                profileImage = snapshot.val().profileImage;
                rss = true;
            }
            else{
                const storageRef = firebase.storage().ref(`/users/${user}/image-profile-uploaded`);
                storageRef.getDownloadURL()
                    .then(function(url) {
                        profileImage = url;
                    }).catch(function(error) {
                    //
                });
            }
        });
        this.timeout = setTimeout(() => {this.setState({profileImage: profileImage, rss: rss})},1400);
        this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage, rss: rss})},3400);

    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
    }


    constructor(state) {
        super(state);
        this.state ={
            profileName: '',
            profileImage: '',
            rss: false,
            title: '',
            time: '',
        };


        const {user} = this.props;

        let profileName = '';
        firebase.database().ref(`/users/${user}/username`).orderByChild("username").once("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }

        });

        const {action} = this.props;
        const {id} = this.props;
        let title = '';
        if(action == 'like' || action == 'comment'){
            firebase.database().ref(`podcasts/${id}`).once("value", function (snapshot) {
                if(snapshot.val().podcastTitle){
                    title = snapshot.val().podcastTitle;
                }
            })
        }
        else if(action == 'follow' || action == 'track'){
            firebase.database().ref(`users/${id}/username`).once("value", function (snapshot) {
                if(snapshot.val()){
                    title = snapshot.val().username;
                }
            })
        }

        const {time} = this.props;
        let timeNow = new Date().getTime();


        setTimeout(() =>{
            this.setState({profileName: profileName, title: title, time: timeNow-time})
        },1200);


    }



    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginBottom:10, marginLeft: 10, alignSelf: 'center', height: 40, width: 40, borderRadius:20, borderWidth:5, borderColor:'rgba(320,320,320,0.8)',  }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 25,
                        color: 'white',
                        marginTop: 2
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginBottom:10, marginLeft: 10, height: 40, width: 40, }}>
                    <Image
                        style={{width: 40, height: 40, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 20, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }


    messagePressUser = () => {
        const {user} = this.props;
        const {navigator} = this.props;
        Variables.state.browsingArtist = user;
        const {rss} = this.state;
        this.props.navigator.push({
            screen: "UserProfile",
            title: this.state.profileName,
            passProps: {navigator, rss},
        });

    };

    messagePressUserTarget = (action) => {
        if(action == 'like' || action == 'comment'){
            const {id} = this.props;
            if(id){
                const {currentUser} = firebase.auth();
                const user = currentUser.uid;

                firebase.database().ref(`podcasts/${id}`).once("value", function (snapshot) {
                    if(snapshot.val()){

                        Analytics.logEvent('play', {
                            'episodeID': id,
                            'epispdeTitle': snapshot.val().podcastTitle,
                            'episodeArtist': snapshot.val().podcastArtist,
                            'user_id': user
                        });

                        if(snapshot.val().RSSID){

                            AsyncStorage.setItem("currentPodcast", id);
                            AsyncStorage.setItem("currentTime", "0");
                            Variables.state.seekTo = 0;
                            Variables.state.currentTime = 0;


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
                        else if(id){

                            AsyncStorage.setItem("currentPodcast", id);
                            AsyncStorage.setItem("currentTime", "0");
                            Variables.state.seekTo = 0;
                            Variables.state.currentTime = 0;

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


                            firebase.database().ref(`podcasts/${id}/plays`).child(user).update({user});



                            firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).once("value", function (snap) {
                                snap.forEach(function (data) {
                                    if(data.val().id == id){
                                        firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/${data.key}`).remove()
                                    }
                                });
                                firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed/`).push({id});
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


        }
        else if (action == 'follow' || action == 'track'){
            const {navigator} = this.props;
            const {id} = this.props;
            Variables.state.browsingArtist = id;
            const {rss} = this.state;
            this.props.navigator.push({
                screen: "UserProfile",
                title: this.state.title,
                passProps: {navigator, rss},
            });
        }

    };


    renderMessage = () => {
        const {action} = this.props;
        if(this.state.title != '' || this.state.profileName != ''){
            if(action == 'like'){
                return(
                    <Text style={styles.title} ><Text style={styles.titleBold} onPress={this.messagePressUser}>{this.state.profileName}</Text> liked <Text onPress={() => {this.messagePressUserTarget(action)}} style={styles.title}>{this.state.title}</Text></Text>
                )
            }
            else if(action == 'comment'){
                return(
                    <Text style={styles.title}><Text style={styles.titleBold} onPress={this.messagePressUser}>{this.state.profileName}</Text> commented on <Text onPress={() => {this.messagePressUserTarget(action)}} style={styles.title}>{this.state.title}</Text></Text>
                )
            }
            else if(action == 'follow'){
                return(
                    <Text style={styles.title}><Text style={styles.titleBold} onPress={this.messagePressUser}>{this.state.profileName}</Text> followed <Text onPress={() => {this.messagePressUserTarget(action)}} style={styles.title}>{this.state.title}</Text></Text>
                )

            }
            else if(action == 'track'){
                return(
                    <Text style={styles.title}><Text style={styles.titleBold} onPress={this.messagePressUser}>{this.state.profileName}</Text> tracked <Text onPress={() => {this.messagePressUserTarget(action)}} style={styles.title}>{this.state.title}</Text></Text>
                )
            }
        }

    };

    renderTime = () => {
        if(this.state.time != ''){
            if(((this.state.time/1000)/86400).toFixed(0) >= 2 ){
                return(
                    <Text style={styles.title}>{((this.state.time/1000)/86400).toFixed(0)} days ago</Text>
                )
            }
            if(((this.state.time/1000)/86400).toFixed(0) > 1 ){
                return(
                    <Text style={styles.title}>{((this.state.time/1000)/86400).toFixed(0)} day ago</Text>
                )
            }
            else if(((this.state.time/1000)/3600).toFixed(0) >= 2 ){
                return(
                    <Text style={styles.title}>{((this.state.time/1000)/3600).toFixed(0)} hours ago</Text>
                )
            }
            else if(((this.state.time/1000)/3600).toFixed(0) > 1 ){
                return(
                    <Text style={styles.title}>{((this.state.time/1000)/3600).toFixed(0)} hour ago</Text>
                )
            }
            else if(((this.state.time/1000)/60).toFixed(0) >= 2 ){
                return(
                    <Text style={styles.title}>{((this.state.time/1000)/60).toFixed(0)} minutes ago</Text>
                )
            }
            else if(((this.state.time/1000)/60).toFixed(0) > 1 ){
                return(
                    <Text style={styles.title}>{((this.state.time/1000)/60).toFixed(0)} minute ago</Text>
                )
            }
            else{
                return(
                    <Text style={styles.title}>{((this.state.time/1000)).toFixed(0)} seconds ago</Text>
                )
            }



        }
    };



    render() {

        return (

            <View>
                <View style={{paddingVertical: 5}}>

                {this.renderTime()}

                </View>
                <View style={styles.container}>

                    {this._renderProfileImage()}

                    <View style={styles.middleContainer}>
                        {this.renderMessage()}
                    </View>

                </View>

            </View>
        )

    }

}

const styles = {
    container: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginVertical: 1,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },
    title: {
        color: '#797979',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 20,
        marginRight: 10,
        fontSize: 14,
        backgroundColor: 'transparent'
    },
    titleBold: {
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 20,
        marginRight: 10,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
};




export default ListItemFollowed;