import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableOpacity, Image, Dimensions, } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');




// A single highlight on a list

class ListItemHighlight extends Component {

    constructor(props) {
        super(props);

        const {endTime} = this.props.highlight;
        const {startTime} = this.props.highlight;
        this.state = {
            profileImage: '',
            username: '',
            endTime: endTime,
            startTime: startTime,
            totalTime: endTime-startTime,
        };

        const {podcastID} = this.props.highlight;
        let rss = false;
        let podcastArtist = '';

        firebase.database().ref(`podcasts/${podcastID}`).once("value", function (snapshot) {

            if(snapshot.val()){
                if(snapshot.val().rss == true){
                    rss = true;
                }
                if(snapshot.val().podcastArtist){
                    podcastArtist = snapshot.val().podcastArtist;
                }
            }

        });

        setTimeout(() => {

            let profileName = 'loading';
            firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").once("value", function (snap) {
                if (snap.val()) {
                    profileName = snap.val().username;
                }
            });

            setTimeout(() => {
                this.setState({username: profileName});
            }, 300);

            setTimeout(() => {
                this.setState({username: profileName});
            }, 1000);


            let profileImage = '';
            if(rss){
                firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        profileImage = snapshot.val().profileImage
                    }
                });
                this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1200);
                this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage})},3400);

            }
            else{
                const storageRef = firebase.storage().ref(`/users/${podcastArtist}/image-profile-uploaded`);
                storageRef.getDownloadURL()
                    .then(function(url) {
                        profileImage = url;
                    }).catch(function(error) {
                    //
                });
                this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1200);
                this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage})},3400);

            }


        }, 1200);




    }


    componentWillUpdate() {
        LayoutAnimation.spring();
    }


    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginLeft: 10, alignSelf: 'center', height: 50, width: 50, borderRadius: 4, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)'}}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 35,
                        marginTop: 8,
                        color: 'white',
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginLeft: 10, height: 50, width: 50}}>
                    <Image
                        style={{width: 50, height: 50, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 4, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }



    render() {

        const {title} = this.props.highlight;

        return (

            <TouchableOpacity>
                <View style={styles.container}>

                    {this._renderProfileImage()}

                    <View style={styles.leftContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.artistTitle}>{this.state.username}</Text>
                    </View>


                    <View style={styles.rightContainer}>
                        <Icon style={{
                            textAlign: 'left',
                            marginLeft: 0,
                            marginRight: height/44.47,
                            fontSize: height/40,
                            color: '#3e4164',
                        }} name="md-time">
                            <Text style = {styles.time}> {(this.state.totalTime/60).toFixed(0)}:{(this.state.totalTime%60).toFixed(0)}</Text>
                        </Icon>
                    </View>


                </View>
            </TouchableOpacity>

        );



    }


}

const styles = {
    title: {
        color: '#3e4164',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginHorizontal: 20,

    },
    time: {
        color: '#3e416480',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/40,
        backgroundColor: 'transparent',
        marginHorizontal: 20,

    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginLeft: 20,
    },
    container: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginVertical: 1,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginHorizontal: -100,
    },
};




export default ListItemHighlight;