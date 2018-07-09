import React, { Component } from 'react';
import { View, StyleSheet, ListView, Text, ScrollView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import ListItem from "./ListItem";



// expanded view of single playlist, from playlists

class PlaylistView extends Component{

    constructor(props){
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 18, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: true,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
        });

        let myPlaylist = [];
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(myPlaylist),
            length: 0,
        };

        const {title} = this.props;
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
            this.setState({dataSource: dataSource.cloneWithRows(myPlaylist), length: myPlaylist.length})
        }, 1200)

    }



    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
    };




    render() {
        return (
            <View
                style={styles.containerMain}>


                <ScrollView>

                    <Text style={styles.title}>{this.state.length} episodes</Text>

                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />


                    <View style={{paddingBottom:120}}>

                    </View>

                </ScrollView>




                <PlayerBottom navigator={this.props.navigator}/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    containerMain:{
        flex: 1,
        backgroundColor: '#f5f4f9',
    },

    title: {
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        marginTop: 80,
        marginBottom: 15,
        backgroundColor: 'transparent',
    },

});



export default PlaylistView;