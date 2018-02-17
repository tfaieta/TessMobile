import React, {Component} from 'react';
import _ from 'lodash';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    TouchableOpacity,
    Alert, Image,
    RefreshControl, Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { podcastFetchUser } from "../actions/PodcastActions";
import PlayerBottom from './PlayerBottom';
import {profileNameL} from './LoginForm.js';
import {profileName} from './CreateAccount.js';
import Variables from './Variables';
import firebase from 'firebase';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

import { Navigation } from 'react-native-navigation';
import ListItem from "./ListItem";

var {height, width} = Dimensions.get('window');




// contains a profile that you can view (any profile that is not yours)

class UserProfile extends Component {
    componentWillMount(){

        const {currentUser} = firebase.auth();
        const storageRef = firebase.storage().ref(`/users/${Variables.state.browsingArtist}/image-profile-uploaded`);
        const refFol = firebase.database().ref(`users/${Variables.state.browsingArtist}/followers`);
        const refFollowing = firebase.database().ref(`users/${Variables.state.browsingArtist}/following`);

        Variables.state.userPodcasts = [];
        Variables.state.onUserProfileImage = '';
        Variables.state.userFollowers = [];
        Variables.state.userFollowing = [];


        const ref = firebase.database().ref(`podcasts/`);

        ref.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(Variables.state.browsingArtist == data.val().podcastArtist) {
                    Variables.state.userPodcasts.push(data.val());
                }
            })
        });

        refFol.on("value", function (snapshot) {
            Variables.state.userFollowers = [];
            snapshot.forEach(function (data) {
                Variables.state.userFollowers.push(data.key);
            })
        });

        refFollowing.on("value", function (snapshot) {
            Variables.state.userFollowing = [];
            snapshot.forEach(function (data) {
                Variables.state.userFollowing.push(data.key);
            })
        });


        firebase.database().ref(`/users/${Variables.state.browsingArtist}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                Variables.state.userUsername = snap.val().username;
            }
            else {
                Variables.state.userUsername = "no username"
            }
        });

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/favCategory`).orderByChild("favCategory").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentFavCategory = snap.val().favCategory;
            }
            else {
                Variables.state.currentFavCategory = "Too hard to choose"
            }
        });

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentBio = snap.val().bio;
            }
            else {
                Variables.state.currentBio = "Tell others about yourself";
            }
        });


        firebase.database().ref(`users/${currentUser.uid}/following/`).orderByChild(Variables.state.browsingArtist).on("value", function (snap){
            if(snap.hasChild(Variables.state.browsingArtist)){
                Variables.state.following = true;
            }
            else{
                Variables.state.following = false;
            }
        });


        if(Variables.state.rss){
            firebase.database().ref(`users/${Variables.state.browsingArtist}/profileImage`).once("value", function (snapshot) {
                if(snapshot.val()){
                    Variables.state.onUserProfileImage = snapshot.val().profileImage
                }
            });

        }
        else{
            storageRef.getDownloadURL()
                .then(function(url) {

                    Variables.state.onUserProfileImage = url;

                }).catch(function(error) {
                //
            });

        }


    }


    constructor(props) {
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = { username: '' , bio: '', profileImage: '',
            category: '', profileName: profileName, following: false, profileNameL: profileNameL,
            dataSource: dataSource.cloneWithRows([]),
            loading: true,
            refreshing: false
        };
        setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
            username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following
            })
        },500);
        setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
                username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following
            })
        },3500)
    }


    fetchData(){

        const {currentUser} = firebase.auth();
        const storageRef = firebase.storage().ref(`/users/${Variables.state.browsingArtist}/image-profile-uploaded`);
        const refFol = firebase.database().ref(`users/${Variables.state.browsingArtist}/followers`);
        const refFollowing = firebase.database().ref(`users/${Variables.state.browsingArtist}/following`);

        Variables.state.userPodcasts = [];
        Variables.state.onUserProfileImage = '';
        Variables.state.userFollowers = [];
        Variables.state.userFollowing = [];


        const ref = firebase.database().ref(`podcasts/`);

        ref.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(Variables.state.browsingArtist == data.val().podcastArtist) {
                    Variables.state.userPodcasts.push(data.val());
                }
            })
        });

        refFol.on("value", function (snapshot) {
            Variables.state.userFollowers = [];
            snapshot.forEach(function (data) {
                Variables.state.userFollowers.push(data.key);
            })
        });

        refFollowing.on("value", function (snapshot) {
            Variables.state.userFollowing = [];
            snapshot.forEach(function (data) {
                Variables.state.userFollowing.push(data.key);
            })
        });


        firebase.database().ref(`/users/${Variables.state.browsingArtist}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                Variables.state.userUsername = snap.val().username;
            }
            else {
                Variables.state.userUsername = "no username"
            }
        });

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/favCategory`).orderByChild("favCategory").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentFavCategory = snap.val().favCategory;
            }
            else {
                Variables.state.currentFavCategory = "Too hard to choose"
            }
        });

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentBio = snap.val().bio;
            }
            else {
                Variables.state.currentBio = "Tell others about yourself";
            }
        });


        firebase.database().ref(`users/${currentUser.uid}/following/`).orderByChild(Variables.state.browsingArtist).on("value", function (snap){
            if(snap.hasChild(Variables.state.browsingArtist)){
                Variables.state.following = true;
            }
            else{
                Variables.state.following = false;
            }
        });


        if(Variables.state.rss){
            firebase.database().ref(`users/${Variables.state.browsingArtist}/profileImage`).once("value", function (snapshot) {
                if(snapshot.val()){
                    Variables.state.onUserProfileImage = snapshot.val().profileImage
                }
            });

        }
        else{
            storageRef.getDownloadURL()
                .then(function(url) {

                    Variables.state.onUserProfileImage = url;

                }).catch(function(error) {
                //
            });

        }


    }


    _onRefresh() {
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.setState({refreshing: true});

        this.fetchData();

        this.setState({
            refreshing: false,
        });

        setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
                username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following
            })
        },500);
        setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
                username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following
            })
        },3500)


    }



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
            <Text style={styles.title2} >{this.state.username}</Text>

        )

    };


    _renderBio = () => {

        return(
            <Text style={styles.titleBio} >{this.state.bio}</Text>
        )

    };


    _renderProfileImage(){
        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginTop: 20, marginRight:20,marginLeft: 20, paddingTop: 10, marginBottom:30, height: 160, width: 160, borderRadius: 4, borderWidth:5, borderColor:'rgba(320,320,320,0.8)',  }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 120,
                        color: 'white',
                        marginTop: 10
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginTop: 20, marginRight:20,marginLeft: 20, paddingTop: 10, marginBottom:30, height: 160, width: 160, }}>
                    <Image
                        style={{width: 160, height:160, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 4}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }


    onFollowersPress(){
        Navigation.showModal({
            screen: "UserFollowers",
            title: "Modal",
            passProps: {},
            navigatorStyle: {},
            navigatorButtons: {},
            animationType: 'slide-up'
        });
    }

    onFollowingPress(){
        Navigation.showModal({
            screen: "UserFollowing",
            title: "Modal",
            passProps: {},
            navigatorStyle: {},
            navigatorButtons: {},
            animationType: 'slide-up'
        });
    }


    _renderProfileNumbers(totalPodcasts, totalFollowers, totalFollowing){
        return(
            <View style={{flexDirection: 'row',  paddingBottom: 40, paddingHorizontal: 20}}>

                <View style={{flex: 1, alignSelf: 'flex-start'}}>
                    <Text style={styles.stats}>podcasts</Text>
                    <Text style={styles.stats}>{totalPodcasts}</Text>

                </View>

                <TouchableOpacity style={{flex: 1, alignSelf: 'center'}} onPress={this.onFollowersPress}>
                    <Text style={styles.stats}>followers</Text>
                    <Text style={styles.stats}>{totalFollowers}</Text>

                </TouchableOpacity>

                <TouchableOpacity style={{flex: 1, alignSelf: 'flex-end'}} onPress={this.onFollowingPress}>
                    <Text style={styles.stats}>following</Text>
                    <Text style={styles.stats}>{totalFollowing}</Text>

                </TouchableOpacity>

            </View>
        )
    }


    _renderFollowButton = () => {
        const {currentUser} = firebase.auth();

        if(Variables.state.browsingArtist != currentUser.uid) {

            if (this.state.following) {
                return (
                    <TouchableOpacity onPress={this.pressFollowButton} style={{
                        backgroundColor: 'transparent',
                        paddingVertical: 5,
                        marginHorizontal: 40,
                        marginTop: 0,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#5757FF',
                    }}>
                        <Text style={styles.titleFollowSelected}>Unfollow</Text>
                    </TouchableOpacity>
                )
            }
            else {
                return (
                    <TouchableOpacity onPress={this.pressFollowButton} style={{
                        backgroundColor: 'transparent',
                        paddingVertical: 5,
                        marginHorizontal: 40,
                        marginTop: 0,
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor:'#828393',
                    }}>
                        <Text style={styles.titleFollow}>Follow</Text>
                    </TouchableOpacity>
                )
            }
        }

    };

    pressFollowButton =() => {
        if(this.state.following == true){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/following/${Variables.state.browsingArtist}`).remove();
            firebase.database().ref(`users/${Variables.state.browsingArtist}/followers/${currentUser.uid}`).remove();
            this.setState({following: false});
            Variables.state.following = false;
        }
        else if (this.state.following == false){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/following`).child(Variables.state.browsingArtist).push(Variables.state.browsingArtist);
            firebase.database().ref(`users/${Variables.state.browsingArtist}/followers/`).child(currentUser.uid).push(currentUser.uid);
            this.setState({ following: true});
            Variables.state.following = true;
        }
    };

    _pressBack = () => {
        const {navigator} = this.props;
        Navigation.dismissModal({
            animationType: 'slide-down'
        });

        navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };


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




    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
    };








    render() {


        var fixedTitle = '';
        if(this.state.username.toString().length > width/16.3 ){
            fixedTitle = (this.state.username.slice(0,width/16.3)+"...")
        }
        else{
            fixedTitle = this.state.username;
        }


        return (
            <View
                style={styles.containerMain}>


                <View style={{flexDirection: 'row', paddingVertical:5, paddingBottom: 15, shadowOffset:{  width: 0,  height: 6}, shadowOpacity: 0.2, shadowRadius: 10}}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign: 'left', marginLeft: 10, fontSize: 30, color: '#9496A3'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>{fixedTitle}</Text>
                    </View>

                    <View>
                    </View>

                </View>


                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >

                    {this._renderProfileImage()}

                    {this._renderProfileName()}

                    {this._renderProfileNumbers(Variables.state.userPodcasts.length, Variables.state.userFollowers.length, Variables.state.userFollowing.length)}

                    {this._renderFollowButton()}


                    {this._renderBio()}


                    <Text style={styles.title3}>Content</Text>
                    <View style={{
                        height: 1,
                        backgroundColor: '#b5b6cd',
                        borderRadius: 10,
                        borderWidth: 0.1,
                        marginBottom: 10,
                        marginHorizontal: 30
                    }}/>

                    <View style={{paddingBottom: 120}}>
                        <ListView
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                            renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                        />
                    </View>


                </ScrollView>


                <PlayerBottom/>

            </View>



        );

    }

}

const styles = StyleSheet.create({
    containerMain:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    titleMain: {
        color: '#2A2A30',
        marginTop: 20,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    titleBio: {
        color: '#828393',
        marginVertical: 10,
        marginTop: 60,
        marginHorizontal: 20,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    titleFollow: {
        color: '#2A2A30',
        marginTop: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    titleFollowSelected: {
        color: '#5757FF',
        marginTop: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    title3: {
        color: '#2A2A30',
        marginTop: 80,
        marginBottom: 5,
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 22,
        backgroundColor: 'transparent'
    },
    header: {
        marginTop:30,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',

    },
    title2: {
        color: '#2A2A30',
        marginBottom: 40,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent'
    },

    title: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginHorizontal: 20,

    },
    stats: {
        color: '#2A2A30',
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginLeft: 20,
    },
    container: {
        paddingHorizontal: 0,
        paddingVertical: 10,
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
        flex: 7,
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

export default connect(mapStateToProps, { podcastFetchUser })(UserProfile);