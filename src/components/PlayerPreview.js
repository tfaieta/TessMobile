import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StatusBar, Image, ScrollView, TouchableHighlight, Dimensions, ActivityIndicator} from 'react-native';
import Variables from "./Variables";
import firebase from 'firebase';
var {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { Navigation } from 'react-native-navigation';
import Video from 'react-native-video';
import Slider from 'react-native-slider';


class PlayerPreview extends Component {

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
    };

    componentWillMount(){
        const {url} = this.props;

        console.warn("starting");
        console.warn("url: " + url);

        const route = url.replace(/.*?:\/\//g, '');
        const id = route.match(/\/([^\/]+)\/?$/)[1];
        const routeName = route.split('/')[0];
        const data = id.split('?')[1];

        console.warn("route: " + route);
        console.warn("id: " + id);
        console.warn("route name: " + routeName);
        console.warn("data: " + data);

        if (id.toString().startsWith('listen')) {
            setTimeout(() => {


                firebase.database().ref(`podcasts/${data}`).once("value", function (snapshot) {
                    if(snapshot.val()){
                        const {podcastArtist} = snapshot.val();
                        const {podcastTitle} = snapshot.val();
                        const {podcastDescription} = snapshot.val();
                        const {podcastCategory} = snapshot.val();
                        const {id} = snapshot.val();
                        const {rss} = snapshot.val();
                        const {podcastURL} = snapshot.val();

                        if(rss){

                            Variables.state.seekTo = 0;
                            Variables.state.currentTime = 0;

                            firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                if(snap.val()){
                                    Variables.state.currentUsername = snap.val().username;
                                }
                                else {
                                    Variables.state.currentUsername = podcastArtist;
                                }
                            });

                            firebase.database().ref(`podcasts/${id}/likes`).on("value", function (snap) {
                                Variables.state.likers = [];
                                snap.forEach(function (data) {
                                    if (data.val()) {
                                        Variables.state.likers.push(data.val());
                                    }
                                });
                            });


                            firebase.database().ref(`podcasts/${id}/plays`).on("value", function (snap) {
                                Variables.state.podcastsPlays = 0;
                                snap.forEach(function (data) {
                                    if (data.val()) {
                                        Variables.state.podcastsPlays++;
                                    }
                                });
                            });



                            Variables.pause();
                            Variables.state.podcastURL = podcastURL;
                            Variables.state.isPlaying = false;
                            Variables.state.podcastTitle = podcastTitle;
                            Variables.state.podcastArtist = podcastArtist;
                            Variables.state.podcastCategory = podcastCategory;
                            Variables.state.podcastDescription = podcastDescription;
                            Variables.state.podcastID = id;
                            Variables.state.userProfileImage = '';
                            Variables.play();
                            Variables.state.isPlaying = true;
                            Variables.state.rss = true;


                            firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                                if(snapshot.val()){
                                    Variables.state.userProfileImage = snapshot.val().profileImage
                                }
                            });



                        }
                        else{
                            if(id){
                                Variables.state.seekTo = 0;
                                Variables.state.currentTime = 0;

                                firebase.storage().ref(`/users/${podcastArtist}/${id}`).getDownloadURL().catch(() => {console.warn("file not found")})
                                    .then(function(url) {


                                        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function(snap) {
                                            if(snap.val()){
                                                Variables.state.currentUsername = snap.val().username;
                                            }
                                            else {
                                                Variables.state.currentUsername = podcastArtist;
                                            }
                                        });

                                        firebase.database().ref(`podcasts/${id}/likes`).on("value", function (snap) {
                                            Variables.state.likers = [];
                                            snap.forEach(function (data) {
                                                if (data.val()) {
                                                    Variables.state.likers.push(data.val());
                                                }
                                            });
                                        });


                                        firebase.database().ref(`podcasts/${id}/plays`).on("value", function (snap) {
                                            Variables.state.podcastsPlays = 0;
                                            snap.forEach(function (data) {
                                                if (data.val()) {
                                                    Variables.state.podcastsPlays++;
                                                }
                                            });
                                        });

                                        Variables.pause();
                                        Variables.state.podcastURL = url;
                                        Variables.state.isPlaying = false;
                                        Variables.state.podcastTitle = podcastTitle;
                                        Variables.state.podcastArtist = podcastArtist;
                                        Variables.state.podcastCategory = podcastCategory;
                                        Variables.state.podcastDescription = podcastDescription;
                                        Variables.state.podcastID = id;
                                        Variables.state.userProfileImage = '';
                                        Variables.play();
                                        Variables.state.isPlaying = true;
                                        Variables.state.rss = false;

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
                            }

                        }

                    }

                });

            }, 1500);
        }
        else if (id.toString().startsWith('highlight')){
            const userID = data.split('~')[0];
            const highlightID = data.split('~')[1];

            setTimeout(() => {
                firebase.database().ref(`users/${userID}/highlights/${highlightID}`).once("value", function (snap) {

                    if(snap.val()){
                        firebase.database().ref(`podcasts/${snap.val().podcastID}`).once("value", function (snapshot) {

                            if(snapshot.val().rss){

                                const {podcastArtist} = snapshot.val();
                                const {podcastTitle} = snapshot.val();
                                const {podcastURL} = snapshot.val();
                                const {title} = snap.val();
                                const {podcastCategory} = snapshot.val();
                                const {id} = snapshot.val();
                                const {description} = snap.val();
                                const {key} = snap.val();
                                const {startTime} = snap.val();
                                const {endTime} = snap.val();


                                Variables.state.highlightStart = startTime;
                                Variables.state.highlightEnd = endTime;
                                Variables.state.seekTo = startTime;
                                Variables.state.currentTime = startTime;

                                Variables.pause();
                                Variables.state.isPlaying = false;
                                Variables.state.highlight = true;
                                Variables.state.rss = true;
                                Variables.state.podcastURL = podcastURL;
                                Variables.state.podcastArtist = podcastArtist;
                                Variables.state.podcastTitle = title;
                                Variables.state.podcastID = id;
                                Variables.state.podcastCategory = podcastCategory;
                                Variables.state.podcastDescription = description;
                                Variables.play();
                                Variables.state.isPlaying = true;


                                Variables.state.userProfileImage = '';
                                firebase.database().ref(`users/${podcastArtist}/profileImage`).once("value", function (snapshot) {
                                    if (snapshot.val()) {
                                        Variables.state.userProfileImage = snapshot.val().profileImage
                                    }
                                });

                                firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
                                    if (snap.val()) {
                                        Variables.state.currentUsername = snap.val().username;
                                    }
                                    else {
                                        Variables.state.currentUsername = podcastArtist;
                                    }
                                });

                            }
                            else if(snapshot.val()){

                                const {podcastArtist} = snapshot.val();
                                const {podcastTitle} = snapshot.val();
                                const {title} = snap.val();
                                const {podcastCategory} = snapshot.val();
                                const {id} = snapshot.val();
                                const {description} = snap.val();
                                const {key} = snap.val();
                                const {startTime} = snap.val();
                                const {endTime} = snap.val();

                                Variables.state.highlightStart = startTime;
                                Variables.state.highlightEnd = endTime;
                                Variables.state.seekTo = startTime;
                                Variables.state.currentTime = startTime;

                                firebase.storage().ref(`/users/${podcastArtist}/${id}`).getDownloadURL().catch(() => {
                                    console.warn("file not found")
                                })
                                    .then(function (url) {

                                        Variables.pause();
                                        Variables.state.highlight = true;
                                        Variables.state.rss = false;
                                        Variables.state.podcastURL = url;
                                        Variables.state.podcastArtist = podcastArtist;
                                        Variables.state.podcastTitle = title;
                                        Variables.state.podcastID = id;
                                        Variables.state.podcastCategory = podcastCategory;
                                        Variables.state.podcastDescription = description;
                                        Variables.play();
                                        Variables.state.isPlaying = true;

                                    });


                                Variables.state.userProfileImage = '';
                                const storageRef = firebase.storage().ref(`/users/${podcastArtist}/image-profile-uploaded`);
                                if (storageRef.child('image-profile-uploaded')) {
                                    storageRef.getDownloadURL()
                                        .then(function (url) {
                                            if (url) {
                                                Variables.state.userProfileImage = url;
                                            }
                                        }).catch(function (error) {
                                        //
                                    });
                                }

                                firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
                                    if (snap.val()) {
                                        Variables.state.currentUsername = (snap.val().username + ' • ' + podcastTitle).slice(0, 35) + '...';
                                    }
                                    else {
                                        Variables.state.currentUsername = podcastArtist;
                                    }
                                });

                            }

                        });
                    }

                })

            }, 1500);

        }

    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    constructor(props) {
        super(props);
        this.state = {
            scrollEnabled: true,
        };

        this.interval = setInterval(() => {
            this.setState({
            });
        }, 500);

    };

    close(){
        Variables.state.paused = true;

        this.timeout = setTimeout(() => {
            Navigation.startSingleScreenApp({
                screen: {
                    screen: 'Login',
                    navBarHidden: true,
                    navigatorStyle: {screenBackgroundColor: '#fff'},
                    navigatorButtons: {screenBackgroundColor: '#fff'}
                },
                appStyle: {
                    navBarHidden: true,
                    orientation: 'portrait',
                    bottomTabBadgeTextColor: 'white',
                    bottomTabBadgeBackgroundColor: 'white',
                    hideBackButtonTitle: true/false
                },
                animationType: 'fade'
            });
        }, 1000);

        Navigation.dismissModal({
            animationType: 'slide-down'
        });
    }

    onLoadStart(){
        Variables.state.buffering = true;
    }

    onLoad = (data) => {
        Variables.state.duration = data.duration;
        Variables.state.buffering = false;
    };

    onBuffer(){
        Variables.state.buffering = true;
    }

    onProgress = (data) => {
        Variables.state.buffering = false;
        Variables.state.currentTime = data.currentTime;

        if(Variables.state.seekForward == true){
            this.player.seek(Variables.state.currentTime + 15);
            Variables.state.seekForward = false;
        }
        if(Variables.state.seekBackward == true){
            this.player.seek(Variables.state.currentTime - 15);
            Variables.state.seekBackward = false;
        }

        if(Variables.state.seekTo != 0){
            Variables.state.currentTime = Variables.state.seekTo;
            this.player.seek(Variables.state.seekTo);
            Variables.state.seekTo = 0;
        }

        if(Variables.state.highlight){
            if(Variables.state.currentTime >= Variables.state.highlightEnd){
                Variables.state.seekTo = 0.1;
            }
        }
    };

    _renderPlayer = () => {
        if(Variables.state.podcastURL){
            return(
                <Video source={{uri: Variables.state.podcastURL}}   // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}                                      // Store reference
                       rate={1}                              // 0 is paused, 1 is normal.
                       volume={1}                            // 0 is muted, 1 is normal.
                       muted={false}                           // Mutes the audio entirely.
                       paused={Variables.state.paused}          // Pauses playback entirely.
                       repeat={true}                           // Repeat forever.
                       playInBackground={true}                // Audio continues to play when app entering background.
                       playWhenInactive={true}                // [iOS] Video continues to play when control or notification center are shown.
                       ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                       progressUpdateInterval={250.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                       onLoadStart={this.onLoadStart}            // Callback when video starts to load
                       onLoad={this.onLoad}               // Callback when video loads
                       onProgress={this.onProgress}               // Callback every ~250ms with currentTime
                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                />
            )
        }
    };

    _renderPodcastTitle(isPlaying) {
        let podTitle = Variables.state.podcastTitle;
        if(podTitle.toString().length > width/5 ){
            podTitle = (podTitle.slice(0,width/5)+"...")
        }

        if (isPlaying) {
            return (
                <Text style={styles.podcastText}>{podTitle}</Text>
            );
        }
        if (Variables.state.podcastTitle =='') {
            return (
                <Text style={styles.podcastText}> </Text>
            );
        }
        else{
            return (
                <Text style={styles.podcastText}>{podTitle}</Text>
            );
        }
    }


    _renderPodcastArtist(isPlaying) {
        let profileName = Variables.state.currentUsername;
        if(profileName.toString().length > width/10 ){
            profileName = (profileName.slice(0,width/10)+"...")
        }

        if(Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextArtist}> </Text>
            );
        }
        else{
            return (
                <Text onPress={() => {
                    this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                }} style={styles.podcastTextArtist}>{profileName}</Text>
            );
        }

    }

    _renderCategory(){

        if(Variables.state.podcastCategory.length > 0){
            return(
                <TouchableOpacity onPress={() => {
                    this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                }}>
                    <Text style={styles.podcastTextCat}>{Variables.state.podcastCategory}</Text>
                </TouchableOpacity>
            )
        }

    }

    _renderCurrentTime(currentTime) {

        var num = ((currentTime) % 60).toString();
        var num2 = ((currentTime) / 60).toString();
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));


        if (Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextNum}></Text>
            );
        }
        else if (currentTime == -1){
            return (
                <Text style={styles.podcastTextNum}>0:00</Text>
            )
        }
        else if(Number(num2) < 10){
            var minutes = num2.slice(0,1);
            Number(minutes.slice(0,1));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:{seconds}</Text>
                );
            }
        }
        else if(Number(num2) < 100){
            var minutes = num2.slice(0,2);
            Number(minutes.slice(0,2));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:{seconds}</Text>
                );
            }
        }
        else{
            var minutes = num2.slice(0,3);
            Number(minutes.slice(0,3));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>{minutes}:{seconds}</Text>
                );
            }
        }

    }

    _renderEndTime() {


        if(Variables.state.highlight){
            var num = ((Variables.state.duration - Variables.state.currentTime - (Variables.state.duration-Variables.state.highlightEnd)) % 60).toString();
            var num2 = ((Variables.state.duration - Variables.state.currentTime - (Variables.state.duration-Variables.state.highlightEnd)) / 60).toString();

        }
        else{
            var num = ((Variables.state.duration - Variables.state.currentTime) % 60).toString();
            var num2 = ((Variables.state.duration - Variables.state.currentTime) / 60).toString();

        }
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));


        if (Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextNum}></Text>
            );
        }
        else if(Number(num2) < 10){
            var minutes = num2.slice(0,1);
            Number(minutes.slice(0,1));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:{seconds}</Text>
                );
            }
        }
        else if(Number(num2) < 100){
            var minutes = num2.slice(0,2);
            Number(minutes.slice(0,2));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:{seconds}</Text>
                );
            }
        }
        else{
            var minutes = num2.slice(0,3);
            Number(minutes.slice(0,3));
            if(Number(num) < 10){
                var seconds = num.slice(0,1);
                Number(seconds.slice(0,1));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:0{seconds}</Text>
                )
            }
            else{
                var seconds = num.slice(0,2);
                Number(seconds.slice(0,2));
                return (
                    <Text style={styles.podcastTextNum}>-{minutes}:{seconds}</Text>
                );
            }
        }

    }

    _renderSlider(currentTime){
        if(Variables.state.highlight){
            return(
                <Slider
                    minimumTrackTintColor='#5757FF'
                    maximumTrackTintColor='#E7E7F0'
                    thumbStyle={{width: 25, height: 25, borderRadius: 12.5, backgroundColor: '#506dcf', borderColor: '#506dcf', borderWidth: 2}}
                    animateTransitions = {true}
                    style={styles.sliderContainer}
                    step={0}
                    minimumValue={Variables.state.highlightStart}
                    maximumValue= { Math.abs( Variables.state.highlightEnd)}
                    value={ currentTime }
                    onValueChange={currentTime => {
                        Variables.state.seekTo = currentTime;
                        this.setState({
                            scrollEnabled: false
                        })
                    }}
                    onSlidingComplete={()=>{
                        this.setState({
                            scrollEnabled: true
                        })
                    }}
                />
            )

        }
        else{
            return(
                <Slider
                    minimumTrackTintColor='#5757FF'
                    maximumTrackTintColor='#E7E7F0'
                    thumbStyle={{width: 25, height: 25, borderRadius: 12.5, backgroundColor: '#506dcf', borderColor: '#506dcf', borderWidth: 2}}
                    animateTransitions = {true}
                    style={styles.sliderContainer}
                    step={0}
                    minimumValue={0}
                    maximumValue= { Math.abs( Variables.state.duration)}
                    value={ currentTime }
                    onValueChange={currentTime => {
                        Variables.state.seekTo = currentTime;
                        this.setState({
                            scrollEnabled: false
                        })
                    }}
                    onSlidingComplete={()=>{
                        this.setState({
                            scrollEnabled: true
                        })
                    }}
                />

            )
        }
    }

    _renderPlayButton2(isPlaying, buffering) {

        if (isPlaying) {

            if(buffering){
                return(
                    <ActivityIndicator style={{paddingVertical: height/66.7, alignSelf:'center'}} color='#2A2A30' size ="large" />
                )
            }
            else{
                return (
                    <TouchableOpacity onPress={this.pause}>
                        <Icon style={{textAlign:'center', fontSize: height/13.34, color:'#2A2A30' }}  name="ios-pause">
                        </Icon>
                    </TouchableOpacity>
                );
            }
        }
        else {
            return (
                <TouchableOpacity onPress={this.play}>
                    <Icon style={{textAlign:'center', fontSize: height/13.34, color:'#2A2A30' }}  name="md-play">
                    </Icon>
                </TouchableOpacity>
            );
        }
    }

    _renderPodcastImageBig(profileImage){
        if(Variables.state.podcastTitle != ''){

            if (profileImage == ''){
                return(
                    <TouchableHighlight underlayColor="#fff" onPress={() => {
                        this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                    }} style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginBottom: height/66.7, height: height/4.75, width: height/4.75, borderRadius: 4, borderWidth: 8, borderColor:'rgba(320,320,320,0.8)',  shadowOffset:{  width: 0,  height: 10}, shadowOpacity: 0.5, shadowRadius: 10,  }}>
                        <Icon style={{
                            textAlign: 'center',
                            fontSize: height/7.41,
                            color: 'white',
                            marginTop: height/33.35,
                        }} name="md-person">
                        </Icon>
                    </TouchableHighlight>
                )
            }
            else{
                return(
                    <TouchableHighlight underlayColor="#fff" onPress={() => {
                        this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                    }} style={{backgroundColor:'transparent', alignSelf: 'center', marginBottom: height/66.7, height: height/4.75, width: height/4.75,  shadowOffset:{  width: 0,  height: 10}, shadowOpacity: 0.5, shadowRadius: 10,  }}>
                        <Image
                            style={{width: height/4.75, height:height/4.75,  alignSelf: 'center', opacity: 1, borderRadius: 4, borderWidth: 0.1, borderColor: 'transparent'}}
                            source={{uri: profileImage}}
                        />
                    </TouchableHighlight>
                )
            }

        }
    }

    _renderPodcastSpeed(speed){
        return(
            <TouchableOpacity onPress={() => {
                this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
            }}>
                <Text style = {styles.podcastTextSpeed}>{speed.toFixed(2)}x</Text>
            </TouchableOpacity>
        )
    }


    _renderLikes(likers, liked){

        if(Variables.state.podcastTitle == ''){
            return;
        }
        if(Variables.state.podcastID != ''){

            if (liked) {
                return (
                    <TouchableOpacity onPress={() => {
                        this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                    }}>
                        <Icon style={{textAlign: 'center', fontSize: width/12, color: '#506dcf', marginRight: width/12.5}} name="md-happy">
                        </Icon>
                    </TouchableOpacity>
                )
            }
            else{
                return(
                    <TouchableOpacity onPress={() => {
                        this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                    }}>
                        <Icon style={{textAlign: 'center', fontSize: width/12, color: '#BBBCCD', marginRight: width/12.5}} name="md-happy">
                        </Icon>
                    </TouchableOpacity>
                )
            }

        }

    }

    renderPodcastInfo(){
        if(Variables.state.podcastsPlays == 1){
            if(Variables.state.likers.length == 1){
                return(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                        }} style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.likers.length} like</Text>
                        </TouchableHighlight>
                        <View style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.podcastsPlays} listen</Text>
                        </View>
                    </View>
                )
            }
            else{
                return(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                        }} style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.likers.length} likes</Text>
                        </TouchableHighlight>
                        <View style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.podcastsPlays} listen</Text>
                        </View>
                    </View>
                )
            }
        }
        else{
            if(Variables.state.likers.length == 1){
                return(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                        }} style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.likers.length} like</Text>
                        </TouchableHighlight>
                        <View style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.podcastsPlays} listens</Text>
                        </View>
                    </View>
                )
            }
            else{
                return(
                    <View style={{flexDirection: 'row'}}>
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                        }} style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.likers.length} likes</Text>
                        </TouchableHighlight>
                        <View style={{flex:1}}>
                            <Text style={styles.textLike}>{Variables.state.podcastsPlays} listens</Text>
                        </View>
                    </View>
                )
            }
        }
    }

    scrubForward = () => {
        Variables.state.seekForward = true;
    };

    scrubBackward = () => {
        Variables.state.seekBackward = true;
    };

    play = () =>  {
        Variables.state.paused = false;
    };

    pause = () =>  {
        Variables.state.paused = true;
    };


    render() {

        return (
            <View style={styles.container}>
                <ScrollView
                    scrollEnabled={this.state.scrollEnabled}
                    ref={ref => this.scroll = ref}
                    style={styles.containerModal}>

                    <StatusBar
                        hidden={true}
                    />

                    <View style = {{flexDirection: 'row'}}>

                        <TouchableOpacity onPress={this.close} style={{alignItems:'flex-start', flex: 1, marginVertical: height/66.7, marginHorizontal: width/18.75}}>
                            <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="ios-arrow-down">
                            </Icon>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                        }} style={{alignItems:'flex-end', flex: 1, marginVertical: height/66.7, marginHorizontal: width/18.75}}>
                            <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="md-list-box">
                            </Icon>
                        </TouchableOpacity>

                    </View>


                    {this._renderPodcastImageBig(Variables.state.userProfileImage)}


                    <View style={{marginTop: height/35, flex:1}}>
                        {this._renderPodcastTitle(Variables.state.isPlaying)}
                        <View style={{alignSelf: 'center'}}>
                            {this._renderPodcastArtist(Variables.state.isPlaying)}
                        </View>
                        {this._renderCategory()}
                    </View>


                    <TouchableOpacity style = {{marginTop: height/28, marginBottom: height/28, marginHorizontal: width/4.17, borderRadius: 7, backgroundColor: '#506dcf', padding: width/75}}
                                      onPress={() => {
                                          this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                                      }}>
                        <Text style = {styles.highlightText}>Begin Highlight</Text>
                    </TouchableOpacity>


                    <View style={styles.centerContainerButtons}>

                        <View style={styles.leftContainerP}>
                            <TouchableOpacity onPress={this.scrubBackward}>
                                <Icon style={{flex: 1, textAlign:'center', fontSize: height/25, color:'#2A2A30' }} name="ios-rewind">
                                </Icon>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.middleContainer}>
                            <TouchableOpacity>
                                {this._renderPlayButton2(!Variables.state.paused, Variables.state.buffering)}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.rightContainerP}>
                            <TouchableOpacity onPress={this.scrubForward}>
                                <Icon style={{flex: 1, textAlign:'center', fontSize: height/25,color:'#2A2A30' }} name="ios-fastforward">
                                </Icon>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.centerContainerPlayer}>

                        <View style={styles.leftContainer}>
                            {this._renderCurrentTime(Variables.state.currentTime)}
                        </View>

                        <View style={styles.rightContainer}>
                            {this._renderEndTime()}
                        </View>

                    </View>


                    {this._renderSlider(Variables.state.currentTime)}


                    <View style={{flexDirection: 'row', flex: 1,}}>

                        <View style={{alignItems:'flex-start', flex: 1}}>
                            {this._renderPodcastSpeed(Variables.state.podcastSpeed)}
                        </View>

                        <View style={{alignItems: 'center', flex: 1}}>

                            <TouchableOpacity onPress={() => {
                                this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                            }} style={{alignItems:'center', flex: 1}}>
                                <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#BBBCCD' }} name="ios-more">
                                </Icon>
                            </TouchableOpacity>

                        </View>

                        <View style={{alignItems: 'flex-end', flex:1}}>
                            {this._renderLikes(Variables.state.likers, Variables.state.liked)}
                        </View>


                    </View>

                    <View style={{marginVertical: height/90}}>
                        {this.renderPodcastInfo()}
                    </View>

                    <TouchableOpacity  onPress={() => {
                        this.scroll.scrollTo({x: 0, y: height-(height/2), animated: true});
                    }}>
                        <View style={{marginTop: height/44.47}}>
                            <Icon style={{textAlign:'center', fontSize: width/10.71, color:'#506dcf', }} name="md-chatboxes">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.close}>
                        <Text style={styles.login}>Login Now</Text>
                    </TouchableOpacity>


                </ScrollView>

                {this._renderPlayer()}

            </View>
        );
    }
}

