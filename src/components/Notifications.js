import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Icon from 'react-native-vector-icons/FontAwesome';


class Notifications extends Component{


    constructor(props) {
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

    }

    render() {
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />

                <ScrollView>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff', paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>Joe liked your podcast.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff', paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>Jane liked your podcast.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff',  paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>Tony liked your podcast.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff',  paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="comment">
                        </Icon>
                        <Text style = {styles.title}>Tony commented on your podcast.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff',  paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>New Episode from Jane.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', backgroundColor: '#fff', paddingVertical: 10, marginVertical: 1}}>
                        <Icon style={{
                            fontSize: 24,
                            backgroundColor: 'transparent',
                            color: '#79797970',
                            marginHorizontal: 10,
                        }} name="user-circle">
                        </Icon>
                        <Text style = {styles.title}>New Episode from Joe.</Text>
                        <View style={{alignSelf:'flex-end'}}>
                            <Icon style={{
                                fontSize: 22,
                                backgroundColor: 'transparent',
                                color: '#79797970',
                                marginHorizontal: 10,
                            }} name="chevron-right">
                            </Icon>
                        </View>
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
        backgroundColor: '#f5f4f9',
    },

    title: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
        backgroundColor: 'transparent',
    },

    titleTop: {
        color: '#3e4164',
        flex:1,
        textAlign: 'center',
        marginVertical: 10,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 22,
        backgroundColor: 'transparent',
    },



});

export default Notifications;