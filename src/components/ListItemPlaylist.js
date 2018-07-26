import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ListView, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from 'firebase';
import ListItemUsers from "./ListItemUsers";

var {height, width} = Dimensions.get('window');



// A single playlist in Playlist.js

class ListItemPlaylist extends Component {


    constructor(state) {
        super(state);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        let myPlaylist = [];

        this.state ={
            playlist: dataSource.cloneWithRows(myPlaylist),
            length: 0
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

        this.timeout = setTimeout(() => {
            this.setState({playlist: dataSource.cloneWithRows(myPlaylist), length: myPlaylist.length})
        }, 1200)


    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
    }


    renderRow = (podcast) => {
        return <ListItemUsers podcast={podcast} navigator={this.props.navigator}  />;
    };



    render() {
        const {title} = this.props.data;

        return (

            <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: width/37.5, marginVertical: height/133.4, paddingBottom: height/33.35}}>
                <View style={{flexDirection:'row'}}>
                    <View style={{alignSelf:'flex-start'}}>
                        <Text style={styles.title}>{title}     <Text style={styles.smallTitle}>{this.state.length} episodes</Text></Text>
                    </View>

                    <View style={{alignSelf:'flex-end', flex:1}}>
                        <TouchableOpacity onPress={() => {
                            const {navigator} = this.props;
                            navigator.push({
                                screen: 'PlaylistView',
                                title: title,
                                passProps: {title, navigator}
                            })
                        }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: height/222.33}}>
                            <Icon style={{
                                fontSize: width/17,
                                backgroundColor: 'transparent',
                                marginTop: height/66.7,
                                color: '#506dcf',
                                marginLeft: width/37.5,
                                marginRight: width/25,
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
        fontSize: width/20.83,
        marginTop: height/33.35,
        paddingLeft: width/18.75,
        backgroundColor: 'transparent',
    },
    smallTitle: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/26.79,
        marginTop: height/33.35,
        paddingLeft: width/18.75,
        backgroundColor: 'transparent',
    },
};




export default ListItemPlaylist;