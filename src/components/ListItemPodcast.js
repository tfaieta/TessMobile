import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ListView, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Variables from "./Variables";
import ListItemUsers from "./ListItemUsers";
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from 'firebase';


var {height, width} = Dimensions.get('window');

// a single podcast on a list, shows podcast with episodes

class ListItemPodcast extends Component{

    constructor(props) {
        super(props);

        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            username: '',
            podImage: '',
            dataSource: dataSource.cloneWithRows([]),
            url: '',
            refreshing: false,
            size: {width: width, height: height/2.15}
        };

        let podImage = '';
        firebase.database().ref(`users/${this.props.podcast}/profileImage`).once("value", function (image) {
            if(image.val()){
                podImage = image.val().profileImage;
            }
            else{
                const storageRef = firebase.storage().ref(`/users/${this.props.podcast}/image-profile-uploaded`);
                storageRef.getDownloadURL()
                    .then(function(url) {
                        podImage = url;
                    }).catch(function(error) {
                    //
                });
            }
        });

        let eps = [];
        firebase.database().ref(`users/${this.props.podcast}/podcasts`).limitToLast(10).once("value", function (snap) {
            snap.forEach(function (data) {
                firebase.database().ref(`podcasts/${data.val().id}`).once("value", function (podcast) {
                    if(podcast.val()){
                        eps.push(podcast.val());
                    }
                })
            })
        });

        let username = '';
        firebase.database().ref(`users/${this.props.podcast}/username`).once("value", function (snapshot) {
            if(snapshot.val()){
                username = snapshot.val().username;
            }
        });


        this.timeout1 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(eps.reverse()), podImage: podImage, username: username })}, 1000);
        this.timeout2 = setTimeout(() => {this.setState({dataSource: dataSource.cloneWithRows(eps.reverse()), podImage: podImage, username: username })}, 4000);
    }



    componentWillUnmount(){
        clearTimeout(this.timeout1);
        clearTimeout(this.timeout2);
    }


    renderImage = () => {
        if(this.state.podImage != ''){
            return(
                <TouchableWithoutFeedback onPress={() => {
                    let rss = true;
                    const {navigator} = this.props;
                    Variables.state.browsingArtist = this.props.podcast;
                    navigator.push({
                        screen: 'UserProfile',
                        title: this.props.podcast,
                        passProps: {navigator, rss},
                    })
                }}>
                    <View style = {{backgroundColor:'transparent', alignSelf: 'flex-end', height: 65, width: 65, borderTopRightRadius: 15, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)', overflow: 'hidden'}}>
                        <Image
                            style={{width: 65, height: 65, alignSelf: 'flex-end', opacity: 1,}}
                            source={{uri: this.state.podImage}}
                        />
                    </View>
                </TouchableWithoutFeedback>
            )
        }
        else{
            return(
                <View style={{backgroundColor:'rgba(130,131,147,0.4)', alignSelf: 'flex-end', height: 65, width: 65, borderTopRightRadius: 15, borderWidth: 0.1, borderColor:'rgba(320,320,320,0.8)'}}>
                    <Icon style={{
                        textAlign: 'center',
                        fontSize: 35,
                        marginTop: 15,
                        color: 'white',
                    }} name="md-person">
                    </Icon>
                </View>
            )
        }

    };


    renderRow = (rowData) => {
        return <ListItemUsers podcast={rowData} navigator={this.props.navigator} />;
    };



    render() {
        return (
            <View style= {styles.container}>
                <View style={{flex:1, flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 12, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
                    <View style={{flex:6}}>
                        <Text style = {styles.titleWeek}>{this.state.username}</Text>
                    </View>

                    <View style={{flex:1, alignSelf: 'flex-start'}}>
                        {this.renderImage()}
                    </View>

                </View>

                <View style={{backgroundColor: '#fff', marginHorizontal: 12, marginBottom: 30, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
                    <ListView
                        horizontal={true}
                        enableEmptySections
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                    />
                </View>
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

    titleHeader: {
        flex:1,
        color: '#3e4164',
        textAlign: 'left',
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 15,
        backgroundColor: 'transparent',
    },

    wrapper: {
    },

    slide: {
        backgroundColor: 'blue'

    },

    text1: {
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        marginTop: 10,
        marginLeft: 20,
        fontSize: 16,
        backgroundColor: 'transparent',
    },
    text2: {
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        marginLeft: 20,
        fontSize: 14,
        backgroundColor: 'transparent',
        marginBottom: 12,
    },

    titleWeek: {
        color: '#3e4164',
        flex:1,
        textAlign: 'left',
        marginVertical: 15,
        marginLeft: 15,
        marginRight: 25,
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        backgroundColor: 'transparent',
    },

});


export default ListItemPodcast;