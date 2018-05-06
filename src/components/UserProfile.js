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

    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
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
        this.state = { username: '' , bio: '', profileImage: '',
            category: '', profileName: profileName, following: false, profileNameL: profileNameL,
            dataSource: dataSource.cloneWithRows([]),
            loading: true,
            refreshing: false,
            tracking: false,
        };
        this.timeout = setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
                username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following
            })
        },500);
        this.timeout2 = setTimeout(() =>{
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

        this.timeout = setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
                username: Variables.state.userUsername, bio: Variables.state.currentBio, profileImage: Variables.state.onUserProfileImage,
                following: Variables.state.following
            })
        },500);
        this.timeout2 = setTimeout(() =>{
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
            this.setState({tracking: false});
            Variables.state.tracking = false;
        }
        else if (this.state.tracking == false){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/tracking`).child(Variables.state.browsingArtist).push(Variables.state.browsingArtist);
            this.setState({tracking: true});
            Variables.state.tracking = true;
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
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
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


                        {this._renderProfileNumbers(Variables.state.userPodcasts.length, Variables.state.userFollowers.length, Variables.state.userFollowing.length)}

                    </View>


                    <View style={{backgroundColor: '#fff', marginVertical: 15, marginHorizontal: 7, borderRadius: 10}}>
                        <Text style={styles.myContentTitle}>Content</Text>
                        <ListView
                            enableEmptySections
                            horizontal={true}
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                    </View>



                    <View style={{backgroundColor: '#fff', marginHorizontal: 8, borderRadius: 10}}>
                        <Text style={styles.myContentTitle}>Hours Listened: 5h, 37min, 42s</Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <TouchableOpacity style ={{flex:1}}>
                                <Image
                                    style={{width: 60, height: 60, alignSelf: 'center', opacity: 1,}}
                                    source={require('tess/src/images/iconStar.png')}
                                />
                                <Text style={styles.smallTitle}>First track</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style ={{flex:1}}>
                                <Image
                                    style={{ width: 60, height: 60,  alignSelf: 'center', opacity: 1,}}
                                    source={require('tess/src/images/iconLike.png')}
                                />
                                <Text style={styles.smallTitle}>First Like</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style ={{flex:1}}>
                                <Image
                                    style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1,}}
                                    source={require('tess/src/images/iconRocket.png')}
                                />
                                <Text style={styles.smallTitle}>First Comment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style ={{flex:1}}>
                                <Image
                                    style={{ width: 60, height: 60,   alignSelf: 'center', opacity: 1, }}
                                    source={require('tess/src/images/iconAward.png')}
                                />
                                <Text style={styles.smallTitle}>First Highlight</Text>
                            </TouchableOpacity>


                        </View>

                    </View>




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

    smallTitle: {
        color: '#2A2A30',
        marginVertical: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/38,
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

export default connect(mapStateToProps, { podcastFetchUser })(UserProfile);