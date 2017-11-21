import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {AudioUtils} from 'react-native-audio';
import Variables from "./Variables";


class ListItemFollowed extends Component {

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

            });





    }








    render(rowData) {

        let profileName = rowData;
        firebase.database().ref(`/users/${rowData}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = rowData;
            }
        });



        return (

            <TouchableOpacity underlayColor='#5757FF' onPress={ () =>{
                Variables.state.podcastArtist = rowData;
                this.props.navigator.push({
                    screen: 'UserProfile',
                    animated: true,
                    animationType: 'fade',
                });
            }}>
                <View style={styles.container2}>


                    <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginBottom:10, marginLeft:10, height: 60, width: 60, borderRadius:10, borderWidth:5, borderColor:'rgba(320,320,320,0.8)'  }}>
                        <Icon style={{
                            textAlign: 'center',
                            fontSize: 40,
                            color: 'white',
                            marginTop: 5
                        }} name="md-person">
                        </Icon>
                    </View>


                    <View style={styles.middleContainer}>
                        <Text style={styles.title2}>   {profileName}</Text>
                    </View>


                </View>
            </TouchableOpacity>
        )

    }


}

const styles = {
    title: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        paddingLeft: 0,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        paddingLeft: 2,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    container: {
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
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
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




export default ListItemFollowed;