import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ListView, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";



// A single playlist in Playlist.js

class ListItemCatchUp extends Component {


    constructor(state) {
        super(state);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        let podcast = [];

        this.state ={
            podcast: dataSource.cloneWithRows(podcast),
            length: 0,
            username: '',
            podcastData: podcast,
        };

        const {podcastArtist} = this.props.podcast;
        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/tracking/${podcastArtist}/episodes`).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                if(snap.val().id){
                    firebase.database().ref(`podcasts/${snap.val().id}`).once("value", function (snapAgain) {
                        if(snapAgain.val()){
                            podcast.push(snapAgain.val());
                        }
                    })
                }
            });
        });

        let username = '';
        firebase.database().ref(`users/${podcastArtist}/username`).once("value", function (snap) {
            if(snap.val()){
                if(snap.val().username.length > 16){
                    username = snap.val().username.slice(0,13) + '...'
                }
                else{
                    username = snap.val().username;
                }
            }
        });

        setTimeout(() => {
            this.setState({podcast: dataSource.cloneWithRows(podcast), podcastData: podcast, length: podcast.length, username: username})
        }, 1200)


    }


    renderRow = (podcast) => {
        return <ListItemUsers podcast={podcast} navigator={this.props.navigator}  />;
    };



    render() {

        return (

            <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5, paddingBottom: 20}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{alignSelf:'flex-start'}}>
                        <Text style={styles.title}>{this.state.username}     <Text style={styles.smallTitle}>{this.state.length} episodes</Text></Text>
                    </View>

                    <View style={{alignSelf:'flex-end', flex:1}}>
                        <TouchableOpacity onPress={() => {
                            const title = this.state.username;
                            const episodes = this.state.length;

                            this.props.navigator.push({
                                screen: 'ViewAll',
                                title: title,
                                passProps: {data: this.state.podcastData, title, episodes},
                            });

                        }} style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                            <Text style={styles.viewAll}>View all</Text>
                            <Icon style={{
                                fontSize: 18,
                                
                                marginTop: 20,
                                color: '#506dcf',
                                marginHorizontal: 3
                            }} name="angle-right">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                </View>


                <ListView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    enableEmptySections
                    dataSource={this.state.podcast}
                    renderRow={(data) => this.renderRow(data)}
                />

            </View>

        );


    }
}

const styles = {
    title: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginTop: 20,
        paddingLeft: 20,
        
    },
    smallTitle: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
        marginTop: 20,
        paddingLeft: 20,
        
    },
    viewAll: {
        color: '#506dcf',
        textAlign: 'right',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 12,
        marginTop: 22,
        marginRight: 4,
        paddingBottom: 10,
        
    },
};




export default ListItemCatchUp;
