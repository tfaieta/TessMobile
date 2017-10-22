import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';



class Library extends Component{

    componentWillMount(){
        Variables.state.usersFollowed = [];
        Variables.state.favPodcasts = [];

        const { currentUser } = firebase.auth();
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);
        const refFav = firebase.database().ref(`users/${currentUser.uid}/favorites`);
        refFol.orderByChild('following').on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                Variables.state.usersFollowed.push(data.key);
            })
        });

        refFav.orderByChild('favorites').on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                Variables.state.favPodcasts.push(data.val());
            })
        });

    }




    GoToQueue = () => {
        Actions.Queue();
    };

    GoToFavs = () => {
        Actions.Favorites();
    };

    GoToFollowedContent = () => {
        Actions.FollowedContent();
    };

    GoToMyContent = () => {
        Actions.MyContent();
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={styles.container}>






                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.GoToFavs}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#FFF'}} name="ios-bookmark">
                            <Text  style={styles.contentTitle}>  Favorites</Text>
                        </Icon>
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.GoToQueue}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#FFF' }} name="md-time">
                            <Text  style={styles.contentTitle}>  Recently Played</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.GoToFollowedContent}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#FFF' }} name="ios-checkmark-circle">
                            <Text  style={styles.contentTitle}>  Followed Creators</Text>
                        </Icon>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.GoToMyContent}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color: '#FFF' }} name="md-person">
                            <Text  style={styles.contentTitle}>  My Content</Text>
                        </Icon>
                    </TouchableOpacity>


                </View>





                <PlayerBottom/>

            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#804cc8',
        paddingTop: 70,
    },

    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },


    contentTitle: {
        color: '#FFF',
        fontSize: 25,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',

    },

    buttonPreview: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingBottom: 15,
    },

    buttonUpload: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonCancel: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonContainer: {
        marginTop: 50,
    },

});

export default Library;