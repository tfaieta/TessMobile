import React, {Component} from 'react';
import _ from 'lodash';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    TouchableOpacity,
    Image,
    RefreshControl, Dimensions,
    ActivityIndicator, Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { podcastFetchUser } from "../actions/PodcastActions";
import PlayerBottom from './PlayerBottom';
import Variables from './Variables';
import firebase from 'firebase';

import { Navigation } from 'react-native-navigation';
import ListItemUsers from "./ListItemUsers";
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');

let topMargin = 0;
if(Platform.OS === 'ios'){
    topMargin = height/10.26
}


// contains a profile that you can view (any profile that is not yours)

class UserProfile extends Component {

    static navigatorStyle = {
        statusBarHidden: false,
        statusBarTextColorScheme: 'light',
        statusBarColor: '#fff',
        navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
        navBarTextFontSize: 18, // change the font size of the title
        navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
    };


    componentDidMount(){

        const {currentUser} = firebase.auth();
        Analytics.logEvent('openUserProfile', {
            'user_id': currentUser.uid
        });

        const storageRef = firebase.storage().ref(`/users/${Variables.state.browsingArtist}/image-profile-uploaded`);
        const refFol = firebase.database().ref(`users/${Variables.state.browsingArtist}/followers`);
        const refFollowing = firebase.database().ref(`users/${Variables.state.browsingArtist}/following`);
        const refTracking = firebase.database().ref(`users/${Variables.state.browsingArtist}/tracking`);

        const {rss} = this.props;

        const ref = firebase.database().ref(`podcasts/`);

        let userPodcasts = [];
        ref.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(Variables.state.browsingArtist == data.val().podcastArtist) {
                    userPodcasts.push(data.val());
                }
            });
            userPodcasts.reverse();
        });

        refFol.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                this.state.userFollowers.push(data.key);
            }.bind(this))
        }.bind(this));

        refFollowing.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                this.state.userFollowing.push(data.key);
            }.bind(this))
        }.bind(this));

        refTracking.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                this.state.userTrackingList.push(data.key);
            }.bind(this))
        }.bind(this));


        firebase.database().ref(`/users/${Variables.state.browsingArtist}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                this.setState({
                    username: snap.val().username
                });
            }
            else {
                this.setState({
                    username: '...'
                });
            }
        }.bind(this));


        firebase.database().ref(`/users/${Variables.state.browsingArtist}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                this.setState({
                    bio: snap.val().bio
                });
            }
            else {
                this.setState({
                    bio: "Tell others about yourself"
                });
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("playTime").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().playTime){
                    this.setState({
                        playTime: snap.val().playTime
                    });

                }
                else {
                    this.setState({
                        playTime: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("highlights").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().highlights){
                    this.setState({
                        userHighlights: snap.val().highlights
                    });

                }
                else {
                    this.setState({
                        userHighlights: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("comments").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().comments){
                    this.setState({
                        userComments: snap.val().comments
                    });

                }
                else {
                    this.setState({
                        userComments: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("likes").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().likes){
                    this.setState({
                        userLikes: snap.val().likes
                    });

                }
                else {
                    this.setState({
                        userLikes: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("tracking").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().tracking){
                    this.setState({
                        userTracking: snap.val().tracking
                    });
                }
                else {
                    this.setState({
                        userTracking: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("shares").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().shares){
                    this.setState({
                        userShares: snap.val().shares
                    });

                }
                else {
                    this.setState({
                        userShares: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`users/${currentUser.uid}/following/`).orderByChild(Variables.state.browsingArtist).on("value", function (snap){
            if(snap.hasChild(Variables.state.browsingArtist)){
                this.setState({
                    following: true
                });
            }
            else{
                this.setState({
                    following: false
                });
            }
        }.bind(this));


        let image = '';
        if(rss){
            firebase.database().ref(`users/${Variables.state.browsingArtist}/profileImage`).once("value", function (snapshot) {
                if(snapshot.val()){
                    image = snapshot.val().profileImage
                }
            }.bind(this));

        }
        else{
            storageRef.getDownloadURL()
                .then(function(url) {

                  image = url;

                }).catch(function(error) {
                //
            });

        }

        if(!rss){
            firebase.database().ref(`users/${Variables.state.browsingArtist}/recentlyPlayed`).limitToLast(10).once("value", function (snapshot) {
                snapshot.forEach(function (snap) {
                    firebase.database().ref(`podcasts/${snap.val().id}`).once("value", function (data) {
                        if(data.val()){
                            this.state.userRecentlyPlayed = [data.val(), ...this.state.userRecentlyPlayed];
                        }
                    }.bind(this))
                }.bind(this));
            }.bind(this));
        }

        firebase.database().ref(`users/${currentUser.uid}/tracking/`).orderByChild(Variables.state.browsingArtist).once("value", function (snap){
            if(snap.hasChild(Variables.state.browsingArtist)){
                this.setState({
                    tracking: true
                });
            }
            else{
                this.setState({
                    tracking: false
                });
            }
        }.bind(this));

        var dataSource = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.timeout = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false
                })
            }

        },1500);
        this.timeout2 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false
                })
            }

        },3000);
        this.timeout3 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false
                })
            }

        },4500);
        this.timeout4 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false
                })
            }

        },6000);

        this.timeout5 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false
                })
            }

        },7500);

        this.timeout6 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false
                })
            }

        },9000);


    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
        clearTimeout(this.timeout4);
        clearTimeout(this.timeout5);
        clearTimeout(this.timeout6);
    }


    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 18, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: false,
            statusBarColor: '#fff',
            drawUnderNavBar: Platform.OS === 'ios',
            navBarTranslucent: Platform.OS === 'ios',
            navBarNoBorder: true,

        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            username: '' ,
            bio: '',
            profileImage: '',
            userPodcasts: [],
            userFollowers: [],
            userFollowing: [],
            userTrackingList: [],
            dataSource: dataSource.cloneWithRows([]),
            dataSourceRecent: dataSource.cloneWithRows([]),
            userRecentlyPlayed: [],
            following: false,
            tracking: false,
            loading: true,
            refreshing: false,
            playTime: 0,
            userComments: 0,
            userTracking: 0,
            userHighlights: 0,
            userLikes: 0,
            userShares: 0,
        };


    }


    fetchData(){

        const {currentUser} = firebase.auth();

        const storageRef = firebase.storage().ref(`/users/${Variables.state.browsingArtist}/image-profile-uploaded`);
        const {rss} = this.props;

        const ref = firebase.database().ref(`podcasts/`);

        let userPodcasts = [];
        ref.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(Variables.state.browsingArtist == data.val().podcastArtist) {
                    userPodcasts.push(data.val());
                }
            });
            userPodcasts.reverse();
        });

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                this.setState({
                    username: snap.val().username
                });
            }
            else {
                this.setState({
                    username: '...'
                });
            }
        }.bind(this));


        firebase.database().ref(`/users/${Variables.state.browsingArtist}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                this.setState({
                    bio: snap.val().bio
                });
            }
            else {
                this.setState({
                    bio: "Tell others about yourself"
                });
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("playTime").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().playTime){
                    this.setState({
                        userPlayTime: snap.val().playTime
                    });

                }
                else {
                    this.setState({
                        userPlayTime: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("highlights").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().highlights){
                    this.setState({
                        userHighlights: snap.val().highlights
                    });

                }
                else {
                    this.setState({
                        userHighlights: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("comments").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().comments){
                    this.setState({
                        userComments: snap.val().comments
                    });

                }
                else {
                    this.setState({
                        userComments: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("likes").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().likes){
                    this.setState({
                        userLikes: snap.val().likes
                    });

                }
                else {
                    this.setState({
                        userLikes: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("tracking").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().tracking){
                    this.setState({
                        userTracking: snap.val().tracking
                    });
                }
                else {
                    this.setState({
                        userTracking: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`/users/${Variables.state.browsingArtist}/stats`).orderByChild("shares").once("value", function(snap) {
            if(snap.val()){
                if(snap.val().shares){
                    this.setState({
                        userShares: snap.val().shares
                    });

                }
                else {
                    this.setState({
                        userShares: 0
                    });
                }
            }
        }.bind(this));

        firebase.database().ref(`users/${currentUser.uid}/following/`).orderByChild(Variables.state.browsingArtist).on("value", function (snap){
            if(snap.hasChild(Variables.state.browsingArtist)){
                this.setState({
                    following: true
                });
            }
            else{
                this.setState({
                    following: false
                });
            }
        }.bind(this));


        let image = '';
        if(rss){
            firebase.database().ref(`users/${Variables.state.browsingArtist}/profileImage`).once("value", function (snapshot) {
                if(snapshot.val()){
                    image = snapshot.val().profileImage
                }
            }.bind(this));

        }
        else{
            storageRef.getDownloadURL()
                .then(function(url) {

                    image = url;

                }).catch(function(error) {
                //
            });

        }

        if(!rss){
            firebase.database().ref(`users/${Variables.state.browsingArtist}/recentlyPlayed`).limitToLast(10).once("value", function (snapshot) {
                snapshot.forEach(function (snap) {
                    firebase.database().ref(`podcasts/${snap.val().id}`).once("value", function (data) {
                        if(data.val()){
                            this.state.userRecentlyPlayed = [data.val(), ...this.state.userRecentlyPlayed];
                        }
                    }.bind(this))
                }.bind(this));
            }.bind(this));
        }

        firebase.database().ref(`users/${currentUser.uid}/tracking/`).orderByChild(Variables.state.browsingArtist).once("value", function (snap){
            if(snap.hasChild(Variables.state.browsingArtist)){
                this.setState({
                    tracking: true
                });
            }
            else{
                this.setState({
                    tracking: false
                });
            }
        }.bind(this));

        var dataSource = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.timeout = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false,
                    refreshing: false
                })
            }

        },1500);
        this.timeout2 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false,
                    refreshing: false
                })
            }

        },3000);
        this.timeout3 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false,
                    refreshing: false
                })
            }

        },4500);
        this.timeout4 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false,
                    refreshing: false
                })
            }

        },6000);

        this.timeout5 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false,
                    refreshing: false
                })
            }

        },7500);

        this.timeout6 = setTimeout(() =>{
            this.setState({
                dataSource: dataSource.cloneWithRows(userPodcasts),
                dataSourceRecent: dataSource.cloneWithRows(this.state.userRecentlyPlayed),
                userPodcasts: userPodcasts,
                profileImage: image
            });

            if(this.state.username != '' && this.state.bio != ''){
                this.setState({
                    loading: false,
                    refreshing: false
                })
            }

        },9000);


    }


    _onRefresh() {
        this.setState({
            refreshing: true,
            username: '' ,
            bio: '',
            following: false,
            tracking: false,
            loading: false,
            userRecentlyPlayed: []
        });
        this.fetchData();
    }



    _renderProfileName = () => {

        return (
            <Text style={styles.title2}>{this.state.username}</Text>

        )

    };


    _renderBio = () => {

        return(
            <Text style={styles.titleBio}>{this.state.bio}</Text>
        )

    };


    _renderProfileImage(){
        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center',  marginTop: height/33.35, marginRight: width/18.75, marginLeft: width/18.75, paddingTop: height/66.7,  height: height/6, width: height/6, borderRadius:35, borderWidth: 5, borderColor:'rgba(320,320,320,0.8)', }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: width/6.25,
                        color: 'white',
                        marginTop: height/66.7
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginTop: height/33.35, marginRight: width/18.75, marginLeft: width/18.75, paddingTop: height/66.7, borderRadius: 35, height: height/6, width: height/6, }}>
                    <Image
                        style={{width: height/6, height: height/6, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 35,}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }


    onFollowersPress = () => {
        Navigation.showModal({
            screen: "UserFollowers",
            title: "Followers",
            passProps: {},
        })
    };

    onFollowingPress = () => {
        Navigation.showModal({
            screen: "UserFollowing",
            title: "Following",
            passProps: {},
        })
    };

    onTrackingPress = () =>{
        const list = this.state.userTrackingList;
        Navigation.showModal({
            screen: "Tracking",
            title: "Tracking",
            passProps: {list},
        })
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
            this.state.following = false;
        }
        else if (this.state.following == false){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/following`).child(Variables.state.browsingArtist).push(Variables.state.browsingArtist);
            firebase.database().ref(`users/${Variables.state.browsingArtist}/followers/`).child(currentUser.uid).push(currentUser.uid);
            firebase.database().ref(`users/${currentUser.uid}/activity`).push({action: 'follow', id: Variables.state.browsingArtist, user: currentUser.uid, time: firebase.database.ServerValue.TIMESTAMP});
            this.setState({ following: true});
            this.state.following = true;
        }
    };


    pressTrackButton =() => {
        if(this.state.tracking == true){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/tracking/${Variables.state.browsingArtist}`).remove();
            var refTrack = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/stats`);
            refTrack.once("value", function(snapshot) {
                if(snapshot.val()){
                    if(snapshot.val().tracking){
                        refTrack.update({tracking: snapshot.val().tracking - 1})
                    }
                    else{
                        refTrack.update({tracking: 0})
                    }
                }
                else{
                    refTrack.update({tracking: 0})
                }
            });
            this.setState({tracking: false});
            this.state.tracking = false;
        }
        else if (this.state.tracking == false){
            const {currentUser} = firebase.auth();

            firebase.database().ref(`users/${currentUser.uid}/tracking`).child(Variables.state.browsingArtist).update({podcastArtist: Variables.state.browsingArtist});
            firebase.database().ref(`users/${Variables.state.browsingArtist}/podcasts`).once("value", function (snapshot) {

                snapshot.forEach(function (snap) {
                    firebase.database().ref(`podcasts/${snap.val().id}`).once("value", function (episode) {
                        if(episode.val()){
                            const {id} = episode.val();
                            firebase.database().ref(`users/${currentUser.uid}/tracking/${Variables.state.browsingArtist}/episodes/${id}`).update({id});
                            firebase.database().ref(`users/${currentUser.uid}/tracking/${Variables.state.browsingArtist}`).update({lastEpisode: id});
                        }
                    })
                });
            });


            firebase.database().ref(`users/${currentUser.uid}/activity`).push({action: 'track', id: Variables.state.browsingArtist, user: currentUser.uid, time: firebase.database.ServerValue.TIMESTAMP});
            var ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/stats`);
            ref.once("value", function(snapshot) {
                if(snapshot.val()){
                    if(snapshot.val().tracking){
                        ref.update({tracking: snapshot.val().tracking + 1})
                    }
                    else{
                        ref.update({tracking: 1})
                    }
                }
                else{
                    ref.update({tracking: 1})
                }

            });
            this.setState({tracking: true});
            this.state.tracking = true;
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
            else if(level == 6){
                if(this.state.userLikes >= 100){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 6;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 100;
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
                            <Text style={styles.smallTitle}>Likes Lv.6</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/100</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 6;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 100;
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
                            <Text style={styles.smallTitleLight}>Likes Lv.6</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/100</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 7){
                if(this.state.userLikes >= 150){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 7;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 150;
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
                            <Text style={styles.smallTitle}>Likes Lv.7</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/150</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 7;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 150;
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
                            <Text style={styles.smallTitleLight}>Likes Lv.7</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/150</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 8){
                if(this.state.userLikes >= 200){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 8;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 200;
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
                            <Text style={styles.smallTitle}>Likes Lv.8</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/200</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 8;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 200;
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
                            <Text style={styles.smallTitleLight}>Likes Lv.8</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/200</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 9){
                if(this.state.userLikes >= 300){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 9;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 300;
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
                            <Text style={styles.smallTitle}>Likes Lv.9</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/300</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 9;
                            const title = 'Likes';
                            const description = 'liked';
                            const progress = this.state.userLikes;
                            const goal = 300;
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
                            <Text style={styles.smallTitleLight}>Likes Lv.9</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userLikes}/300</Text>
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
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
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
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
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
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
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
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
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
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
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
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
                            />
                            <Text style={styles.smallTitleLight}>Highlights Lv.3</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/10</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 5){
                if(this.state.userHighlights >= 15){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 5;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 15;
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
                            />
                            <Text style={styles.smallTitle}>Highlights Lv.5</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/15</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 5;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 15;
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
                            />
                            <Text style={styles.smallTitleLight}>Highlights Lv.5</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/15</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 6){
                if(this.state.userHighlights >= 20){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 6;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 20;
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
                            />
                            <Text style={styles.smallTitle}>Highlights Lv.6</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/20</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 6;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 20;
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
                            />
                            <Text style={styles.smallTitleLight}>Highlights Lv.6</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/20</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 8){
                if(this.state.userHighlights >= 30){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 8;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 30;
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
                            />
                            <Text style={styles.smallTitle}>Highlights Lv.8</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/30</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 8;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 30;
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
                            />
                            <Text style={styles.smallTitleLight}>Highlights Lv.8</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/30</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 9){
                if(this.state.userHighlights >= 50){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 9;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 50;
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
                            />
                            <Text style={styles.smallTitle}>Highlights Lv.9</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/50</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 9;
                            const title = 'Highlights';
                            const description = 'highlights created';
                            const progress = this.state.userHighlights;
                            const goal = 50;
                            const image = 'tess/src/images/iconHighlight.png';

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
                                source={require('tess/src/images/iconHighlight.png')}
                            />
                            <Text style={styles.smallTitleLight}>Highlights Lv.9</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userHighlights}/50</Text>
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
                if(this.state.userTracking >= 3){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 2;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
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
                            <Text style={styles.smallTitle}>Tracking Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/3</Text>
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
                            <Text style={styles.smallTitleLight}>Tracking Lv.2</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/3</Text>
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
            else if(level == 5){
                if(this.state.userTracking >= 8){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 5;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 8;
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
                            <Text style={styles.smallTitle}>Tracking Lv.5</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/8</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 5;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 8;
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
                            <Text style={styles.smallTitleLight}>Tracking Lv.5</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/8</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 7){
                if(this.state.userTracking >= 12){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 7;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 12;
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
                            <Text style={styles.smallTitle}>Tracking Lv.7</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/12</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 7;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 12;
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
                            <Text style={styles.smallTitleLight}>Tracking Lv.7</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/12</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 9){
                if(this.state.userTracking >= 9){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 9;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 16;
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
                            <Text style={styles.smallTitle}>Tracking Lv.9</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/16</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 9;
                            const title = 'Tracking';
                            const description = 'podcasts tracked';
                            const progress = this.state.userTracking;
                            const goal = 16;
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
                            <Text style={styles.smallTitleLight}>Tracking Lv.9</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userTracking}/16</Text>
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
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
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
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
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
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
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
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
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
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
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
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
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
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
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
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
                            />
                            <Text style={styles.smallTitleLight}>Comments Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/50</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 6){
                if(this.state.userComments >= 75){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 6;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 75;
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
                            />
                            <Text style={styles.smallTitle}>Comments Lv.6</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/75</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 6;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 75;
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
                            />
                            <Text style={styles.smallTitleLight}>Comments Lv.6</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/75</Text>
                        </TouchableOpacity>
                    )
                }
            }
            else if(level == 8){
                if(this.state.userComments >= 100){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 8;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 100;
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
                            />
                            <Text style={styles.smallTitle}>Comments Lv.8</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/100</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 8;
                            const title = 'Comments';
                            const description = 'comments made';
                            const progress = this.state.userComments;
                            const goal = 100;
                            const image = 'tess/src/images/iconComment.png';

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
                                source={require('tess/src/images/iconComment.png')}
                            />
                            <Text style={styles.smallTitleLight}>Comments Lv.8</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userComments}/100</Text>
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
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
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
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
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
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
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
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitleLight}>Listens Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/10</Text>
                        </TouchableOpacity>
                    )
                }
            }
            if(level == 5){
                if(this.roundSeconds(((this.state.playTime/60)/60)) >= 15){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 5;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 15;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitle}>Listens Lv.5</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/15</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 5;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 15;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitleLight}>Listens Lv.5</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/15</Text>
                        </TouchableOpacity>
                    )
                }
            }
            if(level == 6){
                if(this.roundSeconds(((this.state.playTime/60)/60)) >= 20){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 6;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 20;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitle}>Listens Lv.6</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/20</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 6;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 20;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitleLight}>Listens Lv.6</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/20</Text>
                        </TouchableOpacity>
                    )
                }
            }
            if(level == 7){
                if(this.roundSeconds(((this.state.playTime/60)/60)) >= 25){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 7;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 25;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitle}>Listens Lv.7</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/25</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 7;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 25;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitleLight}>Listens Lv.7</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/25</Text>
                        </TouchableOpacity>
                    )
                }
            }
            if(level == 8){
                if(this.roundSeconds(((this.state.playTime/60)/60)) >= 30){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 8;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 30;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitle}>Listens Lv.8</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/30</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 8;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 30;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitleLight}>Listens Lv.8</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/30</Text>
                        </TouchableOpacity>
                    )
                }
            }
            if(level == 9){
                if(this.roundSeconds(((this.state.playTime/60)/60)) >= 40){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 9;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 40;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitle}>Listens Lv.9</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/40</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 9;
                            const title = 'Listens';
                            const description = 'hours listened';
                            const progress = this.roundSeconds(((this.state.playTime/60)/60));
                            const goal = 40;
                            const image = 'tess/src/images/iconListen.png';

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
                                source={require('tess/src/images/iconListen.png')}
                            />
                            <Text style={styles.smallTitleLight}>Listens Lv.9</Text>
                            <Text style={styles.smallTitleNum}>{this.roundSeconds(((this.state.playTime/60)/60))}/40</Text>
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
                                source={require('tess/src/images/iconShares.png')}
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
                            const image = 'tess/src/images/iconShares.png';

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
                                source={require('tess/src/images/iconShares.png')}
                            />
                            <Text style={styles.smallTitleLight}>Shares Lv.4</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userShares}/10</Text>
                        </TouchableOpacity>
                    )
                }
            }
            if(level == 5){
                if(this.state.userShares >= 20){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 5;
                            const title = 'Shares';
                            const description = 'shared';
                            const progress = this.state.userShares;
                            const goal = 20;

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
                                source={{uri:'tess/src/images/iconShares.png'}}
                            />
                            <Text style={styles.smallTitle}>Shares Lv.5</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userShares}/20</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 5;
                            const title = 'Shares';
                            const description = 'shared';
                            const progress = this.state.userShares;
                            const goal = 20;
                            const image = 'tess/src/images/iconShares.png';

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
                                source={require('tess/src/images/iconShares.png')}
                            />
                            <Text style={styles.smallTitleLight}>Shares Lv.5</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userShares}/20</Text>
                        </TouchableOpacity>
                    )
                }
            }
            if(level == 7){
                if(this.state.userShares >= 30){
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 7;
                            const title = 'Shares';
                            const description = 'shared';
                            const progress = this.state.userShares;
                            const goal = 30;

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
                                source={require('tess/src/images/iconShares.png')}
                            />
                            <Text style={styles.smallTitle}>Shares Lv.7</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userShares}/30</Text>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <TouchableOpacity style ={{flex:1}} onPress={() =>{
                            const level = 7;
                            const title = 'Shares';
                            const description = 'shared';
                            const progress = this.state.userShares;
                            const goal = 30;
                            const image = 'tess/src/images/iconShares.png';

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
                                source={require('tess/src/images/iconShares.png')}
                            />
                            <Text style={styles.smallTitleLight}>Shares Lv.7</Text>
                            <Text style={styles.smallTitleNum}>{this.state.userShares}/30</Text>
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
        else if(this.state.userLikes < 5 || this.state.userTracking < 3 || this.state.userComments < 5 || this.state.userHighlights < 5){
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
        else if(this.state.userLikes < 50 || this.roundSeconds(((this.state.playTime/60)/60)) < 10 || this.state.userComments < 50 || this.state.userShares < 10){
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
        else if(this.roundSeconds(((this.state.playTime/60)/60)) < 15 || this.state.userShares < 20 || this.state.userHighlights < 15 || this.state.userTracking < 8){
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 5 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        {this.renderAchievement('listens', 5)}
                        {this.renderAchievement('highlights', 5)}
                        {this.renderAchievement('tracking', 5)}
                        {this.renderAchievement('shares', 5)}
                    </View>
                </View>
            )
        }
        //level 6
        else if(this.roundSeconds(((this.state.playTime/60)/60)) < 20 || this.state.userLikes < 100 || this.state.userComments < 75 || this.state.userHighlights < 20){
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 5 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        {this.renderAchievement('listens', 6)}
                        {this.renderAchievement('likes', 6)}
                        {this.renderAchievement('comments', 6)}
                        {this.renderAchievement('highlights', 6)}
                    </View>
                </View>
            )
        }
        //level 7
        else if(this.roundSeconds(((this.state.playTime/60)/60)) < 25 || this.state.userShares < 30 || this.state.userLikes < 150 || this.state.userTracking < 12){
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 5 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        {this.renderAchievement('listens', 7)}
                        {this.renderAchievement('likes', 7)}
                        {this.renderAchievement('tracking', 7)}
                        {this.renderAchievement('shares', 7)}
                    </View>
                </View>
            )
        }
        //level 8
        else if(this.roundSeconds(((this.state.playTime/60)/60)) < 30 || this.state.userComments < 100 || this.state.userHighlights < 30 || this.state.userLikes < 200){
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 5 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        {this.renderAchievement('listens', 8)}
                        {this.renderAchievement('highlights', 8)}
                        {this.renderAchievement('likes', 8)}
                        {this.renderAchievement('comments', 8)}
                    </View>
                </View>
            )
        }
        //level 9
        else if(this.roundSeconds(((this.state.playTime/60)/60)) < 40 || this.state.userLikes < 300 || this.state.userHighlights < 50 || this.state.userTracking < 16){
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle1}>Level 5 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                        {this.renderAchievement('listens', 9)}
                        {this.renderAchievement('likes', 9)}
                        {this.renderAchievement('tracking', 9)}
                        {this.renderAchievement('highlights', 9)}
                    </View>
                </View>
            )
        }
        //level 5
        else{
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                    <Text style={styles.myContentTitle10}>Level 10 Listener</Text>
                    <Text style={styles.myContentTitle}>Hours Listened: { this.roundSeconds(((this.state.playTime/60)/60)) }h { this.roundSeconds(((this.state.playTime/60)%60)) }m {(this.state.playTime%60).toFixed(0)}s</Text>
                </View>
            )
        }

    };


    renderRecent(data){
        if(data.length > 0){
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: width/46.88, marginVertical: height/44.47, borderRadius: width/37.5}}>
                    <Text style={styles.myContentTitle}>Recently Listened</Text>
                    <View style={{flexDirection: 'row', marginTop: height/66.7}}>
                        <ListView
                            enableEmptySections
                            horizontal={true}
                            dataSource={this.state.dataSourceRecent}
                            renderRow={this.renderRow}
                        />
                    </View>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor: '#fff', marginHorizontal: width/46.88, marginVertical: height/44.47, borderRadius: width/37.5}}>
                    <Text style={styles.myContentTitle}>Recently Listened</Text>
                    <View>
                        <Text style={styles.titleSmall}>No recent listening activity</Text>
                    </View>
                </View>
            )
        }
    }

    renderContent(){
        if(this.state.userPodcasts.length > 0){
            return(
                <View style={{backgroundColor: '#fff', marginVertical: height/44.47, marginHorizontal: width/53.57, borderRadius: width/37.5}}>
                    <Text style={styles.myContentTitle}>{this.state.userPodcasts.length} episodes</Text>
                    <ListView
                        enableEmptySections
                        horizontal={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>
            )
        }
        else{
            return(
                <View style={{marginVertical: height/95.29}} />
            )
        }
    }


    render() {

        if(this.state.loading){
            const {rss} = this.props;

            if(rss){

                return (
                    <View
                        style={styles.container}>

                        <ScrollView>

                            <View>
                                <ActivityIndicator style={{paddingVertical: height/33.35, alignSelf:'center'}} color='#3e4164' size = "large"/>
                            </View>

                            <View style={{backgroundColor: '#fff'}}>

                                {this._renderProfileImage()}

                                {this._renderProfileName()}

                                {this._renderBio()}

                                <View style={{flexDirection: 'row', marginTop: height/66.7}}>
                                    {this._renderFollowButton()}
                                    {this._renderTrackButton()}
                                </View>

                                <TouchableOpacity style={{flex: 1, alignSelf: 'center', padding: 10,}} onPress={this.onFollowersPress}>
                                    <Text style={styles.stats}>Followers</Text>
                                    <Text style={styles.stats}>{this.state.userFollowers.length}</Text>
                                </TouchableOpacity>

                            </View>


                            <View style={{backgroundColor: '#fff', marginVertical: height/44.47, marginHorizontal: width/53.57, borderRadius: 10}}>
                                <Text style={styles.myContentTitle}>{this.state.userPodcasts.length} episodes</Text>
                                <ListView
                                    enableEmptySections
                                    horizontal={true}
                                    dataSource={this.state.dataSource}
                                    renderRow={this.renderRow}
                                />
                            </View>


                            <View style={{paddingBottom: height/5.56}}>

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

                        <ScrollView>

                            <View>
                                <ActivityIndicator style={{paddingVertical: height/33.35, alignSelf:'center'}} color='#3e4164' size = "large" />
                            </View>

                            <View style={{backgroundColor: '#fff'}}>

                                {this._renderProfileImage()}

                                {this._renderProfileName()}

                                {this._renderBio()}

                                <View style={{flexDirection: 'row', marginTop: height/66.7}}>
                                    {this._renderFollowButton()}
                                    {this._renderTrackButton()}
                                </View>


                                {this._renderProfileNumbers(this.state.userTrackingList.length, this.state.userFollowers.length, this.state.userFollowing.length)}

                            </View>

                            {this.renderContent()}

                            {this.renderAchievements()}

                            {this.renderRecent(this.state.userRecentlyPlayed)}


                            <View style={{paddingBottom: height/5.56}}>

                            </View>


                        </ScrollView>


                        <PlayerBottom/>

                    </View>


                );

            }
        }
        else{
            const {rss} = this.props;

            if(rss){

                return (
                    <View
                        style={styles.container}>

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

                                <View style={{flexDirection: 'row', marginTop: height/66.7}}>
                                    {this._renderFollowButton()}
                                    {this._renderTrackButton()}
                                </View>

                                <TouchableOpacity style={{flex: 1, alignSelf: 'center', padding: 10,}} onPress={this.onFollowersPress}>
                                    <Text style={styles.stats}>Followers</Text>
                                    <Text style={styles.stats}>{this.state.userFollowers.length}</Text>
                                </TouchableOpacity>

                            </View>


                            <View style={{backgroundColor: '#fff', marginVertical: height/44.47, marginHorizontal: width/53.57, borderRadius: 10}}>
                                <Text style={styles.myContentTitle}>{this.state.userPodcasts.length} episodes</Text>
                                <ListView
                                    enableEmptySections
                                    horizontal={true}
                                    dataSource={this.state.dataSource}
                                    renderRow={this.renderRow}
                                />
                            </View>


                            <View style={{paddingBottom: height/5.56}}>

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

                                <View style={{flexDirection: 'row', marginTop: height/66.7}}>
                                    {this._renderFollowButton()}
                                    {this._renderTrackButton()}
                                </View>


                                {this._renderProfileNumbers(this.state.userTrackingList.length, this.state.userFollowers.length, this.state.userFollowing.length)}

                            </View>

                            {this.renderContent()}

                            {this.renderAchievements()}

                            {this.renderRecent(this.state.userRecentlyPlayed)}


                            <View style={{paddingBottom: height/5.56}}>

                            </View>


                        </ScrollView>


                        <PlayerBottom/>

                    </View>


                );

            }
        }

    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
        marginTop: topMargin,
    },
    title2: {
        color: '#3e4164',
        marginVertical: height/66.7,
        marginTop: height/66.7,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/22,
        
    },
    titleBio: {
        color: '#3e4164',
        marginBottom: height/66.7,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/25,
        marginHorizontal: width/18.75,
        
        },
    title: {
        color: '#506dcf',
        marginTop: height/133.4,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/25,
        
        marginHorizontal: width/18.75,

    },
    titleSmall: {
        color: '#3e4164',
        paddingVertical: height/66.7,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/26,
        
        marginHorizontal: width/75,
    },
     myContentTitle: {
        color: '#3e4164',
        paddingVertical: height/66.7,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/22,
        
        marginHorizontal: width/75,
     },
    myContentTitle1: {
        color: '#3e4164',
        paddingTop: height/66.7,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/22,
        
        marginHorizontal: width/75,

    },

    smallTitle: {
        color: '#2A2A30',
        marginVertical: height/133.4,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/38,
        
    },
    smallTitleLight: {
        color: '#2A2A3030',
        marginVertical: height/133.4,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/38,
        
    },
    smallTitleNum: {
        color: '#506dcf',
        marginBottom: height/133.4,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/30,
        
    },
    stats: {
        color: '#3e4164',
        flex: 1,
        padding: 8,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        
    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex: 1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/25,
        
        marginLeft: width/18.75,
    },
    containerList: {
         paddingHorizontal: 0,
         paddingVertical: height/66.7,
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
        paddingLeft: width/187.5,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        paddingRight: width/187.5,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: height/222.33,
        marginHorizontal: -(width/3.75),
    },
    titleFollow: {
        color: '#3e4164',
        marginVertical: height/133.4,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        
    },
    titleFollowSelected: {
        color: '#506dcf',
        marginVertical: height/133.4,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        
    },
});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchUser })(UserProfile);
