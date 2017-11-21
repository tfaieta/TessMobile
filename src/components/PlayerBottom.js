import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, Modal, TouchableOpacity, Alert, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from './Variables';
import {podcastPlayer} from './Variables';
import Slider from 'react-native-slider';
import firebase from 'firebase';



class PlayerBottom extends Component {
    constructor() {
        super();
        this.tick = this.tick.bind(this);
        this.play=this.play.bind(this);

        setInterval(() => {
            this.setState({profileImage: Variables.state.userProfileImage});
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

        },500);
    }

    state = {
        isPlaying: true,
        podProgress: Variables.state.podProgress,
        currentTime: Variables.state.currentTime,
        interval: Variables.state.interval,
        podcastTitle: Variables.state.podcastTitle,
        podcastDescription: Variables.state.podcastDescription,
        comment: '',
        modalVisible: false,
        liked: false,
        likes: 12,
        profileImage: '',
    };



    componentWillMount(){
        if(this.state.isPlaying){
            this.setState({
                interval: setInterval(this.tick, 250)
            });
        }
        else {
            this.setState({
                interval: clearInterval(this.state.interval)
            });
            Variables.pause();
        }
    }

    componentWillUnmount() {
        this.setState({
            interval: clearInterval(this.state.interval)
        });
    }

    tick() {
        if(podcastPlayer.isPlaying){
            this.setState({ currentTime: podcastPlayer.currentTime})
        }
    }

    play = () =>  {
        this.setState({
            isPlaying: true,
            interval: setInterval(this.tick, 250)
        });

        Variables.play()


    };


    pause = () =>  {
        this.setState({
            isPlaying: false,
            interval: clearInterval(this.state.interval)
        });
       Variables.pause();


    };


    _renderSlider(currentTime){
        return(
            <Slider
                minimumTrackTintColor='#5757FF'
                maximumTrackTintColor='#E7E7F0'
                thumbTintColor='#5757FF'
                thumbTouchSize={{width: 20, height: 20}}
                animateTransitions = {true}
                style={styles.sliderContainer}
                step={0}
                minimumValue={0}
                maximumValue= { Math.abs( podcastPlayer.duration)}
                value={ currentTime }
                onValueChange={currentTime => podcastPlayer.seek(currentTime)}
            />
        )
    }

    _renderPodcastImage(){
        if(Variables.state.podcastTitle != ''){

                if (this.state.profileImage == ''){
                    return(
                        <TouchableOpacity onPress={this.ExpandPlayer}>
                            <View style={{backgroundColor:'rgba(130,131,147,0.4)', height: 45, width: 45, borderRadius:4, borderWidth:1, borderColor:'rgba(320,320,320,1)'}}>
                                <Icon style={{
                                    textAlign: 'center',
                                    fontSize: 24,
                                    color: 'white',
                                    marginTop: 10
                                }} name="md-person">
                                </Icon>
                            </View>
                        </TouchableOpacity>
                    )
                }
                else{
                    return(
                        <View style={{backgroundColor:'transparent', alignSelf: 'center', height: 45, width: 45  }}>
                            <Image
                                style={{width: 45, height:45, position: 'absolute', alignSelf: 'center', opacity: 1, borderRadius: 5, borderWidth: 0.1, borderColor: 'transparent'}}
                                source={{uri: this.state.profileImage}}
                            />
                        </View>
                    )
                }

        }
    }

    _renderPlayButton(isPlaying) {
        if(Variables.state.podcastTitle != ''){
            if (isPlaying) {
                return (
                    <TouchableOpacity onPress={this.pause}>
                        <Icon style={{
                            textAlign: 'right',
                            marginRight: 0,
                            marginLeft: 0,
                            paddingTop: 0,
                            fontSize: 30,
                            color: '#FFF'
                        }} name="md-pause">
                        </Icon>
                    </TouchableOpacity>
                );
            }
            else {
                return (
                    <TouchableOpacity onPress={this.play}>
                        <Icon style={{
                            textAlign: 'right',
                            marginRight: 0,
                            marginLeft: 0,
                            paddingTop: 0,
                            fontSize: 30,
                            color: '#FFF'
                        }} name="md-play">
                        </Icon>
                    </TouchableOpacity>
                );
            }
        }

    }



