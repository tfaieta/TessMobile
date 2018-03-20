import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet,StatusBar, Text, TouchableOpacity, ScrollView, Image, ListView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";



// 2nd tab, discover page

class Discover extends Component{


    componentWillMount(){
        Variables.state.selectedByTess = [];

        //TheMaddyIce
        firebase.database().ref(`users/upwadf76CrOBee8aSwzcCZR4kM33/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Two Bros and a Pod
        firebase.database().ref(`users/JHPYRdcWtOheHCkrddZjJaLXtPg2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Big Tay
        firebase.database().ref(`users/1F1q9gRKWyMQ8cSATXqGT4PnCaK2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Tim Dulak
        firebase.database().ref(`users/3tHL3dIcINUdMeKZn6ckf81e2Sk2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Joey Bradfield
        firebase.database().ref(`users/gdGuN9v14qU9pSHXSk1KbDGlUsu1/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Dom Gold
        firebase.database().ref(`users/6px5go2E3USvYvkcNQejkLkJx3H3/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Eat the fruit
        firebase.database().ref(`users/7ubx6NftyyQbAwufE7BquuSJ6gJ3/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Abbey
        firebase.database().ref(`users/P2HAtFE3YKXe8uP9Mu1HyCE2cD83/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //ShakDaddy
        firebase.database().ref(`users/u1osicyhjcR5j3EHx6m1SMe2LpJ3/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Nick Ruspantini
        firebase.database().ref(`users/pgIx9JAiq9aQWcyUZX8AuIdqNmP2/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });


        //Tony
        firebase.database().ref(`users/sJsB8XK4XRZ8tNpeGC14JNsa6Jj1/podcasts`).limitToLast(1).once("value", function (data) {
            data.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.key}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        Variables.state.selectedByTess.push(snapshot.val())
                    }
                })
            })
        });
    }

    static state = { search: ''};

    searchActivate = () => {
        Variables.state.searchWord = this.state.search;
        this.props.navigator.push({
            screen: 'Search',
            animated: true,
            animationType: 'fade',
        });
    };

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
            navBarHideOnScroll: true,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess),
            url: '',
            refreshing: false,
        };
        this.timeout1 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},3000);
        this.timeout2 = setTimeout(() => {this.setState({dataSourceSel: dataSource.cloneWithRows(Variables.state.selectedByTess)})},6000);
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
                <View style={{paddingBottom: 70}}>
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
                <Text style = {styles.title3}>We are looking for content to select...</Text>
            )
        }
    }


    renderRowNewPodcasts(podcast) {
        return <ListItemUsers podcast={podcast} />;
    }



    render() {
        return (
            <View style={styles.container}>


                <StatusBar
                    barStyle="dark-content"
                />

                <ScrollView >

                    <View style={{flexDirection: 'row', marginTop: 20}}>
                        <TouchableOpacity style={{flex:1, marginHorizontal: 20, padding: 10, borderBottomColor: '#3e416430', borderBottomWidth: 3}} onPress={this.pressTrending}>
                            <Text style={styles.title}>Trending</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1, marginHorizontal: 20, padding: 10, borderBottomColor: '#3e416430', borderBottomWidth: 3}} onPress={this.pressNew}>
                            <Text style={styles.title}>New</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.titleHeader}>Categories</Text>
                    <View style={{flex:1}}>
                        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{flex: 1}} >
                            <TouchableOpacity style={{flex: 1, marginHorizontal: 10}} onPress={this.pressCurrEvents}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/currEvents-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>News</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressFitness}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/fitness-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Fitness</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressSociety}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/politics-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Society & Culture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressReligionSpirit}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/religionSpirit-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Religion & Spirituality</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressComedy}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/comedy-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Comedy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressLife}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/lifestyle-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Lifestyle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressSci}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/scienceNature-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Science & Nature</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressTravel}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/travel-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Travel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressLearn}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/learnSomething-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Learn Something</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressStory}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/storytelling-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Storytelling</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressSports}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/sports-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Sports</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressEntertainment}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/entertainment-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Entertainment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressMusic}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/music-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Music</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressTech}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/tech-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Tech</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressGaming}>
                                <Image
                                    style={{ width: 120, height: 120, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/gaming-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'Montserrat-Regular', alignSelf:'center', fontSize: 12}}>Gaming</Text>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>

                    <Text style={styles.titleHeader}>Discover</Text>
                    {this._selectedByTess(Variables.state.selectedByTess.length)}



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

    title: {
        flex:1,
        color: '#000',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        backgroundColor: 'transparent',
    },

    titleHeader: {
        flex:1,
        color: '#000',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        backgroundColor: 'transparent',
        marginTop: 30,
        marginVertical: 10,
    },

});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps) (Discover);