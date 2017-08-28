import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, TouchableOpacity, TouchableHighlight, Platform} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Switch } from 'react-native-switch';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import { Actions } from 'react-native-router-flux';
import PlayerBottom from './PlayerBottom';


export let podFile =  AudioUtils.DocumentDirectoryPath + '/test.aac';
export var podTime = 0;

class Record extends Component{

    state = {
        currentTime: 0.0,
        recording: false,
        stoppedRecording: false,
        finished: false,
        playing: false,
        audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
        hasPermission: undefined,
    };

    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 44100,
            Channels: 1,
            AudioQuality: "high",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 256000
        });
    }

    componentDidMount() {
        this._checkPermission().then((hasPermission) => {
            this.setState({ hasPermission });

            if (!hasPermission) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({currentTime: Math.floor(data.currentTime)});
            };

            AudioRecorder.onFinished = (data) => {
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL);
                }
            };
        });
    }

    _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': 'Microphone Permission',
            'message': 'AudioExample needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }

    _renderRecordTitle(isRecording){
        if (isRecording==true){
            return <Text style={styles.title4}>Press to Pause Recording</Text>
        }
        else{
            return <Text style={styles.title4}>Press to Record</Text>
        }
    }

    _renderButton(title, onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;

        return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={style}>
                    {title}
                </Text>
            </TouchableOpacity>
        );
    }
    _renderButtonRecord(title, onPress, active) {
        var style = (active) ? styles.activeButtonText : styles.buttonText;
        var iconStyle = (active) ? styles.activeIconText : styles.iconText;

        return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Icon style={iconStyle} name="ios-radio-button-on" onPress={this.recordSound}>
                    <Text style={style}>
                        {title}
                    </Text>
                </Icon>
            </TouchableOpacity>
        );
    }
    _renderButtonRecordN(onPress, active) {
        var iconStyle = (active) ? styles.activeIconText : styles.iconText;

        return (
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Icon style={iconStyle} name="ios-radio-button-on" onPress={this.recordSound}>
                </Icon>
            </TouchableOpacity>
        );
    }

    async _pause() {
        if (!this.state.recording) {
            console.warn('Can\'t pause, not recording!');
            return;
        }

        this.setState({stoppedRecording: true, recording: false});

        try {
            const filePath = await AudioRecorder.pauseRecording();


            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async _stop() {
        if (!this.state.recording) {
            console.warn('Can\'t stop, not recording!');
            return;
        }

        this.setState({stoppedRecording: true, recording: false});

        try {
            const filePath = await AudioRecorder.stopRecording();

            if (Platform.OS === 'android') {
                this._finishRecording(true, filePath);
            }
            return filePath;
        } catch (error) {
            console.error(error);
        }
    }


   async _done()  {
        const filePath = await AudioRecorder.stopRecording();
        this.setState({stoppedRecording: true, recording: false});

        Actions.RecordInfo();

    }

    async _play() {
        if (this.state.recording) {
            await this._stop();
        }

        this.setState({playing: true});

        setTimeout(() => {
            var sound = new Sound(this.state.audioPath, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });

            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');
                        this.setState({playing: false});
                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }


    async _record() {
        if (this.state.recording) {
            this.setState({stoppedRecording: true, recording: false});

            try {
                const filePath = await AudioRecorder.pauseRecording();

            } catch (error) {
                console.error(error);
            }
            return;
        }

        if (!this.state.hasPermission) {
            console.warn('Can\'t record, no permission granted!');
            return;
        }

        if(this.state.stoppedRecording){
            const filePath = await AudioRecorder.startRecording();
        }

        this.setState({recording: true});

        try {
            const filePath = await AudioRecorder.startRecording();
        } catch (error) {
            console.error(error);
        }
    }

    _finishRecording(didSucceed, filePath) {
        this.setState({ finished: didSucceed });
        console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath}`);
        podTime = this.state.currentTime;
    }


    render() {
        return (


                <View style={styles.container}>
                    {this._renderRecordTitle(this.state.recording)}
                    <View style={styles.controls}>
                        {this._renderButtonRecordN(() => {this._record()}, this.state.recording )}
                        {this._renderButton("DONE", () => {this._done()} )}
                        <Text style={styles.progressText}>{this.state.currentTime}s</Text>
                    </View>


                    <PlayerBottom/>



                </View>



        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 80,
        backgroundColor: '#804cc8',
    },
    container2:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'transparent',
        marginTop: -100,
    },

    title: {
        color: 'rgba(1,170,170,1)',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    title2: {
        color: '#804cc8',
        marginTop:60,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    title3: {
        color: '#804cc8',
        marginTop:-80,
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    title4: {
        color: '#FFF',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 30,
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        paddingTop: 50,
        fontSize: 30,
        fontFamily: 'Futura',
        color: "#FFF",
    },
    button: {
        padding: 20
    },
    disabledButtonText: {
        color: '#ee617c'
    },
    buttonText: {
        fontSize: 20,
        color: "#FFF",
    },
    activeButtonText: {
        fontSize: 20,
        color: '#ee617c'
    },
    iconText: {
        textAlign:'center',
        marginTop: 50,
        fontSize: 140,
        color:'#aba4a4'
    },
    activeIconText: {
        textAlign:'center',
        marginTop: 50,
        fontSize: 140,
        color: '#ee617c'
    },


});


export default Record;