import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Animated, Easing, Image, Platform, Alert, Dimensions, PermissionsAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import LinearGradient from "react-native-linear-gradient/index.android";
import Variables from "./Variables";





// First Record Page (where the recording happens)

export let podFile =  AudioUtils.DocumentDirectoryPath + '/test.aac';
export var podTime = 0;
export var totalTime = 0;

var {height, width} = Dimensions.get('window');


class Record extends Component{

    componentWillMount(){
        this.animatedValue = new Animated.Value(1);


        this.interval = setInterval(() => {

            Animated.timing(this.animatedValue, {
                toValue: (this.state.level+40) * (height/40),
                duration: 500,
                easing: Easing.elastic()
            }).start();


            this.slide();

        },600);


    }


      static navigatorStyle = {
            statusBarHidden: false,
            navBarHidden: true,
            statusBarTextColorScheme: 'light',
            tabBarHidden: true
      };


    state = {
        currentTime: 0.0,
        recording: false,
        stoppedRecording: false,
        finished: false,
        playing: false,
        audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
        hasPermission: undefined,
        level: 0,
        visible: false,
        x: new Animated.Value(400),

    };

    slide = () => {
        Animated.spring(this.state.x, {
            toValue: 0,
        }).start();
        this.setState({
            visible: true,
        });
    };


    prepareRecordingPath(audioPath){
        AudioRecorder.prepareRecordingAtPath(audioPath, {
            SampleRate: 44100,
            Channels: 1,
            AudioQuality: "max",
            AudioEncoding: "aac",
            AudioEncodingBitRate: 96000,
            MeteringEnabled: true
        });
    }

    componentDidMount() {

        Variables.pause();
        Variables.state.isPlaying = false;
        Variables.state.podcastTitle = '';
        Variables.state.podcastArtist = '';
        Variables.state.podcastDescription = '';
        Variables.state.podcastCategory = '';

        this._checkPermission().then((hasPermission) => {
            this.setState({ hasPermission });

            if (!hasPermission) return;

            this.prepareRecordingPath(this.state.audioPath);

            AudioRecorder.onProgress = (data) => {
                this.setState({currentTime: Math.floor(data.currentTime)});
                this.setState({level: Math.floor(data.currentMetering)})
            };

            AudioRecorder.onFinished = (data) => {
                if (Platform.OS === 'ios') {
                    this._finishRecording(data.status === "OK", data.audioFileURL);
                }
            };
        });
    }

    componentWillUnmount(){
       AudioRecorder.stopRecording();
       this.setState({stoppedRecording: true, recording: false});
       clearInterval(this.interval);
    }

    _checkPermission() {
        if (Platform.OS !== 'android') {
            return Promise.resolve(true);
        }

        const rationale = {
            'title': 'Microphone Permission',
            'message': 'Tess needs access to your microphone so you can record audio.'
        };

        return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
            .then((result) => {
                console.log('Permission result:', result);
                return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
            });
    }

    _renderRecordTitle(isRecording){
        if (isRecording==true){
            return <Text style={styles.header}>Press to Pause Recording</Text>
        }
        else{
            return <Text style={styles.header}>Press to Record</Text>
        }
    }


    _renderButtonRecord(onPress, active) {
        if(active){
            return (
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Image style={styles.iconText} onPress={this.recordSound} source={require('tess/src/images/record-icon-pause.png')}>
                    </Image>
                </TouchableOpacity>
            );
        }
        else{
            return (
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Image style={styles.iconText} onPress={this.recordSound} source={require('tess/src/images/record-icon.png')}>
                    </Image>
                </TouchableOpacity>
            );
        }

    }

    _renderTime() {

        var num2 = (this.state.currentTime % 60).toString();
        num2 = num2.slice(0, 2);
        Number(num2);
        if (this.state.currentTime > 0) {
            if (this.state.currentTime < 60) {
                return <Text style={styles.progressText}>{this.state.currentTime}s</Text>
            }
            else {
                if((this.state.currentTime / 60) < 10){
                    var num = (this.state.currentTime / 60).toString();
                    num = num.slice(0, 1);
                    Number(num);
                    return <Text style={styles.progressText}>{num}m {num2}s</Text>
                }
                else if((this.state.currentTime / 60) < 100){
                    var num = (this.state.currentTime / 60).toString();
                    num = num.slice(0, 2);
                    Number(num);
                    return <Text style={styles.progressText}>{num}m {num2}s</Text>
                }
                else{
                    var num = (this.state.currentTime / 60).toString();
                    num = num.slice(0, 3);
                    Number(num);
                    return <Text style={styles.progressText}>{num}m {num2}s</Text>
                }

            }
        }
    }


