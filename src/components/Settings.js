import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TextInput,
    ScrollView
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import SettingsList from 'react-native-settings-list';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import Variables from './Variables';
import DropdownAlert from 'react-native-dropdownalert';


class Settings extends Component {


    constructor(){
        super();
        this.state = {
            modalVisible: false,
            bioModalVisible: false,
            imageModalVisible: false,
            username: '',
            bio: '',
            category: '',
            image: ''
        };
    }


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
        this.setImageModalVisible(true)
    };


    setModalVisible(visible) {
        this.setState({modalVisible: visible});

    }

    setbioModalVisible(visible) {
        this.setState({bioModalVisible: visible});

    }

    setImageModalVisible(visible) {
        this.setState({imageModalVisible: visible});
    }

    _pressBack = () => {
        this.props.navigator.pop({
            animated: true,
            animationType: 'fade',
        });
    };

    changeUsername = () => {
        if(this.state.username != ''){

            firebase.database().ref(`usernames/`).child(this.state.username.toLowerCase()).once("value", function (snapshot) {
                if(snapshot.val()){
                    console.warn(snapshot.val().username + " is taken");
                    this.dropdown.alertWithType("custom", "", "Username is taken.");
                    this.setState({modalVisible: false})
                }
                else{

                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/username').once('value', function (data) {

                        firebase.database().ref(`usernames/${data.val().username}`).remove()
                    });
                    firebase.database().ref(`usernames`).child(this.state.username.toLowerCase()).update({username: this.state.username.toLowerCase()});

                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/username')
                        .update({   username: this.state.username });

                    this.dropdown.alertWithType("custom", "", "Username Updated Successfully.");
                    this.setState({modalVisible: false})

                }
            }.bind(this)).catch(() => { console.warn("error")} );

        }



    };



    render() {

        return (
            <View style={{backgroundColor:'#fff',flex:1, paddingBottom: 118}}>

                <View style={{flexDirection: 'row', paddingVertical:5, paddingBottom: 15, shadowOffset:{  width: 0,  height: 6}, shadowOpacity: 0.2, shadowRadius: 10}}>
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
                    <ScrollView   scrollEnabled={false}>

                    <View style={styles.container}>
                        <View>
                            <TextInput
                                autoCapitalize={'none'}
                                style={styles.inputStyle}
                                returnKeyType='done'
                                autoCorrect={false}
                                value={this.state.username}
                                maxLength={20}
                                placeholder = "New Username"
                                placeholderTextColor='#2A2A30'
                                onChangeText={text => this.setState({username: text})}
                                onSubmitEditing={this.changeUsername}
                           />

                            <TouchableOpacity style={styles.buttonStyle} onPress={this.changeUsername}>
                                <Text style={styles.textStyle}>Done</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonStyleCancel} onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text style={styles.textStyleCancel}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    </ScrollView>

                </Modal>




                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.bioModalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >
                    <ScrollView   scrollEnabled={false}>

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
                                maxLength={250}
                                onSubmitEditing={(event) => {
                                    firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/bio')
                                        .update({   bio: this.state.bio  });
                                    this.dropdown.alertWithType("custom", "", "Bio Updated Successfully.");
                                    this.setbioModalVisible(!this.state.bioModalVisible)
                                }}
                            />

                            <TouchableOpacity style={styles.buttonStyle} onPress={() => {

                                firebase.database().ref(`users/${firebase.auth().currentUser.uid}`).child('/bio')
                                    .update({   bio: this.state.bio  });
                                this.dropdown.alertWithType("custom", "", "Bio Updated Successfully.");
                                this.setbioModalVisible(!this.state.bioModalVisible)
                            }}>
                                <Text style={styles.textStyle}>Done</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonStyleCancel} onPress={() => {
                                this.setbioModalVisible(!this.state.bioModalVisible)
                            }}>
                                <Text style={styles.textStyleCancel}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                    </ScrollView>

                </Modal>




                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.imageModalVisible}
                    onRequestClose={() => {alert("Modal has been closed.")}}
                >

                    <View style={styles.container}>
                        <View style ={{marginTop: 100}}>

                            <TouchableOpacity style={styles.buttonStyle} onPress={() => {

                                ImagePicker.openPicker({
                                    width: 160,
                                    height: 160,
                                    cropping: true,
                                    mediaType: 'photo',
                                    includeBase64: true,
                                }).then(image => {


                                    const {currentUser} = firebase.auth();
                                    const storageRef = firebase.storage().ref(`/users/${currentUser.uid}/image-profile-uploaded`);
                                    const Blob = RNFetchBlob.polyfill.Blob;
                                    const fs = RNFetchBlob.fs;
                                    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
                                    window.Blob = Blob;
                                    const uid = firebase.auth().uid;
                                    const imagePath = image.path;
                                    let uploadBlob = null;
                                    let mime = image.mime;


                                    fs.readFile(imagePath, 'base64')
                                        .then((data) => {
                                            return Blob.build(data, {type: `${mime};BASE64`})
                                        })
                                        .then((blob) => {
                                            uploadBlob = blob;
                                            return storageRef.put(blob, {contentType: mime})
                                        })
                                        .then(() => {
                                            uploadBlob.close();
                                            return storageRef.getDownloadURL()
                                        })
                                        .then((url) => {
                                            let obj = {};
                                            obj["loading"] = false;
                                            obj["dp"] = url;
                                            this.setState(obj);
                                            Variables.state.profileImage = url;
                                            this.dropdown.alertWithType("custom", "", "Image Uploaded Successfully.");
                                            this.setImageModalVisible(!this.state.imageModalVisible);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            this.setImageModalVisible(!this.state.imageModalVisible);
                                        });

                                });


                            }}>
                                <Text style={styles.textStyle}>Upload Image</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonStyle} onPress={() => {

                                ImagePicker.openCamera({
                                    width: 160,
                                    height: 160,
                                    cropping: true,
                                    mediaType: 'photo',
                                    includeBase64: true,
                                }).then(image => {

                                    const {currentUser} = firebase.auth();
                                    const storageRef = firebase.storage().ref(`/users/${currentUser.uid}/image-profile-uploaded`);
                                    const Blob = RNFetchBlob.polyfill.Blob;
                                    const fs = RNFetchBlob.fs;
                                    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
                                    window.Blob = Blob;
                                    const uid = firebase.auth().uid;
                                    const imagePath = image.path;
                                    let uploadBlob = null;
                                    let mime = image.mime;


                                    fs.readFile(imagePath, 'base64')
                                        .then((data) => {
                                            return Blob.build(data, {type: `${mime};BASE64`})
                                        })
                                        .then((blob) => {
                                            uploadBlob = blob;
                                            return storageRef.put(blob, {contentType: mime})
                                        })
                                        .then(() => {
                                            uploadBlob.close();
                                            return storageRef.getDownloadURL()
                                        })
                                        .then((url) => {
                                            let obj = {};
                                            obj["loading"] = false;
                                            obj["dp"] = url;
                                            this.setState(obj);
                                            Variables.state.profileImage = url;
                                            this.dropdown.alertWithType("custom", "", "Image Uploaded Successfully.");
                                            this.setImageModalVisible(!this.state.imageModalVisible);
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                            this.setImageModalVisible(!this.state.imageModalVisible)
                                        });

                                });


                            }}>
                                <Text style={styles.textStyle}>Take Photo</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.buttonStyleCancel} onPress={() => {
                                this.setImageModalVisible(!this.state.imageModalVisible)
                            }}>
                                <Text style={styles.textStyleCancel}>Cancel</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                </Modal>





                <PlayerBottom navigator={this.props.navigator}/>


                <DropdownAlert titleStyle={{color:'#fff'}} messageStyle={{color: '#fff'}} containerStyle={{backgroundColor: '#ee5865'}} ref={ref => this.dropdown = ref} showCancel={true} />
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
        paddingTop:10,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 4,
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#856cff',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    buttonStyleCancel:{
        paddingTop:10,
        paddingVertical: 10,
        marginBottom:20,
        marginHorizontal: 15,
        marginVertical: 4,
        borderWidth: 4,
        borderRadius: 10,
        borderColor: '#ee617c',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    textStyle:{
        marginTop: 10,
        color: '#856cff',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 25,
    },
    textStyleCancel:{
        marginTop: 10,
        color: '#ee617c',
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
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',

    }
});

export default Settings;