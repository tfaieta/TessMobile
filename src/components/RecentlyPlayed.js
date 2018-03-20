import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItem from "./ListItem";





// displays recently played podcasts


class RecentlyPlayed extends Component{

static navigatorStyle = {
    statusBarHidden: false,
    statusBarTextColorScheme: 'light',
    navBarHidden: false,
    drawUnderTabBar: false,
    navBarCustomView: 'CustomNavbar',
    navBarCustomViewInitialProps: {navigator},
    navBarHideOnScroll: true,
    navBarBackgroundColor: '#fff',
    topBarElevationShadowEnabled: true,
    topBarShadowColor: '#000',
    topBarShadowOpacity: 1,
    topBarShadowOffset: 20,
    topBarShadowRadius: 10,
    };

    componentWillMount(){
        const {currentUser} = firebase.auth();

        firebase.database().ref(`users/${currentUser.uid}/recentlyPlayed`).on("value", function (snapshot) {
            Variables.state.recentlyPlayed = [];
            snapshot.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.val().id}`).on("value", function (data) {
                    if(data.val()){
                        Variables.state.recentlyPlayed.push(data.val())
                    }

                })
            });
            Variables.state.recentlyPlayed.reverse();
        });

    }


    componentWillUnmount(){
        clearTimeout(this.timeout);
        clearTimeout(this.timeout2);
    }


    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.recentlyPlayed),
        };
        this.timeout = setTimeout(() => {
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.recentlyPlayed)})
        },1000);
        this.timeout2 = setTimeout(() => {
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.recentlyPlayed)})
        },2500);
    };

    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };


    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
    };


    render() {
        return (
            <View
                style={styles.container}>


                <ScrollView>

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
    container:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    title: {
        color: '#2A2A30',
        marginTop:10,
        marginLeft: 20,
        flex:1,
        textAlign: 'left',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 20,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },

    header: {
        marginTop:25,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',

    }

});

export default RecentlyPlayed;