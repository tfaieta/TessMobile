import React, { Component } from 'react';
import _ from 'lodash';
import { Text, View, StyleSheet,StatusBar, ListView, ScrollView, TouchableOpacity, Image} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Variables from './Variables';
import firebase from 'firebase';
import { podcastFetchNew} from "../actions/PodcastActions";
import { connect } from 'react-redux';
import ListItemUsers from '../components/ListItemUsers';
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';



class Home extends Component{
    componentWillMount(){
        Variables.state.myPodcasts = [];
        const {currentUser} = firebase.auth();
        const refMy = firebase.database().ref(`podcasts/`);

        firebase.database().ref(`/users/${currentUser.uid}/bio`).orderByChild("bio").on("value", function(snap) {
            if(snap.val()){
                Variables.state.bio = snap.val().bio;

            }
            else {
                Variables.state.bio = "Tell others about yourself"
            }
        });
        firebase.database().ref(`/users/${currentUser.uid}/favCategory`).orderByChild("favCategory").on("value", function(snap) {
            if(snap.val()){
                Variables.state.favCategory = snap.val().favCategory;

            }
            else {
                Variables.state.favCategory = "Too hard to choose"
            }
        });
        firebase.database().ref(`/users/${currentUser.uid}/username`).orderByChild("username").on("value", function(snap) {
            if(snap.val()){
                Variables.state.username = snap.val().username;

            }
            else {
                Variables.state.username = "None"
            }
        });

        refMy.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(currentUser.uid == data.val().podcastArtist) {
                    Variables.state.myPodcasts.push(data.val());
                }
            })
        });


        this.props.podcastFetchNew();


        this.creataDataSourceNewPodcasts(this.props);

    }



    componentWillReceiveProps(nextProps) {

        this.creataDataSourceNewPodcasts(nextProps);
    }


    creataDataSourceNewPodcasts({ podcast }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSourceNewPodcasts = ds.cloneWithRows(podcast);
    }


    constructor(props) {
        super(props);
    }





    renderRowNewPodcasts(podcast) {
        return <ListItemUsers podcast={podcast} />;
    }

    pressFitness(){
        Actions.Fitness();
    }


    render() {
    return (
        <View
            style={styles.container}>

            <StatusBar
                barStyle="dark-content"
            />


                    <ScrollView>


                    <View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{alignSelf:'flex-start'}}>
                            <Text style={styles.title}>New Releases</Text>
                            </View>
                            <View style={{alignSelf:'flex-end'}}>
                                <TouchableOpacity style={{marginLeft: 150}}>
                                    <Text style={styles.viewAll}>View all</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        enableEmptySections
                        dataSource={this.dataSourceNewPodcasts}
                        renderRow={this.renderRowNewPodcasts}
                    />
                    </View>



                    <ScrollView style={{height: 122, marginVertical: 20}} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, borderRadius: 10, borderWidth: 0.1}} onPress={this.pressFitness}>
                            <Image
                                style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                                source={require('tess/src/images/fitness.png')}
                            >
                                <Icon style={{
                                    textAlign: 'center',
                                    marginTop: 30,
                                    fontSize: 30,
                                    backgroundColor: 'transparent',
                                    color: '#FFF'
                                }} name="ios-flash">
                                </Icon>
                                <Text style={styles.catTitle}>Fitness</Text>
                            </Image>
                        </TouchableOpacity>

                        <TouchableOpacity style={{width:218, height:122, backgroundColor: '#2A2A30', opacity: 1, marginLeft: 20, paddingVertical: 20, borderRadius: 10, borderWidth: 0.1}}>
                            <Image
                                style={{width: 218, height:122, position: 'absolute', alignSelf: 'center', opacity: 0.9, borderRadius: 10, borderWidth: 0.1}}
                                source={require('tess/src/images/worldNews.png')}
                            >
                                <Icon style={{
                                    textAlign: 'center',
                                    marginTop: 30,
                                    fontSize: 30,
                                    backgroundColor: 'transparent',
                                    color: '#FFF'
                                }} name="md-globe">
                                </Icon>
                                <Text style={styles.catTitle}>World News</Text>
                            </Image>
                        </TouchableOpacity>
                    </ScrollView>



            <View>
                <View style={{flexDirection:'row'}}>
                    <View style={{alignSelf:'flex-start'}}>
                        <Text style={styles.title}>Selected by Tess</Text>
                    </View>
                    <View style={{alignSelf:'flex-end'}}>
                        <TouchableOpacity style={{marginLeft: 130}}>
                            <Text style={styles.viewAll}>View all</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <ListView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    enableEmptySections
                    dataSource={this.dataSourceNewPodcasts}
                    renderRow={this.renderRowNewPodcasts}
                />
            </View>


                <View style={{paddingBottom: 150}}>
                    <Text style={styles.title}>From Tess</Text>
                    <Text style={styles.title2}>Hey Everyone! Thank you for downloading Tess, your feedback is important. We look forward to hearing from you! Check out our updates on the beta below. </Text>
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
        marginTop: 20,
    },
    homeContainer:{
        flex:1,
        marginTop: -15,

    },
    barContainer:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 10
    },

    title: {
        color: '#2A2A30',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 20,
        marginTop: 20,
        paddingLeft: 20,
        backgroundColor: 'transparent',
    },
    title2: {
        color: '#9496A3',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 16,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        backgroundColor: 'transparent',
    },

    viewAll: {
        color: '#5757FF',
        textAlign: 'right',
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
        fontSize: 16,
        marginTop: 20,
        paddingBottom: 10,
        backgroundColor: 'transparent',
    },

    catTitle: {
        fontSize: 18,
        color: 'white',
        marginTop: 5,
        textAlign: 'center',
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        fontFamily: 'Helvetica',
    }


});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, {podcastFetchNew}) (Home);