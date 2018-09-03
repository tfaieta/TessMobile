import React, { Component } from 'react';
import { Text, View, LayoutAnimation, TouchableOpacity, Image, Dimensions, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import Variables from "./Variables";

var {height, width} = Dimensions.get('window');




// A single highlight on a list

class ListItemHighlight extends Component {

    constructor(props) {
        super(props);

        const {endTime} = this.props.highlight;
        const {startTime} = this.props.highlight;
        this.state = {
            loading: true,
            profileImage: '',
            username: '',
            endTime: endTime,
            startTime: startTime,
            totalTime: endTime-startTime,
            episode: [],
            podcastTitle: '',
        };

        const {podcastID} = this.props.highlight;
        let rss = false;
        let episode = [];

        firebase.database().ref(`podcasts/${podcastID}`).once("value", function (snapshot) {

            if(snapshot.val()){
                if(snapshot.val().rss == true){
                    rss = true;
                }
                    episode = snapshot.val();
            }

        });

        setTimeout(() => {

            let profileName = '';
            firebase.database().ref(`/users/${episode.podcastArtist}/username`).orderByChild("username").once("value", function (snap) {
                if (snap.val()) {
                    profileName = snap.val().username;
                }
            });

            setTimeout(() => {
                this.setState({username: profileName, episode: episode, podcastTitle: episode.podcastTitle});
            }, 300);

            setTimeout(() => {
                this.setState({username: profileName, episode: episode, podcastTitle: episode.podcastTitle, loading: false});
            }, 1000);


            let profileImage = '';
            if(rss){
                firebase.database().ref(`users/${episode.podcastArtist}/profileImage`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        profileImage = snapshot.val().profileImage
                    }
                });
                this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1200);
                this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage})},3400);

            }
            else{
                const storageRef = firebase.storage().ref(`/users/${episode.podcastArtist}/image-profile-uploaded`);
                storageRef.getDownloadURL()
                    .then(function(url) {
                        profileImage = url;
                    }).catch(function(error) {
                    //
                });
                this.timeout = setTimeout(() => {this.setState({profileImage: profileImage})},1200);
                this.timeout2 = setTimeout(() => {this.setState({profileImage: profileImage})},3400);

            }


        }, 1200);




    }


    componentWillUpdate() {
        LayoutAnimation.spring();
    }


    _renderProfileImage(){

        if (this.state.profileImage == ''){
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', marginLeft: width/37.5, alignSelf: 'center', height: width/7.5, width: width/7.5, borderRadius: 4, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)'}}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: width/10.71,
                        marginTop: width/46.88,
                        color: 'white',
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'transparent', alignSelf: 'center', marginLeft: width/37.5, height: width/7.5, width: width/7.5}}>
                    <Image
                        style={{width: width/7.5, height: width/7.5, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 4, borderWidth: 0.1, borderColor: 'transparent'}}
                        source={{uri: this.state.profileImage}}
                    />
                </View>
            )
        }
    }


    _renderCurrentTime(currentTime) {

        var num = ((currentTime) % 60).toString();
        var num2 = ((currentTime) / 60).toString();
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));


        if (currentTime == -1){
            return (
                <Text style={styles.time}> 0:00</Text>
            )
        }
        else if(Number(num2) < 10){
            var minutes = num2.slice(0,1);
            Number(minutes.slice(0,1));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.time}> {minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.time}> {minutes}:{seconds}</Text>
                );
            }
        }
        else{
            var minutes = num2.slice(0,2);
            Number(minutes.slice(0,2));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.time}> {minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.time}> {minutes}:{seconds}</Text>
                );
            }
        }



    }


    renderInfo = () => {

        if((this.state.username + ' • ' + this.state.podcastTitle).length > 60){
            return(
                (this.state.username + ' • ' + this.state.podcastTitle).slice(0,60) + '...'
            )

        }
        if(this.state.username == '' && this.state.podcastTitle == ''){
            return(
                ''
            )
        }
        else{
            return(
                (this.state.username + ' • ' + this.state.podcastTitle)
            )
        }


    };

    renderItem = () => {
        if(this.state.loading){
            return (

                <View>
                    <View style={styles.container}>

                        <View style={{backgroundColor:'rgba(130,131,147,0.2)', marginLeft: width/37.5, alignSelf: 'center', height: width/7.5, width: width/7.5, borderRadius: 4, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)'}}>
                            <Icon style={{
                                textAlign: 'center',
                                fontSize: width/10.71,
                                marginTop: width/46.88,
                                color: 'white',
                            }} name="md-person">
                            </Icon>
                        </View>

                        <View style={styles.leftContainer}>
                            <View style={{backgroundColor: '#82839320', paddingVertical: height/95.3, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/3, borderRadius: width/18.75}}/>
                            <View style={{backgroundColor: '#82839320', paddingVertical: height/95.3, marginVertical: height/333.5, marginHorizontal: width/37.5, paddingHorizontal: width/3, borderRadius: width/18.75}}/>
                        </View>

                    </View>
                </View>
            );
        }
        else{
            const {podcastArtist} = this.state.episode;
            const {podcastTitle} = this.state.episode;
            const {title} = this.props.highlight;
            const {podcastCategory} = this.state.episode;
            const {id} = this.state.episode;
            const {description} = this.props.highlight;
            const {key} = this.props.highlight;


            return (

                <TouchableOpacity onPress={() => {
                    Variables.state.highlightStart = this.state.startTime;
                    Variables.state.highlightEnd = this.state.endTime;
                    Variables.state.seekTo = this.state.startTime;
                    Variables.state.currentTime = this.state.startTime;


                    if(this.state.episode != []){
                        if(this.state.episode.rss){
                            AsyncStorage.setItem("currentPodcast", '');
                            AsyncStorage.setItem("currentTime", "0");

                            Variables.pause();
                            Variables.setPodcastFile(this.state.episode.podcastURL);
                            Variables.state.isPlaying = false;
                            Variables.state.highlight = true;
                            Variables.state.rss = true;
                            Variables.state.podcastURL = this.state.episode.podcastURL;
                            Variables.state.podcastArtist = podcastArtist;
                            Variables.state.podcastTitle = title;
                            Variables.state.podcastID = id;
                            Variables.state.podcastCategory = podcastCategory;
                            Variables.state.podcastDescription = description;
                            Variables.state.favorited = false;
                            Variables.play();
                            Variables.state.isPlaying = true;


                            Variables.state.userProfileImage = '';
                            firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                                if(snapshot.val()){
                                    Variables.state.userProfileImage = snapshot.val().profileImage
                                }
                            });

                            firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                if(snap.val()){
                                    Variables.state.currentUsername = snap.val().username;
                                }
                                else {
                                    Variables.state.currentUsername = podcastArtist;
                                }
                            });


                        }
                        else if(id){
                            AsyncStorage.setItem("currentPodcast", '');
                            AsyncStorage.setItem("currentTime", "0");

                            firebase.storage().ref(`/users/${podcastArtist}/${id}`).getDownloadURL().catch(() => {console.warn("file not found")})
                                .then(function(url) {

                                    Variables.pause();
                                    Variables.setPodcastFile(url);
                                    Variables.state.highlight = true;
                                    Variables.state.rss = false;
                                    Variables.state.podcastURL = url;
                                    Variables.state.podcastArtist = podcastArtist;
                                    Variables.state.podcastTitle = title;
                                    Variables.state.podcastID = id;
                                    Variables.state.podcastCategory = podcastCategory;
                                    Variables.state.podcastDescription = description;
                                    Variables.state.favorited = false;
                                    Variables.play();
                                    Variables.state.isPlaying = true;

                                });


                            Variables.state.userProfileImage = '';
                            const storageRef = firebase.storage().ref(`/users/${podcastArtist}/image-profile-uploaded`);
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

                            firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                if(snap.val()){
                                    Variables.state.currentUsername = (snap.val().username + ' • ' + podcastTitle).slice(0,35) + '...';
                                }
                                else {
                                    Variables.state.currentUsername = podcastArtist;
                                }
                            });

                        }

                    }

                }}
                                  onLongPress={() => {
                                      let rowData = [];
                                      rowData.highlight = true;
                                      rowData.podcastTitle = title;
                                      rowData.podcastArtist = podcastArtist;
                                      rowData.podcastCategory = podcastCategory;
                                      rowData.id = id;
                                      rowData.podcastDescription = description;
                                      rowData.key = key;

                                      const {navigator} = this.props;

                                      this.props.navigator.showLightBox({
                                          screen: "PodcastOptions",
                                          passProps: {rowData, navigator},
                                          style: {
                                              backgroundBlur: "dark",
                                              backgroundColor: '#3e416430',
                                              tapBackgroundToDismiss: true,
                                              width: 100,
                                              height: 200
                                          },
                                      });
                                  }}>
                    <View style={styles.container}>

                        {this._renderProfileImage()}

                        <View style={styles.leftContainer}>
                            <Text style={styles.title}>{title}</Text>
                            <Text style={styles.artistTitle}>{this.renderInfo()}</Text>
                        </View>

                        <View style={styles.middleContainer}>
                            <Icon style={{
                                textAlign: 'left',
                                marginLeft: 0,
                                fontSize: height/40,
                                color: '#3e4164',
                            }} name="md-time">
                                {this._renderCurrentTime(this.state.totalTime)}
                            </Icon>
                        </View>


                        <View style={styles.rightContainer}>
                            <TouchableOpacity onPress={() => {
                                let rowData = [];
                                rowData.highlight = true;
                                rowData.podcastTitle = title;
                                rowData.podcastArtist = podcastArtist;
                                rowData.podcastCategory = podcastCategory;
                                rowData.id = id;
                                rowData.podcastDescription = description;
                                rowData.key = key;

                                const {navigator} = this.props;

                                this.props.navigator.showLightBox({
                                    screen: "PodcastOptions",
                                    passProps: {rowData, navigator},
                                    style: {
                                        backgroundBlur: "dark",
                                        backgroundColor: '#3e416430',
                                        tapBackgroundToDismiss: true,
                                        width: 100,
                                        height: 200
                                    },
                                });
                            }} style={styles.rightContainer}>
                                <Icon style={{
                                    textAlign: 'left',
                                    marginRight: height/44.47,
                                    fontSize: height/22.23,
                                    color: '#506dcf',
                                }} name="ios-more">
                                </Icon>
                            </TouchableOpacity>
                        </View>


                    </View>
                </TouchableOpacity>

            );
        }

    };

    render() {

        return(
            <View>
                {this.renderItem()}
            </View>
        )

    }


}

const styles = {
    title: {
        color: '#3e4164',
        marginTop: 0,
        flex: 1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/25,
        
        marginHorizontal: width/18.75,

    },
    time: {
        color: '#3e416480',
        marginTop: 0,
        flex: 1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: height/40,
        
        marginHorizontal: width/18.75,

    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex: 1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/25,
        
        marginLeft: width/18.75,
    },
    container: {
        paddingHorizontal: 0,
        paddingVertical: height/66.7,
        marginVertical: 1,
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
        flex: 5,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
};




export default ListItemHighlight;
