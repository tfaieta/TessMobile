import React, { Component } from 'react';
import { Text, View, Image, AsyncStorage, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Variables from "./Variables";
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');


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
            loading: true,
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
                if(snapshot.val()){
                    if(snapshot.val().podcastTitle){
                        title = snapshot.val().podcastTitle;
                    }
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
        else if(action == 'highlight'){
            const userID = id.split('~')[0];
            const highlightID = id.split('~')[1];
            firebase.database().ref(`users/${userID}/highlights/${highlightID}`).once('value', function (data) {
                if(data.val()){
                    if(data.val().podcastID){
                        firebase.database().ref(`podcasts/${data.val().podcastID}`).once('value', function (snap) {
                            if(snap.val()){
                                if(snap.val().podcastTitle){
                                    title = snap.val().podcastTitle;
                                }
                            }
                        })
                    }
                }
            })
        }

        const {time} = this.props;
        let timeNow = new Date().getTime();


        setTimeout(() =>{
            this.setState({profileName: profileName, title: title, time: timeNow-time, loading: false})
        },1200);


    }



    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginLeft: width/37.5, justifyContent: 'center', alignSelf: 'center', height: width/9.38, width: width/9.38, borderRadius: width/18.75, borderWidth: 5, borderColor:'rgba(320,320,320,0.8)',  }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: width/15,
                        color: 'white',
                        marginTop: height/333.5
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', justifyContent: 'center', alignSelf: 'center', marginLeft: width/37.5, height: width/9.38, width: width/9.38, }}>
                    <Image
                        style={{width: width/9.38, height: width/9.38, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: width/18.75, borderWidth: 0.1, borderColor: 'transparent'}}
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


                            firebase.storage().ref(`/users/${snapshot.val().podcastArtist}/${id}`).getDownloadURL().catch(() => {console.warn("file not found")})
                                .then(function(url) {
                                    Variables.pause();
                                    Variables.setPodcastFile(url);
                                    Variables.state.isPlaying = false;
                                    Variables.state.podcastTitle = snapshot.val().podcastTitle;
                                    Variables.state.podcastArtist = snapshot.val().podcastArtist;
                                    Variables.state.podcastCategory = snapshot.val().podcastCategory;
                                    Variables.state.podcastDescription = snapshot.val().podcastDescription;
                                    Variables.state.podcastID = id;
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
                                    if(data.key == id){
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
        else if(action == 'highlight'){
            const {id} = this.props;
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

            }, 500);
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
            else if(action == 'highlight'){
                return(
                    <Text style={styles.title}><Text style={styles.titleBold} onPress={this.messagePressUser}>{this.state.profileName}</Text> created <Text onPress={() => {this.messagePressUserTarget(action)}} style={styles.title}>a highlight from {this.state.title}</Text></Text>
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


    renderItem = () => {
        if(this.state.loading){
            return (

                <View>
                    <View style={{paddingVertical: height/133.4}}>

                    </View>
                    <View style={styles.container}>

                        <View style={{backgroundColor:'rgba(130,131,147,0.2)', marginLeft: width/37.5, justifyContent: 'center', alignSelf: 'center', height: width/9.38, width: width/9.38, borderRadius: width/37.5, borderWidth: 5, borderColor:'rgba(320,320,320,0.8)',  }}>
                            <Icon style={{
                                textAlign: 'center',
                                fontSize: width/15,
                                color: 'white',
                                marginTop: height/333.5
                            }} name="md-person">
                            </Icon>
                        </View>

                        <View style={{justifyContent: 'center', alignSelf: 'flex-start'}}>
                            <View style={{backgroundColor: '#82839320', paddingVertical: height/95.3, marginVertical: height/333.5, marginHorizontal: width/20, paddingHorizontal: width/3, borderRadius: width/18.75}}/>
                            <View style={{backgroundColor: '#82839320', paddingVertical: height/95.3, marginVertical: height/333.5, marginHorizontal: width/20, paddingHorizontal: width/3, borderRadius: width/18.75}}/>
                        </View>

                    </View>

                </View>
            )
        }
        else{
            return (

                <View>
                    <View style={{paddingVertical: height/133.4}}>

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
    };

    render() {

        return (

            <View>
                {this.renderItem()}
            </View>
        )

    }

}

const styles = {
    container: {
        paddingHorizontal: 0,
        paddingVertical: height/66.7,
        marginVertical: height/667,
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
        marginLeft: width/18.75,
        marginRight: width/37.5,
        fontSize: width/26.79,
        backgroundColor: 'transparent'
    },
    titleBold: {
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        marginLeft: width/18.75,
        marginRight: width/37.5,
        fontSize: width/23.44,
        backgroundColor: 'transparent'
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
};




export default ListItemFollowed;