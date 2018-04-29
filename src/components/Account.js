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
        Variables.state.profileImage = '';
        const {currentUser} = firebase.auth();
        const refMy = firebase.database().ref(`podcasts/`);
        const storageRef = firebase.storage().ref(`/users/${currentUser.uid}/image-profile-uploaded`);
        const refFol = firebase.database().ref(`users/${currentUser.uid}/followers`);
        const refFollowing = firebase.database().ref(`users/${currentUser.uid}/following`);


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
        };
        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.myPodcasts), username: Variables.state.username, profileImage: Variables.state.profileImage})},1000)
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

                        {this._renderProfileNumbers(Variables.state.myPodcasts.length, Variables.state.myFollowers.length, Variables.state.myFollowing.length)}

                    </View>


                    <View style={{backgroundColor: '#fff', marginVertical: 15, marginHorizontal: 7}}>
                        <Text style={styles.myContentTitle}>My Content</Text>
                    <ListView
                        enableEmptySections
                        horizontal={true}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />
                    </View>





                    <View style={{backgroundColor: '#fff', marginHorizontal: 8}}>
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




                    <View style={{backgroundColor: '#fff', marginHorizontal: 8, marginVertical: 15}}>
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

});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetch })(Account);