import React, {Component} from 'react';
import _ from 'lodash';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    ListView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { podcastFetch} from "../actions/PodcastActions"
import ListItem from './ListItem';
import PlayerBottom from './PlayerBottom';
import {podFile} from "./Record";
import Sound from 'react-native-sound';
import {profileNameL} from './LoginForm.js';
import {profileName} from './CreateAccount.js';
import Variables from './Variables';



class Account extends Component {
    componentWillMount(){
        this.props.podcastFetch();


        this.creataDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {

        this.creataDataSource(nextProps);
    }


    creataDataSource({ podcast }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(podcast);
    }


    constructor(props) {
        super(props);
        this.state = { volume: 20, profileName: profileName, profileNameL: profileNameL}
    }



    playPodcast = () =>  {

        Variables.state.isPlaying = true;


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
    };


    _renderPodcast(PodcastTitle){

        if(Variables.state.podcastTitle == '') {
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

    _renderProfileName(profileName1, profileName2){
        if(profileName1 != '') {
            return (
                <Text style={styles.title2 }>{profileName1}</Text>
            )
        }
        if(profileName2 != '') {
            return (
                <Text style={styles.title2 }>{profileName2}</Text>
            )
        }


        else{
            return (
                <Text style={styles.title2} >My Name</Text>

            )
        }

    }

    renderRow(podcast) {
        return <ListItem podcast={podcast} />;
    }



    render() {
        return (
            <View
                style={styles.container}>



                <ScrollView >

                    {this._renderProfileName(this.state.profileName, this.state.profileNameL)}
                <StatusBar
                    barStyle="light-content"
                />

                <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 140,color:'#888784' }} name="md-contact">
                </Icon>

                    <Text style={styles.title2 }>Bio</Text>
                    <Text style={styles.title2 }>Content</Text>

                    <View style={{paddingBottom: 30}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this.renderRow}
                    />
                    </View>



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
        paddingBottom: 115,
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

const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetch })(Account);