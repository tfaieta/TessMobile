import React, { Component } from 'react';
import { View, StyleSheet, ListView, ScrollView, Text, ActivityIndicator, Dimensions, RefreshControl} from 'react-native';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import ListItemActivity from "./ListItemActivity";

var {height, width} = Dimensions.get('window');


class Activity extends Component{



    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }


    constructor(props){
        super(props);

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            loading: true,
            refreshing: false,
        };


        // fetch activity of followed users
        const {currentUser} = firebase.auth();
        let activity = [];
        firebase.database().ref(`users/${currentUser.uid}/following`).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                firebase.database().ref(`users/${snap.key}/activity`).limitToLast(10).once('value', function (data) {
                    if(data.val()){
                        data.forEach(function (dataAgain) {
                            activity.push(dataAgain.val());
                            for(let i = activity.length-1; i > 0 && activity[i].time > activity[i-1].time; i--){
                                let temp = activity[i-1];
                                activity[i-1] = activity[i];
                                activity[i] = temp;
                            }
                        })
                    }
                })
            })
        });


        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(activity), loading: false })},4000);

    }




    _onRefresh() {
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.setState({
            refreshing: true,
            loading: false,
            dataSource: dataSource.cloneWithRows([]),
        });

        // fetch activity of followed users
        const {currentUser} = firebase.auth();
        let activity = [];
        firebase.database().ref(`users/${currentUser.uid}/following`).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                firebase.database().ref(`users/${snap.key}/activity`).limitToLast(10).once('value', function (data) {
                    if(data.val()){
                        data.forEach(function (dataAgain) {
                            activity.push(dataAgain.val());
                            for(let i = activity.length-1; i > 0 && Object.keys(activity[i].time) > Object.keys(activity[i-1].time); i--){
                                let temp = activity[i-1];
                                activity[i-1] = activity[i];
                                activity[i] = temp;
                            }
                        })
                    }
                })
            })
        });

        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(activity.reverse()), loading: false, refreshing: false })},4000);


    }


    renderRow = (rowData) => {
        return <ListItemActivity action={rowData.action} user={rowData.user} id={rowData.id} time={rowData.time} navigator={this.props.navigator} />;
    };


    renderList = () => {
        if(this.state.dataSource.getRowCount() > 0){
            return(
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                />
            )
        }
        else{
            return(
                <View style={styles.container}>
                    <Text style = {styles.title}>No Activity Yet...</Text>
                </View>
            )
        }

    };


    render() {
        if(this.state.loading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style={{paddingVertical: height/33.35, alignSelf:'center'}} color='#3e4164' size ="large" />
                </View>
            )
        }
        else{
            return (
                <View
                    style={styles.container}>

                    <ScrollView  refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                    >

                        {this.renderList()}

                        <View style = {{paddingBottom: height/11.12}} />


                    </ScrollView>

                    <PlayerBottom navigator={this.props.navigator}/>


                </View>


            );
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#f5f4f9',
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


export default Activity;