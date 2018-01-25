import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {AudioUtils} from 'react-native-audio';
import Variables from "./Variables";



//A single podcast on a list

class ListItem extends Component {

    componentWillMount(){
        const {podcastArtist} = this.props.podcast;

        let profileImage = '';
        const storageRef = firebase.storage().ref(`/users/${podcastArtist}/image-profile-uploaded`);
        storageRef.getDownloadURL()
            .then(function(url) {
                profileImage = url;
            }).catch(function(error) {
            //
        });
        setTimeout(() => {this.setState({profileImage: profileImage})},1200);
        setTimeout(() => {this.setState({profileImage: profileImage})},3400);
    }

    constructor(props) {
        super(props);
        this.state = {
            profileImage: ''
        }
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
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginLeft: 10, alignSelf: 'center', height: 50, width: 50, borderRadius: 10, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)', shadowOffset:{  width: 0,  height: 2}, shadowOpacity: 0.5, shadowRadius: 2}}>
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
                        style={{width: 50, height: 50, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 10, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }

    onRowPress(){
        const {currentUser} = firebase.auth();
        const { podcastTitle } = this.props.podcast;
        const { podcastDescription } = this.props.podcast;
        const { podcastCategory } = this.props.podcast;
        const { podcastArtist } = this.props.podcast;
        let localPath =  AudioUtils.DocumentDirectoryPath + '/local.aac';

        firebase.storage().ref(`/users/${podcastArtist}/${podcastTitle}`).getDownloadURL()
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
                        Variables.state.podcastTitle = podcastTitle;
                        Variables.state.podcastDescription = podcastDescription;
                        Variables.state.podcastCategory = podcastCategory;
                        Variables.state.podcastArtist = podcastArtist;
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

                    });





    }


    onGarbagePress(){
        Alert.alert(
            'Are you sure you want to delete?',
            '',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => console.warn('delete')
                },
            ],
            { cancelable: false }
        )
    }




    render() {

        const {podcastArtist} = this.props.podcast;

        let profileName = 'loading';
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = podcastArtist;
            }
        });

        const {podcastTitle} = this.props.podcast;
        const {podcastDescription} = this.props.podcast;
        const {podcastCategory} = this.props.podcast;
        const {id} = this.props.podcast;
        const {currentUser} = firebase.auth();
        const user = currentUser.uid;
        const {podcast} = this.props;
        const rowData = podcast;




            return (

                <TouchableOpacity onPress={() =>  {

                    if(id){
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




                }}>
                    <View style={styles.container}>

                        {this._renderProfileImage()}

                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>{podcastTitle}</Text>
                            <Text style={styles.artistTitle}>{profileName}</Text>
                        </View>


                        <TouchableOpacity onPress={() => {
                            const {navigator} = this.props;

                            this.props.navigator.showLightBox({
                                screen: "PodcastOptions",
                                passProps: {rowData, navigator},
                                style: {
                                    backgroundBlur: "dark",
                                    backgroundColor: "#44434410",
                                    tapBackgroundToDismiss: true,
                                    width: 100,
                                    height: 200
                                },
                            });

                        }} style={styles.rightContainer}>
                            <Icon style={{
                                textAlign: 'left',
                                marginLeft: 0,
                                marginRight: 15,
                                fontSize: 30,
                                color: '#5757FF',
                            }} name="ios-more">
                            </Icon>
                        </TouchableOpacity>


                    </View>
                </TouchableOpacity>

            );





    }


}

const styles = {
    title: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 15,
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
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginLeft: 20,
    },
    container: {
        paddingHorizontal: 0,
        paddingVertical: 10,
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
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 7,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
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




export default ListItem;