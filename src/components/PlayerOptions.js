import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Dimensions

} from 'react-native';
import firebase from 'firebase';
import Variables from "./Variables";

var {height, width} = Dimensions.get('window');



// options popup from player options


class PlayerOptions extends Component {

    constructor(props){
        super(props);
        this.state = {
            favorite: false
        };

        const id  = Variables.state.podcastID;
        const {currentUser} = firebase.auth();
        if(id){
            if (firebase.database().ref(`users/${currentUser.uid}/favorites`).child(id)){
                this.setState({favorite: true})
            }
            else{
                this.setState({favorite: false})
            }
        }

    }



    render(){

        const navigator = this.props.navigator;
        const {currentUser} = firebase.auth();
        const id  = Variables.state.podcastID;
        const podcastArtist = Variables.state.podcastArtist;
        const podcastTitle = Variables.state.podcastTitle;


        let profileName = 'loading';
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = podcastArtist;
            }
        });



        if(podcastArtist == currentUser.uid){
            return(
                <View>
                    <View>
                        <Text style={styles.textTitle}>{podcastTitle}</Text>
                        <Text style={styles.textArtist}>by {profileName}</Text>
                    </View>

                    <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>

                    <TouchableOpacity onPress = {() => {


                        firebase.database().ref(`users/${currentUser.uid}/queue/`).once("value", function (snap) {
                            snap.forEach(function (data) {
                                if(data.val().id == id){
                                    firebase.database().ref(`users/${currentUser.uid}/queue/${data.key}`).remove()
                                }
                            });
                            firebase.database().ref(`users/${currentUser.uid}/queue/`).push({id});
                        });

                        navigator.dismissLightBox();

                    }}>
                        <Text style={styles.textStyle}>Add to Queue</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress = {() => {
                        this.props.navigator.showModal({
                            screen: 'MyQueue',
                        });
                    }}>
                        <Text style={styles.textStyle}>Go to Queue</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => {
                        Variables.state.browsingArtist = podcastArtist;
                        navigator.showModal({
                            screen: 'UserProfile',
                            passProps: {navigator},
                        })
                    }}>
                        <Text style={styles.textStyle}>Go to Profile</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress = {() => {
                        navigator.dismissLightBox();
                    }}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </TouchableOpacity>




                </View>
            )
        }
        else{
            if(id){
                if(this.state.favorite){

                    return(
                        <View>
                            <View>
                                <Text style={styles.textTitle}>{podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>


                            <TouchableOpacity onPress = {() => {

                                firebase.database().ref(`users/${currentUser.uid}/queue/`).once("value", function (snap) {
                                    snap.forEach(function (data) {
                                        if(data.val().id == id){
                                            firebase.database().ref(`users/${currentUser.uid}/queue/${data.key}`).remove()
                                        }
                                    });
                                    firebase.database().ref(`users/${currentUser.uid}/queue/`).push({id});
                                });

                                navigator.dismissLightBox();

                            }}>
                                <Text style={styles.textStyle}>Add to Queue</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress = {() => {
                                this.props.navigator.showModal({
                                    screen: 'MyQueue',
                                });
                            }}>
                                <Text style={styles.textStyle}>Go to Queue</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => {

                                firebase.database().ref(`users/${currentUser.uid}/favorites/${id}`).remove();
                                this.setState({favorite: false})

                            }}>
                                <Text style={styles.textStyle}>Remove from Favorites</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                Variables.state.browsingArtist = podcastArtist;
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {navigator},
                                })
                            }}>
                                <Text style={styles.textStyle}>Go to Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {() => {
                                navigator.dismissLightBox();
                            }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    )

                }

                else{

                    return(
                        <View>
                            <View>
                                <Text style={styles.textTitle}>{podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>

                            <TouchableOpacity onPress = {() => {

                                firebase.database().ref(`users/${currentUser.uid}/queue/`).once("value", function (snap) {
                                    snap.forEach(function (data) {
                                        if(data.val().id == id){
                                            firebase.database().ref(`users/${currentUser.uid}/queue/${data.key}`).remove()
                                        }
                                    });
                                    firebase.database().ref(`users/${currentUser.uid}/queue/`).push({id});
                                });

                                navigator.dismissLightBox();

                            }}>
                                <Text style={styles.textStyle}>Add to Queue</Text>
                            </TouchableOpacity>



                            <TouchableOpacity onPress = {() => {
                                this.props.navigator.showModal({
                                    screen: 'MyQueue',
                                });
                            }}>
                                <Text style={styles.textStyle}>Go to Queue</Text>
                            </TouchableOpacity>



                            <TouchableOpacity onPress={() => {

                                firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(id).update({id});
                                this.setState({favorite: true})

                            }}>
                                <Text style={styles.textStyle}>Add to Favorites</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                Variables.state.browsingArtist = podcastArtist;
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {navigator},
                                })
                            }}>
                                <Text style={styles.textStyle}>Go to Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {() => {
                                navigator.dismissLightBox();
                            }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    )

                }

            }
            else{
                if(this.state.favorite){

                    return(
                        <View>
                            <View>
                                <Text style={styles.textTitle}>{podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>

                            <TouchableOpacity onPress={() => {


                                /*
                                firebase.database().ref(`users/${currentUser.uid}/favorites/${podcastTitle}`).remove();
                                this.setState({favorite: false})
                                */

                            }}>
                                <Text style={styles.textStyle}>Remove from Favorites</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                Variables.state.browsingArtist = podcastArtist;
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {navigator},
                                })
                            }}>
                                <Text style={styles.textStyle}>Go to Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {() => {
                                navigator.dismissLightBox();
                            }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    )

                }

                else{

                    return(
                        <View>
                            <View>
                                <Text style={styles.textTitle}>{podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>

                            <TouchableOpacity onPress={() => {

                                /*
                                firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(podcastTitle).update({podcastArtist, podcastTitle});
                                this.setState({favorite: true})
                                */


                            }}>
                                <Text style={styles.textStyle}>Add to Favorites</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                Variables.state.browsingArtist = podcastArtist;
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {navigator},
                                })
                            }}>
                                <Text style={styles.textStyle}>Go to Profile</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress = {() => {
                                navigator.dismissLightBox();
                            }}>
                                <Text style={styles.textStyle}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    )

                }

            }






        }


    }


}




const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#FFF'
    },
    textStyle:{
        color: '#fff',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: height/41.69,
        backgroundColor: 'transparent',
        marginVertical: height/33.35,
    },
    textTitle:{
        color: '#fff',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 13,
        backgroundColor: 'transparent',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    textArtist:{
        color: '#fff',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 13,
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginHorizontal: 20,
    }

});


export default PlayerOptions;