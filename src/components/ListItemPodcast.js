import React, { Component } from 'react';
import { View, StyleSheet, Text, ListView, Dimensions, TouchableOpacity, Platform, Linking, ScrollView} from 'react-native';
import ListItemUsers from "./ListItemUsers";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import HTML from 'react-native-render-html';

var {height, width} = Dimensions.get('window');



// a single podcast on a list, shows podcast with episodes

class ListItemPodcast extends Component{

    constructor(props) {
        super(props);

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            loading: true,
            username: '',
            podImage: '',
            bio: '',
            following: false,
            dataSource: dataSource.cloneWithRows([]),
            url: '',
            refreshing: false,
            size: {width: width, height: height/2.15}
        };

        let podImage = '';
        firebase.database().ref(`users/${this.props.podcast}/profileImage`).once("value", function (image) {
            if(image.val()){
                podImage = image.val().profileImage;
            }
            else{
                const storageRef = firebase.storage().ref(`/users/${this.props.podcast}/image-profile-uploaded`);
                storageRef.getDownloadURL()
                    .then(function(url) {
                        podImage = url;
                    }).catch(function(error) {
                    //
                });
            }
        });

        let eps = [];
        firebase.database().ref(`users/${this.props.podcast}/podcasts`).limitToLast(10).once("value", function (snap) {
            snap.forEach(function (data) {
                firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (podcast) {
                    if(podcast.val()){
                        eps.push(podcast.val());
                    }
                })
            })
        });

        let username = '';
        firebase.database().ref(`users/${this.props.podcast}/username`).once("value", function (snapshot) {
            if(snapshot.val()){
                username = snapshot.val().username;
            }
            else{
                username = '...';
            }
        });

        let bio = '';
        firebase.database().ref(`users/${this.props.podcast}/bio`).once("value", function (snapshot) {
            if(snapshot.val()){
                bio = snapshot.val().bio;
                if(bio.length > (width/2.7)){
                    bio = bio.slice(0,(width/2.7))+ "...";
                }
            }
        });

        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/following/`).orderByChild(this.props.podcast).on("value", function (snap){
            if(snap.hasChild(this.props.podcast)){
                this.setState({
                    following: true
                })
            }
            else{
                this.setState({
                    following: false
                })
            }
        }.bind(this));


        this.timeout1 = setTimeout(() => {
            this.setState({
                dataSource: dataSource.cloneWithRows(eps.reverse()),
                podImage: podImage,
                username: username,
                bio: bio,
                loading: false
            })
        }, 3000);
    }



    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }


    renderFollowButton(){
        if (this.state.following) {
            return (
                <TouchableOpacity onPress={this.pressFollowButton}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: width/10.71,
                        marginTop: height/44.47,
                        color: '#506dcf',
                    }} name="ios-checkmark-circle-outline">
                    </Icon>
                </TouchableOpacity>
            )
        }
        else {
            return (
                <TouchableOpacity onPress={this.pressFollowButton}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: width/10.71,
                        marginTop: height/44.47,
                        color: '#506dcf',
                    }} name="ios-add-circle-outline">
                    </Icon>
                </TouchableOpacity>
            )
        }
    }

    pressFollowButton =() => {
        if(this.state.following == true){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/following/${this.props.podcast}`).remove();
            firebase.database().ref(`users/${this.props.podcast}/followers/${currentUser.uid}`).remove();
            this.setState({following: false});
            this.state.following = false;
        }
        else if (this.state.following == false){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/following`).child(this.props.podcast).push(this.props.podcast);
            firebase.database().ref(`users/${this.props.podcast}/followers/`).child(currentUser.uid).push(currentUser.uid);
            firebase.database().ref(`users/${currentUser.uid}/activity`).push({action: 'follow', id: this.props.podcast, user: currentUser.uid, time: firebase.database.ServerValue.TIMESTAMP});
            this.setState({ following: true});
            this.state.following = true;
        }
    };


    renderRow = (rowData) => {
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
    };



    render() {

        if(this.state.loading){
            return (
                <View style= {styles.container}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: width/31.25, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <View style={{flex: 6}}>
                            <View style={{backgroundColor: '#82839320', paddingVertical: height/95.3, marginTop: height/35, marginHorizontal: width/30, borderRadius: width/18.75}}/>
                        </View>

                        <View style={{flex: 1, alignSelf: 'flex-start'}}>
                            <Icon style={{
                                textAlign: 'center',
                                fontSize: width/10.71,
                                marginTop: height/44.47,
                                color: '#82839320',
                            }} name="ios-add-circle-outline">
                            </Icon>
                        </View>

                    </View>

                    <View style={{backgroundColor: '#fff', marginHorizontal: width/31.25, paddingTop: height/66.7}}>
                        <View style={{backgroundColor: '#82839320', paddingVertical: height/140, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/9.38, borderRadius: width/18.75}}/>
                        <View style={{backgroundColor: '#82839320', paddingVertical: height/140, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/9.38, borderRadius: width/18.75}}/>
                        <View style={{backgroundColor: '#82839320', paddingVertical: height/140, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/9.38, borderRadius: width/18.75}}/>
                    </View>

                    <View style={{backgroundColor: '#fff', marginHorizontal: width/31.25, marginBottom: height/22.23, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                        <ScrollView horizontal={true}>
                            <View>
                                <View style={{padding: 10}}>

                                    <View style={{backgroundColor:'rgba(130,131,147,0.2)', alignSelf: 'center', marginBottom: height/66.7, height: height/5.2, width: height/5.2, borderRadius: 4, borderWidth: 8, borderColor:'rgba(320,320,320,0.8)' }}>
                                        <Icon style={{
                                            textAlign: 'center',
                                            fontSize: height/8.34,
                                            color: 'white',
                                            marginTop: height/33.35,
                                        }} name="md-person">
                                        </Icon>
                                    </View>

                                    <View style={{backgroundColor: '#82839320', paddingVertical: height/133.4, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/9.38, borderRadius: width/18.75}}/>
                                    <View style={{backgroundColor: '#82839320', paddingVertical: height/133.4, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/9.38, borderRadius: width/18.75}}/>

                                </View>
                            </View>
                            <View>
                                <View style={{padding: 10}}>

                                    <View style={{backgroundColor:'rgba(130,131,147,0.2)', alignSelf: 'center', marginBottom: height/66.7, height: height/5.2, width: height/5.2, borderRadius: 4, borderWidth: 8, borderColor:'rgba(320,320,320,0.8)' }}>
                                        <Icon style={{
                                            textAlign: 'center',
                                            fontSize: height/8.34,
                                            color: 'white',
                                            marginTop: height/33.35,
                                        }} name="md-person">
                                        </Icon>
                                    </View>

                                    <View style={{backgroundColor: '#82839320', paddingVertical: height/133.4, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/9.38, borderRadius: width/18.75}}/>
                                    <View style={{backgroundColor: '#82839320', paddingVertical: height/133.4, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/9.38, borderRadius: width/18.75}}/>

                                </View>
                            </View>
                            <View>
                                <View style={{padding: 10}}>

                                    <View style={{backgroundColor:'rgba(130,131,147,0.2)', alignSelf: 'center', marginBottom: height/66.7, height: height/5.2, width: height/5.2, borderRadius: 4, borderWidth: 8, borderColor:'rgba(320,320,320,0.8)' }}>
                                        <Icon style={{
                                            textAlign: 'center',
                                            fontSize: height/8.34,
                                            color: 'white',
                                            marginTop: height/33.35,
                                        }} name="md-person">
                                        </Icon>
                                    </View>

                                    <View style={{backgroundColor: '#82839320', paddingVertical: height/133.4, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/9.38, borderRadius: width/18.75}}/>
                                    <View style={{backgroundColor: '#82839320', paddingVertical: height/133.4, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/9.38, borderRadius: width/18.75}}/>

                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>



            );
        }
        else{
            return (
                <View style= {styles.container}>
                    <View style={{flex: 1, flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: width/31.25, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                        <View style={{flex: 6}}>
                            <Text style = {styles.title}>{this.state.username}</Text>
                        </View>

                        <View style={{flex: 1, alignSelf: 'flex-start'}}>
                            {this.renderFollowButton()}
                        </View>

                    </View>

                    <View style={{backgroundColor: '#fff', marginHorizontal: width/31.25,}}>
                        <HTML
                            html={this.state.bio}
                            containerStyle={styles.htmlContainer}
                            baseFontStyle={{
                                fontFamily: 'Montserrat-SemiBold',
                                fontSize: width/31.25,
                                color: '#828393',
                                textAlign: 'left'
                            }}
                            decodeEntities={true}
                            textSelectable={true}
                            ignoredTags={['img']}
                            onLinkPress={(evt, href) => {
                                if (Platform.OS === 'android') {
                                    Linking.canOpenURL(href).then(supported => {
                                        if (supported) {
                                            Linking.openURL(href);
                                        } else {
                                            console.warn("Don't know how to open URI: " + href);
                                        }
                                    });
                                }
                                else {
                                    Linking.canOpenURL(href).then(supported => {
                                        if (supported) {
                                            {
                                                this.link(href)
                                            }
                                        } else {
                                            console.warn("Don't know how to open URI: " + href);
                                        }
                                    });
                                }
                            }}
                        />
                    </View>

                    <View style={{backgroundColor: '#fff', marginHorizontal: width/31.25, marginBottom: height/22.23, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                        <ListView
                            horizontal={true}
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                    </View>
                </View>



            );
        }

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
    },

    textBio: {
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        marginBottom: height/66.7,
        marginHorizontal: width/31.25,
        fontSize: width/26.79,
    },

    title: {
        color: '#3e4164',
        flex: 1,
        textAlign: 'left',
        marginTop: height/44.47,
        marginLeft: width/25,
        marginRight: width/15,
        fontFamily: 'Montserrat-Bold',
        fontSize: width/18.75,
        
    },

    htmlContainer: {
        paddingHorizontal: width/40,
        paddingVertical: height/66.7,
        opacity: 1,
    },

});


export default ListItemPodcast;
