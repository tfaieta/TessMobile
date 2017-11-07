import React, {Component} from 'react';
import _ from 'lodash';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    ListView,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { podcastFetch } from "../actions/PodcastActions"
import PlayerBottom from './PlayerBottom';
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import Variables from './Variables';
import { Actions } from 'react-native-router-flux';



class Account extends Component {

    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.myPodcasts),
            loading: true,
            username: 'none' ,
            bio: "Tell others about yourself...",
            category: '',
        }
    }




    _renderProfileName(){

            return (
                <Text style={styles.title2} >{Variables.state.username}</Text>

            )

    }


    _renderBio() {

        return(
            <Text style={styles.titleBio} >{Variables.state.bio}</Text>
        )

    }



    renderRow = (rowData) => {

        let profileName = rowData.podcastArtist;
        firebase.database().ref(`/users/${rowData.podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = rowData.podcastArtist;
            }
        });


        const {currentUser} = firebase.auth();
        const podcastTitle = rowData.podcastTitle;
        const podcastDescription = rowData.podcastDescription;
        const podcastCategory = rowData.podcastCategory;
        const podcastArtist = rowData.podcastArtist;

        return (

            <TouchableOpacity underlayColor='#5757FF' onPress={() =>  {

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

            }}>
                <View style={styles.containerList}>


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
                        <Text style={styles.title}>   {rowData.podcastTitle}</Text>
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
            </TouchableOpacity>

        );
    };


    _pressSettings = () => {
        Actions.Settings();
    };


    render() {
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />

                <View style={{flexDirection: 'row', borderRadius: 10, paddingVertical:5, borderWidth: 2, borderColor: 'rgba(187,188,205,0.3)',   }}>
                    <View style={{flex:1,alignItems: 'flex-start'}}>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={styles.header}>Account</Text>
                    </View>

                    <View style={{flex:1,justifyContent: 'center', alignItems: 'flex-end', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressSettings}>
                        <Icon style={{
                            textAlign: 'right',
                            fontSize: 24,
                            marginRight: 10,
                            color: '#5757FF'
                        }} name="md-settings">
                        </Icon>
                        </TouchableOpacity>
                    </View>

                </View>


                <ScrollView >


                <Icon style={{textAlign:'center', marginTop:20, marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 180,color:'#BBBCCD' }} name="md-square">
                </Icon>

                    {this._renderProfileName()}


                    {this._renderBio()}


                    <Text style={styles.title3 }>Content</Text>
                    <View style={{height:1, backgroundColor:'#b5b6cd', borderRadius: 10, borderWidth:0.1, marginBottom: 10, marginHorizontal: 30 }} />

                    <View style={{paddingBottom: 30}}>
                        <ListView
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                    </View>

                    <View style={{paddingBottom:120}}>

                    </View>


                </ScrollView>





                <PlayerBottom/>

            </View>



        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF'
    },
    title2: {
        color: '#2A2A30',
        marginBottom: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    title3: {
        color: '#2A2A30',
        marginTop: 80,
        marginBottom: 5,
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 22,
        backgroundColor: 'transparent'
    },
    titleBio: {
        color: '#828393',
        marginVertical: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        marginHorizontal: 10,
        backgroundColor: 'transparent'
    },
    header: {
        marginTop:30,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

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
    containerList: {
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

});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetch })(Account);