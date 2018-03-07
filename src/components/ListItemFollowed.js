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
                    profileImage = snapshot.val().profileImage
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
            this.timeout = setTimeout(() => {this.setState({profileImage: profileImage, rss: rss})},1200);
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

        let profileName = 'loading';
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").once("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }

        });

        setTimeout(() =>{
            this.setState({profileName: profileName})
        },250);


    }



    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginBottom:10, marginLeft: 10, alignSelf: 'center', height: 70, width: 70, borderRadius:4, borderWidth:5, borderColor:'rgba(320,320,320,0.8)',  }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 45,
                        color: 'white',
                        marginTop: 10
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginBottom:10, marginLeft: 10, height: 70, width: 70, }}>
                    <Image
                        style={{width: 70, height: 70, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 4, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }






    render() {

        return (

            <TouchableOpacity underlayColor='#5757FF' onPress={ () =>{
                Variables.state.browsingArtist = podcastArtist;
                if(this.state.rss){
                    Variables.state.rss = true;
                }
                else{
                    Variables.state.rss = false;
                }
                Navigation.showModal({
                    screen: "UserProfile",
                    title: "Modal",
                    passProps: {},
                    navigatorStyle: {},
                    navigatorButtons: {},
                    animationType: 'slide-up'
                });
            }}>
                <View style={styles.container2}>


                    {this._renderProfileImage()}


                    <View style={styles.middleContainer}>
                        <Text style={styles.title2}>{this.state.profileName}</Text>
                    </View>


                </View>
            </TouchableOpacity>
        )

    }


}

const styles = {
    title: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        paddingLeft: 0,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        paddingLeft: 2,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    container: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },
    container2: {
        marginVertical: 5,
        backgroundColor: 'transparent',
        opacity: 1,
        flexDirection: 'row'
    },
    title2: {
        color: '#2A2A30',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        marginTop: 25,
        marginLeft: 20,
        fontSize: 16,
        backgroundColor: 'transparent'
    },
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 1,
        paddingLeft: 2,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        paddingRight: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
};




export default ListItemFollowed;