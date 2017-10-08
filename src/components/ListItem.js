import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {AudioUtils} from 'react-native-audio';
import Variables from "./Variables";
import RNFetchBlob from 'react-native-fetch-blob';
import Swipeout from 'react-native-swipeout';


class ListItem extends Component {
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

        firebase.storage().ref(`/users/${currentUser.uid}/${podcastTitle}`).getDownloadURL()
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
        const { podcastTitle } = this.props.podcast;
        let profileName = firebase.auth().currentUser.displayName;

        var swipeoutBtns = [
            {
                text: 'Save',
                backgroundColor: '#7ae4e7'
            },
            {
                text: 'Remove',
                backgroundColor: '#e35e5e',
            }
        ];

        return (
<Swipeout right={swipeoutBtns}>
            <TouchableHighlight underlayColor="white" onPress={this.onRowPress.bind(this)}>
                <View style={styles.container}>


                    <View style={styles.leftContainer}>
                        <Icon style={{textAlign:'left', marginLeft: 20,paddingRight: 8, fontSize: 35,color:'#be8eff' }} name="ios-play">
                        </Icon>
                    </View>


                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>   {podcastTitle}</Text>
                        <Text style={styles.artistTitle}>{profileName}</Text>
                    </View>


                    <View style={styles.rightContainer}>
                        <Icon style={{textAlign:'left', marginLeft: 20,paddingRight: 8, fontSize: 35,color:'#be8eff' }} name="ios-arrow-dropright">
                        </Icon>
                    </View>




                </View>
            </TouchableHighlight>
</Swipeout>

        );
    }


}

const styles = {
    title: {
        color: '#804cc8',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        paddingLeft: 0,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#804cc8',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        paddingLeft: 2,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
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