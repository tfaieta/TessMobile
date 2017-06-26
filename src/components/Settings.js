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
                                <View style={styles.imageStyle}>
                                    <Image style={{alignSelf:'center',height:22, width:22}}/>
                                </View>
                            }
                            hasNavArrow={true}
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            title='Profile Image'
                        />
                        <SettingsList.Item
                            icon={
                                <View style={styles.imageStyle}>
                                    <Image style={{alignSelf:'center',height:4, width:18}} />
                                </View>
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
                                <View style={styles.imageStyle}>
                                    <Image style={{alignSelf:'center',height:22, width:22}}/>
                                </View>
                            }
                            title='Display'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <View style={styles.imageStyle}>
                                    <Image style={{alignSelf:'center',height:20, width:18}} />
                                </View>
                            }
                            title='Sounds'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <View style={styles.imageStyle}>
                                    <Image style={{alignSelf:'center',height:22, width:14}} />
                                </View>
                            }
                            title='Notifications'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <View style={styles.imageStyle}>
                                    <Image style={{alignSelf:'center',height:14, width:20}}/>
                                </View>
                            }
                            title='Storage'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <View style={styles.imageStyle}>
                                    <Image style={{alignSelf:'center',height:22, width:14}} />
                                </View>
                            }
                            title='Preferences'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                        />
                        <SettingsList.Item
                            icon={
                                <View style={styles.imageStyle}>
                                    <Image style={{alignSelf:'center',height:18, width:20}} />
                                </View>
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