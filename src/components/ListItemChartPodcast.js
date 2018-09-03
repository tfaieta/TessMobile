/*
 One podcast component that has a title, a number to the left, and a podcast logo
 on the right side of it. Made to render a list of podcasts and it's used in TopCharts.js
 */

import React, { Component } from 'react';
import { Text, View, Image, Dimensions, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Variables from "./Variables";
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');

class ListItemChartPodcast extends Component {

    componentWillMount(){
        const podcastArtist = this.props.podcast;
        let profileImage = '';
        let rss = false;


        firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
            if(snapshot.val()){
                profileImage = snapshot.val().profileImage;
                rss = true;
            }
            else{
                const storageRef = firebase.storage().ref(`/users/${podcastArtist}/image-profile-uploaded`);
                storageRef.getDownloadURL()
                    .then(function(url) {
                        profileImage = url;
                    }).catch(function(error) {
                    //
                });
            }
        });
        this.timeout = setTimeout(() => {this.setState({profileImage: profileImage, rss: rss})},1400);
        this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage, rss: rss})},3400);

    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
    }


    constructor(state) {
        super(state);
        this.state ={
            profileName: '',
            profileImage: '',
            rss: false,
        };


        const podcastArtist = this.props.podcast;

        let profileName = '';
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").once("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }

        });

        setTimeout(() =>{
            this.setState({profileName: profileName})
        },1400);


    }



    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', height: width/4.17, width: width/4.17, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)'}}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: width/6.25,
                        marginTop: height/66.7,
                        color: 'white',
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', height: width/4.17, width: width/4.17,}}>
                    <Image
                        style={{height: width/4.17, width: width/4.17, position: 'absolute', alignSelf: 'center', opacity: 1,}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }

    render() {

        const podcastArtist = this.props.podcast;

        return (

            <TouchableHighlight underlayColor='#f5f4f9' onPress={ () =>{
                const {navigator} = this.props;
                Variables.state.browsingArtist = podcastArtist;
                const {rss} = this.state;
                this.props.navigator.push({
                    screen: "UserProfile",
                    title: this.state.profileName,
                    passProps: {navigator, rss},
                });
            }}>
                <View>
                <View style={styles.container}>

                    <View style={styles.leftContainer}>
                        <Text style={styles.titleNum}>{this.props.index}</Text>
                    </View>

                    <View style={styles.middleContainer}>
                        <Text style={styles.title}>{this.state.profileName}</Text>
                    </View>

                    <View style={styles.rightContainer}>
                        {this._renderProfileImage()}
                    </View>

                </View>
                    <View style={{backgroundColor: '#00000030', paddingBottom: 1}}/>
                </View>
            </TouchableHighlight>
        )

    }

}

const styles = {
    title: {
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/20.75,
        
        marginHorizontal: width/18.75,
        marginTop: height/133.4,

    },
    titleNum: {
        color: '#8C8C8C',
        marginTop: height/133.4,
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontSize: width/18.75,
        
        marginLeft: width/25,

    },
    container: {
        backgroundColor: '#f5f4f9',
        opacity: 1,
        flexDirection: 'row',
    },
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1.8,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 6,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
};




export default ListItemChartPodcast;
