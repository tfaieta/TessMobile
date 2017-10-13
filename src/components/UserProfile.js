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
import { podcastFetchUser } from "../actions/PodcastActions"
import ListItem from './ListItem';
import PlayerBottom from './PlayerBottom';
import {podFile} from "./Record";
import Sound from 'react-native-sound';
import {profileNameL} from './LoginForm.js';
import {profileName} from './CreateAccount.js';
import Variables from './Variables';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';




class UserProfile extends Component {
    componentWillMount(){
        this.props.podcastFetchUser(Variables.state.podcastArtist);


        this.creataDataSource(this.props);


        firebase.database().ref(`/users/${Variables.state.podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentUsername = snap.val().username;
            }
            else {
                Variables.state.currentUsername = Variables.state.podcastArtist;
            }
        });

        firebase.database().ref(`/users/${Variables.state.podcastArtist}/favCategory`).orderByChild("favCategory").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentFavCategory = snap.val().favCategory;
            }
            else {
                Variables.state.currentFavCategory = "Too hard to choose"
            }
        });

        firebase.database().ref(`/users/${Variables.state.podcastArtist}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentBio = snap.val().bio;
                Actions.refresh();
            }
            else {
                Variables.state.currentBio = "Tell others about yourself";
                Actions.refresh();
            }
        });



    }

    componentWillReceiveProps(nextProps) {

        this.creataDataSource(nextProps);
    }


    creataDataSource({ podcast }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(podcast);
    }


    constructor(props) {
        super(props);
        this.state = { username: 'none' , bio: "Tell others about yourself...", category: '', profileName: profileName, following: false, profileNameL: profileNameL}
    }



    playPodcast = () =>  {

        Variables.state.isPlaying = true;


        setTimeout(() => {
            var sound = new Sound(podFile, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });

            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');

                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    };


    _renderPodcast(PodcastTitle){

        if(Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.playingText}> </Text>
            )
        }
        else{
            return (
                <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                    <Text style={styles.title} >  {PodcastTitle}</Text>
                </Icon>
            )
        }

    }

    _renderProfileName = () => {

        return (
            <Text style={styles.title2} >{Variables.state.currentUsername}</Text>

        )

    };


    _renderBio = () => {

        return(
            <Text style={styles.titleBio} >{Variables.state.currentBio}</Text>
        )

    };


    _renderCategory = () => {

        if (Variables.state.currentFavCategory == 'fitness') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#6cff52'}} name="ios-body">
                    <Text style={{
                        color: '#6cff52',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> fitness</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'current') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#64fffc'}} name="md-bookmarks">
                    <Text style={{
                        color: '#64fffc',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> current event</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'politics') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#ffd038'}} name="md-megaphone">
                    <Text style={{
                        color: '#ffd038',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> politics</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'gaming') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#ff5442'}} name="md-game-controller-b">
                    <Text style={{
                        color: '#ff5442',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> gaming</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'sports') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#7fa5ff'}} name="ios-football">
                    <Text style={{
                        color: '#7fa5ff',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> sports</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'entertainment') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#fdff53'}} name="ios-musical-notes">
                    <Text style={{
                        color: '#fdff53',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> entertainment</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'life') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#3aff97'}} name="ios-body">
                    <Text style={{
                        color: '#3aff97',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> life</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'fashion') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#ff5e95'}} name="ios-shirt">
                    <Text style={{
                        color: '#ff5e95',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> fashion</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'trends') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#bd59ff'}} name="md-trending-up">
                    <Text style={{
                        color: '#bd59ff',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> trends</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'cars') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#ff861c'}} name="ios-car">
                    <Text style={{
                        color: '#ff861c',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> cars</Text>
                </Icon>
            )
        }
        if (Variables.state.currentFavCategory == 'misc') {
            return (
                <Icon style={{textAlign: 'center', fontSize: 40, color: '#aeb1a7'}} name="md-code-working">
                    <Text style={{
                        color: '#aeb1a7',
                        fontSize: 22,
                        marginTop: 5,
                        flexDirection: 'row',
                        backgroundColor: 'transparent',
                        alignSelf: 'center'
                    }}> misc</Text>
                </Icon>
            )
        }

        else {
            return (
                <Text style={styles.titleBio}>Too hard to choose</Text>
            )
        }

    };



    _renderFollowButton = () => {

        if(this.state.following) {
            return (
                <TouchableOpacity onPress={this.pressFollowButton} style={{backgroundColor: 'rgba(1,220,220,1)', paddingVertical: 10, marginHorizontal: 20}}>
                    <Text style={styles.titleFollow}>Unfollow</Text>
                </TouchableOpacity>
            )
        }
        else{
            return (
                <TouchableOpacity onPress={this.pressFollowButton} style={{backgroundColor: 'rgba(1,170,170,1)', paddingVertical: 10, marginHorizontal: 20}}>
                    <Text style={styles.titleFollow}>Follow</Text>
                </TouchableOpacity>
            )
        }

    };

    pressFollowButton =() => {
        if(this.state.following){
            this.setState({following: false})
        }
        else if (!this.state.following){
            this.setState({ following: true})
        }
    };



    renderRow(podcast) {
        return <ListItem podcast={podcast} />;
    }






    render() {
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="light-content"
                />


                <ScrollView >

                    {this._renderProfileName()}


                    <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 200,color:'#804cc8' }} name="md-contact">
                    </Icon>
                    {this._renderFollowButton()}

                    <Text style={styles.title2 }>Bio</Text>
                    {this._renderBio()}


                    <Text style={styles.title2 }>Favorite Category</Text>
                    {this._renderCategory()}

                    <Text style={styles.title2 }>Content</Text>

                    <View style={{paddingBottom: 30}}>
                        <ListView
                            enableEmptySections
                            dataSource={this.dataSource}
                            renderRow={this.renderRow}
                        />
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
        backgroundColor: '#FFF',
        paddingBottom: 115,
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
    title2: {
        color: '#804cc8',
        marginTop: 70,
        marginBottom: 5,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    titleBio: {
        color: '#804cc8',
        marginVertical: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    titleFollow: {
        color: '#fff',
        marginVertical: 5,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 22,
        backgroundColor: 'transparent'
    },
});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchUser })(UserProfile);