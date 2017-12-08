import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {AudioUtils} from 'react-native-audio';
import Variables from "./Variables";


class ListItem extends Component {

    componentWillMount(){
        const { podcastTitle } = this.props.podcast;
        const {currentUser} = firebase.auth();
        if(!firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(podcastTitle)){
            this.setState({
                favorite: true
            });
        }
        else{
            this.setState({
                interval: false
            });
        }
    }

    constructor(props) {
        super(props);
    }

    state = {
        favorite: false,
        keyID: 0,
    };


    componentWillUpdate() {
        LayoutAnimation.spring();
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



    onAddPress=()=>{
        const {currentUser} = firebase.auth();
        const { podcastTitle } = this.props.podcast;
        const {podcastArtist} = this.props.podcast;
        const { podcastCategory } = this.props.podcast;
        const {podcastDescription} = this.props.podcast;


            if(!this.state.favorite) {

                Alert.alert(
                    'Add to favorites?',
                    '',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {
                            text: 'Yes', onPress: () => {
                            firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(podcastTitle).update({podcastArtist, podcastTitle, podcastCategory, podcastDescription});
                                this.setState({favorite: true})
                        }
                        },
                    ],
                    {cancelable: false}
                )

            }
            else{
                Alert.alert(
                    'Remove from favorites?',
                    '',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {
                            text: 'Yes', onPress: () => {
                            firebase.database().ref(`users/${currentUser.uid}/favorites/${podcastTitle}`).remove();
                            this.setState({favorite: false})
                        }
                        },
                    ],
                    {cancelable: false}
                )

            }

    };










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

                                Variables.pause();
                                Variables.setPodcastFile(url);
                                Variables.state.isPlaying = false;
                                Variables.state.podcastTitle = podcastTitle;
                                Variables.state.podcastArtist = podcastArtist;
                                Variables.state.podcastCategory = podcastCategory;
                                Variables.state.podcastDescription = podcastDescription;
                                Variables.state.podcastID = id;
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


                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>{podcastTitle}</Text>
                            <Text style={styles.artistTitle}>{profileName}</Text>
                        </View>


                        <View style={styles.rightContainer}>
                            <Icon onPress={() => {
                                const {navigator} = this.props;

                                this.props.navigator.showLightBox({
                                    screen: "PodcastOptions",
                                    passProps: {rowData, navigator},
                                    style: {
                                        backgroundBlur: "light",
                                        backgroundColor: "#9f60ff",
                                        tapBackgroundToDismiss: true,
                                        width: 100,
                                        height: 200
                                    },
                                });

                            }} style={{
                                textAlign: 'left',
                                marginLeft: 0,
                                marginRight: 15,
                                fontSize: 30,
                                color: '#5757FF',
                            }} name="ios-more">
                            </Icon>
                        </View>


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
        paddingLeft: 2,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        paddingRight: 2,
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