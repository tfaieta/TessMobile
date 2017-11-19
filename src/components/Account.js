import React, {Component} from 'react';
import _ from 'lodash';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    ListView,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { podcastFetch } from "../actions/PodcastActions"
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import Variables from './Variables';
import RNFetchBlob from 'react-native-fetch-blob';



class Account extends Component {

    componentWillMount(){
        const {currentUser} = firebase.auth();
        const refMy = firebase.database().ref(`podcasts/`);
        const storageRef = firebase.storage().ref(`/users/${currentUser.uid}/image-profile-uploaded`);


        refMy.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(currentUser.uid == data.val().podcastArtist) {
                    Variables.state.myPodcasts.push(data.val());
                }
            })
        });

        firebase.database().ref(`/users/${currentUser.uid}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                Variables.state.username = snap.val().username;

            }
            else {
                Variables.state.username = "None";
            }
        });

        firebase.database().ref(`/users/${currentUser.uid}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                Variables.state.bio = snap.val().bio;

            }
            else {
                Variables.state.bio = "Tell others about yourself"
            }
        });


        storageRef.getDownloadURL()
            .then(function(url) {

               Variables.state.profileImage = url;

            }).catch(function(error) {
            //
        });



    }

    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.myPodcasts),
            loading: true,
            username: '' ,
            bio: '',
            profileImage: '',
            category: '',
            profileImage: ''
        };
        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.myPodcasts), username: Variables.state.username, profileImage: Variables.state.profileImage})},1500)
    }




    _renderProfileName(){

            return (
                <Text style={styles.title2} >{this.state.username}</Text>

            )

    }


    _renderBio() {

        return(
            <Text style={styles.titleBio} >{Variables.state.bio}</Text>
        )

    }

    _renderProfileImage(){
        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginTop: 20, marginRight:20,marginLeft: 20, paddingTop: 10, marginBottom:20, height: 160, width: 160, borderRadius:10, borderWidth:5, borderColor:'rgba(320,320,320,0.8)'  }}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 90,
                        color: 'white',
                        marginTop: 20
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginTop: 20, marginRight:20,marginLeft: 20, paddingTop: 10, marginBottom:20, height: 160, width: 160  }}>
                <Image
                    style={{width: 160, height:160, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 10, borderWidth: 0.1, borderColor: 'transparent'}}
                    source={{uri: this.state.profileImage}}
                />
                </View>
            )
        }
    }

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

        return (

            <TouchableOpacity underlayColor='#5757FF' onPress={() =>  {

                firebase.storage().ref(`/users/${podcastArtist}/${podcastTitle}`).getDownloadURL()
                    .then(function(url) {


                                firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                    if(snap.val()){
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
                                Variables.state.podcastArtist = podcastArtist;
                                Variables.state.podcastCategory = podcastCategory;
                                Variables.play();
                                Variables.state.isPlaying = true;

                            });

            }}>
                <View style={styles.containerList}>



                    <View style={styles.leftContainer}>
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
    };


    _pressSettings = () => {
        this.props.navigator.push({
            screen: 'Settings',
            animated: true,
            animationType: 'fade',
        });
    };


    render() {
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />

                <View style={{flexDirection: 'row', borderRadius: 10, paddingVertical:5, borderWidth: 2, borderColor: 'rgba(187,188,205,0.3)',   }}>
                    <View style={{flex:1,alignItems: 'flex-start'}}>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={styles.header}>Account</Text>
                    </View>

                    <View style={{flex:1,justifyContent: 'center', alignItems: 'flex-end', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressSettings}>
                        <Icon style={{
                            textAlign: 'right',
                            fontSize: 24,
                            marginRight: 10,
                            color: '#5757FF'
                        }} name="md-settings">
                        </Icon>
                        </TouchableOpacity>
                    </View>

                </View>


                <ScrollView >


                    {this._renderProfileImage()}

                    {this._renderProfileName()}


                    {this._renderBio()}


                    <Text style={styles.title3 }>Content</Text>
                    <View style={{height:1, backgroundColor:'#b5b6cd', borderRadius: 10, borderWidth:0.1, marginBottom: 10, marginHorizontal: 30 }} />

                    <View style={{paddingBottom: 30}}>
                        <ListView
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                        />
                    </View>

                    <View style={{paddingBottom:120}}>

                    </View>


                </ScrollView>





                <PlayerBottom navigator={this.props.navigator}/>

            </View>



        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFF'
    },
    title2: {
        color: '#2A2A30',
        marginBottom: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    title3: {
        color: '#2A2A30',
        marginTop: 80,
        marginBottom: 5,
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 22,
        backgroundColor: 'transparent'
    },
    titleBio: {
        color: '#828393',
        marginVertical: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        marginHorizontal: 10,
        backgroundColor: 'transparent'
    },
    header: {
        marginTop:30,
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
    containerList: {
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
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
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

export default connect(mapStateToProps, { podcastFetch })(Account);