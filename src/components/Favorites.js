import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, ListView, TouchableOpacity, Text} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import { podcastFetchFavs } from "../actions/PodcastActions"
import firebase from 'firebase';
import Variables from "./Variables";
import Icon from 'react-native-vector-icons/Ionicons';
import {AudioUtils} from 'react-native-audio';
import RNFetchBlob from 'react-native-fetch-blob';
import {Actions} from 'react-native-router-flux';



class Favorites extends Component{

    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts),
            loading: true
        }
    }

    state={
        loading: true
    };



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

    _pressBack(){
        Actions.pop();
    }



    renderRow(rowData) {
        let profileName = rowData.podcastArtist;
        firebase.database().ref(`/users/${rowData.podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = rowData;
            }
        });




        return (
            <TouchableOpacity underlayColor='#5757FF' onPress={this.onRowPress}>
                <View style={styles.container2}>


                    <View style={styles.leftContainer}>
                        <Icon style={{
                            textAlign: 'left',
                            marginLeft: 20,
                            fontSize: 70,
                            color: '#b5b6cd'
                        }} name="md-square">
                        </Icon>
                    </View>


                    <View style={styles.middleContainer}>
                        <Text style={styles.title2}>   {rowData.podcastTitle}</Text>
                        <Text style={styles.artistTitle}>{profileName}</Text>
                    </View>



                </View>
            </TouchableOpacity>
        )

    }


    render() {
        return (
            <View
                style={styles.container}>

                <View style={{flexDirection: 'row', width: 375, height: 70, borderRadius: 10, borderWidth: 2, borderColor: 'rgba(187,188,205,0.3)',   }}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 30,color:'#9496A3'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>Favorites</Text>
                    </View>

                    <View>
                    </View>

                </View>



                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />




                <PlayerBottom/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },

    container2: {
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

    title2: {
        color: '#2A2A30',
        flex:1,
        marginTop:20,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color:  '#9496A3',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

    leftContainer: {
        flex:1
    },

    middleContainer: {
        flex: 9,
        marginTop: 3,
        marginHorizontal: -200,
    },
    header: {
        marginTop:10,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 18,
        backgroundColor: 'transparent',

    }

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchFavs })(Favorites);