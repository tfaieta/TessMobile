import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {AudioUtils} from 'react-native-audio';
import Variables from "./Variables";
import RNFetchBlob from 'react-native-fetch-blob';


class ListItemUsers extends Component {

    state = {
        favorite: false,
        keyID: 0,
    };

    componentWillMount() {
        const {podcastTitle} = this.props.podcast;
        const {currentUser} = firebase.auth();
        if (!firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(podcastTitle)) {
            this.setState({
                favorite: true
            });
        }
        else {
            this.setState({
                favorite: false
            });
        }
    }

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

                RNFetchBlob
                    .config({
                        Authorization: currentUser.uid,
                        fileCache: true,
                        appendExt: podcastTitle + '.aac'

                    })
                    .fetch('GET', url.toString(), {

                    })
                    .then((res) => {

                        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                            if(snap.val()){
                                Variables.state.currentUsername = snap.val().username;
                            }
                            else {
                                Variables.state.currentUsername = podcastArtist;
                            }
                        });

                        Variables.pause();
                        Variables.setPodcastFile(res.path());
                        Variables.state.podcastTitle = podcastTitle;
                        Variables.state.podcastDescription = podcastDescription;
                        Variables.state.podcastCategory = podcastCategory;
                        Variables.state.podcastArtist = podcastArtist;
                        Variables.play();
                        Variables.state.isPlaying = false;

                    });


            }).catch(function(error) {
            //
        });



    }


    render() {
        const {podcastTitle} = this.props.podcast;
        const {podcastArtist} = this.props.podcast;
        const {currentUser} = firebase.auth();

        let profileName = podcastArtist;
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = podcastArtist;
            }
        });


        return (

            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View style={{padding: 10}}>
                <Icon style={{
                    textAlign: 'left',
                    marginLeft: 10,
                    fontSize: 160,
                    color: 'rgba(130,131,147,0.5)',
                    marginBottom: -25,
                    marginTop: -10
                }} name="md-square">
                </Icon>
                <Text style={styles.title}>{podcastTitle}</Text>
                <Text style={styles.artistTitle}>{profileName}</Text>
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
        fontSize: 16,
        marginLeft: 10,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#9596A3',
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        paddingVertical: 5,
        marginLeft: 10,
        fontSize: 14,
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