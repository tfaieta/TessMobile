import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {AudioUtils} from 'react-native-audio';
import Variables from "./Variables";



// A single podcast on scrollview slider list (on home page)


class ListItemUsers extends Component {

    state = {
        favorite: false,
        keyID: 0,
    };

    componentWillMount() {
        const {podcastArtist} = this.props.podcast;
        const {rss} = this.props.podcast;
        let profileImage = '';

        if(rss){
            firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                if(snapshot.val()){
                    profileImage = snapshot.val().profileImage
                }
            });
            this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1200);
            this. timeout2 = setTimeout(() => {this.setState({profileImage: profileImage})},3400);

        }
        else{
            const storageRef = firebase.storage().ref(`/users/${podcastArtist}/image-profile-uploaded`);
            storageRef.getDownloadURL()
                .then(function(url) {
                    profileImage = url;
                }).catch(function(error) {
                //
            });
            this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1200);
            this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage})},3400);

        }
    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
    }

    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    constructor(state) {
        super(state);
        this.state ={
            profileName: '',
            profileImage: ''
        };
    }


    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginBottom:20, height: 130, width: 130, borderRadius: 4, borderWidth:8, borderColor:'rgba(320,320,320,0.8)' }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 80,
                        color: 'white',
                        marginTop: 20,
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginBottom:20, height: 130, width: 130  }}>
                    <Image
                        style={{width: 130, height:130, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 4}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }

    onRowPress(){
        const {currentUser} = firebase.auth();
        const user = currentUser.uid;
        const { podcastTitle } = this.props.podcast;
        const { podcastDescription } = this.props.podcast;
        const { podcastCategory } = this.props.podcast;
        const {rss} = this.props.podcast;
        const {podcastURL} = this.props.podcast;
        const { podcastArtist } = this.props.podcast;
        const { id } = this.props.podcast;

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




    render() {
        const {podcastTitle} = this.props.podcast;
        const {podcastArtist} = this.props.podcast;
        const {currentUser} = firebase.auth();

        let profileName = '';
        if(this.state.profileName == ''){
            setTimeout(() =>{
                this.setState({profileName: profileName})
            },200);
        }
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = podcastArtist;
            }
        });

        var fixedTitle = '';
        if(podcastTitle.toString().length > 13 ){
            fixedTitle = (podcastTitle.toString().slice(0,13)+"...")
        }
        else{
            fixedTitle = podcastTitle;
        }

        var fixedUsername = '';
        if(this.state.profileName.length > 15){
            fixedUsername =  (profileName.slice(0,15)+"...");
        }
        else{
            fixedUsername = this.state.profileName;
        }



        return (

            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View style={{padding: 10}}>

                    {this._renderProfileImage()}

                <Text style={styles.title}>{fixedTitle}</Text>
                <Text style={styles.artistTitle}>{fixedUsername}</Text>
                </View>
            </TouchableOpacity>

        );


    }
}

const styles = {
    title: {
        color: '#2A2A30',
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        marginLeft: 10,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#9596A3',
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        paddingVertical: 1,
        marginLeft: 10,
        fontSize: 12,
        backgroundColor: 'transparent',
    },
    container: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    leftContainer: {
        flex:1
    },

    middleContainer: {
        flex: 9,
        marginTop: 3,
        marginHorizontal: -200,
    },
};




export default ListItemUsers;