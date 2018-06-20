import React, { Component } from 'react';
import { View, StyleSheet, ListView, Text, ScrollView, Dimensions, Platform} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';

import { Navigation } from 'react-native-navigation';
import ListItemFollowed from "./ListItemFollowed";

var {height, width} = Dimensions.get('window');

let topMargin = 0;
if(Platform.OS === 'ios'){
    topMargin = height/10.26
}


class FollowedContent extends Component{

    componentWillMount(){
        Variables.state.usersFollowed = [];

        const { currentUser } = firebase.auth();
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);

        let sortedData = [];
        refFol.orderByChild('following').once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.key){
                    firebase.database().ref(`users/${data.key}/username`).once('value', function (snap) {
                        if(snap.val()){
                            if(snap.val().username){
                                sortedData.push({username: snap.val().username, id: data.key});
                                for(let i = sortedData.length-1; i > 0 && sortedData[i].username.toLowerCase() > sortedData[i-1].username.toLowerCase(); i--){
                                    let temp = sortedData[i-1];
                                    sortedData[i-1] = sortedData[i];
                                    sortedData[i] = temp;
                                }
                            }
                        }
                    })
                }
            })
        });


        setTimeout(() => {
            sortedData.forEach(function (data) {
                Variables.state.usersFollowed.push(data.id)
            })
        }, 1500)

    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
    }


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
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: false,
            statusBarColor: '#fff',
            drawUnderNavBar: Platform.OS === 'ios',
            navBarTranslucent: Platform.OS === 'ios',
            navBarNoBorder: true,

        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.usersFollowed),
            length: 0,
            loading: true,
        };

        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.usersFollowed.reverse()), length: Variables.state.usersFollowed.length})},2000);
    }

    state={
        loading: true
    };





    renderRow = (podcast) => {
        const {navigator} = this.props;
        return <ListItemFollowed podcast={podcast} navigator={navigator}/>;
    };


    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
        Navigation.dismissModal({
            animationType: 'slide-down'
        });
    };



    render() {

        return (
            <View
                style={styles.container}>

                <ScrollView>

                    <Text style={styles.title}>{this.state.length} podcasts</Text>

                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />


                    <View style={{paddingBottom: height/5.56}} />

                </ScrollView>


                <PlayerBottom navigator={this.props.navigator}/>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
        marginTop: topMargin,
    },

    title: {
        backgroundColor: 'transparent',
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/20.83,
        paddingVertical: height/66.7,
        marginBottom: height/667,
    },

});

export default FollowedContent;