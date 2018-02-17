import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, ListView,  RefreshControl, View} from 'react-native';
import Variables from "../Variables";
import firebase from 'firebase';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import ListItem from "../ListItem";



class TopCharts extends Component{

    componentWillMount(){

        Variables.state.topCharts = [];
        const { currentUser } = firebase.auth();
        const ref = firebase.database().ref(`podcasts/`);

        ref.limitToLast(350).once("value", function (snapshot) {

            snapshot.forEach(function (data) {
                if(data.child("plays").numChildren() > 3){

                    if(!Variables.state.topCharts[data.child("plays").numChildren() * 2]){
                        Variables.state.topCharts[data.child("plays").numChildren() * 2] = data.val();
                    }
                    else{
                        if(!Variables.state.topCharts[data.child("plays").numChildren() * 2 + 1]){
                            Variables.state.topCharts[data.child("plays").numChildren() * 2 + 1] = data.val();
                        }
                        else{
                            if(!Variables.state.topCharts[data.child("plays").numChildren() * 2 + 2]){
                                Variables.state.topCharts[data.child("plays").numChildren() * 2 + 2] = data.val();
                            }
                            else {
                                Variables.state.topCharts[data.child("plays").numChildren() * 2 + 3] = data.val();
                            }

                        }

                    }


                }

            })

        });



    }

    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows([]),
            refreshing: false
        };
        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},1000);

        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},3000);

        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},5000);

        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},7000);
    }



    fetchData(){

        Variables.state.topCharts = [];
        const { currentUser } = firebase.auth();
        const ref = firebase.database().ref(`podcasts/`);

        ref.limitToLast(350).once("value", function (snapshot) {

            snapshot.forEach(function (data) {
                if(data.child("plays").numChildren() > 3){

                    if(!Variables.state.topCharts[data.child("plays").numChildren() * 2]){
                        Variables.state.topCharts[data.child("plays").numChildren() * 2] = data.val();
                    }
                    else{
                        if(!Variables.state.topCharts[data.child("plays").numChildren() * 2 + 1]){
                            Variables.state.topCharts[data.child("plays").numChildren() * 2 + 1] = data.val();
                        }
                        else{
                            if(!Variables.state.topCharts[data.child("plays").numChildren() * 2 + 2]){
                                Variables.state.topCharts[data.child("plays").numChildren() * 2 + 2] = data.val();
                            }
                            else {
                                Variables.state.topCharts[data.child("plays").numChildren() * 2 + 3] = data.val();
                            }

                        }

                    }


                }

            })

        });


    }


    _onRefresh() {
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.setState({refreshing: true});
        this.setState({dataSource: dataSource.cloneWithRows([])});

        this.fetchData();

        this.setState({
            refreshing: false,
        });

        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},1000);
        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},3000);
        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},5000);
        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.topCharts)})},7000);


    }



    renderRow = (podcast) => {
        return <ListItem podcast={podcast} navigator={this.props.navigator} />;
    };


    render() {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh.bind(this)}
                    />
                }
            >

                <View style={{flex:1}}>
                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
                    />
                </View>

                <View style={{paddingBottom: 120}}/>

            </ScrollView>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 0,
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

});

export default TopCharts;