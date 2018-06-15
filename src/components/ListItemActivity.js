import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Variables from "./Variables";
import { Navigation } from 'react-native-navigation';


// A single list item on Activity.js

class ListItemFollowed extends Component {

    componentWillMount(){
        const {user} = this.props;
        let profileImage = '';
        let rss = false;

        firebase.database().ref(`users/${user}/profileImage`).once("value", function (snapshot) {
            if(snapshot.val()){
                profileImage = snapshot.val().profileImage;
                rss = true;
            }
            else{
                const storageRef = firebase.storage().ref(`/users/${user}/image-profile-uploaded`);
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
            title: ''
        };


        const {user} = this.props;

        let profileName = '';
        firebase.database().ref(`/users/${user}/username`).orderByChild("username").once("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }

        });

        const {action} = this.props;
        const {id} = this.props;
        let title = '';
        if(action == 'like' || action == 'comment'){
            firebase.database().ref(`podcasts/${id}`).once("value", function (snapshot) {
                if(snapshot.val().podcastTitle){
                    title = snapshot.val().podcastTitle;
                }
            })
        }
        else if(action == 'follow' || action == 'track'){
            firebase.database().ref(`users/${id}/username`).once("value", function (snapshot) {
                if(snapshot.val()){
                    title = snapshot.val().username;
                }
            })
        }


        setTimeout(() =>{
            this.setState({profileName: profileName, title: title})
        },1200);


    }



    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginBottom:10, marginLeft: 10, alignSelf: 'center', height: 40, width: 40, borderRadius:20, borderWidth:5, borderColor:'rgba(320,320,320,0.8)',  }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 25,
                        color: 'white',
                        marginTop: 2
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginBottom:10, marginLeft: 10, height: 40, width: 40, }}>
                    <Image
                        style={{width: 40, height: 40, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 20, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }



    renderMessage = () => {
        const {action} = this.props;
        if(this.state.title != '' || this.state.profileName != ''){
            if(action == 'like'){
                return(
                    <Text style={styles.title}><Text style={styles.titleBold}>{this.state.profileName}</Text> liked {this.state.title}</Text>
                )
            }
            else if(action == 'comment'){
                return(
                    <Text style={styles.title}><Text style={styles.titleBold}>{this.state.profileName}</Text> commented on {this.state.title}</Text>
                )
            }
            else if(action == 'follow'){
                return(
                    <Text style={styles.title}><Text style={styles.titleBold}>{this.state.profileName}</Text> followed {this.state.title}</Text>
                )

            }
            else if(action == 'track'){
                return(
                    <Text style={styles.title}><Text style={styles.titleBold}>{this.state.profileName}</Text> tracked {this.state.title}</Text>
                )
            }
        }

    };



    render() {

        const {user} = this.props;

        return (

            <TouchableOpacity underlayColor='#5757FF' onPress={ () =>{
                const {navigator} = this.props;
                Variables.state.browsingArtist = user;
                const {rss} = this.state;
                this.props.navigator.push({
                    screen: "UserProfile",
                    title: this.state.profileName,
                    passProps: {navigator, rss},
                });
            }}>
                <View style={styles.container}>


                    {this._renderProfileImage()}


                    <View style={styles.middleContainer}>
                        {this.renderMessage()}
                    </View>


                </View>
            </TouchableOpacity>
        )

    }

}

const styles = {
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
    title: {
        color: '#797979',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 20,
        marginRight: 10,
        fontSize: 14,
        backgroundColor: 'transparent'
    },
    titleBold: {
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        marginLeft: 20,
        marginRight: 10,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
};




export default ListItemFollowed;