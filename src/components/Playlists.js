import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput, ListView} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Icon from 'react-native-vector-icons/FontAwesome';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItem from "./ListItem";





// displays recently played podcasts


class Playlists extends Component{

    componentWillMount(){

    }


    componentWillUnmount(){
    }


    constructor(props){
        super(props);

        this.state={
            newPlaylist: ''
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

    };

    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
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
                            <TouchableOpacity style={{alignItems: 'flex-end', flex: 1}}>
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
        color: '#506dcf',
        flex: 1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 18,
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