import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {AudioUtils} from 'react-native-audio';
import Variables from "./Variables";



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

    constructor(state) {
        super(state);
        this.state ={
            profileName: '',
            profileImage: ''
        };
    }


    getProfileImageUrl(){
        const { podcastArtist } = this.props.podcast;

        const storageRef = firebase.storage().ref(`/users/${podcastArtist}/image-profile-uploaded`);
        storageRef.getDownloadURL()
            .then(function(url) {

                console.warn("setting to " + url);
                return url;

            }).catch(function(error) {
            return '';
            //
        });
    }


    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginBottom:10, height: 130, width: 130, borderRadius:10, borderWidth:5, borderColor:'rgba(320,320,320,0.8)'  }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 80,
                        color: 'white',
                        marginTop: 20
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginBottom:10, height: 130, width: 130  }}>
                    <Image
                        style={{width: 130, height:130, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 10, borderWidth: 0.1, borderColor: 'transparent'}}
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

                    });

    }




    render() {
        const {podcastTitle} = this.props.podcast;
        const {podcastArtist} = this.props.podcast;
        let {profileImage} = this.props.podcast;
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
        if(podcastTitle.toString().length > 12 ){
            fixedTitle = (podcastTitle.toString().slice(0,12)+"...")
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