import React, {Component} from 'react';
import _ from 'lodash';
import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    ScrollView,
    ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { podcastFetch } from "../actions/PodcastActions"
import ListItem from './ListItem';
import PlayerBottom from './PlayerBottom';
import {podFile} from "./Record";
import Sound from 'react-native-sound';
import {profileNameL} from './LoginForm.js';
import {profileName} from './CreateAccount.js';
import Variables from './Variables';
import firebase from 'firebase';



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
        this.state = { username: 'none' , bio: "Tell others about yourself...", category: '', profileName: profileName, profileNameL: profileNameL}
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

    _renderProfileName(){

            return (
                <Text style={styles.title2} >{Variables.state.username}</Text>

            )

    }


    _renderBio() {

        return(
            <Text style={styles.titleBio} >{Variables.state.bio}</Text>
        )

    }


    _renderCategory(){

                if (Variables.state.favCategory == 'fitness') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#6cff52'}} name="ios-body">
                            <Text style={{
                                color: '#6cff52',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> fitness</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'current') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#64fffc'}} name="md-bookmarks">
                            <Text style={{
                                color: '#64fffc',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> current event</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'politics') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#ffd038'}} name="md-megaphone">
                            <Text style={{
                                color: '#ffd038',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> politics</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'gaming') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#ff5442'}} name="md-game-controller-b">
                            <Text style={{
                                color: '#ff5442',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> gaming</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'sports') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#7fa5ff'}} name="ios-football">
                            <Text style={{
                                color: '#7fa5ff',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> sports</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'entertainment') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#fdff53'}} name="ios-musical-notes">
                            <Text style={{
                                color: '#fdff53',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> entertainment</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'life') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#3aff97'}} name="ios-body">
                            <Text style={{
                                color: '#3aff97',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> life</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'fashion') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#ff5e95'}} name="ios-shirt">
                            <Text style={{
                                color: '#ff5e95',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> fashion</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'trends') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#bd59ff'}} name="md-trending-up">
                            <Text style={{
                                color: '#bd59ff',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> trends</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'cars') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#ff861c'}} name="ios-car">
                            <Text style={{
                                color: '#ff861c',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> cars</Text>
                        </Icon>
                    )
                }
                if (Variables.state.favCategory == 'misc') {
                    return (
                        <Icon style={{textAlign: 'center', fontSize: 40, color: '#aeb1a7'}} name="md-code-working">
                            <Text style={{
                                color: '#aeb1a7',
                                fontSize: 22,
                                marginTop: 5,
                                flexDirection: 'row',
                                backgroundColor: 'transparent',
                                alignSelf: 'center'
                            }}> misc</Text>
                        </Icon>
                    )
                }

            else {
                return (
                    <Text style={styles.titleBio}>Too hard to choose</Text>
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

                <StatusBar
                    barStyle="light-content"
                />


                <ScrollView >

                    {this._renderProfileName()}


                <Icon style={{textAlign:'center', marginRight:20,marginLeft: 20,paddingTop: 10, fontSize: 140,color:'#804cc8' }} name="md-contact">
                </Icon>

                    <Text style={styles.title2 }>Bio</Text>
                    {this._renderBio()}


                    <Text style={styles.title2 }>Favorite Category</Text>
                    {this._renderCategory()}

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
        backgroundColor: '#FFF',
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
        color: '#804cc8',
        marginTop: 70,
        marginBottom: 5,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },
    titleBio: {
        color: '#804cc8',
        marginVertical: 10,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 15,
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