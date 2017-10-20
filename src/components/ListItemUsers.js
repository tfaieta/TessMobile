import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableHighlight, } from 'react-native';
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
                        Variables.state.isPlaying = false;
                        Variables.state.podcastTitle = podcastTitle;
                        Variables.state.podcastDescription = podcastDescription;
                        Variables.state.podcastCategory = podcastCategory;
                        Variables.state.podcastArtist = podcastArtist;

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

            <TouchableHighlight underlayColor='#804cc8' onPress={this.onRowPress.bind(this)}>
                <View style={styles.container}>


                    <View style={styles.leftContainer}>
                        <Icon style={{
                            textAlign: 'left',
                            marginLeft: 20,
                            paddingRight: 8,
                            fontSize: 70,
                            color: '#be8eff'
                        }} name="md-contact">
                        </Icon>
                    </View>


                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>   {podcastTitle}</Text>
                        <Text style={styles.artistTitle}>{profileName}</Text>
                    </View>



                </View>
            </TouchableHighlight>

        );


    }
}

const styles = {
    title: {
        color: '#804cc8',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#804cc8',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 20,
        backgroundColor: 'transparent',
        marginHorizontal: -300,
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