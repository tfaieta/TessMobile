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

import { Navigation } from 'react-native-navigation';
import ListItemUsers from "./ListItemUsers";

var {height, width} = Dimensions.get('window');




// contains a profile that you can view (any profile that is not yours)

class UserProfileModal extends Component {


    componentWillMount(){

        const {currentUser} = firebase.auth();
        const storageRef = firebase.storage().ref(`/users/${Variables.state.browsingArtist}/image-profile-uploaded`);
        const refFol = firebase.database().ref(`users/${Variables.state.browsingArtist}/followers`);
        const refFollowing = firebase.database().ref(`users/${Variables.state.browsingArtist}/following`);
        const refTracking = firebase.database().ref(`users/${Variables.state.browsingArtist}/tracking`);

        Variables.state.userPodcasts = [];
        Variables.state.onUserProfileImage = '';
        Variables.state.userFollowers = [];
        Variables.state.userFollowing = [];
        Variables.state.userTracking = [];


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

        refTracking.on("value", function (snapshot) {
            Variables.state.userTracking = [];
            snapshot.forEach(function (data) {
                Variables.state.userTracking.push(data.key);
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

        Variables.state.userPlayTime = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("playTime").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().playTime){
                    Variables.state.userPlayTime = snap.val().playTime;

                }
                else {
                    Variables.state.userPlayTime = 0;
                }
            }
        });

        Variables.state.userHighlightsAmount = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("highlights").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().highlights){
                    Variables.state.userHighlightsAmount = snap.val().highlights;

                }
                else {
                    Variables.state.userHighlightsAmount = 0;
                }
            }
        });

        Variables.state.userCommentsAmount = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("comments").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().comments){
                    Variables.state.userCommentsAmount = snap.val().comments;

                }
                else {
                    Variables.state.userCommentsAmount = 0;
                }
            }
        });

        Variables.state.userLikesAmount = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("likes").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().likes){
                    Variables.state.userLikesAmount = snap.val().likes;

                }
                else {
                    Variables.state.userLikesAmount = 0;
                }
            }
        });

        Variables.state.userTrackingAmount = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("tracking").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().tracking){
                    Variables.state.userTrackingAmount = snap.val().tracking;

                }
                else {
                    Variables.state.userTrackingAmount = 0;
                }
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

    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
    }


    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: true,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 18, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
            navBarBackgroundColor: '#fff',
            drawUnderTabBar: false,
            navBarHideOnScroll: false,
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = { username: '' , bio: '', profileImage: '',
            category: '', profileName: profileName, following: false, profileNameL: profileNameL,
            dataSource: dataSource.cloneWithRows([]),
            loading: true,
            refreshing: false,
            tracking: false,
            playTime: 0,
            userComments: 0,
            userTracking: 0,
            userHighlights: 0,
            userLikes: 0,
            userShares: 0,
        };
        this.timeout = setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
                username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following,
                playTime: Variables.state.userPlayTime,
                userComments: Variables.state.userCommentsAmount,
                userTracking: Variables.state.userTrackingAmount,
                userHighlights: Variables.state.userHighlightsAmount,
                userLikes: Variables.state.userLikesAmount,
            })
        },500);
        this.timeout2 = setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
                username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following,
                playTime: Variables.state.userPlayTime,
                userComments: Variables.state.userCommentsAmount,
                userTracking: Variables.state.userTrackingAmount,
                userHighlights: Variables.state.userHighlightsAmount,
                userLikes: Variables.state.userLikesAmount,
            })
        },3500)
    }


    fetchData(){

        const {currentUser} = firebase.auth();
        const storageRef = firebase.storage().ref(`/users/${Variables.state.browsingArtist}/image-profile-uploaded`);
        const refFol = firebase.database().ref(`users/${Variables.state.browsingArtist}/followers`);
        const refFollowing = firebase.database().ref(`users/${Variables.state.browsingArtist}/following`);
        const refTracking = firebase.database().ref(`users/${Variables.state.browsingArtist}/tracking`);

        Variables.state.userPodcasts = [];
        Variables.state.onUserProfileImage = '';
        Variables.state.userFollowers = [];
        Variables.state.userFollowing = [];
        Variables.state.userTracking = [];


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

        refTracking.on("value", function (snapshot) {
            Variables.state.userTracking = [];
            snapshot.forEach(function (data) {
                Variables.state.userTracking.push(data.key);
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

        Variables.state.userPlayTime = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("playTime").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().playTime){
                    Variables.state.userPlayTime = snap.val().playTime;

                }
                else {
                    Variables.state.userPlayTime = 0;
                }
            }
        });

        Variables.state.userHighlightsAmount = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("highlights").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().highlights){
                    Variables.state.userHighlightsAmount = snap.val().highlights;

                }
                else {
                    Variables.state.userHighlightsAmount = 0;
                }
            }
        });

        Variables.state.userCommentsAmount = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("comments").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().comments){
                    Variables.state.userCommentsAmount = snap.val().comments;

                }
                else {
                    Variables.state.userCommentsAmount = 0;
                }
            }
        });

        Variables.state.userLikesAmount = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("likes").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().likes){
                    Variables.state.userLikesAmount = snap.val().likes;

                }
                else {
                    Variables.state.userLikesAmount = 0;
                }
            }
        });

        Variables.state.userTrackingAmount = 0;
        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("tracking").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().tracking){
                    Variables.state.userTrackingAmount = snap.val().tracking;

                }
                else {
                    Variables.state.userTrackingAmount = 0;
                }
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

        this.timeout = setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
                username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following,
                playTime: Variables.state.userPlayTime,
                userComments: Variables.state.userCommentsAmount,
                userTracking: Variables.state.userTrackingAmount,
                userHighlights: Variables.state.userHighlightsAmount,
                userLikes: Variables.state.userLikesAmount,
            })
        },500);
        this.timeout2 = setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
                username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following,
                playTime: Variables.state.userPlayTime,
                userComments: Variables.state.userCommentsAmount,
                userTracking: Variables.state.userTrackingAmount,
                userHighlights: Variables.state.userHighlightsAmount,
                userLikes: Variables.state.userLikesAmount,
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
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginTop: 20, marginRight:20,marginLeft: 20, paddingTop: 10,  height: height/6, width: height/6, borderRadius:35, borderWidth:5, borderColor:'rgba(320,320,320,0.8)', }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 60,
                        color: 'white',
                        marginTop: 10
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginTop: 20, marginRight:20,marginLeft: 20, paddingTop: 10, borderRadius: 35, height: height/6, width: height/6, }}>
                    <Image
                        style={{width: height/6, height: height/6, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 35,}}
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

    onTrackingPress = () =>{
        const list = Variables.state.userTracking;

        Navigation.showModal({
            screen: "Tracking",
            title: "Tracking",
            passProps: {list},
        });
    };


    _renderProfileNumbers(totalPodcasts, totalFollowers, totalFollowing){
        return(
            <View style={{flexDirection: 'row',}}>


                <TouchableOpacity style={{flex: 1, alignSelf: 'flex-end', padding: 10, borderTopWidth: 2, borderTopColor: '#3e416440', borderRightColor: '#3e416440', borderRightWidth: 1}} onPress={this.onFollowingPress}>
                    <Text style={styles.stats}>Following</Text>
                    <Text style={styles.stats}>{totalFollowing}</Text>

                </TouchableOpacity>


                <TouchableOpacity style={{flex: 1, alignSelf: 'center', padding: 10, borderTopWidth: 2, borderTopColor: '#3e416440', borderRightColor: '#3e416440', borderRightWidth: 1, borderLeftColor: '#3e416440', borderLeftWidth: 1}} onPress={this.onFollowersPress}>
                    <Text style={styles.stats}>Followers</Text>
                    <Text style={styles.stats}>{totalFollowers}</Text>

                </TouchableOpacity>



                <TouchableOpacity style={{flex: 1, alignSelf: 'flex-start', padding: 10, borderTopWidth: 2, borderTopColor: '#3e416440', borderLeftColor: '#3e416440', borderLeftWidth: 1}} onPress={this.onTrackingPress}>
                    <Text style={styles.stats}>Tracking</Text>
                    <Text style={styles.stats}>{totalPodcasts}</Text>

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
                        flex:1,
                        backgroundColor: 'transparent',
                        paddingVertical: 5,
                        marginHorizontal: 20,
                        marginVertical: 15,
                        borderRadius: 10,
                        borderWidth: 1.5,
                        borderColor: '#506dcf',
                    }}>
                        <Text style={styles.titleFollowSelected}>Unfollow</Text>
                    </TouchableOpacity>
                )
            }
            else {
                return (
                    <TouchableOpacity onPress={this.pressFollowButton} style={{
                        flex:1,
                        backgroundColor: 'transparent',
                        paddingVertical: 5,
                        marginHorizontal: 20,
                        marginVertical: 15,
                        borderRadius: 10,
                        borderWidth: 1.5,
                        borderColor: '#3e4164',
                    }}>
                        <Text style={styles.titleFollow}>Follow</Text>
                    </TouchableOpacity>
                )
            }
        }

    };



    _renderTrackButton = () => {
        const {currentUser} = firebase.auth();

        if(Variables.state.browsingArtist != currentUser.uid) {

            if (this.state.tracking) {
                return (
                    <TouchableOpacity onPress={this.pressTrackButton} style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        paddingVertical: 5,
                        marginHorizontal: 20,
                        marginVertical: 15,
                        borderRadius: 10,
                        borderWidth: 1.5,
                        borderColor: '#506dcf',
                    }}>
                        <Text style={styles.titleFollowSelected}>Remove</Text>
                    </TouchableOpacity>
                )
            }
            else {
                return (
                    <TouchableOpacity onPress={this.pressTrackButton} style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        paddingVertical: 5,
                        marginHorizontal: 20,
                        marginVertical: 15,
                        borderRadius: 10,
                        borderWidth: 1.5,
                        borderColor: '#3e4164',
                    }}>
                        <Text style={styles.titleFollow}>Track</Text>
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


    pressTrackButton =() => {
        if(this.state.tracking == true){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/tracking/${Variables.state.browsingArtist}`).remove();
            var refTrack = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/stats`);
            refTrack.once("value", function(snapshot) {
                if(snapshot.val().tracking){
                    refTrack.update({tracking: snapshot.val().tracking - 1})
                }
                else{
                    refTrack.update({tracking: 0})
                }
            });
            this.setState({tracking: false});
            Variables.state.tracking = false;
        }
        else if (this.state.tracking == false){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/tracking`).child(Variables.state.browsingArtist).push(Variables.state.browsingArtist);
            var ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/stats`);
            ref.once("value", function(snapshot) {
                if(snapshot.val().tracking){
                    ref.update({tracking: snapshot.val().tracking + 1})
                }
                else{
                    ref.update({tracking: 1})
                }
            });
            this.setState({tracking: true});
            Variables.state.tracking = true;
        }
    };

    _pressBack = () => {
        Navigation.dismissModal({
            animationType: 'slide-down'
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
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
    };




    roundSeconds(seconds){
        if(seconds % 1 >= 0.5){
            return (seconds-1).toFixed(0)
        }
        else{
            return seconds.toFixed(0)
        }
    }

    renderAchievement = (achievement, level) =>{

        if(achievement == "likes"){
            if(level == 1){
                if(this.state.userLikes >= 1){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 1;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 1;
                            const image = 'tess/src/images/iconLike.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitle}>First Like</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/1</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 1;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 1;
                            const image = 'tess/src/images/iconLike.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitleLight}>First Like</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/1</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 2){
                if(this.state.userLikes >= 5){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 2;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 5;
                            const image = 'tess/src/images/iconLike.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitle}>Likes Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/5</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 2;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 5;
                            const image = 'tess/src/images/iconLike.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitleLight}>Likes Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/5</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 3){
                if(this.state.userLikes >= 25){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 25;
                            const image = 'tess/src/images/iconLike.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitle}>Likes Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/25</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 25;
                            const image = 'tess/src/images/iconLike.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitleLight}>Likes Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/25</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 4){
                if(this.state.userLikes >= 50){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 4;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 50;
                            const image = 'tess/src/images/iconLike.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitle}>Likes Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/50</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 4;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 50;
                            const image = 'tess/src/images/iconLike.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitleLight}>Likes Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/50</Text>
                        </TouchableOpacity>
                    )
                }
            }

        }
        else if(achievement == "highlights"){
            if(level == 1){
                if(this.state.userHighlights >= 1){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 1;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 1;
                            const image = 'tess/src/images/iconAward.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitle}>First Highlight</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/1</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 1;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 1;
                            const image = 'tess/src/images/iconAward.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitleLight}>First Highlight</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/1</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 2){
                if(this.state.userHighlights >= 5){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 2;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 5;
                            const image = 'tess/src/images/iconAward.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitle}>Highlights Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/5</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 2;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 5;
                            const image = 'tess/src/images/iconAward.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitleLight}>Highlights Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/5</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 3){
                if(this.state.userHighlights >= 10){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 10;
                            const image = 'tess/src/images/iconAward.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitle}>Highlights Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/10</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 10;
                            const image = 'tess/src/images/iconAward.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitleLight}>Highlights Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/10</Text>
                        </TouchableOpacity>
                    )
                }
            }

        }
        else if(achievement == "tracking"){
            if(level == 1){
                if(this.state.userTracking >= 1){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 1;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 1;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>First Track</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/1</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 1;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 1;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>First Track</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/1</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 2){
                if(this.state.userTracking >= 5){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 2;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 5;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>Tracking Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/5</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 2;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 5;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>Tracking Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/5</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 3){
                if(this.state.userTracking >= 25){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 25;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>Tracking Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/25</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 25;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>Tracking Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/25</Text>
                        </TouchableOpacity>
                    )
                }
            }
        }
        else if(achievement == "comments"){
            if(level == 1){
                if(this.state.userComments >= 1){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 1;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 1;
                            const image = 'tess/src/images/iconRocket.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitle}>First Comment</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/1</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 1;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 1;
                            const image = 'tess/src/images/iconRocket.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitleLight}>First Comment</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/1</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 2){
                if(this.state.userComments >= 5){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 2;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 5;
                            const image = 'tess/src/images/iconRocket.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitle}>Comments Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/5</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 2;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 5;
                            const image = 'tess/src/images/iconRocket.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitleLight}>Comments Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/5</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 3){
                if(this.state.userComments >= 25){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 25;
                            const image = 'tess/src/images/iconRocket.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitle}>Comments Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/25</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 25;
                            const image = 'tess/src/images/iconRocket.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitleLight}>Comments Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/25</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 4){
                if(this.state.userComments >= 50){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 4;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 50;
                            const image = 'tess/src/images/iconRocket.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitle}>Comments Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/50</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 4;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 50;
                            const image = 'tess/src/images/iconRocket.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitleLight}>Comments Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/50</Text>
                        </TouchableOpacity>
                    )
                }
            }

        }
        else if(achievement == 'listens'){
            if(level == 3){
                if(this.roundSeconds(((this.state.playTime/60)/60)) >= 3){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 3;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>Listens Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/3</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 3;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 3;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>Listens Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/3</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 4){
                if(this.roundSeconds(((this.state.playTime/60)/60)) >= 10){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 4;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 10;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>Listens Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/10</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 4;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 10;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>Listens Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/10</Text>
                        </TouchableOpacity>
                    )
                }
            }
        }
        else if(achievement == 'shares'){
            if(level == 4){
                if(this.state.userShares >= 10){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 4;
                            const title = 'Shares';
                            const description = 'shared';
                            const progress = this.state.userShares;
                            const goal = 10;

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>Shares Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userShares}/10</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 4;
                            const title = 'Shares';
                            const description = 'shared';
                            const progress = this.state.userShares;
                            const goal = 10;
                            const image = 'tess/src/images/iconStar.png';

                            Navigation.showLightBox({
                                screen: 'Achievement',
                                style: {
                                    backgroundBlur: "light",
                                    backgroundColor: "#44434470",
                                    tapBackgroundToDismiss: true,
                                },
                                passProps: {level, title, description, progress, goal, image}
                            })
                        }}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>Shares Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userShares}/10</Text>
                        </TouchableOpacity>
                    )
                }
            }
        }

    };
    renderAchievements = () => {

        // Level 1
        if(this.state.userLikes < 1 || this.state.userTracking < 1 || this.state.userComments < 1 || this.state.userHighlights < 1){
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 1 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        {this.renderAchievement('tracking', 1)}
                        {this.renderAchievement('likes', 1)}
                        {this.renderAchievement('comments', 1)}
                        {this.renderAchievement('highlights', 1)}
                    </View>
                </View>
            )
        }
        // Level 2
        else if(this.state.userLikes < 5 || this.state.userTracking < 5 || this.state.userComments < 5 || this.state.userHighlights < 5){
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 2 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        {this.renderAchievement('tracking', 2)}
                        {this.renderAchievement('likes', 2)}
                        {this.renderAchievement('comments', 2)}
                        {this.renderAchievement('highlights', 2)}
                    </View>
                </View>
            )
        }
        // Level 3
        else if(this.state.userLikes < 25 || this.roundSeconds(((this.state.playTime/60)/60)) < 3 || this.state.userComments < 25 || this.state.userHighlights < 10){
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 3 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        {this.renderAchievement('listens', 3)}
                        {this.renderAchievement('likes', 3)}
                        {this.renderAchievement('comments', 3)}
                        {this.renderAchievement('highlights', 3)}
                    </View>
                </View>
            )
        }
        // Level 4
        else if(this.state.userLikes < 50 || this.roundSeconds(((this.state.playTime/60)/60)) < 10 || this.state.userComments < 50 || this.state.userHighlights < 25){ //highlights -> shares
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 4 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        {this.renderAchievement('listens', 4)}
                        {this.renderAchievement('likes', 4)}
                        {this.renderAchievement('comments', 4)}
                        {this.renderAchievement('shares', 4)}
                    </View>
                </View>
            )
        }
        //level 5
        else{
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 5 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                </View>
            )
        }

    };




    render() {

        var fixedTitle = '';
        if(this.state.username.toString().length > width/16.3 ){
            fixedTitle = (this.state.username.slice(0,width/16.3)+"...")
        }
        else{
            fixedTitle = this.state.username;
        }

        if(Variables.state.rss){

            return (
                <View
                    style={styles.container}>


                    <View style={{flexDirection: 'row', backgroundColor: '#fff', paddingVertical:5, paddingBottom: 15, shadowOffset:{  width: 0,  height: 3}, shadowOpacity: 0.1, shadowRadius: 5}}>
                        <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                            <TouchableOpacity onPress={this._pressBack}>
                                <Icon style={{
                                    textAlign:'left',marginLeft: 10, fontSize: 35, color:'#007aff',
                                }} name="ios-arrow-back">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
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

                        <View style={{backgroundColor: '#fff'}}>

                            {this._renderProfileImage()}

                            {this._renderProfileName()}

                            {this._renderBio()}

                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                {this._renderFollowButton()}
                                {this._renderTrackButton()}
                            </View>


                            <TouchableOpacity style={{flex: 1, alignSelf: 'center', padding: 10,}} onPress={this.onFollowersPress}>
                                <Text style={styles.stats}>Followers</Text>
                                <Text style={styles.stats}>{Variables.state.userFollowers.length}</Text>
                            </TouchableOpacity>


                        </View>


                        <View style={{backgroundColor: '#fff', marginVertical: 15, marginHorizontal: 7, borderRadius: 10}}>
                            <Text style={styles.myContentTitle}>{Variables.state.userPodcasts.length} episodes</Text>
                            <ListView
                                enableEmptySections
                                horizontal={true}
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
        else{

            return (
                <View
                    style={styles.container}>


                    <View style={{flexDirection: 'row', backgroundColor: '#fff', paddingVertical:5, paddingBottom: 15, shadowOffset:{  width: 0,  height: 3}, shadowOpacity: 0.1, shadowRadius: 5}}>
                        <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                            <TouchableOpacity onPress={this._pressBack}>
                                <Icon style={{
                                    textAlign:'left',marginLeft: 10, fontSize: 28, color:'#007aff',
                                }} name="ios-arrow-back">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
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

                        <View style={{backgroundColor: '#fff'}}>

                            {this._renderProfileImage()}

                            {this._renderProfileName()}

                            {this._renderBio()}

                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                {this._renderFollowButton()}
                                {this._renderTrackButton()}
                            </View>


                            {this._renderProfileNumbers(Variables.state.userTracking.length, Variables.state.userFollowers.length, Variables.state.userFollowing.length)}

                        </View>


                        <View style={{backgroundColor: '#fff', marginVertical: 15, marginHorizontal: 7, borderRadius: 10}}>
                            <Text style={styles.myContentTitle}>{Variables.state.userPodcasts.length} episodes</Text>
                            <ListView
                                enableEmptySections
                                horizontal={true}
                                dataSource={this.state.dataSource}
                                renderRow={this.renderRow}
                            />
                        </View>



                        {this.renderAchievements()}




                        <View style={{backgroundColor: '#fff', marginHorizontal: 8, marginVertical: 15, borderRadius: 10}}>
                            <Text style={styles.myContentTitle}>Listening Trends</Text>
                            <View style={{flexDirection: 'row', marginTop: 10}}>
                                <TouchableOpacity style ={{flex:1}}>
                                    <Image
                                        style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                        source={require('tess/src/images/currEvents-cat.png')}
                                    />
                                    <Text style={styles.smallTitle}>Current Events</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style ={{flex:1}}>
                                    <Image
                                        style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                        source={require('tess/src/images/sports-cat.png')}
                                    />
                                    <Text style={styles.smallTitle}>Sports</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style ={{flex:1}}>
                                    <Image
                                        style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                        source={require('tess/src/images/gaming-cat.png')}
                                    />
                                    <Text style={styles.smallTitle}>Gaming</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style ={{flex:1}}>
                                    <Image
                                        style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                        source={require('tess/src/images/entertainment-cat.png')}
                                    />
                                    <Text style={styles.smallTitle}>Entertainment</Text>
                                </TouchableOpacity>


                            </View>

                        </View>





                        <View style={{paddingBottom:120}}>

                        </View>


                    </ScrollView>


                    <PlayerBottom/>

                </View>



            );

        }

    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
    },
    title2: {
        color: '#3e4164',
        marginVertical: 10,
        marginTop: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/22,
        backgroundColor: 'transparent'
    },

    title3: {
        color: '#2A2A30',
        marginTop: 80,
        marginBottom: 5,
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 22,
        backgroundColor: 'transparent'
    },
    titleBio: {
        color: '#3e4164',
        marginBottom: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/25,
        marginHorizontal: 20,
        backgroundColor: 'transparent',
    },
    header: {
        marginTop: 25,
        marginLeft: -12,
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        backgroundColor: 'transparent',
    },

    title: {
        color: '#506dcf',
        marginTop: 5,
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/25,
        backgroundColor: 'transparent',
        marginHorizontal: 20,

    },

    myContentTitle: {
        color: '#3e4164',
        paddingVertical: 10,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/22,
        backgroundColor: 'transparent',
        marginHorizontal: 5,

    },
    myContentTitle1: {
        color: '#3e4164',
        paddingTop: 10,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/22,
        backgroundColor: 'transparent',
        marginHorizontal: 5,

    },

    smallTitle: {
        color: '#2A2A30',
        marginVertical: 5,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/38,
        backgroundColor: 'transparent'
    },
    smallTitleLight: {
        color: '#2A2A3030',
        marginVertical: 5,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/38,
        backgroundColor: 'transparent'
    },
    smallTitleNum: {
        color: '#506dcf',
        marginBottom: 5,
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/30,
        backgroundColor: 'transparent'
    },
    stats: {
        color: '#3e4164',
        flex:1,
        padding: 8,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/25,
        backgroundColor: 'transparent',
        marginLeft: 20,
    },
    containerList: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#3e4164',
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 3,
        marginHorizontal: -100,
    },
    titleFollow: {
        color: '#3e4164',
        marginVertical: 5,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        backgroundColor: 'transparent'
    },
    titleFollowSelected: {
        color: '#506dcf',
        marginVertical: 5,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        backgroundColor: 'transparent'
    },
});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchUser })(UserProfileModal);