    _renderPodcastInfo(){
        let profileName = Variables.state.currentUsername;

        if(Variables.state.podcastTitle =='') {
            return (
                <Text> </Text>
            )
        }
        else{
            return (
                <View style={{marginTop:6}}>
                    <Text style={styles.playingText}>{Variables.state.podcastTitle}</Text>
                    <Text style={styles.playingText2}>by {profileName}</Text>
                </View>
            )
        }

}


    _renderFillBar(isPlaying){
        if(isPlaying) {
            return (
                <View style = {{
                    width: (Variables.state.currentTime / podcastPlayer.duration) * 340,
                    height: 6,
                    backgroundColor: 'rgba(170,170,170,0.7)',}}
                >
                </View>
            )
        }


    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    ExpandPlayer = () => {
        this.setModalVisible(true)
    };

    Close = () => {
        this.setModalVisible(!this.state.modalVisible)
    };




    _renderPlayButton2(isPlaying) {

        if (isPlaying) {
            return (
                <TouchableOpacity onPress={this.pause}>
                    <Icon style={{textAlign:'center',paddingHorizontal: 20, fontSize: 50, marginLeft: 20, color:'#2A2A30' }}  name="ios-pause">
                    </Icon>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity onPress={this.play}>
                    <Icon style={{textAlign:'center',paddingHorizontal: 20, fontSize: 50, marginLeft: 20, color:'#2A2A30' }}  name="md-play">
                    </Icon>
                </TouchableOpacity>
            );
        }
    }


    _renderPodcastTitle(isPlaying) {
        if (isPlaying) {
            return (
                <Text style={styles.podcastText}>{Variables.state.podcastTitle}</Text>
            );
        }
        if (Variables.state.podcastTitle =='') {
            return (
                <Text style={styles.podcastText}>Select a Podcast to start listening....</Text>
            );
        }
        else{
            return (
                <Text style={styles.podcastText}>{Variables.state.podcastTitle}</Text>
            );
        }
    }



    _renderPodcastImageBig(){
        if(Variables.state.podcastTitle != ''){

            if (this.state.profileImage == ''){
                return(
                    <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'center', marginTop: 20, marginRight:20,marginLeft: 20, height: 160, width: 160, borderRadius:10, borderWidth:8, borderColor:'rgba(320,320,320,0.8)'  }}>
                        <Icon style={{
                            textAlign: 'center',
                            fontSize: 100,
                            color: 'white',
                            marginTop: 25
                        }} name="md-person">
                        </Icon>
                    </View>
                )
            }
            else{
                return(
                    <View style={{backgroundColor:'transparent', alignSelf: 'center', marginTop: 20, height: 160, width: 160  }}>
                        <Image
                            style={{width: 160, height:160,  alignSelf: 'center', opacity: 1, borderRadius: 10, borderWidth: 0.1, borderColor: 'transparent'}}
                            source={{uri: this.state.profileImage}}
                        />
                    </View>
                )
            }

        }
    }



    _renderDescription(){
        if (Variables.state.podcastTitle == ''){
            return(
                <View style={{ marginTop: 20}}>
                <ScrollView style={{marginHorizontal: 20, marginBottom: 20, backgroundColor: '#5757FF', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'HiraginoSans-W3', textAlign: 'center'  }}>Select a Podcast to start listening....</Text>
                </ScrollView>
                </View>
            )
        }
        else{
            return(
                <View style={{ marginTop: 20}}>
                <ScrollView style={{marginHorizontal: 20, marginBottom: 20, backgroundColor: '#5757FF', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'HiraginoSans-W3' }}>{Variables.state.podcastDescription}</Text>
                </ScrollView>
                </View>
            )
        }
    }

    _renderCategory(){

        return(
            <TouchableOpacity onPress={this.onCategoryPress}>
                <Text style={styles.podcastTextCat}>{Variables.state.podcastCategory}</Text>
            </TouchableOpacity>
        );

    }


    _renderPodcastArtist(isPlaying) {
        let profileName = Variables.state.currentUsername;
        if(Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextArtist}> </Text>
            );
        }
        else{
            return (
                <Text onPress = {this.onProfilePress} style={styles.podcastTextArtist}>by {profileName}</Text>
            );
        }

    }


    _renderLikes(){
        if(Variables.state.podcastTitle == ''){
            return;
        }
        if (this.state.liked) {
            return (
                <TouchableOpacity onPress = {this.pressLike}>
                    <Icon style={{textAlign: 'center', fontSize: 28, color: '#5757FF', marginRight: 20}} name="ios-happy-outline">
                        <Text style={styles.podcastTextLikesActive}> {this.state.likes}</Text>
                    </Icon>
                </TouchableOpacity>
            )
        }
        else if (!this.state.liked){
            return(
                <TouchableOpacity onPress = {this.pressLike}>
                    <Icon style={{textAlign: 'center', fontSize: 28, color: '#BBBCCD', marginRight: 20}} name="ios-happy-outline">
                        <Text style={styles.podcastTextLikes}> {this.state.likes}</Text>
                    </Icon>
                </TouchableOpacity>
            )
        }
    }

    _renderComments(){
        if(Variables.state.podcastTitle == ''){
            return;
        }

        return(
            <View>
                <Text style={styles.podcastText}> comments </Text>


                <View style={{marginHorizontal: 20, marginBottom: 2, backgroundColor: '#6e89e7', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}}>
                    <Icon style={{textAlign:'center', fontSize: 40, paddingHorizontal: 10, color:'#fff' }} name="md-contact">
                        <Text style={styles.podcastText}> nice! </Text>
                    </Icon>
                </View>

                <View style={{marginHorizontal: 20, marginBottom: 2, backgroundColor: '#6e89e7', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}}>
                    <Icon style={{textAlign:'center', fontSize: 40, paddingHorizontal: 10, color:'#fff' }} name="md-contact">
                        <Text style={styles.podcastText}> i love you </Text>
                    </Icon>
                </View>

                <View style={{marginHorizontal: 20, marginBottom: 2, backgroundColor: '#6e89e7', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}}>
                    <TextInput style={styles.input}
                               placeholder = "write a comment..."
                               placeholderTextColor='#FFF'
                               returnKeyType='send'
                               multiline={true}
                               onChangeText={text => this.setState({ comment: text})}
                               onSubmitEditing={() => this.onCommentSubmit()}

                    />
                </View>
            </View>

        )


    }


    _renderEndTime() {

        var num = ((podcastPlayer.duration / 1000) % 60).toString();
        var num2 = ((podcastPlayer.duration / 1000) / 60).toString();
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

    _renderCurrentTime() {

        var num = ((podcastPlayer.currentTime / 1000) % 60).toString();
        var num2 = ((podcastPlayer.currentTime / 1000) / 60).toString();
        var minutes = num2.slice(0,1);
        Number(minutes.slice(0,1));


        if (Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextNum}></Text>
            );
        }
        else if (podcastPlayer.currentTime == -1){
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
        else{
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



    }


    onCommentSubmit(){
        const comment = this.state.comment;
        const currentUser = firebase.auth().uid;
        firebase.database().ref(`${Variables.state.currentRef}/comments`).push(comment, currentUser);
        this.state.comment = '';
    }

    onProfilePress = () => {
        this.setModalVisible(!this.state.modalVisible);
        this.props.navigator.push({
            screen: 'UserProfile',
            animated: true,
            animationType: 'fade',
        });
    };

    pressLike = () => {
        if(this.state.liked){
            this.setState({ liked: false, likes: this.state.likes-1})
        }
        else if (!this.state.liked){
            this.setState({ liked: true, likes: this.state.likes+1})
        }
    };


    onCategoryPress = () => {
        if(Variables.state.podcastCategory == 'Fitness'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'Fitness',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'News'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'News',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Gaming'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'Gaming',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Society & Culture'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'SocietyCulture',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Sports'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'Sports',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Entertainment'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'Entertainment',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Comedy'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'Comedy',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Learn Something'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'LearnSomething',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Lifestyle'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'Lifestyle',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Science & Nature'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'ScienceNature',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Storytelling'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'Storytelling',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Tech'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'Tech',
                animated: true,
                animationType: 'fade',
            });
        }
        else if(Variables.state.podcastCategory == 'Travel'){
            this.setModalVisible(!this.state.modalVisible);
            this.props.navigator.push({
                screen: 'Travel',
                animated: true,
                animationType: 'fade',
            });
        }
        else console.warn("Category not yet supported");
    };






    render() {
        return (

            <View style={styles.barContainer}>


                <View style={styles.centerContainer}>

                    <View style={styles.leftContainer}>
                        {this._renderPodcastImage()}
                    </View>
                    <TouchableOpacity onPress={this.ExpandPlayer}>
                    {this._renderPodcastInfo()}
                    </TouchableOpacity>

                    <View style={styles.rightContainer}>
                        <TouchableOpacity style={{marginRight: 10}}>
                            {this._renderPlayButton(Variables.state.isPlaying)}
                        </TouchableOpacity>
                    </View>

                </View>








                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >

                    <View
                        style={styles.containerModal}>

                        <StatusBar
                            hidden={true}
                        />

                        <TouchableOpacity onPress={this.Close} style={{alignItems:'center'}}>
                            <Icon style={{textAlign:'center', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 35,color:'#BBBCCD' }} name="ios-arrow-dropdown">
                            </Icon>
                        </TouchableOpacity>


                        {this._renderPodcastImageBig()}

                        {this._renderDescription()}



                        <View style={{marginTop: 20}}>
                                {this._renderPodcastTitle(Variables.state.isPlaying)}
                                <TouchableOpacity style={{alignSelf: 'center'}}>
                                    {this._renderPodcastArtist(Variables.state.isPlaying)}
                                </TouchableOpacity>
                                {this._renderCategory()}
                        </View>





                        <View style={styles.centerContainerButtons}>

                            <View style={styles.leftContainer}>
                                <TouchableOpacity>
                                    <Icon style={{textAlign:'center', marginRight:0,paddingLeft: 80,paddingTop: 0, fontSize: 25,color:'#2A2A30' }} name="md-rewind">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.middleContainer}>
                                <TouchableOpacity>
                                    {this._renderPlayButton2(Variables.state.isPlaying)}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.rightContainer}>
                                <TouchableOpacity>
                                    <Icon style={{textAlign:'center', paddingRight: 80,marginLeft: 0,paddingTop: 0, fontSize: 25,color:'#2A2A30' }} name="md-fastforward">
                                    </Icon>
                                </TouchableOpacity>
                            </View>


                        </View>


                        <View style={styles.centerContainer}>

                            <View style={styles.leftContainer}>
                                {this._renderCurrentTime()}
                            </View>

                            <View style={styles.rightContainer}>
                                {this._renderEndTime()}
                            </View>

                        </View>


                        {this._renderSlider(podcastPlayer.currentTime)}


                        <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>

                            <View style={{alignItems:'flex-start', flex:1}}>
                                <TouchableOpacity>
                                    <Icon style={{textAlign:'center', fontSize: 28, marginLeft: 20, color:'#BBBCCD' }} name="md-checkmark">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                            <View style={{alignItems: 'center', flex:1}}>
                                <TouchableOpacity>
                                    <Icon style={{textAlign:'center', fontSize: 28,color:'#BBBCCD' }} name="md-add" onPress={()=>{
                                        const {currentUser} = firebase.auth();
                                        const podcastTitle = Variables.state.podcastTitle;
                                        const podcastDescription = Variables.state.podcastDescription;
                                        const podcastCategory = Variables.state.podcastCategory;
                                        const podcastArtist = Variables.state.podcastArtist;
                                        if(podcastTitle != ''){
                                            if(podcastArtist != currentUser.uid){
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
                                            }
                                            else{
                                                Alert.alert(
                                                    'Cannot favorite your own podcast',
                                                    '',
                                                    [
                                                        {text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel'},

                                                    ],
                                                    {cancelable: false}
                                                )
                                            }
                                        }

                                    }}>
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                            <View style={{alignItems: 'flex-end', flex:1}}>
                                {this._renderLikes()}
                            </View>


                        </View>




                    </View>



                </Modal>



            </View>



        )
    }

}


    const styles = StyleSheet.create({
    barContainer:{
        flex: 1,
        backgroundColor: '#5757FF',
        marginHorizontal: 30,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: 5,
        borderWidth: 0.3,
        borderColor: '#5757FF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    playingText:{
        color: '#FFF',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 13,
        textAlign: 'left',
        paddingLeft: 10
    },
    playingText2:{
        color: '#FFF',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 12,
        textAlign: 'left',
        paddingLeft: 10
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    sliderContainer: {
        width: 280,
        alignSelf: 'center'
    },
    audioProgress: {
        marginTop: 0,
        flexDirection: 'row'
    },
    fillProgress: {
        width: podcastPlayer.currentTime / podcastPlayer.duration * 250,
        height: 8,
        backgroundColor: 'rgba(1,170,170,1)',
        borderWidth:0.1,
        borderRadius:10
    },
    emptyProgress: {
        width: 280,
        height: 8,
        backgroundColor: '#575757',
    },
    leftContainer: {
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    centerContainer: {
        marginTop:5,
        flexDirection: 'row',
    },
    centerContainerButtons: {
        flexDirection: 'row',
        paddingTop: 2,
        paddingBottom: 5,
        marginTop: 30
    },
    rightContainer: {
        flex: 1,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },

        container:{
            flex: 1,
            backgroundColor: '#fff',
            marginTop: 0,
        },

        containerModal:{
            flex: 1,
            backgroundColor: '#fff',
            marginTop: 5,
            marginHorizontal: 5,
            borderColor: '#rgba(170,170,170,0.2)',
            borderRadius: 10,
            borderWidth: 2
        },


        homeContainer:{
            marginTop: -15,
        },

        title: {
            color: '#2A2A30',
            marginTop: 70,
            flex:1,
            textAlign: 'center',
            fontStyle: 'normal',
            fontFamily: 'Hiragino Sans',
            fontSize: 25,
            backgroundColor: 'transparent',
            paddingBottom:10
        },
        title2: {
            color: 'rgba(1,170,170,1)',
            flex:1,
            textAlign: 'center',
            fontSize: 20
        },

        podcastText:{
            color: '#2A2A30',
            fontSize: 20,
            marginTop: 5,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignSelf: 'center',
            fontFamily: 'HiraginoSans-W6',
        },
        podcastTextNum:{
            color: '#BBBCCD',
            fontSize: 12,
            marginTop: 5,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            marginHorizontal: 10,
            fontFamily: 'Hiragino Sans',
        },

        middleContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        podcastTextLikes:{
            color: '#BBBCCD',
            fontSize: 12,
            marginLeft: 5,
            backgroundColor: 'transparent',
            alignSelf: 'center',
            fontFamily: 'Hiragino Sans',
        },
        podcastTextLikesActive:{
            color: '#5757FF',
            fontSize: 12,
            marginLeft: 5,
            backgroundColor: 'transparent',
            alignSelf: 'center',
            fontFamily: 'Hiragino Sans',
        },
        podcastTextArtist:{
            color:'#2A2A30',
            fontSize: 20,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignSelf: 'center',
            fontFamily: 'HiraginoSans-W3',
            marginTop: 6,
        },

        podcastTextCat:{
            color:'#828393',
            fontSize: 14,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignSelf: 'center',
            fontFamily: 'Hiragino Sans',
            marginTop: 6,
        },

        input: {
            height: 40,
            width: 300,
            marginBottom: 10,
            color:'#FFF',
            paddingHorizontal: 10,
            fontSize: 22,
            alignSelf: 'center',
            textAlign: 'center'
        },


});


    export default PlayerBottom;