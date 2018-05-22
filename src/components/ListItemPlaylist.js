import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ListView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import Variables from "./Variables";
import ListItemUsers from "./ListItemUsers";
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');



// A single playlist in Playlist.js

class ListItemPlaylist extends Component {


    constructor(state) {
        super(state);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        let myPlaylist = [];

        this.state ={
            playlist: dataSource.cloneWithRows(myPlaylist),
        };

        const {title} = this.props.data;
        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/playlist/${title}/items`).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                if(snap.val().id){
                    firebase.database().ref(`podcasts/${snap.val().id}`).once("value", function (snapAgain) {
                        if(snapAgain.val()){
                            myPlaylist.push(snapAgain.val());
                        }
                    })
                }
            });
        });

        setTimeout(() => {
            this.setState({playlist: dataSource.cloneWithRows(myPlaylist)})
        }, 1200)


    }


    renderRow = (podcast) => {
        return <ListItemUsers podcast={podcast} navigator={this.props.navigator}  />;
    };



    render() {
        const {title} = this.props.data;

        return (

            <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5, paddingBottom: 20}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{alignSelf:'flex-start'}}>
                        <Text style={styles.title}>{title}</Text>
                    </View>

                    <View style={{alignSelf:'flex-end', flex:1}}>
                        <TouchableOpacity onPress={() => {



                        }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                marginTop: 10,
                                color: '#506dcf',
                                marginLeft: 10,
                                marginRight: 15,
                            }} name="plus">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                </View>


                <ListView
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    enableEmptySections
                    dataSource={this.state.playlist}
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
        fontSize: 16,
        marginTop: 20,
        paddingLeft: 20,
        backgroundColor: 'transparent',
    },
};




export default ListItemPlaylist;