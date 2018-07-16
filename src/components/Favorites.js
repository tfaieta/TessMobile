import React, { Component } from 'react';
import { View, StyleSheet, ListView, Alert, ScrollView, Text, Dimensions, Platform, RefreshControl} from 'react-native';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import Variables from "./Variables";
import ListItem from "./ListItem";

var {height, width} = Dimensions.get('window');

let topMargin = 0;
if(Platform.OS === 'ios'){
    topMargin = height/10.26
}


class Favorites extends Component{

    componentWillMount(){
        Variables.state.favPodcasts = [];
        const { currentUser } = firebase.auth();
        const refFav = firebase.database().ref(`users/${currentUser.uid}/favorites`);

        refFav.orderByChild('favorites').once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val()){
                    if(data.val().id){
                        firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (snap) {
                            if(snap.val()){
                                Variables.state.favPodcasts.push(snap.val())
                            }
                        })
                    }
                    else{
                        Variables.state.favPodcasts.push(data.val());
                    }
                }
            })
        });
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
            dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts),
            loading: true,
            refreshing: false,
            favorite: true,
            length: 0
        };
        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts.reverse()), length: Variables.state.favPodcasts.length})},2000);
    }


    _onRefresh = () => {
        this.setState({refreshing: true});

        Variables.state.favPodcasts = [];
        const { currentUser } = firebase.auth();
        const refFav = firebase.database().ref(`users/${currentUser.uid}/favorites`);

        refFav.orderByChild('favorites').once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if(data.val()){
                    if(data.val().id){
                        firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (snap) {
                            Variables.state.favPodcasts.push(snap.val())
                        })
                    }
                    else{
                        Variables.state.favPodcasts.push(data.val());
                    }
                }
            })
        });

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.timeout = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.favPodcasts.reverse()), length: Variables.state.favPodcasts.length, refreshing: false})}, 3000);
    };


    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };



    onGarbagePress(){
        Alert.alert(
            'Are you sure you want to delete?',
            '',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Yes', onPress: () => console.warn('delete')
                },
            ],
            { cancelable: false }
        )
    }



    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
    };




    render() {
        return (
            <View
                style={styles.containerMain}>


                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />}
                >

                    <Text style={styles.title}>{this.state.length} Episodes</Text>

                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />


                    <View style={{paddingBottom: height/5.56}}>

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


export default Favorites;