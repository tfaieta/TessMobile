import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import PlayerBottom from './PlayerBottom';
import Icon from 'react-native-vector-icons/FontAwesome';


class Notifications extends Component{

    static navigatorStyle = {
        statusBarHidden: false,
        statusBarTextColorScheme: 'light',
        navBarHidden: false,
        drawUnderTabBar: false,
        navBarCustomView: 'CustomNavbar',
        navBarCustomViewInitialProps: {navigator},
        navBarHideOnScroll: true,
        navBarBackgroundColor: '#fff',
        topBarElevationShadowEnabled: true,
        topBarShadowColor: '#000',
        topBarShadowOpacity: 1,
        topBarShadowOffset: 20,
        topBarShadowRadius: 10,
    };



    _pressSettings = () => {
        this.props.navigator.push({
            screen: 'Settings',
            animated: true,
            animationType: 'fade',
        });
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View
                style={styles.container}>

                <StatusBar
                    barStyle="dark-content"
                />

                <ScrollView>

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 15}} onPress={this._pressSettings}>
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

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 15}}>
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

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 15}}>
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

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 15}}>
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

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 15}}>
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

                    <TouchableOpacity style={{flex:1, flexDirection:'row', marginVertical: 15}}>
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
        backgroundColor: '#fff',
    },

    title: {
        flex:1,
        color: '#000',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 20,
        backgroundColor: 'transparent',
    },

    titleTop: {
        color: '#000',
        flex:1,
        textAlign: 'center',
        marginVertical: 10,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 22,
        backgroundColor: 'transparent',
    },



});

export default Notifications;