import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';



class Library extends Component{

    componentWillMount(){
        Variables.state.usersFollowed = [];
        Variables.state.favPodcasts = [];

        const { currentUser } = firebase.auth();
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);
        const refFav = firebase.database().ref(`users/${currentUser.uid}/favorites`);

        refFol.orderByChild('following').on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                Variables.state.usersFollowed.push(data.key);
            })
        });

        refFav.orderByChild('favorites').on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                Variables.state.favPodcasts.push(data.val());
            })
        });



    }




    GoToQueue = () => {
        Actions.Queue();
    };

    GoToFavs = () => {
        Actions.Favorites();
    };

    GoToFollowedContent = () => {
        Actions.FollowedContent();
    };

    GoToMyContent = () => {
        Actions.MyContent();
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />


                <View style={{flexDirection: 'row', width: 375, height: 70, borderRadius: 10, borderWidth: 2, borderColor: 'rgba(187,188,205,0.3)',   }}>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={styles.header}>Library</Text>
                    </View>
                </View>


                <Image
                    style={{width: 260, height:260, alignSelf: 'center', marginTop: 100}}
                    source={require('tess/src/images/library-nav.png')}
                >


                    <View style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this.GoToFavs} style={{flex:1, width: 260, height:130, alignSelf: 'flex-start'}}>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.GoToQueue} style={{flex:1, width: 260, height:130, alignSelf: 'flex-start'}}>

                        </TouchableOpacity>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={this.GoToFollowedContent}  style={{flex:1, width: 260, height:130, alignSelf: 'flex-start'}}>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.GoToMyContent} style={{flex:1, width: 260, height:130, alignSelf: 'flex-start'}}>

                        </TouchableOpacity>
                    </View>
                    </View>



                </Image>


                <PlayerBottom/>

            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
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


    contentTitle: {
        color: '#FFF',
        fontSize: 25,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',

    },

    buttonPreview: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingBottom: 15,
    },

    buttonUpload: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonCancel: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonContainer: {
        marginTop: 50,
    },

    header: {
        marginTop:25,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 18,
        backgroundColor: 'transparent',

    }
});

export default Library;