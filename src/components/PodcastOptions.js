import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import firebase from 'firebase';
import Variables from "./Variables";


class PodcastOptions extends Component {

    constructor(props){
        super(props);
        this.state = {
            favorite: false
        };

        const rowData = this.props.rowData;
        const id  = rowData.id;
        const {currentUser} = firebase.auth();
        if(id){
            if (firebase.database().ref(`users/${currentUser.uid}/favorites`).child(rowData.id)){
                this.setState({favorite: true})
            }
            else{
                this.setState({favorite: false})
            }
        }

    }



    render(){

        const rowData = this.props.rowData;
        const navigator = this.props.navigator;
        const {currentUser} = firebase.auth();
        const id  = rowData.id;
        const podcastArtist = rowData.podcastArtist;
        const podcastTitle = rowData.podcastTitle;
        const podcastDescription = rowData.podcastDescription;
        const podcastCategory = rowData.podcastCategory;

        let profileName = 'loading';
        firebase.database().ref(`/users/${rowData.podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = rowData.podcastArtist;
            }
        });



        if(rowData.podcastArtist == currentUser.uid){
            return(
                <View>
                    <View>
                        <Text style={styles.textTitle}>{rowData.podcastTitle}</Text>
                        <Text style={styles.textArtist}>by {profileName}</Text>
                    </View>





                    <TouchableOpacity onPress={() => {
                        navigator.showModal({
                            screen: 'EditPodcast',
                            passProps: {rowData, navigator},
                        })

                    }}>
                        <Text style={styles.textStyle}>Edit</Text>
                    </TouchableOpacity>





                    <TouchableOpacity onPress = {() => {
                        Alert.alert(
                            'Are you sure you want to delete?',
                            '',
                            [
                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'Yes', onPress: () => {

                                    if(rowData.id){
                                        firebase.storage().ref(`/users/${rowData.podcastArtist}/${rowData.id}`).delete();
                                        firebase.database().ref(`/podcasts/${rowData.id}`).remove();
                                        firebase.database().ref(`/users/${rowData.podcastArtist}/podcasts/${rowData.id}`).remove();
                                        navigator.dismissLightBox();
                                    }
                                    else{
                                        firebase.storage().ref(`/users/${rowData.podcastArtist}/${rowData.podcastTitle}`).delete();
                                        firebase.database().ref(`/podcasts`).on("value", function (snapshot) {
                                            snapshot.forEach(function (data) {
                                                if(data.val().podcastTitle == rowData.podcastTitle && data.val().podcastArtist == rowData.podcastArtist){
                                                    data.ref.remove()
                                                }
                                            })
                                        });
                                        navigator.dismissLightBox();
                                    }

                                }
                                },
                            ],
                            { cancelable: false }
                        )
                    }}>
                        <Text style={styles.textStyle}>Delete</Text>
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
                                <Text style={styles.textTitle}>{rowData.podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <TouchableOpacity onPress={() => {


                                firebase.database().ref(`users/${currentUser.uid}/favorites/${id}`).remove();
                                this.setState({favorite: false})

                            }}>
                                <Text style={styles.textStyle}>Remove from Favorites</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                Variables.state.browsingArtist = rowData.podcastArtist;
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {rowData, navigator},
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
                                <Text style={styles.textTitle}>{rowData.podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <TouchableOpacity onPress={() => {


                                firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(id).update({id});
                                this.setState({favorite: true})


                            }}>
                                <Text style={styles.textStyle}>Add to Favorites</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                Variables.state.browsingArtist = rowData.podcastArtist;
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {rowData, navigator},
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
                                <Text style={styles.textTitle}>{rowData.podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <TouchableOpacity onPress={() => {


                                /*
                                firebase.database().ref(`users/${currentUser.uid}/favorites/${podcastTitle}`).remove();
                                this.setState({favorite: false})
                                */

                            }}>
                                <Text style={styles.textStyle}>Remove from Favorites</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                Variables.state.browsingArtist = rowData.podcastArtist;
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {rowData, navigator},
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
                                <Text style={styles.textTitle}>{rowData.podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <TouchableOpacity onPress={() => {

                                /*
                                firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(podcastTitle).update({podcastArtist, podcastTitle});
                                this.setState({favorite: true})
                                */


                            }}>
                                <Text style={styles.textStyle}>Add to Favorites</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                Variables.state.browsingArtist = rowData.podcastArtist;
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {rowData, navigator},
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
        fontSize: 18,
        backgroundColor: 'transparent',
        marginVertical: 20,
    },
    textTitle:{
        color: '#fff',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
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
        fontSize: 14,
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginHorizontal: 20,
    }

});


export default PodcastOptions;