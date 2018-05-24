import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableOpacity, Image, Dimensions, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
var Analytics = require('react-native-firebase-analytics');
import Variables from "./Variables";

var {height, width} = Dimensions.get('window');




// A single highlight on a list

class ListItemHighlight extends Component {

    constructor(props) {
        super(props);

        const {endTime} = this.props.highlight;
        const {startTime} = this.props.highlight;
        this.state = {
            profileImage: '',
            username: '',
            endTime: endTime,
            startTime: startTime,
            totalTime: endTime-startTime,
            episode: [],
            podcastTitle: ''
        };

        const {podcastID} = this.props.highlight;
        let rss = false;
        let episode = [];

        firebase.database().ref(`podcasts/${podcastID}`).once("value", function (snapshot) {

            if(snapshot.val()){
                if(snapshot.val().rss == true){
                    rss = true;
                }
                    episode = snapshot.val();
            }

        });

        setTimeout(() => {

            let profileName = 'loading';
            firebase.database().ref(`/users/${episode.podcastArtist}/username`).orderByChild("username").once("value", function (snap) {
                if (snap.val()) {
                    profileName = snap.val().username;
                }
            });

            setTimeout(() => {
                this.setState({username: profileName, episode: episode, podcastTitle: episode.podcastTitle});
            }, 300);

            setTimeout(() => {
                this.setState({username: profileName, episode: episode, podcastTitle: episode.podcastTitle});
            }, 1000);


            let profileImage = '';
            if(rss){
                firebase.database().ref(`users/${episode.podcastArtist}/profileImage`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        profileImage = snapshot.val().profileImage
                    }
                });
                this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1200);
                this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage})},3400);

            }
            else{
                const storageRef = firebase.storage().ref(`/users/${episode.podcastArtist}/image-profile-uploaded`);
                storageRef.getDownloadURL()
                    .then(function(url) {
                        profileImage = url;
                    }).catch(function(error) {
                    //
                });
                this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1200);
                this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage})},3400);

            }


        }, 1200);




    }


    componentWillUpdate() {
        LayoutAnimation.spring();
    }


    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginLeft: 10, alignSelf: 'center', height: 50, width: 50, borderRadius: 4, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)'}}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 35,
                        marginTop: 8,
                        color: 'white',
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginLeft: 10, height: 50, width: 50}}>
                    <Image
                        style={{width: 50, height: 50, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 4, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }


    renderInfo = () => {

        if((this.state.username + ' • ' + this.state.podcastTitle).length > 60){
            return(
                (this.state.username + ' • ' + this.state.podcastTitle).slice(0,60) + '...'
            )

        }
        if(this.state.username == '' && this.state.podcastTitle == ''){
            return(
                ''
            )
        }
        else{
            return(
                (this.state.username + ' • ' + this.state.podcastTitle)
            )
        }


    };

    render() {

        const {title} = this.props.highlight;

        return (

            <TouchableOpacity onPress={() => {

                const {podcastArtist} = this.state.episode;
                const {podcastTitle} = this.state.episode;
                const {title} = this.props.highlight;
                const {podcastCategory} = this.state.episode;
                const {id} = this.state.episode;
                const {description} = this.props.highlight;
                Variables.state.highlightStart = this.state.startTime;
                Variables.state.highlightEnd = this.state.endTime;
                Variables.state.seekTo = this.state.startTime;
                Variables.state.currentTime = this.state.startTime;


                if(this.state.episode != []){
                    if(this.state.episode.rss){
                        AsyncStorage.setItem("currentPodcast", '');
                        AsyncStorage.setItem("currentTime", "0");

                        Variables.pause();
                        Variables.setPodcastFile(this.state.episode.podcastURL);
                        Variables.state.isPlaying = false;
                        Variables.state.highlight = true;
                        Variables.state.rss = true;
                        Variables.state.podcastURL = this.state.episode.podcastURL;
                        Variables.state.podcastArtist = podcastArtist;
                        Variables.state.podcastTitle = title;
                        Variables.state.podcastID = id;
                        Variables.state.podcastCategory = podcastCategory;
                        Variables.state.podcastDescription = description;
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

                        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                            if(snap.val()){
                                Variables.state.currentUsername = snap.val().username;
                            }
                            else {
                                Variables.state.currentUsername = podcastArtist;
                            }
                        });


                    }
                    else if(id){
                        AsyncStorage.setItem("currentPodcast", '');
                        AsyncStorage.setItem("currentTime", "0");

                        firebase.storage().ref(`/users/${podcastArtist}/${id}`).getDownloadURL().catch(() => {console.warn("file not found")})
                            .then(function(url) {

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
                                Variables.state.userProfileImage = '';
                                Variables.play();
                                Variables.state.isPlaying = true;

                            });


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

                        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                            if(snap.val()){
                                Variables.state.currentUsername = (snap.val().username + ' • ' + podcastTitle).slice(0,35) + '...';
                            }
                            else {
                                Variables.state.currentUsername = podcastArtist;
                            }
                        });



                    }


                }





            }}>
                <View style={styles.container}>

                    {this._renderProfileImage()}

                    <View style={styles.leftContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.artistTitle}>{this.renderInfo()}</Text>
                    </View>


                    <View style={styles.rightContainer}>
                        <Icon style={{
                            textAlign: 'left',
                            marginLeft: 0,
                            marginRight: height/44.47,
                            fontSize: height/40,
                            color: '#3e4164',
                        }} name="md-time">
                            <Text style = {styles.time}> {(this.state.totalTime/60).toFixed(0)}:{(this.state.totalTime%60).toFixed(0)}</Text>
                        </Icon>
                    </View>


                </View>
            </TouchableOpacity>

        );



    }


}

const styles = {
    title: {
        color: '#3e4164',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginHorizontal: 20,

    },
    time: {
        color: '#3e416480',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/40,
        backgroundColor: 'transparent',
        marginHorizontal: 20,

    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginLeft: 20,
    },
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
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginHorizontal: -100,
    },
};




export default ListItemHighlight;