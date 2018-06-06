import React, { Component } from 'react';
import { View, StyleSheet, Text,ScrollView, Image, ListView, Dimensions} from 'react-native';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";
import Carousel from 'react-native-looped-carousel';

var {height, width} = Dimensions.get('window');



// Discover page, from Browse

class Discover extends Component{

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 22, // change the font size of the title
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
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarNoBorder: true

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
        firebase.database().ref(`podcasts`).limitToLast(150).once("value", function (snapshot) {
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


        this.timeout1 = setTimeout(() => {this.setState({dataSourceFresh: dataSource.cloneWithRows(fresh.reverse()), dataSourceSmall: dataSource.cloneWithRows(small.reverse()), })},1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSourceFresh: dataSource.cloneWithRows(fresh.reverse()), dataSourceSmall: dataSource.cloneWithRows(small.reverse()), })},4000);
    }



    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }


    renderRow = (rowData) => {
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
    };



    render() {
        return (
            <View style={styles.container}>

                <ScrollView>

                    <Text style = {styles.titleHeader}>Favorites</Text>
                    <Carousel
                        delay={5000}
                        style={this.state.size}
                        autoplay
                        chosenBulletStyle={{backgroundColor: '#3e4164',}}
                        bulletStyle={{backgroundColor:   '#f5f4f9', borderWidth: 1.2, borderColor: '#3e4164',}}
                        onAnimateNextPage={(p) => console.log(p)}
                    >
                        <View style={[{ backgroundColor: 'transparent' }, this.state.size]}>
                            <View style={{backgroundColor: 'transparent', borderRadius: 12, marginHorizontal: 15}}>
                                <View style = {{ backgroundColor: 'transparent', width: 325, height: 190, marginVertical: 0, alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 2, borderRadius: 8}}>
                                    <Image
                                        style={{width: 330, height: 190, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/podArtGimlet.png')}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[{ backgroundColor: 'transparent' }, this.state.size]}>
                            <View style={{backgroundColor: 'transparent', borderRadius: 12, marginHorizontal: 15}}>
                                <View style = {{ backgroundColor: 'transparent', width: 325, height: 190, marginVertical: 0, alignSelf: 'flex-start', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 2, borderRadius: 8}}>
                                    <Image
                                        style={{width: 330, height: 190, alignSelf: 'center', opacity: 1, borderRadius: 8,}}
                                        source={require('tess/src/images/podArtNPR.png')}
                                    />
                                </View>
                            </View>
                        </View>
                    </Carousel>



                    <Text style = {styles.titleHeader}>Fresh & New</Text>
                    <View style={{backgroundColor: 'transparent', marginBottom: 20,}}>
                        <ListView
                            horizontal={true}
                            enableEmptySections
                            dataSource={this.state.dataSourceFresh}
                            renderRow={this.renderRow}
                        />
                    </View>



                    <Text style = {styles.titleHeader}>Noteworthy Small Creators</Text>
                    <View style={{backgroundColor: 'transparent', marginBottom: 20,}}>
                        <ListView
                            horizontal={true}
                            enableEmptySections
                            dataSource={this.state.dataSourceSmall}
                            renderRow={this.renderRow}
                        />
                    </View>


                    <View style={{paddingBottom: 60}} />

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
        paddingTop: 60,
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
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginTop: 15,
        marginBottom: 10,
        marginLeft: 15,
        backgroundColor: 'transparent',
    },

    wrapper: {
    },

    slide: {
        backgroundColor: 'blue'

    },


});


export default Discover;