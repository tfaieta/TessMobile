import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Variables from "./Variables";
import { Navigation } from 'react-native-navigation';


// A single user item on a following or followed list

class ListItemFollowed extends Component {

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
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginBottom:10, marginLeft: 10, alignSelf: 'center', height: 50, width: 50, borderRadius:4, borderWidth:5, borderColor:'rgba(320,320,320,0.8)',  }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 35,
                        color: 'white',
                        marginTop: 2
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginBottom:10, marginLeft: 10, height: 50, width: 50, }}>
                    <Image
                        style={{width: 50, height: 50, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 4, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }






    render() {

        const podcastArtist = this.props.podcast;

        return (

            <TouchableOpacity underlayColor='#5757FF' onPress={ () =>{
            const {navigator} = this.props;
                Variables.state.browsingArtist = podcastArtist;
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
                        <Text style={styles.title}>{this.state.profileName}</Text>
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
        color: '#3e4164',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 15,
        marginLeft: 20,
        fontSize: 14,
        backgroundColor: 'transparent'
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
};




export default ListItemFollowed;