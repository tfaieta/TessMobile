import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, ListView, Dimensions, TouchableWithoutFeedback, RefreshControl} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";
import Icon from 'react-native-vector-icons/Ionicons';
import Carousel from 'react-native-looped-carousel';
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');



// 2nd tab, Browse page

class Browse extends Component{

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            drawUnderTabBar: false,
            navBarCustomView: 'CustomNavbar',
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator
            },
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
        });


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            podcastOfTheWeekTitle: '',
            podcastOfTheWeekID: '',
            podcastOftheWeekRSS: false,
            podImage: '',
            dataSource: dataSource.cloneWithRows([]),
            url: '',
            refreshing: false,
            size: {width: width, height: height/2.15}
        };


        let podOfTheWeek = [];
        let podID = '';
        let podUsername = '';
        let podImage = '';
        let podRSS = false;
        firebase.database().ref(`podcastOfTheWeek/`).once("value", function (snapshot) {
            if(snapshot.val()){
                podID = snapshot.val();
                firebase.database().ref(`users/${snapshot.val()}/username`).once("value", function (name) {
                    if(name.val()){
                        if(name.val().username){
                            podUsername = name.val().username;
                        }
                    }
                });
                firebase.database().ref(`users/${snapshot.val()}/podcasts`).limitToLast(10).once("value", function (snap) {
                    snap.forEach(function (data) {
                        firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (podcast) {
                            if(podcast.val()){
                                podOfTheWeek = [podcast.val(), ...podOfTheWeek]
                            }
                        })
                    })
                });
                firebase.database().ref(`users/${snapshot.val()}/profileImage`).once("value", function (image) {
                    if(image.val()){
                        podImage = image.val().profileImage;
                        podRSS = true;
                    }
                    else{
                        const storageRef = firebase.storage().ref(`/users/${snapshot.val()}/image-profile-uploaded`);
                        storageRef.getDownloadURL()
                            .then(function(url) {
                                podImage = url;
                            }).catch(function(error) {
                            //
                        });
                    }
                })
            }
        });

        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(podOfTheWeek), podcastOfTheWeekTitle: podUsername, podImage: podImage, podcastOfTheWeekID: podID, podcastOftheWeekRSS: podRSS})},3000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(podOfTheWeek), podcastOfTheWeekTitle: podUsername, podImage: podImage, podcastOfTheWeekID: podID, podcastOftheWeekRSS: podRSS})},6000);
    }



    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }


    _onRefresh = () => {
        this.setState({
            refreshing: true,
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});

        let podOfTheWeek = [];
        let podID = '';
        let podUsername = '';
        let podImage = '';
        let podRSS = false;
        firebase.database().ref(`podcastOfTheWeek/`).once("value", function (snapshot) {
            if(snapshot.val()){
                podID = snapshot.val();
                firebase.database().ref(`users/${snapshot.val()}/username`).once("value", function (name) {
                    if(name.val()){
                        if(name.val().username){
                            podUsername = name.val().username;
                        }
                    }
                });
                firebase.database().ref(`users/${snapshot.val()}/podcasts`).limitToLast(10).once("value", function (snap) {
                    snap.forEach(function (data) {
                        firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (podcast) {
                            if(podcast.val()){
                                podOfTheWeek = [podcast.val(), ...podOfTheWeek]
                            }
                        })
                    })
                });
                firebase.database().ref(`users/${snapshot.val()}/profileImage`).once("value", function (image) {
                    if(image.val()){
                        podImage = image.val().profileImage;
                        podRSS = true;
                    }
                    else{
                        const storageRef = firebase.storage().ref(`/users/${snapshot.val()}/image-profile-uploaded`);
                        storageRef.getDownloadURL()
                            .then(function(url) {
                                podImage = url;
                            }).catch(function(error) {
                            //
                        });
                    }
                })
            }
        });

        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(podOfTheWeek), podcastOfTheWeekTitle: podUsername, podImage: podImage, podcastOfTheWeekID: podID, podcastOftheWeekRSS: podRSS, refreshing: false})},3000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(podOfTheWeek), podcastOfTheWeekTitle: podUsername, podImage: podImage, podcastOfTheWeekID: podID, podcastOftheWeekRSS: podRSS})},6000);

    };


    pressDiscover = () =>{
        const {currentUser} = firebase.auth();
        Analytics.logEvent('goToDiscover', {
            'user_id': currentUser.uid
        });

        this.props.navigator.push({
            screen: 'Discover',
            title: 'Discover'
        });
    };

    pressCategories = () =>{
        const {currentUser} = firebase.auth();
        Analytics.logEvent('goToCategories', {
            'user_id': currentUser.uid
        });

        this.props.navigator.push({
            screen: 'Categories',
            title: 'Categories'
        });
    };

    pressCharts = () =>{
        const {currentUser} = firebase.auth();
        Analytics.logEvent('goToCharts', {
            'user_id': currentUser.uid
        });

        this.props.navigator.push({
            screen: 'TopCharts',
            title: 'Charts'
        });
    };


    renderImage = () => {
        if(this.state.podImage != ''){
            return(
                <TouchableWithoutFeedback onPress={() => {

                    const {currentUser} = firebase.auth();
                    Analytics.logEvent('openPOTW', {
                        'user_id': currentUser.uid
                    });

                    let rss = false;
                    if(this.state.podcastOftheWeekRSS){
                        rss = true;
                    }
                    const {navigator} = this.props;
                    Variables.state.browsingArtist = this.state.podcastOfTheWeekID;
                    navigator.push({
                        screen: 'UserProfile',
                        title: this.state.podcastOfTheWeekTitle,
                        passProps: {navigator, rss},
                    })
                }}>
                    <View style = {{backgroundColor:'transparent', alignSelf: 'flex-end', height: width/5.77, width: width/5.77, borderTopRightRadius: 15, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)', overflow: 'hidden'}}>
                    <Image
                        style={{width: width/5.77, height: width/5.77, alignSelf: 'flex-end', opacity: 1,}}
                        source={{uri: this.state.podImage}}
                    />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'flex-end', height: width/5.77, width: width/5.77, borderTopRightRadius: 15, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)'}}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: width/10.71,
                        marginTop: height/44.47,
                        color: 'white',
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }

    };


    renderRow = (rowData) => {
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
    };


    render() {
        return (
            <View style={styles.container}>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />}
                >

                    <Text style = {styles.titleHeader}>Featured</Text>
                    <Carousel
                        delay={5000}
                        style={this.state.size}
                        onAnimateNextPage={(p) => console.log(p)}
                    >
                        {/* First Item in Carousel */}
                        <View style={[this.state.size]}>
                            <TouchableWithoutFeedback onPress={() => {
                                const {navigator} = this.props;
                                const rss = true;
                                Variables.state.browsingArtist = 'The Best Ideas Podcast';
                                navigator.push({
                                    screen: 'UserProfile',
                                    title: "The Best Ideas Podcast",
                                    passProps: {navigator, rss},
                                })
                            }}>
                            <View style={{backgroundColor: '#fff', borderRadius: 12, marginHorizontal: width/75}}>
                                <View style={styles.featuredArt}>
                                    <Image
                                        style={{width: width/1.10, height: height/3.70, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/podArtBestIdeas.png')}
                                    />
                                </View>
                                <Text style={styles.text1}>The Best Ideas Podcast</Text>
                                <Text style={styles.text2}>by Tess Media</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>

                        {/* Second Item in Carousel */}
                        <View style={[this.state.size]}>
                            <TouchableWithoutFeedback onPress={() => {
                                const {navigator} = this.props;
                                const rss = true;
                                Variables.state.browsingArtist = 'IDK Podcast';
                                navigator.push({
                                    screen: 'UserProfile',
                                    title: "IDK Podcast",
                                    passProps: {navigator, rss},
                                })
                            }}>
                            <View style={{backgroundColor: '#fff', borderRadius: 12, marginHorizontal: width/75}}>
                                <View style={styles.featuredArt}>
                                    <Image
                                        style={{width: width/1.10, height: height/3.70, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/podArtIDK.png')}
                                    />
                                </View>
                                <Text style={styles.text1}>IDK Podcast</Text>
                                <Text style={styles.text2}>by Tess Media</Text>
                            </View>
                            </TouchableWithoutFeedback>
                        </View>

                        {/* Third Item in Carousel */}
                        <View style={[this.state.size]}>
                            <TouchableWithoutFeedback onPress={() => {
                                const {navigator} = this.props;
                                const rss = true;
                                Variables.state.browsingArtist = 'Best of Gainesville Weekly Minipod';
                                navigator.push({
                                    screen: 'UserProfile',
                                    title: "Best of Gainesville Weekly Minipod",
                                    passProps: {navigator, rss},
                                })
                            }}>
                                <View style={{backgroundColor: '#fff', borderRadius: 12, marginHorizontal: width/75}}>
                                    <View style={styles.featuredArt}>
                                        <Image
                                            style={{width: width/1.10, height: height/3.70, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                            source={require('tess/src/images/BOGW.png')}
                                        />
                                    </View>
                                    <Text style={styles.text1}>Best of Gainesville Weekly Minipod</Text>
                                    <Text style={styles.text2}>by Tess Media</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </Carousel>

                    {/* Begin Listing Options  */}

                    {/* Discover */}
                    <TouchableOpacity style={styles.bar} onPress={this.pressDiscover}>
                        <Text style = {styles.title}>   Discover</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: width/17,
                                color: '#3e416460',
                                marginHorizontal: width/25,
                            }} name="ios-arrow-forward">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    {/* Charts */}
                    <TouchableOpacity style={styles.bar} onPress={this.pressCharts}>
                        <Text style = {styles.title}>   Charts</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: width/17,
                                color: '#3e416460',
                                marginHorizontal: width/25,
                            }} name="ios-arrow-forward">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    {/* Categories */}
                    <TouchableOpacity style={styles.bar} onPress={this.pressCategories}>
                        <Text style = {styles.title}>   Categories</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: width/17,
                                color: '#3e416460',
                                marginHorizontal: width/25,
                            }} name="ios-arrow-forward">
                            </Icon>
                        </View>
                    </TouchableOpacity>


                    {/* Podcast of the Week */}
                    <Text style = {styles.titleHeader}>Podcast of the Week</Text>

                    <View style={{flex:1, flexDirection: 'row', backgroundColor: '#fff', marginTop: height/133.4, marginHorizontal: width/31.25, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <View style={{flex: 6}}>
                            <Text style = {styles.titleWeek}>{this.state.podcastOfTheWeekTitle}</Text>
                        </View>

                        <View style={{flex:1, alignSelf: 'flex-start'}}>
                            {this.renderImage()}
                        </View>

                    </View>

                    <View style={{backgroundColor: '#fff', marginHorizontal: width/31.25, marginBottom: height/10, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                        <ListView
                            horizontal={true}
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                    </View>

                </ScrollView>

                {/* Player */}
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

    featuredArt: {
        backgroundColor: 'transparent',
        width: width/1.15,
        height: height/3.51,
        marginVertical: height/66.7,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        borderRadius: 8
    },

    title: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/18.75,
    },

    titleHeader: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18.75,
        marginTop: height/33.35,
        marginBottom: height/66.7,
        marginLeft: width/25,
    },

    wrapper: {
    },

    slide: {
        backgroundColor: 'blue'

    },

    text1: {
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        marginTop: height/66.7,
        marginLeft: width/18.75,
        fontSize: width/23.48,
    },
    text2: {
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: width/18.75,
        fontSize: width/26.79,
        marginBottom: height/55.58,
    },

    titleWeek: {
        color: '#3e4164',
        flex: 1,
        textAlign: 'left',
        marginVertical: height/44.47,
        marginLeft: width/25,
        marginRight: width/15,
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18.75,
    },

    bar: {
        backgroundColor: '#fff',
        flex: 1,
        flexDirection:'row',
        paddingVertical: height/30,
        marginVertical: 0
    }

});


export default Browse;