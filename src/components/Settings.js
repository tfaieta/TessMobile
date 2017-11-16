'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';


class Settings extends Component {

    _handleButtonPressLogOut = () => {
        firebase.auth().signOut();
        Navigation.startSingleScreenApp({
            screen: {
                screen: 'Startup',
            },
            appStyle: {
                navBarHidden: true,
                orientation: 'portrait',
                bottomTabBadgeTextColor: 'white',
                bottomTabBadgeBackgroundColor: 'white',
                hideBackButtonTitle: true/false
            },
            animationType: 'slide-down'
        });

    };

    _handleButtonPressChangeUsername = () => {
        this.setModalVisible(true)
    };

    _handleButtonPressChangeBio = () => {
        this.setbioModalVisible(true)
    };


    _handleButtonPressChangeImage = () => {


    };


    setModalVisible(visible) {
        this.setState({modalVisible: visible});

    }

    setbioModalVisible(visible) {
        this.setState({bioModalVisible: visible});

    }

    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };




    constructor(){
        super();
    }
    state = {
        modalVisible: false,
        bioModalVisible: false,
        categoryModalVisible: false,
        username: '',
        bio: '',
        category: '',
        image: ''
    };

    render() {
        return (
            <View style={{backgroundColor:'#f6f6f6',flex:1, paddingBottom: 118}}>

                <View style={{flexDirection: 'row', paddingVertical:5, borderRadius: 10, borderWidth: 2, borderColor: 'rgba(187,188,205,0.3)',   }}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={this._pressBack}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 30,color:'#9496A3'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>Settings</Text>
                    </View>

                    <View>
                    </View>

                </View>


                <View style={{backgroundColor:'#f6f6f6',flex:1}}>
                    <SettingsList borderColor='#d6d5d9' defaultItemSize={50}>
                        <SettingsList.Item
                            hasNavArrow={false}
                            title='Account'
                            titleStyle={{color:'#5757FF', marginBottom:10, fontWeight:'500', fontFamily: 'Hiragino Sans'}}
                            itemWidth={50}
                            borderHide={'Both'}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: '#5757FF', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-image">
                                </Icon>
                            }
                            hasNavArrow={true}
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16, fontFamily: 'Hiragino Sans'}}
                            title='Change Profile Image'
                            onPress={this._handleButtonPressChangeImage}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: '#5757FF', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-person">
                                </Icon>
                            }
                            hasNavArrow={true}
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16, fontFamily: 'Hiragino Sans'}}
                            title='Change Username'
                            onPress={this._handleButtonPressChangeUsername}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: '#5757FF', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-browsers">
                                </Icon>
                            }
                            title='Change Bio'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16, fontFamily: 'Hiragino Sans'}}
                            hasNavArrow={true}
                            onPress={this._handleButtonPressChangeBio}
                        />

                        <SettingsList.Header headerStyle={{marginTop: -5}}/>
                        <SettingsList.Item
                            hasNavArrow={true}
                            title='Log Out'
                            titleStyle={{color:'#5757FF', marginBottom:10, fontWeight:'bold',fontFamily: 'Hiragino Sans' }}
                            itemWidth={70}
                            borderHide={'Both'}
                            onPress={this._handleButtonPressLogOut}
                        />
                    </SettingsList>
                </View>



                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={styles.container}>
                        <View>
                            <TextInput
                                autoCapitalize={'none'}
                                style={styles.inputStyle}
                                returnKeyType='done'
                                autoCorrect={false}
                                value={this.state.username}
                                placeholder = "New Username"
                                placeholderTextColor='#2A2A30'
                                onChangeText={text => this.setState({username: text})}
                                onSubmitEditing={(event) => {
                                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/username')
                                        .update({   username: this.state.username });
                                    this.setModalVisible(!this.state.modalVisible)
                                }}
                           />

                            <TouchableOpacity onPress={() => {
                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/username')
                                    .update({   username: this.state.username });
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text style={styles.buttonStyle}>Done</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text style={styles.buttonStyle}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal>




                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.bioModalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={styles.container}>
                        <View>
                            <TextInput
                                autoCapitalize={'none'}
                                style={styles.input2}
                                returnKeyType='done'
                                autoCorrect={false}
                                value={this.state.bio}
                                placeholder = "New Bio"
                                placeholderTextColor='#2A2A30'
                                onChangeText={text => this.setState({bio: text})}
                                multiline={true}
                                maxLength={500}
                                onSubmitEditing={(event) => {
                                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/bio')
                                        .update({   bio: this.state.bio  });
                                    this.setbioModalVisible(!this.state.bioModalVisible)
                                }}
                            />

                            <TouchableOpacity onPress={() => {

                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/bio')
                                    .update({   bio: this.state.bio  });


                                this.setbioModalVisible(!this.state.bioModalVisible)
                            }}>
                                <Text style={styles.buttonStyle}>Done</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setbioModalVisible(!this.state.bioModalVisible)
                            }}>
                                <Text style={styles.buttonStyle}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal>






                <PlayerBottom navigator={this.props.navigator}/>


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
    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    buttonStyle:{
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom:5,
        marginHorizontal: 15,
        marginTop: 5,
        borderWidth: 0.1,
        borderRadius: 10,
        borderColor: 'transparent',
        backgroundColor: '#856cff',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 25,
    },

    inputStyle:{
        marginHorizontal: 15,
        marginTop: 50,
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 40,
        color: '#2A2A30',
        paddingHorizontal: 10,
        fontSize: 20,
    },
    input2: {
        marginHorizontal: 15,
        marginTop: 50,
        height: 100,
        backgroundColor: '#fff',
        marginBottom: 40,
        color: '#2A2A30',
        paddingHorizontal: 10,
        fontSize: 20,
    },

    header: {
        marginTop:25,
        marginLeft: -35,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 18,
        backgroundColor: 'transparent',

    }
});

export default Settings;