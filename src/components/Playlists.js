import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, ListView, Platform, Dimensions, RefreshControl} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Icon from 'react-native-vector-icons/FontAwesome';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemPlaylist from "./ListItemPlaylist";

var {height, width} = Dimensions.get('window');

let topMargin = 0;
if(Platform.OS === 'ios'){
    topMargin = height/10.26
}



// playlist page (on library tab)

class Playlists extends Component{

    componentWillMount = () => {

        Variables.state.playlists = [];
        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/playlist`).on("value", function (snapshot) {

            snapshot.forEach(function (data) {
                if(data.val()){
                    Variables.state.playlists.push(data.val());
                }

            })

        })

    };


    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }


    constructor(props){
        super(props);

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state={
            newPlaylist: '',
            playlists: dataSource.cloneWithRows(Variables.state.playlists),
            refreshing: false
        };

        this.props.navigator.setStyle({
                   statusBarHidden: false,
                   statusBarTextColorScheme: 'light',
                   navBarHidden: false,
                   navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
                   navBarTextFontSize: 18, // change the font size of the title
                   navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
                   drawUnderTabBar: false,
                   navBarHideOnScroll: false,
                   navBarBackgroundColor: '#fff',
                   topBarElevationShadowEnabled: false,
                   statusBarColor: '#fff',
                   drawUnderNavBar: Platform.OS === 'ios',
                   navBarTranslucent: Platform.OS === 'ios',
                   navBarNoBorder: true,

        });

        this.timeout1 = setTimeout(() => {this.setState({playlists: dataSource.cloneWithRows(Variables.state.playlists)})},1000);
        this.timeout2 = setTimeout(() => {this.setState({playlists: dataSource.cloneWithRows(Variables.state.playlists)})},2500);

    };


    _onRefresh = () => {
        this.setState({refreshing: true});

        Variables.state.playlists = [];
        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/playlist`).on("value", function (snapshot) {

            snapshot.forEach(function (data) {
                if(data.val()){
                    Variables.state.playlists.push(data.val());
                }

            })

        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.timeout2 = setTimeout(() => {this.setState({playlists: dataSource.cloneWithRows(Variables.state.playlists), refreshing: false})},3000);
    };


    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };


    createNewPlaylist = () => {
        const title = this.state.newPlaylist;

        if(title != ""){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/playlist/${title}`).update({title})
        }

        this.setState({newPlaylist: ''})

    };


    renderPlaylist(data){
        return <ListItemPlaylist data={data} navigator={this.props.navigator}  />;
    }


    render() {
        return (
            <View
                style={styles.container}>


                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />}
                >


                    <View style={styles.inputContainer}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{alignItems:'flex-start', flex: 6,}}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'New Playlist'}
                                    placeholderTextColor= '#506dcf'
                                    autoCapitalize={'sentences'}
                                    autoCorrect={false}
                                    returnKeyType='done'
                                    underlineColorAndroid = 'transparent'
                                    keyboardType="default"
                                    value={this.state.newPlaylist}
                                    onChangeText={text => {this.setState({newPlaylist: text})}}
                                />
                            </View>
                            <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}} onPress={this.createNewPlaylist}>
                                <Icon style={{
                                    textAlign: 'center',
                                    marginTop: height/37.06,
                                    fontSize: width/17.05,
                                    color: '#506dcf',
                                }} name="plus-circle">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        enableEmptySections
                        dataSource={this.state.playlists}
                        renderRow={(data) => this.renderPlaylist(data)}
                    />

                    <View style={{paddingBottom: height/4.45}}/>


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
        marginTop: topMargin
    },

    input: {
        height: height/16.68,
        width: width/1.5,
        
        marginTop: height/66.7,
        marginBottom: height/133.4,
        color: '#506dcf',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        paddingHorizontal: width/37.5,
        marginLeft: width/37.5
    },
    inputContainer: {
        backgroundColor:"#fff",
        marginVertical: width/75,
        paddingBottom: height/66.7,
        paddingHorizontal: width/37.5,
    },

});

export default Playlists;
