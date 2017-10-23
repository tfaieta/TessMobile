import React, { Component } from 'react';
import _ from 'lodash';
import { View, StyleSheet, ListView, Text, TouchableHighlight} from 'react-native';
import PlayerBottom from './PlayerBottom';
import { connect } from 'react-redux';
import { podcastFetchFollowed } from "../actions/PodcastActions"
import Variables from "./Variables";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';



class FollowedContent extends Component{

    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.usersFollowed),
            loading: true
        };
    }

    state={
        loading: true
    };




    renderRow(rowData){


        let profileName = rowData;
        firebase.database().ref(`/users/${rowData}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = rowData;
            }
        });




        return (
            <TouchableHighlight underlayColor='#804cc8' onPress={() => {
                Variables.state.podcastArtist = rowData;
                Actions.UserProfile();
            }}>
                <View style={styles.container2}>


                    <View style={styles.leftContainer}>
                        <Icon style={{
                            textAlign: 'left',
                            marginLeft: 20,
                            paddingRight: 8,
                            fontSize: 70,
                            color: '#be8eff'
                        }} name="md-contact">
                        </Icon>
                    </View>


                    <View style={styles.middleContainer}>
                        <Text style={styles.title2}>   {profileName}</Text>
                    </View>


                </View>
            </TouchableHighlight>
        )

    }




    render() {
        return (
            <View
                style={styles.container}>


                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />





                <PlayerBottom/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 70,
    },
    container2: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: 'transparent',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
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
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        paddingLeft: 0,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 30,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },
    artistTitle: {
        color: '#804cc8',
        marginTop: 0,
        flex:1,
        textAlign: 'center',
        paddingLeft: 2,
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 15,
        backgroundColor: 'transparent'
    },
    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        paddingLeft: 2,
        justifyContent: 'center',
        alignItems:'flex-start',
    },
    rightContainer: {
        flex: 1,
        paddingRight: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',

    },
    middleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 3,
    },

});


const mapStateToProps = state => {
    const podcast = _.map(state.podcast, (val, uid) => {
        return { ...val, uid };
    });
    return {podcast};
};

export default connect(mapStateToProps, { podcastFetchFollowed })(FollowedContent);