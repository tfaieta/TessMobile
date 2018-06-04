import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ListView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';



// 2nd tab, discover (browse) page

class Discover extends Component{

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
            dataSource: dataSource.cloneWithRows(Variables.state.selectedByTess),
            url: '',
            refreshing: false,
        };


        let podOfTheWeek = [];
        let podUsername = '';
        firebase.database().ref(`podcastOfTheWeek/`).once("value", function (snapshot) {
            if(snapshot.val()){
                firebase.database().ref(`users/${snapshot.val()}/username`).once("value", function (name) {
                    if(name.val().username){
                        podUsername = name.val().username;
                    }
                });
                firebase.database().ref(`users/${snapshot.val()}/podcasts`).limitToLast(10).once("value", function (snap) {
                    snap.forEach(function (data) {
                        firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (podcast) {
                            if(podcast.val()){
                                podOfTheWeek.push(podcast.val());
                            }
                        })
                    })
                })
            }
        });

        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(podOfTheWeek), podcastOfTheWeekTitle: podUsername,})},3000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(podOfTheWeek), podcastOfTheWeekTitle: podUsername,})},6000);
    }




    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }



    pressFitness =()=>{
        this.props.navigator.push({
            screen: 'Fitness',
            animated: true,
            animationType: 'fade',
        });
    };
    pressCurrEvents = () => {
        this.props.navigator.push({
            screen: 'News',
            animated: true,
            animationType: 'fade',
        });
    };
    pressGaming =()=>{
        this.props.navigator.push({
            screen: 'Gaming',
            animated: true,
            animationType: 'fade',
        });
    };
    pressSports =()=>{
        this.props.navigator.push({
            screen: 'Sports',
            animated: true,
            animationType: 'fade',
        });
    };
    pressEntertainment =()=>{
        this.props.navigator.push({
            screen: 'Entertainment',
            animated: true,
            animationType: 'fade',
        });
    };
    pressSci =()=>{
        this.props.navigator.push({
            screen: 'ScienceNature',
            animated: true,
            animationType: 'fade',
        });
    };
    pressTravel =()=>{
        this.props.navigator.push({
            screen: 'Travel',
            animated: true,
            animationType: 'fade',
        });
    };
    pressLearn =()=>{
        this.props.navigator.push({
            screen: 'LearnSomething',
            animated: true,
            animationType: 'fade',
        });
    };
    pressStory =()=>{
        this.props.navigator.push({
            screen: 'Storytelling',
            animated: true,
            animationType: 'fade',
        });
    };
    pressComedy =()=>{
        this.props.navigator.push({
            screen: 'Comedy',
            animated: true,
            animationType: 'fade',
        });
    };
    pressLife =()=>{
        this.props.navigator.push({
            screen: 'Lifestyle',
            animated: true,
            animationType: 'fade',
        });
    };
    pressSociety =()=>{
        this.props.navigator.push({
            screen: 'SocietyCulture',
            animated: true,
            animationType: 'fade',
        });
    };
    pressTech =()=>{
        this.props.navigator.push({
            screen: 'Tech',
            animated: true,
            animationType: 'fade',
        });
    };

    pressMusic =()=>{
        this.props.navigator.push({
            screen: 'Music',
            animated: true,
            animationType: 'fade',
        });
    };

    pressReligionSpirit =()=>{
        this.props.navigator.push({
            screen: 'ReligionSpirituality',
            animated: true,
            animationType: 'fade',
        });
    };

    pressNew = () =>{
        this.props.navigator.push({
            screen: 'NewPodcasts',
            title: 'New'
        });
    };

    pressTrending = () =>{
        this.props.navigator.push({
            screen: 'TopCharts',
            title: 'Trending'
        });
    };


    _selectedByTess(length){
        if (length > 0){
            return(
                <View style={{paddingBottom: 20}}>
                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        enableEmptySections
                        dataSource={this.state.dataSourceSel}
                        renderRow={this.renderRowNewPodcasts}
                    />
                </View>
            )
        }
        else{
            return(
                <Text style = {styles.title3}> </Text>
            )
        }
    }


    renderRow = (rowData) => {
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
    };



    render() {
        return (
            <View style={styles.container}>

                <ScrollView>

                    <Text style = {styles.titleHeader}>Featured</Text>
                    <Swiper style={styles.wrapper}>
                        <View style={styles.slide}>
                            <Text style={styles.text1}>The Best Ideas Podcast</Text>
                            <Text style={styles.text2}>by Tess Media</Text>
                        </View>
                        <View style={styles.slide}>
                            <Text style={styles.text1}>IDK Podcast</Text>
                            <Text style={styles.text2}>by Tess Media</Text>
                        </View>
                        <View style={styles.slide}>
                            <Text style={styles.text1}>Green Light Sports</Text>
                            <Text style={styles.text2}>by Tess Media</Text>
                        </View>
                    </Swiper>


                    <TouchableOpacity style={{flex:1, backgroundColor: '#fff', flexDirection:'row', paddingVertical: 18, marginVertical: 1}} onPress={this.GoToHighlights}>
                        <Text style = {styles.title}>   Discover</Text>
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

                    <TouchableOpacity style={{flex:1, backgroundColor: '#fff', flexDirection:'row', paddingVertical: 18, marginVertical: 1}} onPress={this.GoToHighlights}>
                        <Text style = {styles.title}>   Charts</Text>
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

                    <TouchableOpacity style={{flex:1, backgroundColor: '#fff', flexDirection:'row', paddingVertical: 18, marginVertical: 1}} onPress={this.GoToHighlights}>
                        <Text style = {styles.title}>   Categories</Text>
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


                    <Text style = {styles.titleHeader}>Podcast of the Week</Text>

                    <View style={{flex:1, flexDirection: 'row', backgroundColor: '#fff', marginTop: 10, marginHorizontal: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <View style={{flex:6}}>
                            <Text style = {styles.titleWeek}>{this.state.podcastOfTheWeekTitle}</Text>
                        </View>

                        <View style={{flex:1, alignSelf: 'flex-start'}}>
                        </View>

                    </View>

                    <View style={{backgroundColor: '#fff', marginHorizontal: 15, marginBottom: 20, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                        <ListView
                            horizontal={true}
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
        backgroundColor: '#f5f4f9',
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

    titleHeader: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        marginTop: 25,
        marginBottom: 5,
        marginLeft: 10,
        backgroundColor: 'transparent',
    },

    wrapper: {
    },

    slide: {
        backgroundColor: 'blue'

    },

    text1: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 10,
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    text2: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 10,
        fontSize: 14,
        backgroundColor: 'transparent',
    },

    titleWeek: {
        color: '#3e4164',
        flex:1,
        textAlign: 'left',
        marginVertical: 15,
        marginLeft: 15,
        marginRight: 5,
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 24,
        backgroundColor: 'transparent',
    },

});


export default Discover;