'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TextInput,
    Picker
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';


class Settings extends Component {

    _handleButtonPressLogOut = () => {
        firebase.auth().signOut();
        Actions.StartUp();

    };

    _handleButtonPressChangeUsername = () => {
        this.setModalVisible(true)
    };

    _handleButtonPressChangeBio = () => {
        this.setbioModalVisible(true)
    };

    _handleButtonPressChangeCategory = () => {
        this.setCategoryModalVisible(true)
    };

    _handleButtonPressChangeImage = () => {


    };


    setModalVisible(visible) {
        this.setState({modalVisible: visible});

    }

    setbioModalVisible(visible) {
        this.setState({bioModalVisible: visible});

    }

    setCategoryModalVisible(visible) {
        this.setState({categoryModalVisible: visible});

    }


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
            <View style={{backgroundColor:'#f6f6f6',flex:1, paddingTop: 10, paddingBottom: 118}}>
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
                            title='Change Profile Image'
                            onPress={this._handleButtonPressChangeImage}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-person">
                                </Icon>
                            }
                            hasNavArrow={true}
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            title='Change Username'
                            onPress={this._handleButtonPressChangeUsername}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="md-browsers">
                                </Icon>
                            }
                            title='Change Bio'
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            hasNavArrow={true}
                            onPress={this._handleButtonPressChangeBio}
                        />
                        <SettingsList.Item
                            icon={
                                <Icon style={{color: 'rgba(1,170,170,1)', textAlign:'center', marginRight:10,marginLeft: 10, marginTop: 20, fontSize: 30, }} name="ios-heart">
                                </Icon>
                            }
                            hasNavArrow={true}
                            itemWidth={70}
                            titleStyle={{color:'black', fontSize: 16}}
                            title='Change Favorite Category'
                            onPress={this._handleButtonPressChangeCategory}
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
                                placeholderTextColor='#FFF'
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
                                placeholderTextColor='#FFF'
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





                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.categoryModalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <View style={styles.container}>
                        <View>
                            <Picker selectedValue={this.state.category} onValueChange={itemValue => this.setState({category: itemValue})}>
                                <Picker.Item color= "white" label="Select a category..." value="none" />
                                <Picker.Item color= '#64fffc' label="Current Events" value="current" />
                                <Picker.Item color= '#6cff52' label="Fitness" value="fitness" />
                                <Picker.Item color= '#ffd038' label="Politics" value="politics" />
                                <Picker.Item color= '#ff5442' label="Gaming" value="gaming" />
                                <Picker.Item color= '#7fa5ff' label="Sports" value="sports" />
                                <Picker.Item color= '#fdff53' label="Entertainment" value="entertainment" />
                                <Picker.Item color= '#3aff97' label="Life" value="life" />
                                <Picker.Item color= '#ff5e95' label="Fashion" value="fashion" />
                                <Picker.Item color= '#bd59ff' label="Trends" value="trends" />
                                <Picker.Item color= '#ff861c'label="Cars" value="cars" />
                                <Picker.Item color= '#aeb1a7' label="Misc" value="misc" />
                            </Picker>

                            <TouchableOpacity onPress={() => {

                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/favCategory')
                                    .update({   favCategory: this.state.category  });

                                this.setCategoryModalVisible(!this.state.categoryModalVisible)
                            }}>
                                <Text style={styles.buttonStyle}>Done</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                this.setCategoryModalVisible(!this.state.categoryModalVisible)
                            }}>
                                <Text style={styles.buttonStyle}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal>






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
    },
    container:{
        flex: 1,
        backgroundColor: '#0887c8',
    },
    buttonStyle:{
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom:5,
        marginTop: 5,
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 0,
        borderColor: '#FFF',
        backgroundColor: '#856cff',
        alignItems: 'center',
        textAlign: 'center',
        color: '#fff',
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
    },
    inputStyle:{
        marginTop: 50,
        height: 40,
        backgroundColor: '#0777b2',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
        fontSize: 20,
    },
    input2: {
        marginTop: 50,
        height: 100,
        backgroundColor: '#0777b2',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
        fontSize: 20,
    },
});

export default Settings;