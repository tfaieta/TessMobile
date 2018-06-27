import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ListView, RefreshControl} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";



// 4th tab, library page

class Library extends Component{


    componentWillMount(){
        const {currentUser} = firebase.auth();

        firebase.database().ref(`users/${currentUser.uid}/tracking`).once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                firebase.database().ref(`users/${data.key}/podcasts`).once("value", function (ep) {
                    ep.forEach(function (episode) {
                        if(episode.val().id > data.val().lastEpisode){
                            const id = episode.val().id;
                            console.warn("added " + episode.val().id + " to tracking");
                            firebase.database().ref(`users/${currentUser.uid}/tracking/${data.key}/episodes/${id}`).update({id});
                            firebase.database().ref(`users/${currentUser.uid}/tracking/${data.key}`).update({lastEpisode: id});
                        }
                    })
                });
            })
        });


        firebase.database().ref(`users/${currentUser.uid}/queue`).on("value", function (snapshot) {
            Variables.state.myQueue = [];
            snapshot.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.val().id}`).on("value", function (data) {
                    if(data.val()){
                        Variables.state.myQueue.push(data.val())
                    }

                })
            });
        });


        firebase.database().ref(`users/${currentUser.uid}/tracking`).on("value", function (snapshot) {
            Variables.state.catchUp = [];
            snapshot.forEach(function (snap) {
                firebase.database().ref(`users/${currentUser.uid}/tracking/${snap.val().podcastArtist}/episodes`).on("value", function (snapAgain) {
                    snapAgain.forEach(function (episode) {
                        firebase.database().ref(`podcasts/${episode.val().id}`).on("value", function (snapOnceMore) {
                            Variables.state.catchUp.push(snapOnceMore.val())
                        })
                    })
                })
            })
        })


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
            dataSource: dataSource.cloneWithRows(Variables.state.myQueue),
            dataCatchUp: dataSource.cloneWithRows(Variables.state.catchUp),
            refreshing: false,
        };

        this.timeout = setTimeout(() => {
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.myQueue), dataCatchUp: dataSource.cloneWithRows(Variables.state.catchUp)})
        },1500);

    };


    _onRefresh = () => {
        this.setState({refreshing: true});
        const {currentUser} = firebase.auth();


        firebase.database().ref(`users/${currentUser.uid}/queue`).on("value", function (snapshot) {
            Variables.state.myQueue = [];
            snapshot.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.val().id}`).on("value", function (data) {
                    if(data.val()){
                        Variables.state.myQueue.push(data.val())
                    }

                })
            });
        });


        firebase.database().ref(`users/${currentUser.uid}/tracking`).once("value", function (snapshot) {
            Variables.state.catchUp = [];
            snapshot.forEach(function (snap) {
                firebase.database().ref(`users/${currentUser.uid}/tracking/${snap.val().podcastArtist}/episodes`).once("value", function (snapAgain) {
                    snapAgain.forEach(function (episode) {
                        firebase.database().ref(`podcasts/${episode.val().id}`).once("value", function (snapOnceMore) {
                            Variables.state.catchUp.push(snapOnceMore.val())
                        })
                    })
                })
            })
        });


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.timeout = setTimeout(() => {
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.myQueue), dataCatchUp: dataSource.cloneWithRows(Variables.state.catchUp), refreshing: false})
        },1500);

    };


    renderRow = (rowData) => {
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
    };

    GoToRecentlyPlayed = () => {
        this.props.navigator.push({
            screen: 'RecentlyPlayed',
            title: 'History',
        });
    };

    GoToPlaylists = () => {
        this.props.navigator.push({
            screen: 'Playlists',
            title: 'Playlists',
        });
    };

    GoToFavs = () => {
        this.props.navigator.push({
            screen: 'Favorites',
            title: 'Favorites'
        });
    };

    GoToFollowedContent = () => {
        this.props.navigator.push({
            screen: 'Followed',
            title: 'Podcasts'
        });
    };

    GoToHighlights = () => {
        this.props.navigator.push({
            screen: 'Highlights',
            title: 'Highlights'
        });
    };



    renderCatchUp = (data) => {
        if(data.length == 1){
            return(
                <Text style = {styles.titleTop}>{data.length} New Episode</Text>
            )
        }
        else if (data.length > 1){
            return(
                <Text style = {styles.titleTop}>{data.length} New Episodes</Text>
            )
        }
        else{
            return(
                <Text style = {styles.titleTop}>All Caught Up!</Text>
            )
        }
    };


    renderUpNext = (data) => {
        if(data.length > 0){
            return(
                <ListView
                    horizontal={true}
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            )
        }
        else{
            return(
                <View style={{paddingBottom: 20}}>
                <Icon style={{
                    fontSize: 25,
                    backgroundColor: 'transparent',
                    color: '#3e4164',
                    textAlign: 'center',
                    marginHorizontal: 15,
                }} name="md-sad">
                    <Text style = {styles.titleUpNext}>  Queue is empty...</Text>
                </Icon>
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

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />}
                >



                    <TouchableOpacity style = {{backgroundColor: '#3e4164', borderTopLeftRadius: 7, borderTopRightRadius: 7, marginTop: 15, marginHorizontal: 10,  shadowColor: 'black', shadowRadius: 4, shadowOpacity: 0.4  }} onPress={() => {
                        this.props.navigator.showModal({
                            screen: 'CatchUp',
                        });
                    }}>
                        {this.renderCatchUp(Variables.state.catchUp)}
                    </TouchableOpacity>


                    <TouchableOpacity style={{flex:1, backgroundColor: '#fff', flexDirection:'row', paddingVertical: 15, marginVertical: 1}} onPress={this.GoToFollowedContent} >
                        <Text style = {styles.title}>   Podcasts</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#3e416460',
                                marginHorizontal: 15,
                            }} name="ios-arrow-forward">
                            </Icon>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flex:1, backgroundColor: '#fff', flexDirection:'row', paddingVertical: 15, marginVertical: 1}} onPress={this.GoToPlaylists}>
                        <Text style = {styles.title}>   Playlists</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#3e416460',
                                marginHorizontal: 15,
                            }} name="ios-arrow-forward">
                            </Icon>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flex:1, backgroundColor: '#fff', flexDirection:'row', paddingVertical: 15, marginVertical: 1}} onPress={this.GoToFavs} >
                        <Text style = {styles.title}>   Favorites</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#3e416460',
                                marginHorizontal: 15,
                            }} name="ios-arrow-forward">
                            </Icon>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flex:1, backgroundColor: '#fff', flexDirection:'row', paddingVertical: 15, marginVertical: 1}} onPress={this.GoToHighlights}>
                        <Text style = {styles.title}>   Highlights</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#3e416460',
                                marginHorizontal: 15,
                            }} name="ios-arrow-forward">
                            </Icon>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flex:1, backgroundColor: '#fff', flexDirection:'row', paddingVertical: 15, marginVertical: 1}} onPress={this.GoToRecentlyPlayed}>
                        <Text style = {styles.title}>   History</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#3e416460',
                                marginHorizontal: 15,
                            }} name="ios-arrow-forward">
                            </Icon>
                        </View>
                    </TouchableOpacity>



                    <View style={{flex:1, flexDirection: 'row', backgroundColor: '#fff', marginTop: 10, marginHorizontal: 10, borderTopLeftRadius: 7, borderTopRightRadius: 7}}>
                        <View style={{flex:1}}>
                            <Text style = {styles.titleNext}>Up Next</Text>
                        </View>
                        <TouchableOpacity style={{flex:1, alignSelf: 'flex-end'}} onPress={() => {
                            this.props.navigator.showModal({
                                screen: 'MyQueue',
                            });
                        }}>
                            <Text style = {styles.titleEdit}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{backgroundColor: '#fff', marginHorizontal: 10, marginBottom: 10, borderBottomLeftRadius: 7, borderBottomRightRadius: 7}}>
                        {this.renderUpNext(Variables.state.myQueue)}
                    </View>


                    <View style={{paddingBottom: 60}}/>
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
    container2:{
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    title: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        backgroundColor: 'transparent',
    },

    titleNext: {
        color: '#3e4164',
        flex:1,
        textAlign: 'left',
        marginVertical: 10,
        marginTop: 10,
        marginHorizontal: 15,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        backgroundColor: 'transparent',
    },

    titleEdit: {
        color: '#3e4164',
        flex:1,
        textAlign: 'right',
        marginVertical: 10,
        marginHorizontal: 10,
        marginTop: 16,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        backgroundColor: 'transparent',
    },

    titleTop: {
        color: '#fff',
        flex:1,
        textAlign: 'center',
        marginVertical: 25,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

    titleUpNext: {
        color: '#3e4164',
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        backgroundColor: 'transparent',
    },



});

export default Library;