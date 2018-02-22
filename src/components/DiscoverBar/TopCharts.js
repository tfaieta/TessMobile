import React, { Component } from 'react';
import { StyleSheet, ScrollView, ListView,  RefreshControl, View} from 'react-native';
import Variables from "../Variables";
import firebase from 'firebase';
import ListItem from "../ListItem";



// popular tab on discover page

class TopCharts extends Component{

    componentWillMount(){

        Variables.state.topCharts = [];
        const ref = firebase.database().ref(`podcasts/`);

        ref.limitToLast(400).once("value", function (snapshot) {

            snapshot.forEach(function (data) {

                if(data.child("plays").numChildren() > 0){
                    Variables.state.topCharts.push(data.val());
                    for(let i = Variables.state.topCharts.length-1; i > 0 && Object.keys(Variables.state.topCharts[i].plays).length > Object.keys(Variables.state.topCharts[i-1].plays).length; i--){
                        let temp = Variables.state.topCharts[i-1];
                        Variables.state.topCharts[i-1] = Variables.state.topCharts[i];
                        Variables.state.topCharts[i] = temp;
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
        const ref = firebase.database().ref(`podcasts/`);

        ref.limitToLast(400).once("value", function (snapshot) {

            snapshot.forEach(function (data) {

                if(data.child("plays").numChildren() > 0){
                    Variables.state.topCharts.push(data.val());
                    for(let i = Variables.state.topCharts.length-1; i > 0 && Object.keys(Variables.state.topCharts[i].plays).length > Object.keys(Variables.state.topCharts[i-1].plays).length; i--){
                        let temp = Variables.state.topCharts[i-1];
                        Variables.state.topCharts[i-1] = Variables.state.topCharts[i];
                        Variables.state.topCharts[i] = temp;
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