import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Variables from "./Variables";
import { Navigation } from 'react-native-navigation';



// individual list item for a comment

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
        this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1250);
    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
    }


    constructor(state) {
        super(state);
        this.state ={
            profileName: '',
            profileImage: '',
            username: '',
            comment: ''
        };

        const {user} = this.props.rowData;
        const {comment} = this.props.rowData;

        let profileName = 'loading';
        firebase.database().ref(`/users/${user}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = user;
            }
        });

        setTimeout(() => {
            this.setState({username: profileName});
            this.setState({comment: comment});
        }, 250);

        setTimeout(() => {
            this.setState({username: profileName})
        }, 500);

    }



    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginTop:5, marginRight: 5,  height: 30, width: 30, borderRadius: 10, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)', shadowOffset:{  width: 0,  height: 2}, shadowOpacity: 0.5, shadowRadius: 2}}>
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
                <View style={{backgroundColor:'transparent', marginTop:5, marginRight: 5, height: 30, width: 30}}>
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
        const {currentUser} = firebase.auth();

        if(user == currentUser.uid || Variables.state.podcastArtist == currentUser.uid){

            return (
                <View>
                    <TouchableOpacity onPress={() => {

                        const {navigator} = this.props;
                        Variables.state.browsingArtist = user;
                        Navigation.showModal({
                            screen: 'UserProfile',
                            animated: true,
                            animationType: 'fade',
                            passProps: {navigator},
                        });

                    }} style={{flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 10, marginVertical: 10}}>

                        {this._renderProfileImage()}

                        <Text style={styles.textCommentName}>{this.state.username}:</Text>
                        <View style = {{marginHorizontal: 10, flex:1}}>
                        <Text style={styles.textComment}>{this.state.comment}</Text>
                        </View>

                        <Icon onPress={() => {

                            const {id} = this.props.rowData;

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
                <View>
                    <TouchableOpacity onPress={() => {

                        const {navigator} = this.props;
                        Variables.state.browsingArtist = user;
                        Navigation.showModal({
                            screen: 'UserProfile',
                            animated: true,
                            animationType: 'fade',
                            passProps: {navigator},
                        });

                    }} style={{flexDirection: 'row', alignSelf: 'flex-start', marginHorizontal: 10, marginVertical: 10}}>

                        {this._renderProfileImage()}

                        <Text style={styles.textCommentName}>{this.state.username}:</Text>
                        <View style = {{marginHorizontal: 10, flex:1}}>
                        <Text style={styles.textComment}>{this.state.comment}</Text>
                        </View>

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
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginTop: 10
    },
    textCommentName:{
        color: '#3e4164',
        flexDirection: 'column',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginHorizontal: 5,
        marginTop: 10
    },
};




export default ListItemComment;