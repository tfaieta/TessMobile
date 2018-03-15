import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet,StatusBar, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import TopCharts from './DiscoverBar/TopCharts';
import NewPodcasts from './DiscoverBar/NewPodcasts';
import Categories from './DiscoverBar/Categories';
import Following from './DiscoverBar/Following';
import { SearchBar } from 'react-native-elements'
import {volume} from './Home';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import Variables from "./Variables";



class Discover extends Component{

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
        this.state = { volume }
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

    


    render() {
        return (
            <View style={styles.container}>


                <StatusBar
                    barStyle="dark-content"
                />

                <ScrollView >

                    <View style={{flexDirection: 'row', marginVertical: 20}}>
                        <TouchableOpacity style={{flex:1, marginHorizontal: 20, padding: 10, borderBottomColor: '#3e416430', borderBottomWidth: 3}}>
                            <Text style={styles.title}>Trending</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flex:1, marginHorizontal: 20, padding: 10, borderBottomColor: '#3e416430', borderBottomWidth: 3}}>
                            <Text style={styles.title}>New Releases</Text>
                        </TouchableOpacity>
                    </View>


                    <Text style={styles.titleHeader}>Categories</Text>
                    <View style={{flex:1}}>
                        <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} style={{flex: 1}} >
                            <TouchableOpacity style={{flex: 1, marginHorizontal: 10}} onPress={this.pressCurrEvents}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/currEvents-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>News</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressFitness}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/fitness-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Fitness</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressSociety}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/politics-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Society & Culture</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressReligionSpirit}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/religionSpirit-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Religion & Spirituality</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressComedy}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/comedy-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Comedy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressLife}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/lifestyle-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Lifestyle</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressSci}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/scienceNature-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Science & Nature</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressTravel}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/travel-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Travel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressLearn}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/learnSomething-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Learn Something</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressStory}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/storytelling-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Storytelling</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressSports}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/sports-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Sports</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressEntertainment}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/entertainment-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Entertainment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressMusic}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/music-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Music</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingHorizontal: 10}} onPress={this.pressTech}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/tech-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Tech</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingHorizontal: 10}} onPress={this.pressGaming}>
                                <Image
                                    style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                                    source={require('tess/src/images/gaming-cat.png')}
                                />
                                <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Gaming</Text>
                            </TouchableOpacity>

                        </ScrollView>
                    </View>

                    <Text style={styles.titleHeader}>Discover</Text>



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
        marginTop: 20,
        marginVertical: 20,
    },

});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps) (Discover);