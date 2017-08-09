'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';


class Settings extends Component {

    _handleButtonPressLogOut = () => {
        Actions.StartUp();
    };


    constructor(){
        super();
    }
    render() {
        return (
            <View style={{backgroundColor:'#f6f6f6',flex:1, paddingTop: 10, paddingBottom: 45}}>
                <View style={{borderBottomWidth:1, backgroundColor:'#263238',borderColor:'#c8c7cc'}}>
                    <Text style={{color:'white',marginTop:15,marginBottom:15, marginLeft:15,fontWeight:'bold',fontSize:20}}>Settings</Text>
                </View>
                <View style={{backgroundColor:'#f6f6f6',flex:1}}>
                    <SettingsList borderColor='#d6d5d9' defaultItemSize={50}>
                        <SettingsList.Item
                            hasNavArrow={false}
                            title='Account'
                            titleStyle={{color:'rgba(1,170,170,1)', marginBottom:10, fontWeight:'500'}}
                            itemWidth={50}
                            borderHide={'Both'}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-image">
                                </Icon>
                            }
                            hasNavArrow={true}
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            title='Profile Image'
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-browsers">
                                </Icon>
                            }
                            title='Details'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Header headerStyle={{marginTop:-5}}/>
                        <SettingsList.Item
                            hasNavArrow={false}
                            title='Settings'
                            titleStyle={{color:'rgba(1,170,170,1)', marginBottom:10, fontWeight:'bold'}}
                            itemWidth={70}
                            borderHide={'Both'}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-desktop">
                                </Icon>
                            }
                            title='Display'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-volume-mute">
                                </Icon>
                            }
                            title='Sounds'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-notifications">
                                </Icon>
                            }
                            title='Notifications'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-cloud-download">
                                </Icon>
                            }
                            title='Storage'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-hammer">
                                </Icon>
                            }
                            title='Preferences'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-color-fill">
                                </Icon>
                            }
                            title='Theme'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Header headerStyle={{marginTop: -5}}/>
                        <SettingsList.Item
                            hasNavArrow={true}
                            title='Log Out'
                            titleStyle={{color:'rgba(1,170,170,1)', marginBottom:10, fontWeight:'bold'}}
                            itemWidth={70}
                            borderHide={'Both'}
                            onPress={this._handleButtonPressLogOut}
                        />
                    </SettingsList>
                </View>


                <PlayerBottom/>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle:{
        marginLeft:15,
        marginRight:20,
        alignSelf:'center',
        width:20,
        height:24,
        justifyContent:'center'
    }
});

export default Settings;