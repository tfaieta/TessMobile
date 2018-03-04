import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, ListView, View, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "../Variables";
import firebase from 'firebase';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import ListItem from "../ListItem";


class Following extends Component{

    componentWillMount(){

        Variables.state.followedContent = [];
        const { currentUser } = firebase.auth();
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);
        const ref = firebase.database().ref(`podcasts/`);

        refFol.orderByChild('following').on("value", function (snapshot) {
            snapshot.forEach(function (data) {

                ref.on("value", function (snapshot) {

                    snapshot.forEach(function (data2) {
                        if(data.key == data2.val().podcastArtist) {
                            Variables.state.followedContent.push(data2.val());
                        }
                    })

                });


            })
        });

    }

    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
        clearTimeout(this.timeout3);
    }

    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.followedContent),
            refreshing: false
        };

        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.followedContent)})},1000);

        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.followedContent)})},3000);

        this.timeout3 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.followedContent)})},5000);
    }


    fetchData(){

        Variables.state.followedContent = [];
        const { currentUser } = firebase.auth();
        const refFol = firebase.database().ref(`users/${currentUser.uid}/following`);
        const ref = firebase.database().ref(`podcasts/`);

        refFol.orderByChild('following').on("value", function (snapshot) {
            snapshot.forEach(function (data) {

                ref.on("value", function (snapshot) {

                    snapshot.forEach(function (data2) {
                        if(data.key == data2.val().podcastArtist) {
                            Variables.state.followedContent.push(data2.val());
                        }
                    })

                });


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

        setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(Variables.state.followedContent)})},1000)


    }


    renderRow = (rowData) => {
        return <ListItem podcast={rowData} navigator={this.props.navigator} />;
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

    containerMain:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },

    container2: {
        flex: 1,
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    title2: {
        color: '#2A2A30',
        flex:1,
        marginTop:20,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    title: {
        color: '#2A2A30',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginHorizontal: 20,

    },
    artistTitle: {
        color: '#828393',
        marginTop: 0,
        flex:1,
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 15,
        backgroundColor: 'transparent',
        marginLeft: 20,
    },

    header: {
        marginTop:25,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 18,
        backgroundColor: 'transparent',

    },

    container: {
        paddingHorizontal: 0,
        paddingVertical: 10,
        marginVertical: 0,
        marginHorizontal: 0,
        backgroundColor: '#FFF',
        opacity: 1,
        borderColor: '#FFF',
        borderWidth: 0.5,
        borderRadius: 0,
        borderStyle: 'solid',
        flexDirection: 'row',
    },

    centerContainer: {
        flexDirection: 'row'
    },
    leftContainer: {
        flex: 7,
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
        alignItems: 'center',
        marginTop: 3,
        marginHorizontal: -100,
    },

});

export default Following;