import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemQueue from "./ListItemQueue";


class MyQueue extends Component{

static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true
    };

    componentWillMount(){
        const {currentUser} = firebase.auth();


        firebase.database().ref(`users/${currentUser.uid}/queue`).on("value", function (snapshot) {
            Variables.state.myQueue = [];
            snapshot.forEach(function (snap) {
                firebase.database().ref(`podcasts/${snap.val().id}`).on("value", function (data) {
                    if(data.val()){
                        Variables.state.myQueue.push(data.val())
                    }

                })
            });
        });

    }


    componentWillUnmount(){
        clearInterval(this.interval);
    }


    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.myQueue),
        };

        this.interval = setInterval(() => {
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.myQueue)})
        },1000);

    };

    _pressBack = () => {
        this.props.navigator.dismissModal({
            animated: true,
            animationType: 'fade',
        });
    };


    renderRow = (rowData) => {
        return <ListItemQueue podcast={rowData} navigator={this.props.navigator} />;
    };


    render() {
        return (
            <View style = {{backgroundColor: '#414149', flex:1}}>
            <View
                style={styles.container}>


                <View style={{flexDirection: 'row', paddingVertical:5, paddingBottom: 15}}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 30,color:'#9496A3'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>My Queue</Text>
                    </View>

                    <View>
                    </View>

                </View>


                <ScrollView>


                    <ListView
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />


                    <View style={{paddingBottom:120}}>

                    </View>

                </ScrollView>


            </View>
            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        marginTop: 20,
        marginHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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

export default MyQueue;