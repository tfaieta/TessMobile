import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemAddtoPlaylist from "./ListItemAddtoPlaylist";



// list view containing all of your playlists when choosing to add to a playlist

class PlaylistList extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'dark',
        statusBarColor: '#fff',
    };

    componentWillMount(){

        Variables.state.playlists = [];
        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/playlist`).once("value", function (snapshot) {

            snapshot.forEach(function (data) {
                if(data.val()){
                    Variables.state.playlists.push(data.val());
                }

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
            dataSource: dataSource.cloneWithRows(Variables.state.playlists),
        };

        this.interval = setInterval(() => {
            this.setState({dataSource: dataSource.cloneWithRows(Variables.state.playlists)})
        },1000);

    };

    _pressBack = () => {
        this.props.navigator.dismissModal({
            animated: true,
            animationType: 'fade',
        });
    };


    renderRow = (rowData) => {
        const {id} = this.props;
        return <ListItemAddtoPlaylist data={rowData} id = {id} navigator={this.props.navigator} />;
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
                            <Text style={styles.header}>Select a Playlist</Text>
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

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

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

export default PlaylistList;