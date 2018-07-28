import React, { Component } from 'react';
import { View, StyleSheet, Text,ScrollView, Image, ListView, Dimensions, TouchableWithoutFeedback, Platform} from 'react-native';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";
import Carousel from 'react-native-looped-carousel';

var {height, width} = Dimensions.get('window');

let topMargin = 0;
if(Platform.OS === 'ios'){
    topMargin = height/10.26
}

// Discover page, from Browse

class Discover extends Component{

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: height/30.79, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-Bold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: false,
            topBarShadowColor: 'transparent',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
            drawUnderNavBar: Platform.OS === 'ios',
            navBarTranslucent: Platform.OS === 'ios',
            navBarNoBorder: true,
        });


        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSourceFresh: dataSource.cloneWithRows([]),
            dataSourceSmall: dataSource.cloneWithRows([]),
            url: '',
            refreshing: false,
            size: {width: width, height: height/3}
        };

        let fresh = [];
        firebase.database().ref(`podcasts`).limitToLast(50).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                if(snap.val()){
                    if(snap.val().rss){
                        fresh.push(snap.val())
                    }
                }
            });
        });


        let small = [];
        firebase.database().ref(`podcasts`).limitToLast(500).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                if(snap.val()){
                    if(snap.val().rss){
                    }
                    else{
                        small.push(snap.val())
                    }
                }
            });
        });


        this.timeout1 = setTimeout(() => {this.setState({dataSourceFresh: dataSource.cloneWithRows(fresh.reverse()), dataSourceSmall: dataSource.cloneWithRows(small.reverse()), })}, 500);
        this.timeout2 = setTimeout(() => {this.setState({dataSourceFresh: dataSource.cloneWithRows(fresh.reverse()), dataSourceSmall: dataSource.cloneWithRows(small.reverse()), })}, 2000);
        this.timeout3 = setTimeout(() => {this.setState({dataSourceFresh: dataSource.cloneWithRows(fresh.reverse()), dataSourceSmall: dataSource.cloneWithRows(small.reverse()), })}, 5000);
    }


    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
    }


    renderRow = (rowData) => {
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
    };



    render() {
        return (
            <View style={styles.container}>

                <ScrollView>

                    <Text style = {styles.titleHeader}>Featured Providers</Text>

                    <Carousel
                        delay={5000}
                        style={this.state.size}
                        autoplay
                        chosenBulletStyle={{backgroundColor: '#3e4164',}}
                        bulletStyle={{backgroundColor:   '#f5f4f9', borderWidth: 1.2, borderColor: '#3e4164',}}
                        onAnimateNextPage={(p) => console.log(p)}
                    >

                        {/* Gimlet */}
                        <View style={[this.state.size]}>
                            <TouchableWithoutFeedback style={{borderRadius: 12, marginHorizontal: width/25}} onPress={() => {
                                const {navigator} = this.props;
                                let title = 'Gimlet Media';
                                navigator.push({
                                    screen: 'Media',
                                    title: "Gimlet Media",
                                    passProps: {title, navigator},
                                })
                            }}>
                                <View style = {{ backgroundColor: 'transparent', width: width/1.15, height: width/1.97, marginLeft: width/25, alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 2, borderRadius: 8}}>
                                    <Image
                                        style={{width: width/1.15, height: width/1.97, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/podArtGimlet.png')}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        {/* NPR */}
                        <View style={[this.state.size]}>
                            <TouchableWithoutFeedback style={{borderRadius: 12, marginHorizontal: width/25}} onPress={() => {
                                const {navigator} = this.props;
                                let title = 'NPR';
                                navigator.push({
                                    screen: 'Media',
                                    title: "NPR",
                                    passProps: {title, navigator},
                                })
                            }}>
                                <View style = {{ backgroundColor: 'transparent', width: width/1.15, height: width/1.97, marginLeft: width/25, alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 2, borderRadius: 8}}>
                                    <Image
                                        style={{width: width/1.15, height: width/1.97, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/podArtNPR.png')}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                        {/* Crooked */}
                        <View style={[this.state.size]}>
                            <TouchableWithoutFeedback style={{borderRadius: 12, marginHorizontal: width/25}} onPress={() => {
                                const {navigator} = this.props;
                                let title = 'Crooked';
                                navigator.push({
                                    screen: 'Media',
                                    title: "Crooked",
                                    passProps: {title, navigator},
                                })
                            }}>
                                <View style = {{ backgroundColor: 'transparent', width: width/1.15, height: width/1.97, marginLeft: width/25, alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 2, borderRadius: 8}}>
                                    <Image
                                        style={{width: width/1.15, height: width/1.97, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/CrookedMedia.png')}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>



                        {/* Midroll */}
                        <View style={[this.state.size]}>
                            <TouchableWithoutFeedback style={{borderRadius: 12, marginHorizontal: width/25}} onPress={() => {
                                const {navigator} = this.props;
                                let title = 'Midroll';
                                navigator.push({
                                    screen: 'Media',
                                    title: "Midroll",
                                    passProps: {title, navigator},
                                })
                            }}>
                                <View style = {{ backgroundColor: 'transparent', width: width/1.15, height: width/1.97, marginLeft: width/25, alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 2, borderRadius: 8}}>
                                    <Image
                                        style={{width: width/1.15, height: width/1.97, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/MidrollMedia.png')}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>



                        {/* Wondery */}
                        <View style={[this.state.size]}>
                            <TouchableWithoutFeedback style={{borderRadius: 12, marginHorizontal: width/25}} onPress={() => {
                                const {navigator} = this.props;
                                let title = 'Wondery';
                                navigator.push({
                                    screen: 'Media',
                                    title: "Wondery",
                                    passProps: {title, navigator},
                                })
                            }}>
                                <View style = {{backgroundColor: 'transparent', width: width/1.15, height: width/1.97, marginLeft: width/25, alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 2, borderRadius: 8}}>
                                    <Image
                                        style={{width: width/1.15, height: width/1.97, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/WonderyMedia.png')}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>



                        {/* Tess Media */}
                        <View style={[this.state.size]}>
                            <TouchableWithoutFeedback style={{borderRadius: 12, marginHorizontal: width/25}} onPress={() => {
                                const {navigator} = this.props;
                                let title = 'Tess Media';
                                navigator.push({
                                    screen: 'Media',
                                    title: "Tess Media",
                                    passProps: {title, navigator},
                                })
                            }}>
                                <View style = {{ backgroundColor: 'transparent', width: width/1.15, height: width/1.97, marginLeft: width/25, alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 2, borderRadius: 8}}>
                                    <Image
                                        style={{width: width/1.15, height: width/1.97, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/TessMedia.png')}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>

                    </Carousel>

                    <Text style = {styles.titleHeader}>Fresh & New</Text>
                    <View style={{marginBottom: 20}}>
                        <ListView
                            enableEmptySections
                            horizontal={true}
                            dataSource={this.state.dataSourceFresh}
                            renderRow={this.renderRow}
                        />
                    </View>

                    <Text style = {styles.titleHeader}>Created on Tess</Text>
                    <View style={{marginBottom: height/33.35}}>
                        <ListView
                            enableEmptySections
                            horizontal={true}
                            dataSource={this.state.dataSourceSmall}
                            renderRow={this.renderRow}
                        />
                    </View>

                    <View style={{paddingBottom: height/11.12}} />

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
        paddingTop: topMargin,
    },

    title: {
        flex: 1,
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/18.75,
    },

    titleHeader: {
        flex: 1,
        color: '#3e4164',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18.75,
        marginTop: height/44.47,
        marginBottom: height/66.7,
        marginLeft: width/25,
    },

    wrapper: {
    },

    slide: {
        backgroundColor: 'blue'

    },


});


export default Discover;