import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableHighlight, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {AudioUtils} from 'react-native-audio';
import Variables from "./Variables";


class ListItem extends Component {

    state = {
        favorite: false,
        keyID: 0,
    };

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
                        Variables.play();
                        Variables.state.isPlaying = true;

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


            if(!this.state.favorite) {

                Alert.alert(
                    'Add to favorites?',
                    '',
                    [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {
                            text: 'Yes', onPress: () => {
                            firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(podcastTitle).update({podcastArtist, podcastTitle});
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


        if (currentUser.uid == podcastArtist) {
            return (

                <TouchableHighlight underlayColor='#5757FF' onPress={this.onRowPress.bind(this)}>
                    <View style={styles.container}>


                        <View style={styles.leftContainer}>
                            <Icon style={{
                                textAlign: 'left',
                                marginLeft: 20,
                                paddingRight: 8,
                                fontSize: 35,
                                color: '#5757FF',
                            }} name="ios-play">
                            </Icon>
                        </View>


                        <View style={styles.middleContainer}>
                            <Text style={styles.title}>   {podcastTitle}</Text>
                            <Text style={styles.artistTitle}>{profileName}</Text>
                        </View>


                        <View style={styles.rightContainer}>
                            <Icon onPress={this.onGarbagePress} style={{
                                textAlign: 'left',
                                marginLeft: 20,
                                paddingRight: 8,
                                fontSize: 35,
                                color: '#5757FF',
                            }} name="md-trash">
                            </Icon>
                        </View>


                    </View>
                </TouchableHighlight>

            );
        }


        else{
            return (

                <TouchableHighlight underlayColor='#5757FF' onPress={this.onRowPress.bind(this)}>
                    <View style={styles.container}>


                        <View style={styles.leftContainer}>
                            <Icon style={{
                                textAlign: 'left',
                                marginLeft: 20,
                                paddingRight: 8,
                                fontSize: 35,
                                color: '#5757FF',
                            }} name="ios-play">
                            </Icon>
                        </View>


                        <View style={styles.middleContainer}>
                            <Text style={styles.title}>   {podcastTitle}</Text>
                            <Text style={styles.artistTitle}>{profileName}</Text>
                        </View>


                        <View style={styles.rightContainer} onPress={this.onAddPress}>
                            <Icon onPress={this.onAddPress} style={{
                                textAlign: 'left',
                                marginLeft: 20,
                                paddingRight: 8,
                                fontSize: 35,
                                color: '#5757FF',
                            }} name="md-add">
                            </Icon>
                        </View>


                    </View>
                </TouchableHighlight>

            );
        }





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




export default ListItem;