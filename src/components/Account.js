import React, {Component} from 'react';
import _ from 'lodash';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    ListView,
    TouchableOpacity,
    Alert,
    Image,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { podcastFetch } from "../actions/PodcastActions"
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import Variables from './Variables';
import InvertibleScrollView from 'react-native-invertible-scroll-view';

import { Navigation } from 'react-native-navigation';
import ListItem from "./ListItem";
import ListItemUsers from "./ListItemUsers";


var {height, width} = Dimensions.get('window');




// nav bar button, my account page

class Account extends Component {


    componentWillMount(){
        Variables.state.myPodcasts = [];
        Variables.state.myFollowers = [];
        Variables.state.myFollowing = [];
        Variables.state.myTracking = [];
        Variables.state.profileImage = '';
        const {currentUser} = firebase.auth();
        const refMy = firebase.database().ref(`podcasts/`);
        const storageRef = firebase.storage().ref(`/users/${currentUser.uid}/image-profile-uploaded`);
        const refFol = firebase.database().ref(`users/${currentUser.uid}/followers`);
        const refFollowing = firebase.database().ref(`users/${currentUser.uid}/following`);
        const refTracking = firebase.database().ref(`users/${currentUser.uid}/tracking`);


        refMy.on("value", function (snapshot) {
            Variables.state.myPodcasts = [];
            snapshot.forEach(function (data) {
                if(currentUser.uid == data.val().podcastArtist) {
                    Variables.state.myPodcasts.push(data.val());
                }
            });
            Variables.state.myPodcasts.reverse();
        });

        refFol.on("value", function (snapshot) {
            Variables.state.myFollowers = [];
            snapshot.forEach(function (data) {
                Variables.state.myFollowers.push(data.key);
            })
        });

        refFollowing.on("value", function (snapshot) {
            Variables.state.myFollowing = [];
            snapshot.forEach(function (data) {
                Variables.state.myFollowing.push(data.key);
            })
        });

        refTracking.on("value", function (snapshot) {
            Variables.state.myTracking = [];
            snapshot.forEach(function (data) {
                Variables.state.myTracking.push(data.key);
            })
        });

        firebase.database().ref(`/users/${currentUser.uid}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                Variables.state.username = snap.val().username;

            }
            else {
                Variables.state.username = "None";
            }
        });

        firebase.database().ref(`/users/${currentUser.uid}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                Variables.state.bio = snap.val().bio;

            }
            else {
                Variables.state.bio = "Tell others about yourself"
            }
        });

        Variables.state.myPlayTime = 0;
        firebase.database().ref(`/users/${currentUser.uid}/stats`).orderByChild("playTime").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().playTime){
                    Variables.state.myPlayTime = snap.val().playTime;

                }
                else {
                    Variables.state.myPlayTime = 0;
                }
            }
        });

        Variables.state.myHighlightsAmount = 0;
        firebase.database().ref(`/users/${currentUser.uid}/stats`).orderByChild("highlights").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().highlights){
                    Variables.state.myHighlightsAmount = snap.val().highlights;

                }
                else {
                    Variables.state.myHighlightsAmount = 0;
                }
            }
        });

        Variables.state.myCommentsAmount = 0;
        firebase.database().ref(`/users/${currentUser.uid}/stats`).orderByChild("comments").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().comments){
                    Variables.state.myCommentsAmount = snap.val().comments;

                }
                else {
                    Variables.state.myCommentsAmount = 0;
                }
            }
        });

        Variables.state.myLikesAmount = 0;
        firebase.database().ref(`/users/${currentUser.uid}/stats`).orderByChild("likes").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().likes){
                    Variables.state.myLikesAmount = snap.val().likes;

                }
                else {
                    Variables.state.myLikesAmount = 0;
                }
            }
        });

        Variables.state.myTrackingAmount = 0;
        firebase.database().ref(`/users/${currentUser.uid}/stats`).orderByChild("tracking").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().tracking){
                    Variables.state.myTrackingAmount = snap.val().tracking;

                }
                else {
                    Variables.state.myTrackingAmount = 0;
                }
            }
        });

        storageRef.getDownloadURL()
            .then(function(url) {

                Variables.state.profileImage = url;

            }).catch(function(error) {
            //
        });



    }



    componentWillUnmount(){
        clearTimeout(this.timeout);
    }


    constructor(props){
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 18, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
            navBarBackgroundColor: '#fff',
            drawUnderTabBar: false,
            navBarHideOnScroll: true,
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.myPodcasts),
            loading: true,
            username: '' ,
            bio: '',
            profileImage: '',
            category: '',
            playTime: 0,
            myComments: 0,
            myTracking: 0,
            myHighlights: 0,
            myLikes: 0,
            myShares: 0,
        };
        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.myPodcasts), username: Variables.state.username, profileImage: Variables.state.profileImage, playTime: Variables.state.myPlayTime, myComments: Variables.state.myCommentsAmount, myTracking: Variables.state.myTrackingAmount, myLikes: Variables.state.myLikesAmount, myHighlights: Variables.state.myHighlightsAmount})},1000)
    }




    _renderProfileName(){

        return (
            <Text style={styles.title2} >{this.state.username}</Text>

        )

    }


    _renderBio() {

        return(
            <Text style={styles.titleBio} >{Variables.state.bio}</Text>
        )

    }

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


    onFollowersPress = () => {
        this.props.navigator.push({
            screen: "MyFollowersPage",
            title: "Followers",
            passProps: {},
        });
    };

    onFollowingPress = () =>{
        this.props.navigator.push({
            screen: "Followed",
            title: "Following",
            passProps: {},
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



                <View style={{flex: 1, alignSelf: 'flex-start', padding: 10, borderTopWidth: 2, borderTopColor: '#3e416440', borderLeftColor: '#3e416440', borderLeftWidth: 1}}>
                    <Text style={styles.stats}>Tracking</Text>
                    <Text style={styles.stats}>{totalPodcasts}</Text>

                </View>

            </View>
        )
    }


    onGarbagePress(user, title){
        Alert.alert(
            'Are you sure you want to delete?',
            '',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => {

                    firebase.storage().ref(`/users/${user}/${title}`).delete();
                    firebase.database().ref(`/podcasts`).on("value", function (snapshot) {
                        snapshot.forEach(function (data) {
                            if(data.val().podcastTitle == title && data.val().podcastArtist == user){
                                data.val().delete();
                            }
                        })

                    });
                }
                },
            ],
            { cancelable: false }
        )
    }



    renderRow = (rowData) => {
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
    };



    _renderContent(myContent){
        if(myContent > 0){
            return(
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                />
            )
        }
        else{
            return(
                <Text style = {styles.titleBio}>Start recording to share your voice!</Text>
            )
        }
    }


    _pressSettings = () => {
        const {navigator} = this.props;
        this.props.navigator.push({
            screen: 'Settings',
            title: 'Edit Profile',
            passProps: {navigator}
        });
    };


    _pressMyContent = () => {
        const {navigator} = this.props;
        this.props.navigator.push({
            screen: 'MyContent',
            title: 'My Content',
            passProps: {navigator}
        });
    };

    _pressBack = () => {
        Navigation.dismissModal({

        })
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
                if(this.state.myLikes >= 1){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitle}>First Like</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myLikes}/1</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitleLight}>First Like</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myLikes}/1</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 2){
                if(this.state.myLikes >= 5){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitle}>Likes Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myLikes}/5</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitleLight}>Likes Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myLikes}/5</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 3){
                if(this.state.myLikes >= 25){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitle}>Likes Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myLikes}/25</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitleLight}>Likes Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myLikes}/25</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 4){
                if(this.state.myLikes >= 50){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitle}>Likes Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myLikes}/50</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconLike.png')}
                            />
                            <Text style={styles.smallTitleLight}>Likes Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myLikes}/50</Text>
                        </TouchableOpacity>
                    )
                }
            }

        }
        else if(achievement == "highlights"){
            if(level == 1){
                if(this.state.myHighlights >= 1){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitle}>First Highlight</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myHighlights}/1</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitleLight}>First Highlight</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myHighlights}/1</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 2){
                if(this.state.myHighlights >= 5){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitle}>Highlights Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myHighlights}/5</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitleLight}>Highlights Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myHighlights}/5</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 3){
                if(this.state.myHighlights >= 10){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitle}>Highlights Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myHighlights}/10</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3, }}
                                source={require('tess/src/images/iconAward.png')}
                            />
                            <Text style={styles.smallTitleLight}>Highlights Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myHighlights}/10</Text>
                        </TouchableOpacity>
                    )
                }
            }

        }
        else if(achievement == "tracking"){
            if(level == 1){
                if(this.state.myTracking >= 1){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>First Track</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myTracking}/1</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>First Track</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myTracking}/1</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 2){
                if(this.state.myTracking >= 5){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>Tracking Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myTracking}/5</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>Tracking Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myTracking}/5</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 3){
                if(this.state.myTracking >= 25){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>Tracking Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myTracking}/25</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>Tracking Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myTracking}/25</Text>
                        </TouchableOpacity>
                    )
                }
            }
        }
        else if(achievement == "comments"){
            if(level == 1){
                if(this.state.myComments >= 1){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitle}>First Comment</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myComments}/1</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitleLight}>First Comment</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myComments}/1</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 2){
                if(this.state.myComments >= 5){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitle}>Comments Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myComments}/5</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitleLight}>Comments Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myComments}/5</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 3){
                if(this.state.myComments >= 25){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitle}>Comments Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myComments}/25</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitleLight}>Comments Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myComments}/25</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 4){
                if(this.state.myComments >= 50){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitle}>Comments Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myComments}/50</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconRocket.png')}
                            />
                            <Text style={styles.smallTitleLight}>Comments Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myComments}/50</Text>
                        </TouchableOpacity>
                    )
                }
            }

        }
        else if(achievement == 'listens'){
            if(level == 3){
                if(this.roundSeconds(((this.state.playTime/60)/60)) >= 3){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
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
                        <TouchableOpacity style ={{flex:1}}>
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
                        <TouchableOpacity style ={{flex:1}}>
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
                        <TouchableOpacity style ={{flex:1}}>
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
                if(this.state.myShares >= 10){
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitle}>Shares Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myShares}/10</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}}>
                            <Image
                                style={{width: 60, height: 60, alignSelf: 'center', opacity: 0.3,}}
                                source={require('tess/src/images/iconStar.png')}
                            />
                            <Text style={styles.smallTitleLight}>Shares Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.myShares}/10</Text>
                        </TouchableOpacity>
                    )
                }
            }
        }

    };
    renderAchievements = () => {

        // Level 1
        if(this.state.myLikes < 1 || this.state.myTracking < 1 || this.state.myComments < 1 || this.state.myHighlights < 1){
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
        else if(this.state.myLikes < 5 || this.state.myTracking < 5 || this.state.myComments < 5 || this.state.myHighlights < 5){
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
        else if(this.state.myLikes < 25 || this.roundSeconds(((this.state.playTime/60)/60)) < 3 || this.state.myComments < 25 || this.state.myHighlights < 10){
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
        else if(this.state.myLikes < 50 || this.roundSeconds(((this.state.playTime/60)/60)) < 10 || this.state.myComments < 50 || this.state.myHighlights < 25){ //highlights -> shares
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
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />


                <ScrollView >
                    <View style={{backgroundColor: '#fff'}}>


                        {this._renderProfileImage()}

                        {this._renderProfileName()}

                        {this._renderBio()}

                        <TouchableOpacity style={{flex:1, backgroundColor: '#fff', paddingVertical: 10, marginVertical: 10}} onPress={this._pressSettings}>
                            <Text style = {styles.title}>Edit Profile</Text>
                        </TouchableOpacity>

                        {this._renderProfileNumbers(Variables.state.myTracking.length, Variables.state.myFollowers.length, Variables.state.myFollowing.length)}

                    </View>


                    <View style={{backgroundColor: '#fff', marginVertical: 15, marginHorizontal: 7, borderRadius: 10}}>
                        <Text style={styles.myContentTitle}>{Variables.state.myPodcasts.length} episodes</Text>
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





                <PlayerBottom navigator={this.props.navigator}/>

            </View>



        );
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
        color: '#2A2A30',
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

});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetch })(Account);