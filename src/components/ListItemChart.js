import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableHighlight, Image, Dimensions, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Variables from "./Variables";
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');

// A single episode on a list, used for top charts

class ListItemChart extends Component {


    componentWillMount(){
        const {podcastArtist} = this.props.podcast;
        const {rss} = this.props.podcast;
        let profileImage = '';

        if(rss){
            firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                if(snapshot.val()){
                    profileImage = snapshot.val().profileImage
                }
            });
            this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})}, 1200);
            this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage})}, 3400);

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

    componentWillUnmount() {
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
        clearTimeout(this.timeout4);
    }


    constructor(props) {
        super(props);
        this.state = {
            profileImage: '',
            username: '',
            title: '',
        };

        const {podcastArtist} = this.props.podcast;
        const {podcastTitle} = this.props.podcast;

        let profileName = '';
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").once("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = podcastArtist;
            }
        });

        this.timeout3 = setTimeout(() => {
            this.setState({username: profileName});
            this.setState({title: podcastTitle});
        }, 300);

        this.timeout4 = setTimeout(() => {
            this.setState({username: profileName});
            this.setState({title: podcastTitle});
        }, 1000);



    }

    state = {
        favorite: false,
        keyID: 0,
    };


    componentWillUpdate() {
        LayoutAnimation.spring();
    }


    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', height: width/4.17, width: width/4.17, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)'}}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: width/6.25,
                        marginTop: height/66.7,
                        color: 'white',
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', height: width/4.17, width: width/4.17, }}>
                    <Image
                        style={{height: width/4.17, width: width/4.17, position: 'absolute', alignSelf: 'center', opacity: 1,}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }


    renderTitle(title){
        if(title.length > (width/6.25)){
            return title.slice(0,(width/6.25))+"..."
        }else{
            return title;
        }

    }


    render() {

        return (

            <TouchableHighlight onPress={() =>  {

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



            }} onLongPress={() => {
                const {currentUser} = firebase.auth();
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
            }} style={{backgroundColor: '#f5f4f9',}} underlayColor='#f5f4f9'>
                <View>
                <View style={styles.container}>

                    <View style={styles.leftContainer}>
                        <Text style={styles.titleNum}>{this.props.index}</Text>
                    </View>

                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>{this.renderTitle(this.state.title)}</Text>
                        <Text style={styles.artistTitle}>{this.state.username}</Text>
                    </View>

                    <View style={styles.rightContainer}>
                        {this._renderProfileImage()}
                    </View>

                </View>
                <View style={{backgroundColor: '#00000030', paddingBottom: 1}}/>
                </View>

            </TouchableHighlight>
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
        fontSize: width/25,
        
        marginHorizontal: width/18.75,
        marginTop: height/133.4,

    },
    titleNum: {
        color: '#8C8C8C',
        marginTop: height/133.4,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontSize: width/18.75,
        
        marginLeft: width/25,

    },
    artistTitle: {
        color: '#8C8C8C',
        marginTop: 2,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        
        marginLeft: 20,
        marginHorizontal: 20,
    },
    container: {
        backgroundColor: '#F9F8FC',
        opacity: 1,
        flexDirection: 'row',
    },
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1.8,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 6,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
};

export default ListItemChart;
