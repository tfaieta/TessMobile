import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, Modal, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from './Variables';
import {PodcastFile} from './Variables';
import Slider from 'react-native-slider';
import firebase from 'firebase';





class PlayerBottom extends Component {
    constructor() {
        super();
        this.tick = this.tick.bind(this);
        this.play=this.play.bind(this);
    }

    state = {
        isPlaying: Variables.state.isPlaying,
        podProgress: Variables.state.podProgress,
        currentTime: Variables.state.currentTime,
        interval: Variables.state.interval,
        podcastTitle: Variables.state.podcastTitle,
        podcastDescription: Variables.state.podcastDescription,

        modalVisible: false
    }



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



    _renderPodcastInfo(isPlaying){
        let profileName = firebase.auth().currentUser.displayName;

        if(isPlaying) {
            return (
                <Text style={styles.playingText}>{Variables.state.podcastTitle} • {profileName}</Text>
            )
        }
        if(Variables.state.podcastTitle =='') {
            return (
                <Text style={styles.playingText}> </Text>
            )
        }
        else{
            return (
                <Text style={styles.playingText}>{Variables.state.podcastTitle} • {profileName}</Text>
            )
        }

}

    _renderFillBar(isPlaying){
        if(isPlaying) {
            return (
                <View style = {{
                    width: (Variables.state.currentTime / PodcastFile.getDuration()) * 380,
                    height: 8,
                    backgroundColor: 'rgba(1,170,170,1)',}}
                >
                </View>
            )
        }
        if (Variables.state.podcastTitle == '') {
            return (
                <View style = {{
                    width: 340,
                    height: 8,
                    backgroundColor: '#575757'}}
                >
                </View>
            )
        }
        else{
            return (
                <View style = {{
                    width: (this.state.currentTime / PodcastFile.getDuration()) * 380,
                    height: 8,
                    backgroundColor: 'rgba(1,170,170,1)',}}
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
                    <Icon style={{textAlign:'left', marginRight:0,marginLeft: 0,paddingHorizontal: 20, fontSize: 50,color:'#FFF' }}  name="md-pause">
                    </Icon>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity onPress={this.play}>
                    <Icon style={{textAlign:'left', marginRight:0,marginLeft: 0,paddingHorizontal: 20, fontSize: 50,color:'#FFF' }}  name="md-play">
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
                <Text style={styles.podcastText}> </Text>
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
                <ScrollView style={{marginHorizontal: 20, marginBottom: 20, backgroundColor: '#6e89e7', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Futura', textAlign: 'center'  }}>Select a Podcast to start listening....</Text>
                </ScrollView>
            )
        }
        else{
            return(
                <ScrollView style={{marginHorizontal: 20, marginBottom: 20, backgroundColor: '#6e89e7', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 10}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Futura' }}>{Variables.state.podcastDescription}</Text>
                </ScrollView>
            )
        }
    }

    _renderCategory(){

        if (Variables.state.podcastCategory == 'fitness'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#6cff52' }} name="ios-body">
                    <Text style={{color:'#6cff52', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> fitness</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'current'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#64fffc' }} name="md-bookmarks">
                    <Text style={{color:'#64fffc', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> current event</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'politics'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#ffd038' }} name="md-megaphone">
                    <Text style={{color:'#ffd038', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> politics</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'gaming'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#ff5442' }} name="md-game-controller-b">
                    <Text style={{color:'#ff5442', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> gaming</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'sports'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#7fa5ff' }} name="ios-football">
                    <Text style={{color:'#7fa5ff', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> sports</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'entertainment'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#fdff53' }} name="ios-musical-notes">
                    <Text style={{color:'#fdff53', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> entertainment</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'life'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#3aff97' }} name="ios-body">
                    <Text style={{color:'#3aff97', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> life</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'fashion'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#ff5e95' }} name="ios-shirt">
                    <Text style={{color:'#ff5e95', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> fashion</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'trends'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#bd59ff' }} name="md-trending-up">
                    <Text style={{color:'#bd59ff', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> trends</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'cars'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#ff861c' }} name="ios-car">
                    <Text style={{color:'#ff861c' , fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> cars</Text>
                </Icon>
            )
        }
        if (Variables.state.podcastCategory == 'misc'){
            return(
                <Icon style={{textAlign:'center', fontSize: 40,color:'#aeb1a7' }} name="md-code-working">
                    <Text style={{color:'#aeb1a7', fontSize: 22, marginTop: 5, flexDirection: 'row', backgroundColor: 'transparent', alignSelf: 'center' }}> misc</Text>
                </Icon>
            )
        }

    }


    _renderPodcastArtist(isPlaying) {
        let profileName = firebase.auth().currentUser.displayName;

        if (isPlaying) {
            return (
                <Text style={styles.podcastTextArtist}>{profileName}</Text>
            );
        }
        if(Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastTextArtist}> </Text>
            );
        }
        else{
            return (
                <Text style={styles.podcastTextArtist}>{profileName}</Text>
            );
        }

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








    render() {
        return (

            <LinearGradient start={{x: 2, y: 0}} end={{x: 2, y: 1.2}}
                            locations={[0,0.5]}
                            colors={['#595bc8', '#804cc8']}
                            style={styles.barContainer}>

                <View style={styles.audioProgress}>
                    {this._renderFillBar(Variables.state.isPlaying)}
                    <View style={styles.emptyProgress}>
                    </View>
                </View>


                <View style={styles.centerContainer}>

                    <View style={styles.leftContainer}>
                        <TouchableOpacity onPress={this.ExpandPlayer}>
                            <Icon style={{textAlign:'left', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 30,color:'#FFF' }} name="md-open">
                            </Icon>
                        </TouchableOpacity>
                    </View>

                    {this._renderPodcastInfo(Variables.state.isPlaying)}

                    <View style={styles.rightContainer}>
                        <TouchableOpacity>
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
                        style={styles.container}>

                        <StatusBar
                            hidden={true}
                        />



                        <View style={styles.centerContainer}>

                            <View style={styles.leftContainer}>
                                <TouchableOpacity onPress={this.Close}>
                                    <Icon style={{textAlign:'left', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 40,color:'#FFF' }} name="md-close">
                                    </Icon>
                                </TouchableOpacity>
                            </View>


                            <TouchableOpacity>
                                {this._renderPodcastTitle(Variables.state.isPlaying)}
                            </TouchableOpacity>



                            <View style={styles.rightContainer}>
                                <TouchableOpacity>
                                    <Icon style={{textAlign:'right', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 40,color:'#FFF' }} name="md-add">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                        </View>

                        <TouchableOpacity style={{alignSelf: 'center'}}>
                            {this._renderPodcastArtist(Variables.state.isPlaying)}
                        </TouchableOpacity>





                        <ScrollView showsVerticalScrollIndicator= {false}>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 3, y: 3}}
                                            locations={[0,2]}
                                            colors={['#657ed4', '#804cc8']}>

                        <Icon style={{textAlign:'center', fontSize: 200,color:'#fff' }} name="md-square">
                        </Icon>


                        <Icon style={{textAlign:'center', fontSize: 40,color:'#ffff00', marginTop: -10 }} name="md-happy">
                            <Text style={styles.podcastTextLikes}> 58</Text>
                        </Icon>


                        {this._renderCategory()}




                        {this._renderDescription()}

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
                                               multiline={true}
                                    />
                            </View>

                            </LinearGradient>

                        </ScrollView>







                        <View style={styles.centerContainer}>

                            <View style={styles.leftContainer}>
                                {this._renderCurrentTime()}
                            </View>

                            <View style={styles.rightContainer}>
                                {this._renderEndTime()}
                            </View>

                        </View>


                        <Slider
                            minimumTrackTintColor='rgba(1,170,170,1)'
                            maximumTrackTintColor='#575757'
                            thumbTintColor='rgba(60,230,230,1)'
                            thumbTouchSize={{width: 40, height: 40}}
                            animateTransitions = {true}
                            style={styles.sliderContainer}
                            step={0}
                            minimumValue={0}
                            maximumValue= { Math.abs( PodcastFile.getDuration())}
                            value={ this.state.currentTime }
                            onValueChange={currentTime => PodcastFile.setCurrentTime(currentTime)}


                        />



                        <View style={styles.centerContainerButtons}>

                            <View style={styles.leftContainer}>
                                <TouchableOpacity>
                                    <Icon style={{textAlign:'left', marginRight:0,paddingLeft: 80,paddingTop: 0, fontSize: 50,color:'#FFF' }} name="ios-skip-backward">
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
                                    <Icon style={{textAlign:'right', paddingRight: 80,marginLeft: 0,paddingTop: 0, fontSize: 50,color:'#FFF' }} name="ios-skip-forward">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                        </View>


                    </View>







                </Modal>



            </LinearGradient>



        )
    }

}


    const styles = StyleSheet.create({
    barContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 10, position: 'absolute', left: 0, right: 0, bottom: 50,
        paddingBottom: 20,
    },
    playingText:{
        color: '#FFF',
        fontSize: 15,
        paddingTop:5,
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
    sliderContainer: {
        width: 340,
        alignSelf: 'center'
    },
    audioProgress: {
        marginTop: -10,
        flexDirection: 'row'
    },
    fillProgress: {
        width: PodcastFile.getCurrentTime((seconds) => console.log('at ' + seconds)) / PodcastFile.getDuration() * 340,
        height: 8,
        backgroundColor: 'rgba(1,170,170,1)',
    },
    emptyProgress: {
        width: 380,
        height: 8,
        backgroundColor: '#575757',
    },
    leftContainer: {
        flex: 1,
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    centerContainer: {
        flexDirection: 'row',
        paddingTop: 5,
    },
    centerContainerButtons: {
        flexDirection: 'row',
        paddingTop: 2,
        paddingBottom: 5
    },
    rightContainer: {
        flex: 1,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },

        container:{
            flex: 1,
            backgroundColor: '#657ed4',
            marginTop: 0,
        },
        homeContainer:{
            marginTop: -15,
        },

        title: {
            color: '#804cc8',
            marginTop: 70,
            flex:1,
            textAlign: 'center',
            fontStyle: 'normal',
            fontFamily: 'Futura',
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
            color: 'white',
            fontSize: 22,
            marginTop: 5,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignSelf: 'center'
        },
        podcastTextNum:{
            color: 'white',
            fontSize: 20,
            marginTop: 5,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            marginHorizontal: 10,
        },

        middleContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        podcastTextLikes:{
            color: '#ffff00',
            fontSize: 25,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignSelf: 'center',
            marginTop: -5
        },
        podcastTextArtist:{
            color: 'white',
            fontSize: 20,
            marginTop: -5,
            paddingBottom: 8,
            flexDirection: 'row',
            backgroundColor: 'transparent',
            alignSelf: 'center'
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