    _renderNext(){
        if(this.state.currentTime>0){
            return(
                <TouchableOpacity onPress= {() => {this._done()}}>
                    <Text style={styles.next}>Next</Text>
                </TouchableOpacity>
            )
        }
        else{
            return(
                <View>
                    <Text style={styles.nextDark}>Next</Text>
                </View>
            )
        }
    }

    _renderProgress(){
        var {height, width} = Dimensions.get('window');

        if(this.state.currentTime%10 == 0 && this.state.currentTime>0){
            return(
                <View style={{height: 10, width: width, backgroundColor: 'white', marginTop: 10}} />
            )
        }
        else{
            return(
                <View style={{height:10, width: (this.state.currentTime*(width/10))%width, backgroundColor: 'white', marginTop: 10}} />
            )
        }

    }

    _renderLevel2(level){

            return(
                <View style={{width: (level+40) * 10, height: 10, backgroundColor: 'white'}}/>
            )
    }

    _renderLevel(level){
        const animatedStyle = {height: this.animatedValue};

        if(this.state.recording){

                return(
                    <View style = {{ position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,}}>
                        <Animated.View style={[ {
                            width: width, backgroundColor: '#ffffff30'}, animatedStyle]}/>
                    </View>
                )

        }


    }

    _renderWave(level){

            return(
                <View>
                <Animated.View
                    style={[styles.slideView, {
                        transform: [
                            {
                                translateX: this.state.x
                            }
                        ]
                    }]}
                >
                    {/* your content, such as this.props.children */}
                </Animated.View>
                </View>
            )

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

        this.next();
    }

    next =() =>{

        this.props.navigator.push({
            screen: 'RecordInfo',
            animated: true,
            animationType: 'fade',
            navigatorStyle: {
                tabBarHidden: true,
            },
        });
    };

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

    _pressBack = () => {


        if(this.state.currentTime > 0){

            Alert.alert(
                'Are you sure you want to go back?',
                'All recording progress will be lost.',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'Yes', onPress: () => {

                        AudioRecorder.stopRecording();
                        this.setState({stoppedRecording: true, recording: false});
                        this.prepareRecordingPath(this.state.audioPath);


                        this.props.navigator.resetTo({
                            screen: 'RecordFirst',
                            animated: true,
                            animationType: 'fade',
                        });

                    }
                    },
                ],
                { cancelable: false }
            );

        }
        else{

            AudioRecorder.stopRecording();
            this.setState({stoppedRecording: true, recording: false});


            this.props.navigator.resetTo({
                screen: 'RecordFirst',
                animated: true,
                animationType: 'fade',
            });




        }





    };


    render() {
        return (


            <LinearGradient

                colors={['#3e279b', '#5d539c' ]}
                start={{x: 0.0, y: 0.0}} end={{x: 0, y: 0.75}}

                style={styles.container}>


                {this._renderLevel(this.state.level)}


                <View style={{flexDirection: 'row', paddingVertical:5}}>

                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 28,color:'#fff'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>

                    <View style={{flex:1, marginRight: 10, alignItems: 'flex-end', justifyContent: 'center', marginTop: 25}}>
                        {this._renderNext()}
                    </View>

                </View>

                    {this._renderRecordTitle(this.state.recording)}



                    <View style={styles.controls}>
                        {this._renderButtonRecord(() => {this._record()}, this.state.recording )}
                        {this._renderTime()}
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
        fontSize: 30,
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

    header: {
        marginTop:25,
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 18,
        backgroundColor: 'transparent',
    },

    next: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',
    },

    nextDark: {
        color: 'rgba(350,350,350,0.4)',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',
    },

    slideView: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
    }

});


export default Record;