import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, ListView, View, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "../Variables";
import firebase from 'firebase';


class Following extends Component{

    componentWillMount(){

        Variables.state.followedContent = [];
        const { currentUser } = firebase.auth();
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);
        const ref = firebase.database().ref(`podcasts/`);

        refFol.orderByChild('following').on("value", function (snapshot) {
            snapshot.forEach(function (data) {

                ref.on("value", function (snapshot) {

                    snapshot.forEach(function (data2) {
                        if(data.key == data2.val().podcastArtist) {
                            Variables.state.followedContent.push(data2.val());
                        }
                    })

                });


            })
        });

    }

    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.followedContent),
        };

        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.followedContent)})},1000)
    }




    renderRow(rowData) {
        var fixedUsername = 'loading...';
        let profileName = 'loading...';
        firebase.database().ref(`/users/${rowData.podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;

                if(profileName > 15){
                    fixedUsername =  (profileName.slice(0,15)+"...");
                }
                else{
                    fixedUsername = profileName;
                }
            }
            else {
                profileName = rowData.podcastArtist;

                if(profileName > 15){
                    fixedUsername =  (profileName.slice(0,15)+"...");
                }
                else{
                    fixedUsername = profileName;
                }
            }
        });


        var fixedTitle = '';
        if(rowData.podcastTitle.toString().length > 19 ){
            fixedTitle = (rowData.podcastTitle.slice(0,19)+"...")
        }
        else{
            fixedTitle = rowData.podcastTitle;
        }

        const {currentUser} = firebase.auth();
        const podcastTitle  = rowData.podcastTitle;
        const podcastArtist = rowData.podcastArtist;
        const podcastDescription = rowData.podcastDescription;
        const podcastCategory = rowData.podcastCategory;
        const ref = firebase.database().ref(`podcasts/`);



        if (currentUser.uid == podcastArtist) {
            return (

                <TouchableOpacity underlayColor='#5757FF' onPress={() => {

                    firebase.storage().ref(`/users/${podcastArtist}/${podcastTitle}`).getDownloadURL()
                        .then(function (url) {


                            firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
                                if (snap.val()) {
                                    Variables.state.currentUsername = snap.val().username;
                                }
                                else {
                                    Variables.state.currentUsername = podcastArtist;
                                }
                            });

                            Variables.pause();
                            Variables.setPodcastFile(url);
                            Variables.state.isPlaying = false;
                            Variables.state.podcastTitle = podcastTitle;
                            Variables.state.podcastCategory = podcastCategory;
                            Variables.state.podcastArtist = podcastArtist;
                            Variables.state.podcastDescription = podcastDescription;
                            Variables.state.userProfileImage = '';
                            Variables.play();
                            Variables.state.isPlaying = true;

                            const storageRef = firebase.storage().ref(`/users/${Variables.state.podcastArtist}/image-profile-uploaded`);
                            if(storageRef.child('image-profile-uploaded')){
                                storageRef.getDownloadURL()
                                    .then(function(url) {
                                        if(url){
                                            Variables.state.userProfileImage = url;
                                        }
                                    }).catch(function(error) {
                                    //
                                });
                            }

                        });

                }}>
                    <View style={styles.container}>


                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>   {fixedTitle}</Text>
                            <Text style={styles.artistTitle}>{profileName}</Text>
                        </View>


                        <View style={styles.rightContainer}>
                            <Icon onPress={this.onGarbagePress} style={{
                                textAlign: 'left',
                                paddingRight: 8,
                                fontSize: 30,
                                color: '#5757FF',
                            }} name="md-trash">
                            </Icon>
                        </View>


                    </View>
                </TouchableOpacity>

            );
        }
        else{
            return (

                <TouchableOpacity underlayColor='#5757FF' onPress={() => {

                    firebase.storage().ref(`/users/${podcastArtist}/${podcastTitle}`).getDownloadURL()
                        .then(function (url) {


                            firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
                                if (snap.val()) {
                                    Variables.state.currentUsername = snap.val().username;
                                }
                                else {
                                    Variables.state.currentUsername = podcastArtist;
                                }
                            });

                            Variables.pause();
                            Variables.setPodcastFile(url);
                            Variables.state.isPlaying = false;
                            Variables.state.podcastTitle = podcastTitle;
                            Variables.state.podcastCategory = podcastCategory;
                            Variables.state.podcastArtist = podcastArtist;
                            Variables.state.podcastDescription = podcastDescription;
                            Variables.state.userProfileImage = '';
                            Variables.play();
                            Variables.state.isPlaying = true;

                            const storageRef = firebase.storage().ref(`/users/${Variables.state.podcastArtist}/image-profile-uploaded`);
                            if(storageRef.child('image-profile-uploaded')){
                                storageRef.getDownloadURL()
                                    .then(function(url) {
                                        if(url){
                                            Variables.state.userProfileImage = url;
                                        }
                                    }).catch(function(error) {
                                    //
                                });
                            }

                        });

                }}>
                    <View style={styles.container}>


                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>   {fixedTitle}</Text>
                            <Text style={styles.artistTitle}>{profileName}</Text>
                        </View>


                        <View style={styles.rightContainer}>
                            <Icon onPress={()=>{
                                Alert.alert(
                                    'Remove from favorites?',
                                    '',
                                    [
                                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                        {
                                            text: 'Yes', onPress: () => {
                                            firebase.database().ref(`users/${currentUser.uid}/favorites/${podcastTitle}`).remove();
                                        }
                                        },
                                    ],
                                    {cancelable: false}
                                )
                            }} style={{
                                textAlign: 'left',
                                paddingRight: 8,
                                fontSize: 30,
                                color: '#5757FF',
                            }} name="md-add">
                            </Icon>
                        </View>


                    </View>
                </TouchableOpacity>

            );
        }

    }





    render() {
        return (
            <ScrollView>

                <View style={{flex:1}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>

                <View style={{paddingBottom: 120}}/>

            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({

    containerMain:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },

    container2: {
        flex: 1,
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

    title2: {
        color: '#2A2A30',
        flex:1,
        marginTop:20,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    title: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
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
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginLeft: 20,
    },

    header: {
        marginTop:25,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 18,
        backgroundColor: 'transparent',

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

    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 7,
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginHorizontal: -100,
    },

});

export default Following;