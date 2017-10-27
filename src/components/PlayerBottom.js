import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, Modal, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from './Variables';
import {PodcastFile} from './Variables';
import Slider from 'react-native-slider';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';





class PlayerBottom extends Component {
    constructor() {
        super();
        this.tick = this.tick.bind(this);
        this.play=this.play.bind(this);
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
        likes: 12
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
        PodcastFile.getCurrentTime((seconds) => {
            this.setState({
                currentTime: seconds
            });
        })

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


    _renderPlayButton(isPlaying) {

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
                    width: (Variables.state.currentTime / PodcastFile.getDuration()) * 340,
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


    _renderDescription(){
        if (Variables.state.podcastTitle == ''){
            return(
                <View style={{ marginTop: 20}}>
                <ScrollView style={{marginHorizontal: 20, marginBottom: 20, backgroundColor: '#6e89e7', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Futura', textAlign: 'center'  }}>Select a Podcast to start listening....</Text>
                </ScrollView>
                </View>
            )
        }
        else{
            return(
                <View style={{ marginTop: 20}}>
                    <Text style={styles.podcastText}> description </Text>
                <ScrollView style={{marginHorizontal: 20, marginBottom: 20, backgroundColor: '#6e89e7', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Futura' }}>{Variables.state.podcastDescription}</Text>
                </ScrollView>
                </View>
            )
        }
    }

    _renderCategory(){

        if (Variables.state.podcastCategory == 'fitness'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Fitness</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'current'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Current Events</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'politics'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Politics</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'gaming'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Gaming</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'sports'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Sports</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'entertainment'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Entertainment</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'life'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Life</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'fashion'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Fashion</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'trends'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Trends</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'cars'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Cars</Text>
                </TouchableOpacity>
            )
        }
        if (Variables.state.podcastCategory == 'misc'){
            return(
                <TouchableOpacity>
                    <Text style={styles.podcastTextCat}>Misc</Text>
                </TouchableOpacity>
            )
        }

    }


    _renderPodcastArtist(isPlaying) {
        let profileName = Variables.state.currentUsername;

        if (isPlaying) {
            return (
                <Text onPress = {this.onProfilePress} style={styles.podcastTextArtist}>by {profileName}</Text>
            );
        }
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
                    <Icon style={{textAlign: 'center', fontSize: 20, color: '#BBBCCD'}} name="ios-happy">
                        <Text style={styles.podcastTextLikes}>   {this.state.likes}</Text>
                    </Icon>
                </TouchableOpacity>
            )
        }
        else if (!this.state.liked){
            return(
                <TouchableOpacity onPress = {this.pressLike}>
                    <Icon style={{textAlign: 'center', fontSize: 20, color: '#BBBCCD'}} name="ios-happy">
                        <Text style={styles.podcastTextLikes}>   {this.state.likes}</Text>
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
        var num = (PodcastFile.getDuration() / 60).toString();
        num = num.slice(0,1);
        Number(num);
        var num2 = (PodcastFile.getDuration() % 60).toString();
        num2 = num2.slice(0,2);
        Number(num2);

        if (Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextNum}>-</Text>
            );
        }
        else if ((PodcastFile.getDuration() % 60) < 10){
            return(
                <Text style={styles.podcastTextNum}>{num}:0{num2.slice(0,1)}</Text>
            );
        }
        else{
            return (
                <Text style={styles.podcastTextNum}>{num.slice(0,1)}:{num2}</Text>
            );
        }
    }

    _renderCurrentTime() {

        var num = (this.state.currentTime / 60).toString();
        num = num.slice(0,1);
        Number(num);
        var num2 = (this.state.currentTime % 60).toString();
        num2 = num2.slice(0,2);
        Number(num2);


        if (Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextNum}>-</Text>
            );
        }
        else if(Variables.state.currentTime % 60 < 10){

            return (
                <Text style={styles.podcastTextNum}>{num}:0{num2.slice(0,1)}</Text>
            )
        }
        else{
            return (
                <Text style={styles.podcastTextNum}>{num.slice(0,1)}:{num2}</Text>
            );
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
        Actions.UserProfile();
    };

    pressLike = () => {
        if(this.state.liked){
            this.setState({ liked: false, likes: this.state.likes-1})
        }
        else if (!this.state.liked){
            this.setState({ liked: true, likes: this.state.likes+1})
        }
    };






    render() {
        return (

            <View style={styles.barContainer}>


                <View style={styles.centerContainer}>

                    <View style={styles.leftContainer}>
                        <TouchableOpacity onPress={this.ExpandPlayer}>
                            <Icon style={{marginTop:-4, marginBottom: -17, textAlign:'left',fontSize: 60,color:'#FFF' }} name="md-square">
                            </Icon>
                        </TouchableOpacity>
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



                        <View style={{width: 267, height: 267, marginTop: 30, alignSelf: 'center', borderRadius: 10, borderWidth: 5, borderColor: 'rgba(170,170,170,0.1)', backgroundColor: 'rgba(170,170,170,0.5)',  }}  />


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


                        <Slider
                            minimumTrackTintColor='#5757FF'
                            maximumTrackTintColor='#E7E7F0'
                            thumbTintColor='#5757FF'
                            thumbTouchSize={{width: 20, height: 20}}
                            animateTransitions = {true}
                            style={styles.sliderContainer}
                            step={0}
                            minimumValue={0}
                            maximumValue= { Math.abs( PodcastFile.getDuration())}
                            value={ this.state.currentTime }
                            onValueChange={currentTime => PodcastFile.setCurrentTime(currentTime)}


                        />


                        <View style={{flexDirection: 'row', flex: 1, marginTop: 10}}>

                            <View style={{alignItems:'flex-start', flex:1}}>
                                <TouchableOpacity>
                                    <Icon style={{textAlign:'center', fontSize: 28, marginLeft: 20, color:'#BBBCCD' }} name="md-checkmark">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                            <View style={{alignItems: 'center', flex:1}}>
                                <TouchableOpacity>
                                    <Icon style={{textAlign:'center', fontSize: 28,color:'#BBBCCD' }} name="md-add">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                            <View style={{alignItems: 'flex-end', flex:1}}>
                                <TouchableOpacity onPress = {this.pressLike}>
                                    <Icon style={{textAlign: 'center', fontSize: 28, color: '#BBBCCD', marginRight: 20}} name="ios-happy-outline">
                                        <Text style={styles.podcastTextLikes}> {this.state.likes}</Text>
                                    </Icon>
                                </TouchableOpacity>
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
        bottom: 50,
        paddingBottom: 5,
        borderWidth: 0.3,
        borderColor: '#5757FF',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    playingText:{
        color: '#FFF',
        marginTop:2,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 14,
        textAlign: 'left',
        paddingLeft: 10
    },
        playingText2:{
            color: '#FFF',
            marginTop:2,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            fontStyle: 'normal',
            fontFamily: 'Helvetica',
            fontSize: 13,
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
        width: PodcastFile.getCurrentTime((seconds) => console.log('at ' + seconds)) / PodcastFile.getDuration() * 250,
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
            fontFamily: 'Helvetica',
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
            fontFamily: 'Helvetica',
        },
        podcastTextNum:{
            color: '#BBBCCD',
            fontSize: 12,
            marginTop: 5,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            marginHorizontal: 10,
            fontFamily: 'Helvetica',
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
            fontFamily: 'Helvetica',
        },
        podcastTextArtist:{
            color:'#2A2A30',
            fontSize: 20,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignSelf: 'center',
            fontFamily: 'Helvetica',
            marginTop: 6,
        },

        podcastTextCat:{
            color:'#828393',
            fontSize: 14,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignSelf: 'center',
            fontFamily: 'Helvetica',
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