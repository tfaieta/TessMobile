import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    Slider,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import PlayerBottom from './PlayerBottom';
import {podcastTitle} from "./RecordInfo";
import {podFile} from "./Record";
import Sound from 'react-native-sound';

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = { volume: 20}
    }



    playPodcast = () =>  {


        setTimeout(() => {
            var sound = new Sound(podFile, '', (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                }
            });

            setTimeout(() => {
                sound.play((success) => {
                    if (success) {
                        console.log('successfully finished playing');

                    } else {
                        console.log('playback failed due to audio decoding errors');
                    }
                });
            }, 100);
        }, 100);
    }


    _renderPodcast(PodcastTitle){
        if(PodcastTitle == '') {
            return (
                <Text style={styles.playingText}> </Text>
            )
        }
        else{
            return (
                <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                    <Text style={styles.title} >  {PodcastTitle}</Text>
                </Icon>
            )
        }

    }



    render() {
        return (
            <View
                style={styles.container}>



                <ScrollView>

                <Text style={styles.title2 }>My Name</Text>
                <StatusBar
                    barStyle="light-content"
                />

                <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 140,color:'#888784' }} name="md-contact">
                </Icon>

                    <Text style={styles.title2 }>Bio</Text>
                    <Text style={styles.title2 }>Content</Text>

                    <TouchableOpacity onPress={this.playPodcast}>
                        {this._renderPodcast(podcastTitle)}
                    </TouchableOpacity>



                </ScrollView>





                <PlayerBottom/>

            </View>



        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
    },
    title: {
        color: '#804cc8',
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
});

export default Account;