import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, Slider, ScrollView, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {podFile, podTime} from './Record';
import {podcastTitle, podcastDescription} from './RecordInfo';



var PodcastFile = new Sound(podFile, '', (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
});


class Player extends Component{

    constructor() {
        super();
        this.tick = this.tick.bind(this);
    }

    Close = () => {
        Actions.pop();
    };

    state = {
        isPlaying: false,
        currentTime: 0,
    };


    tick() {
        PodcastFile.getCurrentTime((seconds) => {
            this.setState({
                currentTime: seconds
            })
        })
    }

    componentWillMount()   {

        PodcastFile = new Sound(podFile, '', (error) => {
            this.setState({
                isPlaying: false,
                currentTime: 0,
            })
            if (error) {
                console.log('failed to load the sound', error);
            }
        });

    }


    play = () =>  {


        if (this.state.isPlaying == true) {
            this.setState({isPlaying: false});
            PodcastFile.pause();
        }
        if (this.state.isPlaying == false) {
            this.setState({isPlaying: true});
            PodcastFile.play();
            interval: setInterval(this.tick, 1000)
        }

    }


    _renderPlayButton(isPlaying) {

        if (isPlaying) {
            return (
                <TouchableOpacity onPress={this.play}>
                    <Icon style={{textAlign:'left', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 50,color:'#FFF' }}  name="md-pause">
                    </Icon>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity onPress={this.play}>
                    <Icon style={{textAlign:'left', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 50,color:'#FFF' }}  name="md-play">
                    </Icon>
                </TouchableOpacity>
            );
        }
    }


    _renderPodcastTitle(isPlaying) {
        if (isPlaying) {
            return (
                <Text style={styles.podcastText}>{podcastTitle}</Text>
            );
        }
        if (podcastTitle =='') {
            return (
                <Text style={styles.podcastText}>-</Text>
            );
        }
        else{
            return (
                <Text style={styles.podcastText}>{podcastTitle}</Text>
            );
        }
    }

    _renderPodcastArtist(isPlaying) {
        if (isPlaying) {
            return (
                <Text style={styles.podcastText}>Podcast Artist</Text>
            );
        }
        if(podcastTitle == '') {
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


    _renderEndTime(isPlaying) {
        if (isPlaying) {
            return (
                <Text style={styles.podcastText}>{podTime}</Text>
            );
        }
        if (podcastTitle == '') {
            return (
                <Text style={styles.podcastText}>-</Text>
            );
        }
        else{
            return (
                <Text style={styles.podcastText}>{podTime}</Text>
            );
        }
    }

    _renderCurrentTime(isPlaying) {
        if (isPlaying) {
            return (
                <Text style={styles.podcastText}>{this.state.currentTime}</Text>
            );
        }
        if (podcastTitle == '') {
            return (
                <Text style={styles.podcastText}>-</Text>
            );
        }
        else{
            return (
                <Text style={styles.podcastText}>{this.state.currentTime}</Text>
            );
        }
    }



render() {
    return (
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


            <Icon style={{textAlign:'center', fontSize: 400,color:'#FFF' }} name="md-square">
            </Icon>



            <TouchableOpacity>
                {this._renderPodcastTitle(this.state.isPlaying)}
            </TouchableOpacity>

            <TouchableOpacity>
                {this._renderPodcastArtist(this.state.isPlaying)}
            </TouchableOpacity>



            <View style={styles.centerContainer}>

                <View style={styles.leftContainer}>
                    {this._renderCurrentTime(this.state.isPlaying)}
                </View>

                <View style={styles.rightContainer}>
                    {this._renderEndTime(this.state.isPlaying)}
                </View>

            </View>


            <Slider
                minimumTrackTintColor={'rgba(1,170,170,1)'}
                maximumTrackTintColor={'rgba(70,70,70,1)'}
                style={styles.sliderContainer}
                step={1}
                minimumValue={0}
                maximumValue={PodcastFile.getDuration()}
                value={this.state.currentTime / 100 * 100}
            />



            <View style={styles.centerContainer}>

                <View style={styles.leftContainer}>
                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 50,color:'#FFF' }} name="ios-skip-backward">
                        </Icon>
                    </TouchableOpacity>
                </View>

                <View style={styles.middleContainer}>
                    <TouchableOpacity>
                        {this._renderPlayButton(this.state.isPlaying)}
                    </TouchableOpacity>
                </View>

                <View style={styles.rightContainer}>
                    <TouchableOpacity>
                        <Icon style={{textAlign:'right', marginRight:0,marginLeft: 0,paddingTop: 0, fontSize: 50,color:'#FFF' }} name="ios-skip-forward">
                        </Icon>
                    </TouchableOpacity>
                </View>

            </View>


        </View>




    );
}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#0887c8',
        marginTop: 0,
    },
    homeContainer:{
        marginTop: -15,
    },
    barContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: -11.5,
        paddingTop: 10
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
    playingText:{
        color: 'white',
        fontSize: 18,
        marginTop:5,
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    podcastText:{
        color: 'white',
        fontSize: 20,
        marginTop: 5,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        alignSelf: 'center'
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
        width: 340,
        height: 5,
        backgroundColor: 'rgba(1,170,170,1)',
    },
    emptyProgress: {
        width: 340,
        height: 5,
        backgroundColor: '#575757',
    },
    leftContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    centerContainer: {
        flexDirection: 'row',
        marginTop: 0,
    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightContainer: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },

});

export default Player;