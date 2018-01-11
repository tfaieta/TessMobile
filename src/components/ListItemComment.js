import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Variables from "./Variables";
import { Navigation } from 'react-native-navigation';


class ListItemComment extends Component {

    componentWillMount(){
        const {user} = this.props.rowData;

        let profileImage = '';
        const storageRef = firebase.storage().ref(`/users/${user}/image-profile-uploaded`);
        storageRef.getDownloadURL()
            .then(function(url) {
                profileImage = url;
            }).catch(function(error) {
            //
        });
        setTimeout(() => {this.setState({profileImage: profileImage})},1250);
    }

    constructor(state) {
        super(state);
        this.state ={
            profileName: '',
            profileImage: ''
        };
    }



    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginRight: 5, alignSelf: 'center', height: 30, width: 30, borderRadius: 10, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)', shadowOffset:{  width: 0,  height: 2}, shadowOpacity: 0.5, shadowRadius: 2}}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 18,
                        marginTop: 6,
                        color: 'white',
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginRight: 5, height: 30, width: 30}}>
                    <Image
                        style={{width: 30, height: 30, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 10, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }






    render() {

        const {user} = this.props.rowData;
        const {comment} = this.props.rowData;
        const {id} = this.props.rowData;


        let profileName = 'loading';
        firebase.database().ref(`/users/${user}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = user;
            }
        });



        const {currentUser} = firebase.auth();
        const me = currentUser.uid;




        if(user == me || Variables.state.podcastArtist == me){

            return (
                <View style={{marginHorizontal: 80}}>
                    <TouchableOpacity onPress={() => {

                        const {navigator} = this.props;
                        Variables.state.browsingArtist = user;
                        Navigation.showModal({
                            screen: 'UserProfileModal',
                            animated: true,
                            animationType: 'fade',
                            passProps: {navigator},
                        });

                    }} style={{flexDirection: 'row', alignSelf: 'center', marginHorizontal: 10}}>

                        {this._renderProfileImage()}

                        <Text style={styles.textCommentName}>{profileName}:</Text>
                        <Text style={styles.textComment}>{comment}</Text>

                        <Icon onPress={() => {

                            Alert.alert(
                                'Are you sure you want to delete?',
                                '',
                                [
                                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                    {text: 'Yes', onPress: () => {

                                        firebase.database().ref(`/podcasts/${Variables.state.podcastID}/comments/${id}`).remove();

                                    }
                                    },
                                ],
                                { cancelable: false }
                            )

                        }} style={{
                            textAlign: 'right',
                            fontSize: 20,
                            marginRight: 5,
                            marginLeft: 5,
                            marginTop: 7,
                            color: '#656575'
                        }} name="md-close-circle">
                        </Icon>

                    </TouchableOpacity>
                </View>

            );

        }
        else{
            return (
                <View style={{marginHorizontal: 80}}>
                    <TouchableOpacity onPress={() => {

                        const {navigator} = this.props;
                        Variables.state.browsingArtist = user;
                        Navigation.showModal({
                            screen: 'UserProfileModal',
                            animated: true,
                            animationType: 'fade',
                            passProps: {navigator},
                        });

                    }} style={{flexDirection: 'row', alignSelf: 'center', marginHorizontal: 10}}>

                        {this._renderProfileImage()}

                        <Text style={styles.textCommentName}>{profileName}:</Text>
                        <Text style={styles.textComment}>{comment}</Text>
                    </TouchableOpacity>
                </View>

            );
        }

    }


}

const styles = {

    textComment:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginVertical: 10,
        marginHorizontal: 5,
        marginTop: 10
    },
    textCommentName:{
        color: '#2A2A30',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginVertical: 10,
        marginHorizontal: 5,
        marginTop: 10
    },
};




export default ListItemComment;