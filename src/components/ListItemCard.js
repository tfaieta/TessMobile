import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, AsyncStorage, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import Variables from "./Variables";
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');



// A single episode on home feed

class ListItemCard extends Component {

    componentWillUnmount(){
        clearTimeout(this.timeout);
    }

    constructor(state) {
        super(state);
        this.state ={
            profileName: '',
            profileImage: '',
            username: '',
            title: '',
            description: '',
            listens: 0,
        };

        const {podcastTitle} = this.props.podcast;
        const {podcastArtist} = this.props.podcast;
        const { podcastDescription } = this.props.podcast;
        const { id } = this.props.podcast;
        const {currentUser} = firebase.auth();

        let profileName = '';
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").once("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = podcastArtist;
            }
        });

        if(this.state.profileName == ''){
            setTimeout(() =>{
                this.setState({profileName: profileName.slice(0,55)})
            },500);
        }

        if(this.state.description == ''){
            setTimeout(() =>{
                this.setState({description: podcastDescription.slice(0,190)})
            },500);
        }

        setTimeout(() => {
            if(podcastTitle.toString().length > 80 ){
                this.setState({title: (podcastTitle.toString().slice(0,80)+"...")});
            }
            else{
                this.setState({title: podcastTitle});
            }

            if(this.state.profileName.length > 50){
                this.setState({username: (profileName.slice(0,50)+"...")});
            }
            else{
                this.setState({username: this.state.profileName});
            }

            if(this.state.description.length > 185){
                this.setState({description: (podcastDescription.slice(0,185)+"...")});
            }

        }, 900);




        const {rss} = this.props.podcast;
        let profileImage = '';

        if(rss){
            firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                if(snapshot.val()){
                    profileImage = snapshot.val().profileImage
                }
            });
            this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1800);

        }
        else{
            const storageRef = firebase.storage().ref(`/users/${podcastArtist}/image-profile-uploaded`);
            storageRef.getDownloadURL()
                .then(function(url) {
                    profileImage = url;
                }).catch(function(error) {
                //
            });
            this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1800);

        }

        let listens = 0;
        if(id){
            firebase.database().ref(`podcasts/${id}/plays`).once("value", function (snapshot) {
                snapshot.forEach(function (data) {
                    listens = listens + 1;
                })
            });

            setTimeout(() => {
                this.setState({listens: listens})
            }, 750)
        }



    }


    _renderProfileImage = () => {

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', height: 160, width: 160, borderRadius: 4, borderWidth:8, borderColor:'rgba(320,320,320,0.8)' }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 80,
                        color: 'white',
                        marginTop: 35,
                    }} name="user-circle">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', height: 160, width: 160}}>
                    <Image
                        style={{width: 160, height: 160, alignSelf: 'center', opacity: 1, borderRadius: 4}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    };



    onPressPlay = () => {

        const {podcastArtist} = this.props.podcast;
        const {podcastTitle} = this.props.podcast;
        const {podcastDescription} = this.props.podcast;
        const {podcastCategory} = this.props.podcast;
        const {id} = this.props.podcast;
        const {rss} = this.props.podcast;
        const {podcastURL} = this.props.podcast;
        const {currentUser} = firebase.auth();
        const user = currentUser.uid;
        const {podcast} = this.props;
        Variables.state.highlight = false;


        Analytics.logEvent('play', {
            'episodeID': id,
            'epispdeTitle': podcastTitle,
            'episodeArtist': podcastArtist,
            'user_id': user
        });

        firebase.database().ref(`users/${currentUser.uid}/tracking/${podcastArtist}/episodes/${id}`).remove();


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


    };



    onPressQueue = () => {

        const {currentUser} = firebase.auth();
        const {id} = this.props.podcast;

        Analytics.logEvent('addToQueue', {
            'episodeID': id,
            'user_id': currentUser.uid
        });

        firebase.database().ref(`users/${currentUser.uid}/queue/`).once("value", function (snap) {
            snap.forEach(function (data) {
                if(data.val().id == id){
                    firebase.database().ref(`users/${currentUser.uid}/queue/${data.key}`).remove()
                }
            });
            firebase.database().ref(`users/${currentUser.uid}/queue/`).push({id});
        });

    };

    renderListens(){
        if(this.state.username != ''){
            if(this.state.listens > 1){
                return(
                    <Text style={styles.bottomTitle}>{this.state.listens} listens</Text>
                )
            }
            else if (this.state.listens == 1){
                return(
                    <Text style={styles.bottomTitle}>{this.state.listens} listen</Text>
                )
            }
            else{
                return(
                    <Text style={styles.bottomTitle}>{this.state.listens} listens</Text>
                )
            }
        }

    }


    render() {

        return (
            <View style = {{marginHorizontal: 10, marginVertical: 5}}>
                <View style={{ backgroundColor: '#fff', marginHorizontal: 10, borderRadius: 10, width: width-20 }}>
                    <View style={{marginVertical: 10}}>
                        <View style={{flexDirection: 'row', marginVertical: 5}}>
                            <View style={{flex: 8, alignSelf: 'flex-start'}}>
                                <Text style={styles.titleCard}>{this.state.title}</Text>
                            </View>
                            <View style={{flex: 1, alignSelf: 'flex-end'}}>
                                <TouchableOpacity onPress={() => {
                                    const {podcast} = this.props;
                                    const rowData = podcast;

                                    const {navigator} = this.props;

                                    this.props.navigator.showLightBox({
                                        screen: "PodcastOptions",
                                        passProps: {rowData, navigator},
                                        style: {
                                            backgroundBlur: "dark",
                                            backgroundColor: '#3e416430',
                                            tapBackgroundToDismiss: true,
                                            width: 100,
                                            height: 200
                                        },
                                    });

                                }} style={styles.rightContainer}>
                                    <Icon style={{
                                        textAlign: 'right',
                                        marginTop: 5,
                                        marginRight: height/44.47,
                                        fontSize: height/26,
                                        color: '#506dcf',
                                    }} name="ellipsis-h">
                                    </Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <TouchableWithoutFeedback>
                            <View style={{padding: 10, flexDirection: 'row'}}>

                                <View style = {{alignSelf: 'center'}}>
                                    {this._renderProfileImage()}
                                </View>

                                <View style = {{alignSelf: 'center', flex:1, marginHorizontal: 10}}>
                                    <Text style={styles.artistTitle}>{this.state.description}</Text>
                                    <View style={{flexDirection: 'row', marginTop: 15}}>
                                        <TouchableOpacity style= {{backgroundColor:'#3e4164', flex: 1, alignSelf: 'flex-start', paddingHorizontal: 2, paddingVertical: 5, borderRadius: 5, marginHorizontal: 4}} onPress={this.onPressPlay}>
                                            <Icon style={{
                                                textAlign: 'center',
                                                fontSize: 14,
                                                alignSelf: 'center',
                                                color: 'white',
                                            }} name="play">
                                                <Text style={styles.whiteTitle}> Play</Text>
                                            </Icon>
                                        </TouchableOpacity>
                                        <TouchableOpacity style= {{backgroundColor:'#3e4164', flex: 1, alignSelf: 'flex-end', paddingHorizontal: 2, paddingVertical: 5, borderRadius: 5, marginHorizontal: 4}} onPress={this.onPressQueue}>
                                            <Icon style={{
                                                textAlign: 'center',
                                                fontSize: 14,
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
                        <View style={{flexDirection: 'row', paddingBottom: 5}}>
                            <View style={{flex:1, alignSelf: 'flex-start'}}>
                                <Text style={styles.bottomTitle}>{this.state.profileName}</Text>
                            </View>
                            <View style={{flex:1, alignSelf: 'flex-end'}}>
                                {this.renderListens()}
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        );


    }
}

const styles = {
    title: {
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
    bottomTitle: {
        color: '#828393',
        textAlign: 'center',
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
        fontSize: 12,
        backgroundColor: 'transparent',
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
};




export default ListItemCard;