const styles = {

    login:{
        color: '#506dcf',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/15,
        textAlign: 'center',
        marginVertical: height/20
    },

    sliderContainer: {
        width: width-40,
        alignSelf: 'center'
    },
    leftContainer: {
        paddingLeft: width/37.5,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    leftContainerP: {
        flex:1,
        marginTop: height/66.7,
        paddingLeft: 0,
        justifyContent: 'center',
        alignItems:'flex-end',
    },
    centerContainer: {
        marginTop: height/133.4,
        flexDirection: 'row',
    },

    centerContainerPlayer: {
        flexDirection: 'row',
    },
    centerContainerButtons: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: height/66.7,
        paddingBottom: height/66.7,
    },
    rightContainer: {
        flex: 1,
        paddingRight: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    rightContainerP: {
        flex: 1,
        paddingRight: 0,
        marginTop: height/66.7,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    container:{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 0,
    },

    containerModal:{
        flex: 1,
        flexDirection: 'column',

        borderColor: 'transparent',
    },

    containerOutsideModal:{
        flex: 1,

    },

    homeContainer:{
        marginTop: -(height/44.47),
    },

    title: {
        color: '#3e4164',
        marginTop: height/9.53,
        flex:1,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/15,

        paddingBottom: height/66.7
    },
    title2: {
        color: 'rgba(1,170,170,1)',
        flex: 1,
        textAlign: 'center',
        fontSize: width/18.75,
    },

    podcastText:{
        color: '#3e4164',
        fontSize: width/25,
        marginTop: height/133.4,
        marginHorizontal: width/37.5,
        flexDirection: 'row',

        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
    textDescription:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/27,

        marginBottom: height/60,
        marginHorizontal: width/18.75,
        paddingBottom: height/33.35,
    },
    highlightTitle:{
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/20,

        marginLeft: height/33.35,
        marginTop: height/28,
        marginBottom: height/66.7
    },

    seeMore:{
        color: '#506dcf',
        fontSize: width/26.79,
        marginBottom: height/133.4,
        flexDirection: 'row',

        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
    podcastTextNum:{
        color: '#BBBCCD',
        fontSize: width/23.44,
        marginTop: height/133.4,
        flexDirection: 'row',

        marginHorizontal: width/25,
        fontFamily: 'Montserrat-Regular',
    },

    podcastHighlightNum:{
        color: '#3e4164',
        fontSize: width/26.79,
        marginBottom: height/33.35,
        flexDirection: 'row',

        alignSelf: 'center',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
    },
    textLike:{
        color: '#506dcf',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily:  'Montserrat-Bold',
        fontSize: width/26.79,

        marginTop: height/66.7,
        marginHorizontal: width/18.75,
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    podcastTextLikes:{
        color: '#BBBCCD',
        fontSize: width/23.44,

        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    podcastTextLikesActive:{
        color: '#BBBCCD',
        fontSize: width/23.44,

        textAlign: 'center',
        fontFamily: 'Montserrat-Regular',
    },
    podcastTextArtist:{
        color:'#3e4164',
        fontSize: width/25,
        marginHorizontal: width/37.5,
        flexDirection: 'row',

        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
        marginTop: height/111.17,
    },
    podcastTextSpeed:{
        color: '#828393',
        fontSize: width/18.75,
        marginHorizontal: width/12.5,
        marginTop: height/133.4,

        textAlign: 'center'
    },

    podcastTextCat:{
        color:'#828393',
        fontSize: width/26.79,
        flexDirection: 'row',

        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
        marginTop: height/111.17,
    },

    input: {
        height: height/16.68,
        width: width/1.25,
        marginBottom: height/66.7,
        color:'#FFF',
        paddingHorizontal: width/37.5,
        fontSize: width/17.05,
        alignSelf: 'center',
        textAlign: 'center'
    },

    highlightText: {
        color:'#fff',
        fontSize: width/23.44,
        flexDirection: 'row',

        alignSelf: 'center',
        fontFamily: 'Montserrat-Regular',
    }
};


export default PlayerPreview;