import React, { Component } from 'react';
import { Text, TouchableOpacity, View, LayoutAnimation } from 'react-native';
import { CardSection } from "./common/CardSection";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {AudioUtils} from 'react-native-audio';
import Variables from "./Variables";
import RNFetchBlob from 'react-native-fetch-blob';


class ListItem extends Component {
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    onRowPress(){
        const {currentUser} = firebase.auth();
        const { podcastTitle } = this.props.podcast;
        const { podcastDescription } = this.props.podcast;
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

                    });


        }).catch(function(error) {
            //
        });



    }


    renderDescription(){
        const { podcasts, expanded } = this.props;

        if (expanded) {
            return (
                <CardSection>
                <Text style={{ flex: 1 }}>
                    {podcasts.podcastDescription}
                </Text>
                </CardSection>
            );
        }
    }

    render() {
        const { podcastTitle } = this.props.podcast;

        return (
            <TouchableOpacity onPress={this.onRowPress.bind(this)}>
                <View style={styles.container}>

                    <Icon style={{textAlign:'left', marginLeft: 20,paddingRight: 8, fontSize: 35,color:'#be8eff' }} name="ios-play">
                        <Text style={styles.title}>   {podcastTitle}</Text>
                    </Icon>

                    {this.renderDescription()}
                </View>
            </TouchableOpacity>

        );
    }


}

const styles = {
    title: {
        color: '#FFF',
        marginTop: 20,
        flex:1,
        textAlign: 'left',
        paddingLeft: 10,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    container: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 3,
        marginHorizontal: 25,
        backgroundColor: '#804cc8',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 10,
        borderStyle: 'solid'
    }
};




export default ListItem;