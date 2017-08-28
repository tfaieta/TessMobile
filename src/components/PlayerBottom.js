import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, Slider, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {podFile, podTime} from './Record';
import Variables from './Variables';
import {PodcastFile} from './Variables';




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
    };

    componentDidMount(){
        if (this.state.isPlaying==true){
            this.setState({
                interval: setInterval(this.tick, 500)
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
            interval: setInterval(this.tick, 500)
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
                <Text style={styles.playingText}>{this.state.podcastTitle}</Text>
            )
        }
        if(this.state.podcastTitle =='') {
            return (
                <Text style={styles.playingText}> </Text>
            )
        }
        else{
            return (
                <Text style={styles.playingText}>{this.state.podcastTitle}</Text>
            )
        }

}

    _renderFillBar(isPlaying){
        if(isPlaying) {
            return (
                <View style = {{
                    width: (this.state.currentTime / PodcastFile.getDuration()) * 380,
                    height: 8,
                    backgroundColor: 'rgba(1,170,170,1)',}}
                >
                </View>
            )
        }
        if (this.state.podcastTitle == '') {
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




    ExpandPlayer = () => {
        Actions.Player();
    };

    render() {
        return (

            <LinearGradient start={{x: 2, y: 0}} end={{x: 2, y: 1.2}}
                            locations={[0,0.5]}
                            colors={['#595bc8', '#804cc8']}
                            style={styles.barContainer}>

                <View style={styles.audioProgress}>
                    {this._renderFillBar(this.state.isPlaying)}
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

                    {this._renderPodcastInfo(this.state.isPlaying)}

                    <View style={styles.rightContainer}>
                        <TouchableOpacity>
                            {this._renderPlayButton(this.state.isPlaying)}
                        </TouchableOpacity>
                    </View>

                </View>



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

});


    export default PlayerBottom;