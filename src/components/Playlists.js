import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, ListView} from 'react-native';
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

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            drawUnderTabBar: false,
            navBarCustomView: 'CustomNavbar',
            navBarCustomViewInitialProps: {
                navigator: this.props.navigator
            },
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


                <ScrollView>

                    <TouchableOpacity style={{flex:1, marginVertical: 12}}>
                        <Icon style={{
                            fontSize: 20,
                            backgroundColor: 'transparent',
                            textAlign: 'center',
                            color: '#5757FF',
                            marginHorizontal: 15,
                        }} name="plus-circle">
                        <Text style = {styles.title}>  Create a New Playlist</Text>
                        </Icon>
                    </TouchableOpacity>


                </ScrollView>



                <PlayerBottom navigator={this.props.navigator}/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
    },

    title: {
        color: '#2A2A30',
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
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',

    }

});

export default Playlists;