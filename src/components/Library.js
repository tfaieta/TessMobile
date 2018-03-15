import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, StatusBar, ListView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from "react-native-linear-gradient/index.android";
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemQueue from "./ListItemQueue";


class Library extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        statusBarTextColorScheme: 'light',
        navBarHidden: false,
        drawUnderTabBar: false,
        navBarCustomView: 'CustomNavbar',
        navBarCustomViewInitialProps: {navigator},
        navBarHideOnScroll: true,
        navBarBackgroundColor: '#fff',
        topBarElevationShadowEnabled: true,
        topBarShadowColor: '#000',
        topBarShadowOpacity: 1,
        topBarShadowOffset: 20,
        topBarShadowRadius: 10,
    };


    componentWillMount(){
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

    }


    componentWillUnmount(){
        clearInterval(this.interval);
    }


    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.myQueue),
        };

        this.interval = setInterval(() => {
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.myQueue)})
        },1000);

    };


    renderRow = (rowData) => {
        return <ListItemQueue podcast={rowData} navigator={this.props.navigator} />;
    };

    GoToRecentlyPlayed = () => {
        this.props.navigator.push({
            screen: 'RecentlyPlayed',
            animated: true,
            animationType: 'fade',
        });
    };

    GoToFavs = () => {
        this.props.navigator.push({
            screen: 'Favorites',
            animated: true,
            animationType: 'fade',
        });
    };

    GoToFollowedContent = () => {
        this.props.navigator.push({
            screen: 'Followed',
            animated: true,
            animationType: 'fade',
        });
    };

    GoToMyContent = () => {
        this.props.navigator.push({
            screen: 'MyContent',
            animated: true,
            animationType: 'fade',
        });
    };


    render() {
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />

                <ScrollView>



                    <TouchableOpacity>
                    <LinearGradient

                        colors={['#d15564', '#9a5e9a', '#506dcf' ]}
                        style={styles.container2}
                    >
                        <Text style = {styles.titleTop}>154 minutes to catch up</Text>
                    </LinearGradient>
                    </TouchableOpacity>



                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 12}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#797979',
                            marginHorizontal: 10,
                        }} name="history">
                        </Icon>
                        <Text style = {styles.title}>   History</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#797979',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 12}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#797979',
                            marginHorizontal: 10,
                        }} name="podcast">
                        </Icon>
                        <Text style = {styles.title}>   Podcasts</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#797979',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 12}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#797979',
                            marginHorizontal: 10,
                        }} name="list-ul">
                        </Icon>
                        <Text style = {styles.title}>   Playlists</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#797979',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 12}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#797979',
                            marginHorizontal: 10,
                        }} name="star">
                        </Icon>
                        <Text style = {styles.title}>   Highlights</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#797979',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 12}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#797979',
                            marginHorizontal: 10,
                        }} name="users">
                        </Icon>
                        <Text style = {styles.title}>   Creators</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#797979',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>



                    <View style={{flex:1, flexDirection: 'row'}}>
                        <View style={{flex:1}}>
                            <Text style = {styles.titleNext}>Up Next</Text>
                        </View>
                        <TouchableOpacity style={{flex:1, alignSelf: 'flex-end'}}>
                            <Text style = {styles.titleEdit}>Edit</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />
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
        backgroundColor: '#fff',
    },
    container2:{
        backgroundColor: 'transparent',
        marginBottom: 10,
    },
    title: {
        flex:1,
        color: '#000',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        backgroundColor: 'transparent',
    },

    titleNext: {
        color: '#000',
        flex:1,
        textAlign: 'left',
        marginVertical: 10,
        marginTop: 20,
        marginHorizontal: 10,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        backgroundColor: 'transparent',
    },

    titleEdit: {
        color: '#000',
        flex:1,
        textAlign: 'right',
        marginVertical: 10,
        marginHorizontal: 10,
        marginTop: 24,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
        backgroundColor: 'transparent',
    },

    titleTop: {
        color: '#fff',
        flex:1,
        textAlign: 'center',
        marginVertical: 20,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 25,
        backgroundColor: 'transparent',
    },



});

export default Library;