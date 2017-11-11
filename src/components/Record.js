import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Image, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import { Actions } from 'react-native-router-flux';
import LinearGradient from "react-native-linear-gradient/index.android";



export let podFile =  AudioUtils.DocumentDirectoryPath + '/test.aac';
export var podTime = 0;
export var totalTime = 0;


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
            AudioQuality: "max",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 96000
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
        if (this.state.currentTime > 0) {
            return (
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={style}>
                        {title}
                    </Text>
                </TouchableOpacity>
            );
        }
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
                <Image style={iconStyle} onPress={this.recordSound} source={require('tess/src/images/record-icon.png')}>
                </Image>
            </TouchableOpacity>
        );
    }

    _renderTime() {
        var num = (this.state.currentTime / 60).toString();
        num = num.slice(0, 1);
        Number(num);
        var num2 = (this.state.currentTime % 60).toString();
        num2 = num2.slice(0, 2);
        Number(num2);
        if (this.state.currentTime > 0) {
            if (this.state.currentTime < 60) {
                return <Text style={styles.progressText}>{this.state.currentTime}s</Text>
            }
            else {
                return <Text style={styles.progressText}>{num}m {num2}s</Text>
            }
        }
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
        totalTime = this.state.currentTime;

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

    Close = () => {
        Actions.pop();
    };


    render() {
        return (


            <LinearGradient

                colors={['#3e279b', '#5d539c' ]}
                style={styles.container}>

                    <StatusBar
                        barStyle="light-content"
                    />



                    <View style={styles.centerContainer}>

                        <View style={styles.leftContainer}>
                            <TouchableOpacity onPress={this.Close}>
                                <Icon style={{textAlign:'left', marginLeft: 10, fontSize: 30,color:'#FFF' }} name="md-arrow-round-back">
                                </Icon>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,alignItems: 'center', marginLeft: 0}}>
                            {this._renderRecordTitle(this.state.recording)}
                        </View>

                    </View>


                    <View style={styles.controls}>
                        {this._renderButtonRecordN(() => {this._record()}, this.state.recording )}
                        {this._renderTime()}
                        {this._renderButton("Done", () => {this._done()} )}
                    </View>


            </LinearGradient>



        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 10,
        backgroundColor: 'transparent',
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
        fontFamily: 'HiraginoSans-W6',
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
        fontFamily: 'HiraginoSans-W6',
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
        fontFamily: 'HiraginoSans-W6',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    title4: {
        color: '#FFF',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 22,
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
        padding: 20,
    },
    disabledButtonText: {
        color: '#ee617c'
    },
    buttonText: {
        marginTop:60,
        fontSize: 35,
        padding: 8,
        paddingHorizontal: 50,
        color: "#FFF",
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
    },
    activeButtonText: {
        fontSize: 25,
        color: '#ee617c',

        backgroundColor: '#8a66c8'
    },
    iconText: {
        marginTop: 50,
        width: 147,
        height: 151
    },
    activeIconText: {
        marginTop: 50,
        width: 147,
        height: 151,
        tintColor: '#ee617c'
    },
    leftContainer: {
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    centerContainer: {
        flexDirection: 'row',
        marginTop: 35,
        paddingBottom: 20
    },

});


export default Record;