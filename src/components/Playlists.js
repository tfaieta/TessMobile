import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput, ListView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Icon from 'react-native-vector-icons/FontAwesome';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItem from "./ListItem";





// playlist page (on library tab)

class Playlists extends Component{

    componentWillMount = () => {


        Variables.state.playlists = [];
        const {currentUser} = firebase.auth();
        firebase.database().ref(`users/${currentUser.uid}/playlist`).on("value", function (snapshot) {

            snapshot.forEach(function (data) {
                if(data.val()){
                    Variables.state.playlists.push(data.val());
                }

            })

        })




    };


    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }


    constructor(props){
        super(props);

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state={
            newPlaylist: '',
            playlists: dataSource.cloneWithRows(Variables.state.playlists),
        };

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 18, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: true,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
        });

        this.timeout1 = setTimeout(() => {this.setState({playlists: dataSource.cloneWithRows(Variables.state.playlists)})},1000);
        this.timeout2 = setTimeout(() => {this.setState({playlists: dataSource.cloneWithRows(Variables.state.playlists)})},2500);

    };

    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };


    createNewPlaylist = () => {
        const title = this.state.newPlaylist;

        if(title != ""){
            const {currentUser} = firebase.auth();
            firebase.database().ref(`users/${currentUser.uid}/playlist/${title}`).update({title})
        }

        this.setState({newPlaylist: ''})

    };




    render() {
        return (
            <View
                style={styles.container}>


                <ScrollView style={{marginBottom: 50, paddingTop: 70}}>


                    <View style={styles.inputContainer}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{alignItems:'flex-start', flex: 6,}}>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'New Playlist'}
                                    placeholderTextColor= '#506dcf'
                                    autoCapitalize={'sentences'}
                                    autoCorrect={false}
                                    returnKeyType='done'
                                    keyboardType="default"
                                    value={this.state.newPlaylist}
                                    onChangeText={text => {this.setState({newPlaylist: text})}}
                                />
                            </View>
                            <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}} onPress={this.createNewPlaylist}>
                                <Icon style={{
                                    textAlign: 'center',
                                    marginTop: 18,
                                    fontSize: 22,
                                    color: '#506dcf',
                                }} name="plus-circle">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                    </View>



                    <ListView
                        showsHorizontalScrollIndicator={false}
                        horizontal={false}
                        enableEmptySections
                        dataSource={this.state.playlists}
                        renderRow={(data) =>
                            <View style={{backgroundColor: '#fff', borderRadius: 10, marginHorizontal: 10, marginVertical: 5, paddingBottom: 20}}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{alignSelf:'flex-start'}}>
                                        <Text style={styles.title}>{data.title}</Text>
                                    </View>

                                    <View style={{alignSelf:'flex-end', flex:1}}>
                                        <TouchableOpacity onPress={() => {



                                        }}  style={{alignSelf:'flex-end', flexDirection:'row', marginTop: 3}}>
                                            <Icon style={{
                                                fontSize: 22,
                                                backgroundColor: 'transparent',
                                                marginTop: 10,
                                                color: '#506dcf',
                                                marginLeft: 10,
                                                marginRight: 15,
                                            }} name="plus">
                                            </Icon>
                                        </TouchableOpacity>
                                    </View>
                                </View>




                            </View>
                        }
                    />





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
    },

    title: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        marginTop: 20,
        paddingLeft: 20,
        backgroundColor: 'transparent',
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
        color: '#506dcf',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 16,
        backgroundColor: 'transparent',

    },

    input: {
        height: 40,
        backgroundColor: 'transparent',
        marginTop: 10,
        marginBottom: 5,
        color: '#506dcf',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
        paddingHorizontal: 10,
        marginLeft: 10
    },
    inputContainer: {
        backgroundColor:"#fff",
        marginVertical: 5,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },

});

export default Playlists;