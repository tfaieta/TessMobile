import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import Variables from './Variables';
import Video from 'react-native-video';




// Actual Player (not cosmetic)

class Player extends Component{

    componentWillMount(){
        setInterval(() => {
            this.setState({
                podcastURL: Variables.state.podcastURL,
                paused: Variables.state.paused,
            })
        }, 200)
    }

    constructor(props) {
        super(props);
        this.state = {
            podcastURL: Variables.state.podcastURL,
            speed: Variables.state.podcastSpeed,
            volume: 1,
            muted: false,
            paused: Variables.state.paused,
            repeat: Variables.state.repeat,
            currentTime: Variables.state.currentTime

        }

    }



    onProgress = (data) => {

        Variables.state.buffering = false;
        Variables.state.currentTime = data.currentTime;

        this.setState({
            podcastURL: Variables.state.podcastURL,
            speed: Variables.state.podcastSpeed,
            volume: 1,
            muted: false,
            paused: Variables.state.paused,
            repeat: Variables.state.repeat,
            currentTime: data.currentTime
        });

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
    };

    onBuffer(){
      Variables.state.buffering = true;
    }
    onError(){
        console.warn("ERROR!")
    }
    onEnd(){
        Variables.state.paused = true;
    }
    onLoadStart(){
        Variables.state.buffering = true;
    }
    onLoad = (data) => {
        Variables.state.duration = data.duration;
        Variables.state.buffering = false;
    };



    _renderPlayer = () => {
        if(this.state.podcastURL){
            return(
                <Video source={{uri: this.state.podcastURL}}   // Can be a URL or a local file.
                       ref={(ref) => {
                           this.player = ref
                       }}                                      // Store reference
                       rate={this.state.speed}                              // 0 is paused, 1 is normal.
                       volume={this.state.volume}                            // 0 is muted, 1 is normal.
                       muted={this.state.muted}                           // Mutes the audio entirely.
                       paused={this.state.paused}                          // Pauses playback entirely.
                       repeat={this.state.repeat}                           // Repeat forever.
                       playInBackground={true}                // Audio continues to play when app entering background.
                       playWhenInactive={true}                // [iOS] Video continues to play when control or notification center are shown.
                       ignoreSilentSwitch={"ignore"}           // [iOS] ignore | obey - When 'ignore', audio will still play with the iOS hard silent switch set to silent. When 'obey', audio will toggle with the switch. When not specified, will inherit audio settings as usual.
                       progressUpdateInterval={100.0}          // [iOS] Interval to fire onProgress (default to ~250ms)
                       onLoadStart={this.onLoadStart}            // Callback when video starts to load
                       onLoad={this.onLoad}               // Callback when video loads
                       onProgress={this.onProgress}               // Callback every ~250ms with currentTime
                       onEnd={this.onEnd}                      // Callback when playback finishes
                       onError={this.onError}               // Callback when video cannot be loaded
                       onBuffer={this.onBuffer}                // Callback when remote video is buffering
                       onTimedMetadata={this.onTimedMetadata}  // Callback when the stream receive some metadata
                   />
            )
        }
    };


render() {
    return (
        <View>
            {this._renderPlayer()}
        </View>


    );
}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 0,
    },


});

export default Player;