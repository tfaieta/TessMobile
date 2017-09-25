import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, Modal, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from './Variables';
import {PodcastFile} from './Variables';
import Slider from 'react-native-slider';




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
    };

    componentDidMount(){
        if (Variables.state.isPlaying==true){
            this.setState({
                interval: setInterval(this.tick, 250)
            });
        }

    }


    componentWillUnmount() {
        this.setState({
            interval: clearInterval(this.state.interval)
        });
        Variables.interval = clearInterval(Variables.interval);
    }

    tick() {
        PodcastFile.getCurrentTime((seconds) => {
            this.setState({
                currentTime: seconds
            })
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
        if(isPlaying) {
            return (
                <Text style={styles.playingText}>{Variables.state.podcastTitle}</Text>
            )
        }
        if(Variables.state.podcastTitle =='') {
            return (
                <Text style={styles.playingText}> </Text>
            )
        }
        else{
            return (
                <Text style={styles.playingText}>{Variables.state.podcastTitle}</Text>
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
                    width: (Variables.state.currentTime / PodcastFile.getDuration()) * 380,
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
                <Text style={styles.podcastText}>-</Text>
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
                <ScrollView style={{marginHorizontal: 20, marginBottom: 20}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Futura', textAlign: 'center'  }}>Select a Podcast to start listening....</Text>
                </ScrollView>
            )
        }
        else{
            return(
                <ScrollView style={{marginHorizontal: 20, marginBottom: 20}} showsVerticalScrollIndicator= {false} showsHorizontalScrollIndicator= {false}>
                    <Text style={{color: '#fff', fontSize: 20, fontFamily: 'Futura' }}>{Variables.state.podcastDescription}</Text>
                </ScrollView>
            )
        }
    }


    _renderPodcastArtist(isPlaying) {
        if (isPlaying) {
            return (
                <Text style={styles.podcastText}>Podcast Artist</Text>
            );
        }
        if(Variables.state.podcastTitle == '') {
            return (
                <Text style={styles.podcastText}>-</Text>
            );
        }
        else{
            return (
                <Text style={styles.podcastText}>Podcast Artist</Text>
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

        var num = (Variables.state.currentTime / 60).toString();
        num = num.slice(0,1);
        Number(num);
        var num2 = (Variables.state.currentTime % 60).toString();
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

                            <Text style={styles.playingText}>Now Playing...</Text>

                            <View style={styles.rightContainer}>
                                <TouchableOpacity>
                                    <Icon style={{textAlign:'right', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 40,color:'#FFF' }} name="md-add">
                                    </Icon>
                                </TouchableOpacity>
                            </View>

                        </View>


                        <Icon style={{textAlign:'center', fontSize: 200,color:'#fff' }} name="md-square">
                        </Icon>
                        {this._renderDescription()}


                        <TouchableOpacity>
                            {this._renderPodcastTitle(Variables.state.isPlaying)}
                        </TouchableOpacity>

                        <TouchableOpacity>
                            {this._renderPodcastArtist(Variables.state.isPlaying)}
                        </TouchableOpacity>



                        <View style={styles.centerContainer}>

                            <View style={styles.leftContainer}>
                                {this._renderCurrentTime()}
                            </View>

                            <View style={styles.rightContainer}>
                                {this._renderEndTime()}
                            </View>

                        </View>


                        <Slider
                            minimumTrackTintColor='#804cc8'
                            maximumTrackTintColor='#575757'
                            thumbTintColor='#9f5ff8'
                            thumbTouchSize={{width: 40, height: 40}}
                            animateTransitions = {true}
                            style={styles.sliderContainer}
                            step={0}
                            minimumValue={0}
                            maximumValue= { Math.abs( PodcastFile.getDuration())}
                            value={Variables.state.currentTime}
                            onValueChange={currentTime => Variables.state.currentTime}

                        />



                        <View style={styles.centerContainer}>

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
        color: 'white',
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
    rightContainer: {
        flex: 1,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },

        container:{
            flex: 1,
            backgroundColor: '#0887c8',
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
            fontSize: 20,
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


});


    export default PlayerBottom;