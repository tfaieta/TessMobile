import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemQueue from "./ListItemQueue";
import ListItemCatchUp from "./ListItemCatchUp";


// catch up pop up for library page (x episodes left...)

class CatchUp extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true
    };

    componentWillMount(){
        const {currentUser} = firebase.auth();

        Variables.state.catchUpLength = [];
        firebase.database().ref(`users/${currentUser.uid}/tracking`).once("value", function (snapshot) {
            snapshot.forEach(function (snap) {
                Variables.state.catchUpLength.push(snap.val());
            })
        })

    }


    componentWillUnmount(){
        clearInterval(this.interval);
    }


    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource: dataSource.cloneWithRows(Variables.state.catchUpLength),
        };

        this.interval = setInterval(() => {
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.catchUpLength)})
        },1000);

    };

    _pressBack = () => {
        this.props.navigator.dismissModal({
            animated: true,
            animationType: 'fade',
        });
    };


    renderRow = (rowData) => {
        return <ListItemCatchUp podcast={rowData} navigator={this.props.navigator} />;
    };


    render() {
        return (
            <View style = {{backgroundColor: 'transparent', flex:1}}>
                <View
                    style={styles.container}>


                    <View style={{flexDirection: 'row', paddingVertical:5, paddingBottom: 15}}>
                        <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                            <TouchableOpacity onPress={this._pressBack}>
                                <Icon style={{
                                    textAlign:'left',marginLeft: 10, fontSize: 30,color:'#007aff',
                                }} name="ios-arrow-back">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={styles.header}>Tracked List</Text>
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
        marginTop: 10,
    },

    title: {
        color: '#3e4164',
        marginTop:10,
        marginLeft: 20,
        flex:1,
        textAlign: 'left',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        backgroundColor: 'transparent'
    },

    header: {
        marginTop:25,
        marginLeft: -35,
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        backgroundColor: 'transparent',

    }

});

export default CatchUp;