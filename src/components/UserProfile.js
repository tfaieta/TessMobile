import React, {Component} from 'react';
import _ from 'lodash';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    ListView,
    TouchableOpacity,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { podcastFetchUser } from "../actions/PodcastActions";
import PlayerBottom from './PlayerBottom';
import {profileNameL} from './LoginForm.js';
import {profileName} from './CreateAccount.js';
import Variables from './Variables';
import firebase from 'firebase';


import { Navigation } from 'react-native-navigation';

class UserProfile extends Component {
    componentWillMount(){

        const {currentUser} = firebase.auth();

        Variables.state.userPodcasts = [];


        const ref = firebase.database().ref(`podcasts/`);

        ref.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(Variables.state.podcastArtist == data.val().podcastArtist) {
                    Variables.state.userPodcasts.push(data.val());
                }
            })
        });


        firebase.database().ref(`/users/${Variables.state.podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                Variables.state.username = snap.val().username;
            }
            else {
                Variables.state.username = Variables.state.podcastArtist;
            }
        });

        firebase.database().ref(`/users/${Variables.state.podcastArtist}/favCategory`).orderByChild("favCategory").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentFavCategory = snap.val().favCategory;
            }
            else {
                Variables.state.currentFavCategory = "Too hard to choose"
            }
        });

        firebase.database().ref(`/users/${Variables.state.podcastArtist}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                Variables.state.currentBio = snap.val().bio;
            }
            else {
                Variables.state.currentBio = "Tell others about yourself";
            }
        });

        if( firebase.database().ref(`users/${currentUser.uid}/following/`).child(Variables.state.podcastArtist)){
            Variables.state.following = true;
        }
        else{
            Variables.state.following = false;
        }
    }


    constructor(props) {
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = { username: '' , bio: '',
            category: '', profileName: profileName, following: false, profileNameL: profileNameL,
            dataSource: dataSource.cloneWithRows([]),
            loading: true,
        };
        setTimeout(() =>{
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.userPodcasts),loading:false,
            username: Variables.state.username, bio: Variables.state.currentBio})
        },500)
    }



    _renderPodcast(PodcastTitle){

        if(Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.playingText}> </Text>
            )
        }
        else{
            return (
                <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                    <Text style={styles.title} >  {PodcastTitle}</Text>
                </Icon>
            )
        }

    }

    _renderProfileName = () => {

        return (
            <Text style={styles.title} >{this.state.username}</Text>

        )

    };


    _renderBio = () => {

        return(
            <Text style={styles.titleBio} >{this.state.bio}</Text>
        )

    };



    _renderFollowButton = () => {
        const {currentUser} = firebase.auth();

        if(Variables.state.podcastArtist != currentUser.uid) {

            if (Variables.state.following) {
                return (
                    <TouchableOpacity onPress={this.pressFollowButton} style={{
                        backgroundColor: 'rgba(100,220,220,1)',
                        paddingVertical: 10,
                        marginHorizontal: 30,
                        marginTop: 20,
                        borderRadius: 10,
                        borderWidth: 0.1
                    }}>
                        <Text style={styles.titleFollow}>Unfollow</Text>
                    </TouchableOpacity>
                )
            }
            else {
                return (
                    <TouchableOpacity onPress={this.pressFollowButton} style={{
                        backgroundColor: 'rgba(1,170,170,1)',
                        paddingVertical: 10,
                        marginHorizontal: 30,
                        marginTop: 20,
                        borderRadius: 10,
                        borderWidth: 0.1
                    }}>
                        <Text style={styles.titleFollow}>Follow</Text>
                    </TouchableOpacity>
                )
            }
        }

    };

    pressFollowButton =() => {
        if(this.state.following){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/following/${Variables.state.podcastArtist}`).remove();
            this.setState({following: false});
            Variables.state.following = false;
        }
        else if (!this.state.following){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/following`).child(Variables.state.podcastArtist).push(Variables.state.podcastArtist);
            this.setState({ following: true});
            Variables.state.following = true;
        }
    };

    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
        Navigation.dismissModal({
            animationType: 'slide-down' // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
        });
    };


    onGarbagePress(){
        Alert.alert(
            'Are you sure you want to delete?',
            '',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => console.warn('delete')
                },
            ],
            { cancelable: false }
        )
    }



    renderRow = (rowData) => {

        let profileName = rowData.podcastArtist;
        firebase.database().ref(`/users/${rowData.podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = rowData.podcastArtist;
            }
        });


        const {currentUser} = firebase.auth();
        const podcastTitle = rowData.podcastTitle;
        const podcastDescription = rowData.podcastDescription;
        const podcastCategory = rowData.podcastCategory;
        const podcastArtist = rowData.podcastArtist;



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
                            Variables.play();
                            Variables.state.isPlaying = true;

                        });

                }}>
                    <View style={styles.container}>


                        <View style={styles.leftContainer}>
                            <Icon style={{
                                textAlign: 'left',
                                marginLeft: 20,
                                paddingRight: 8,
                                fontSize: 35,
                                color: '#5757FF',
                            }} name="ios-play">
                            </Icon>
                        </View>


                        <View style={styles.middleContainer}>
                            <Text style={styles.title}>   {rowData.podcastTitle}</Text>
                            <Text style={styles.artistTitle}>{profileName}</Text>
                        </View>


                        <View style={styles.rightContainer}>
                            <Icon onPress={this.onGarbagePress} style={{
                                textAlign: 'left',
                                marginLeft: 20,
                                paddingRight: 8,
                                fontSize: 35,
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
                            Variables.play();
                            Variables.state.isPlaying = true;

                        });

                }}>
                    <View style={styles.container}>


                        <View style={styles.leftContainer}>
                            <Icon style={{
                                textAlign: 'left',
                                marginLeft: 20,
                                paddingRight: 8,
                                fontSize: 35,
                                color: '#5757FF',
                            }} name="ios-play">
                            </Icon>
                        </View>


                        <View style={styles.middleContainer}>
                            <Text style={styles.title}>   {rowData.podcastTitle}</Text>
                            <Text style={styles.artistTitle}>{profileName}</Text>
                        </View>


                        <View style={styles.rightContainer}>
                            <Icon onPress={()=>{
                                if(!this.state.favorite) {

                                    Alert.alert(
                                        'Add to favorites?',
                                        '',
                                        [
                                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                            {
                                                text: 'Yes', onPress: () => {
                                                firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(podcastTitle).update({podcastArtist, podcastTitle});
                                                this.setState({favorite: true})
                                            }
                                            },
                                        ],
                                        {cancelable: false}
                                    )
                                }
                                else{
                                    Alert.alert(
                                        'Remove from favorites?',
                                        '',
                                        [
                                            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                            {
                                                text: 'Yes', onPress: () => {
                                                firebase.database().ref(`users/${currentUser.uid}/favorites/${podcastTitle}`).remove();
                                                this.setState({favorite: false})
                                            }
                                            },
                                        ],
                                        {cancelable: false}
                                    )
                                }
                            }} style={{
                                textAlign: 'left',
                                marginLeft: 20,
                                paddingRight: 8,
                                fontSize: 35,
                                color: '#5757FF',
                            }} name="md-add">
                            </Icon>
                        </View>


                    </View>
                </TouchableOpacity>

            );
        }

    };






    render() {


        return (
            <View
                style={styles.containerMain}>


                <View style={{
                    flexDirection: 'row',
                    paddingVertical:5,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'rgba(187,188,205,0.3)',
                }}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign: 'left', marginLeft: 10, fontSize: 30, color: '#9496A3'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>{this.state.username}</Text>
                    </View>

                    <View>
                    </View>

                </View>


                <ScrollView>

                    <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginTop: 20, marginRight:20,marginLeft: 20, paddingTop: 10, marginBottom:20, height: 160, width: 160, borderRadius:10, borderWidth:5, borderColor:'rgba(320,320,320,0.8)'  }}>
                        <Icon style={{
                            textAlign: 'center',
                            fontSize: 90,
                            color: 'white',
                            marginTop: 20
                        }} name="md-person">
                        </Icon>
                    </View>

                    {this._renderProfileName()}


                    {this._renderFollowButton()}


                    {this._renderBio()}


                    <Text style={styles.title3}>Content</Text>
                    <View style={{
                        height: 1,
                        backgroundColor: '#b5b6cd',
                        borderRadius: 10,
                        borderWidth: 0.1,
                        marginBottom: 10,
                        marginHorizontal: 30
                    }}/>

                    <View style={{paddingBottom: 120}}>
                        <ListView
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                    </View>


                </ScrollView>


                <PlayerBottom/>

            </View>



        );

    }

}

const styles = StyleSheet.create({
    containerMain:{
        flex: 1,
        backgroundColor: '#FFF',
    },
    titleMain: {
        color: '#2A2A30',
        marginTop: 20,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    title2: {
        color: '#2A2A30',
        marginBottom: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    titleBio: {
        color: '#828393',
        marginVertical: 10,
        marginTop: 70,
        marginHorizontal: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    titleFollow: {
        color: '#fff',
        marginVertical: 5,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    title3: {
        color: '#2A2A30',
        marginTop: 80,
        marginBottom: 5,
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 22,
        backgroundColor: 'transparent'
    },
    header: {
        marginTop:30,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 18,
        backgroundColor: 'transparent',

    },

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
        fontFamily: 'HiraginoSans-W3',
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginHorizontal: -100,
    },
});

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchUser })(UserProfile);