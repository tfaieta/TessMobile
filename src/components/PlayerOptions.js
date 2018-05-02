import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions

} from 'react-native';
import firebase from 'firebase';
import Variables from "./Variables";
import Icon from 'react-native-vector-icons/Ionicons';


var {height, width} = Dimensions.get('window');





// options popup from player options

class PlayerOptions extends Component {

    constructor(props){
        super(props);
        this.state = {
            favorite: false
        };

        const id  = Variables.state.podcastID;
        const {currentUser} = firebase.auth();
        if(id){
            if (firebase.database().ref(`users/${currentUser.uid}/favorites`).child(id)){
                this.setState({favorite: true})
            }
            else{
                this.setState({favorite: false})
            }
        }

    }



    render(){

        const navigator = this.props.navigator;
        const {currentUser} = firebase.auth();
        const id  = Variables.state.podcastID;
        const podcastArtist = Variables.state.podcastArtist;
        const rss = Variables.state.rss;

        let podcastTitle = Variables.state.podcastTitle;
        if(Variables.state.podcastTitle.toString().length > width/10 ){
            podcastTitle = (Variables.state.podcastTitle.slice(0,width/10)+"...")
        }
        else{
            podcastTitle = Variables.state.podcastTitle;
        }



        let profileName = 'loading';
        firebase.database().ref(`/users/${podcastArtist}/username`).orderByChild("username").on("value", function (snap) {
            if (snap.val()) {
                profileName = snap.val().username;
            }
            else {
                profileName = podcastArtist;
            }
        });



        if(podcastArtist == currentUser.uid){
            return(
                <View>
                    <View>
                        <Text style={styles.textTitle}>{podcastTitle}</Text>
                        <Text style={styles.textArtist}>by {profileName}</Text>
                    </View>

                    <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>



                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {


                    }}>
                        <View style={{alignContent: 'center'}}>
                            <Icon style={styles.iconStyle} name="ios-share-outline" />
                        </View>

                        <View style={{alignContent: 'center'}}>
                            <Text style={styles.textStyle}>Share</Text>
                        </View>
                    </TouchableOpacity>



                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {


                        firebase.database().ref(`users/${currentUser.uid}/queue/`).once("value", function (snap) {
                            snap.forEach(function (data) {
                                if(data.val().id == id){
                                    firebase.database().ref(`users/${currentUser.uid}/queue/${data.key}`).remove()
                                }
                            });
                            firebase.database().ref(`users/${currentUser.uid}/queue/`).push({id});
                        });

                        navigator.dismissLightBox();

                    }}>
                        <View style={{alignContent: 'center'}}>
                            <Icon style={styles.iconStyle} name="ios-add-circle-outline" />
                        </View>

                        <View style={{alignContent: 'center'}}>
                            <Text style={styles.textStyle}>Add to Queue</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {
                        this.props.navigator.showModal({
                            screen: 'MyQueue',
                        });
                    }}>
                        <View style={{alignContent: 'center'}}>
                            <Icon style={styles.iconStyle} name="ios-list-box-outline" />
                        </View>
                        <View style = {{alignContent: 'center'}}>
                            <Text style={styles.textStyle}>Go to Queue</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {


                    }}>
                        <View style={{alignContent: 'center'}}>
                            <Icon style={styles.iconStyle} name="ios-add-circle-outline" />
                        </View>

                        <View style={{alignContent: 'center'}}>
                            <Text style={styles.textStyle}>Add to Playlist</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => {
                        Variables.state.browsingArtist = podcastArtist;
                        if(rss){
                            Variables.state.rss = true;
                        }
                        else{
                            Variables.state.rss = false;
                        }
                        navigator.showModal({
                            screen: 'UserProfile',
                            passProps: {navigator},
                        })
                    }}>
                        <View style={{alignContent: 'center'}}>
                            <Icon style={styles.iconStyle} name="ios-contact-outline" />
                        </View>
                        <View style = {{alignContent: 'center'}}>
                            <Text style={styles.textStyle}>Go to Profile</Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {
                        navigator.dismissLightBox();
                    }}>
                        <View style={{alignContent: 'center'}}>
                            <Icon style={styles.iconStyle} name="ios-close" />
                        </View>
                        <View style = {{alignContent: 'center'}}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </View>
                    </TouchableOpacity>




                </View>
            )
        }
        else{
            if(id){
                if(this.state.favorite){

                    return(
                        <View>
                            <View>
                                <Text style={styles.textTitle}>{podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>


                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {


                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-share-outline" />
                                </View>

                                <View style={{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Share</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {

                                firebase.database().ref(`users/${currentUser.uid}/queue/`).once("value", function (snap) {
                                    snap.forEach(function (data) {
                                        if(data.val().id == id){
                                            firebase.database().ref(`users/${currentUser.uid}/queue/${data.key}`).remove()
                                        }
                                    });
                                    firebase.database().ref(`users/${currentUser.uid}/queue/`).push({id});
                                });

                                navigator.dismissLightBox();

                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-add-circle-outline" />
                                </View>

                                <View style={{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Add to Queue</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {
                                this.props.navigator.showModal({
                                    screen: 'MyQueue',
                                });
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-list-box-outline" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Go to Queue</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {


                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-add-circle-outline" />
                                </View>

                                <View style={{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Add to Playlist</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => {

                                firebase.database().ref(`users/${currentUser.uid}/favorites/${id}`).remove();
                                this.setState({favorite: false})

                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-heart" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Remove from Favorites</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => {
                                Variables.state.browsingArtist = podcastArtist;
                                if(rss){
                                    Variables.state.rss = true;
                                }
                                else{
                                    Variables.state.rss = false;
                                }
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {navigator},
                                })
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-contact-outline" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Go to Profile</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {
                                navigator.dismissLightBox();
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-close" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )

                }

                else{

                    return(
                        <View>
                            <View>
                                <Text style={styles.textTitle}>{podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>


                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {


                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-share-outline" />
                                </View>

                                <View style={{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Share</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {

                                firebase.database().ref(`users/${currentUser.uid}/queue/`).once("value", function (snap) {
                                    snap.forEach(function (data) {
                                        if(data.val().id == id){
                                            firebase.database().ref(`users/${currentUser.uid}/queue/${data.key}`).remove()
                                        }
                                    });
                                    firebase.database().ref(`users/${currentUser.uid}/queue/`).push({id});
                                });

                                navigator.dismissLightBox();

                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-add-circle-outline" />
                                </View>

                                <View style={{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Add to Queue</Text>
                                </View>
                            </TouchableOpacity>



                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {
                                this.props.navigator.showModal({
                                    screen: 'MyQueue',
                                });
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-list-box-outline" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Go to Queue</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {


                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-add-circle-outline" />
                                </View>

                                <View style={{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Add to Playlist</Text>
                                </View>
                            </TouchableOpacity>


                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => {

                                firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(id).update({id});
                                this.setState({favorite: true})

                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-heart-outline" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Add to Favorites</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => {
                                Variables.state.browsingArtist = podcastArtist;
                                if(rss){
                                    Variables.state.rss = true;
                                }
                                else{
                                    Variables.state.rss = false;
                                }
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {navigator},
                                })
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-contact-outline" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Go to Profile</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {
                                navigator.dismissLightBox();
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-close" />
                                </View>
                                <View style= {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )

                }

            }
            else{
                if(this.state.favorite){

                    return(
                        <View>
                            <View>
                                <Text style={styles.textTitle}>{podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => {


                                /*
                                firebase.database().ref(`users/${currentUser.uid}/favorites/${podcastTitle}`).remove();
                                this.setState({favorite: false})
                                */

                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-heart" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Remove from Favorites</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => {
                                Variables.state.browsingArtist = podcastArtist;
                                if(rss){
                                    Variables.state.rss = true;
                                }
                                else{
                                    Variables.state.rss = false;
                                }
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {navigator},
                                })
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-contact-outline" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Go to Profile</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {
                                navigator.dismissLightBox();
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-close" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )

                }

                else{

                    return(
                        <View>
                            <View>
                                <Text style={styles.textTitle}>{podcastTitle}</Text>
                                <Text style={styles.textArtist}>{profileName}</Text>
                            </View>

                            <View style = {{width: width - 40, height: 1, backgroundColor: '#fff', marginHorizontal: 20, alignSelf: 'center'}}/>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => {

                                /*
                                firebase.database().ref(`users/${currentUser.uid}/favorites/`).child(podcastTitle).update({podcastArtist, podcastTitle});
                                this.setState({favorite: true})
                                */


                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-heart-outline" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Add to Favorites</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress={() => {
                                Variables.state.browsingArtist = podcastArtist;
                                if(rss){
                                    Variables.state.rss = true;
                                }
                                else{
                                    Variables.state.rss = false;
                                }
                                navigator.showModal({
                                    screen: 'UserProfile',
                                    passProps: {navigator},
                                })
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-contact-outline" />
                                </View>
                                <View style = {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Go to Profile</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={{flexDirection: 'row', alignSelf: 'center'}} onPress = {() => {
                                navigator.dismissLightBox();
                            }}>
                                <View style={{alignContent: 'center'}}>
                                    <Icon style={styles.iconStyle} name="ios-close" />
                                </View>
                                <View style= {{alignContent: 'center'}}>
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )

                }

            }






        }


    }


}




const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#FFF'
    },
    textStyle:{
        color: '#fff',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/41.69,
        backgroundColor: 'transparent',
        marginVertical: height/33.35,
    },
    textTitle:{
        color: '#fff',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/51.3,
        backgroundColor: 'transparent',
        marginVertical: 5,
        marginHorizontal: 20,
    },
    textArtist:{
        color: '#fff',
        flex:1,
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: height/51.3,
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    iconStyle: {
        textAlign: 'center',
        fontSize: height/26.68,
        color: 'white',
        marginTop: height/41.69,
        marginRight: 12,
    }

});


export default PlayerOptions;