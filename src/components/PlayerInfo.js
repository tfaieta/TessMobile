import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    ListView,
    TextInput,
    KeyboardAvoidingView,
    Dimensions, ActivityIndicator,
} from 'react-native';
import Variables from "./Variables";
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

import { Navigation } from 'react-native-navigation';
import ListItemComment from "./ListItemComment";
var Analytics = require('react-native-firebase-analytics');

var {height, width} = Dimensions.get('window');




class PlayerInfo extends Component {

static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'dark',
        statusBarColor: '#fff',
    };



    componentWillUnmount(){
        clearInterval(this.interval);
        clearTimeout(this.timeout);
    }


    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state ={
            comment: '',
            commentsLoading: true,
            dataSource: dataSource.cloneWithRows(Variables.state.comments),
            description: ''
        };

        firebase.database().ref(`podcasts/${Variables.state.podcastID}/comments`).on("value", function (snap) {
            Variables.state.comments = [];
            snap.forEach(function (data) {
                if (data.val()) {
                    Variables.state.comments.push(data.val());
                }
            });
        });

        this.interval = setInterval(() => {
            firebase.database().ref(`podcasts/${Variables.state.podcastID}/comments`).on("value", function (snap) {
                Variables.state.comments = [];
                snap.forEach(function (data) {
                    if (data.val()) {
                        Variables.state.comments.push(data.val());
                    }
                });
            });
            setTimeout(() => {
                this.setState({dataSource: dataSource.cloneWithRows(Variables.state.comments)})},500);

        }, 1000);


        // clean up description
        let desc = Variables.state.podcastDescription;
        for(let i = (desc.length/2); i > 0; i--){
            desc = desc.replace("<p>", " ");
            desc = desc.replace("</p>", " ");
            desc = desc.replace("<a", " ");
            desc = desc.replace("&amp", " ");
            desc = desc.replace("href=", " ");
            desc = desc.replace("<em>", " ");
            desc = desc.replace("</em>", " ");
            desc = desc.replace("</a>", " ");
            desc = desc.replace("<h2", " ");
            desc = desc.replace("id=", " ");
            desc = desc.replace("</h2>", " ");
            desc = desc.replace("</p>", " ");
            desc = desc.replace("<br>", " ");
            desc = desc.replace("<div>", " ");
            desc = desc.replace("</div>", " ");
            desc = desc.replace("<ul>", " ");
            desc = desc.replace("<li>", " ");
            desc = desc.replace("</li>", " ");
            desc = desc.replace("<strong>", " ");
            desc = desc.replace("</strong>", " ");
            desc = desc.replace("<sup>", " ");
            desc = desc.replace("</sup>", " ");
            desc = desc.replace("<br><br>", " ");
            desc = desc.replace("<br>", " ");
            desc = desc.replace("&nbsp", " ");
            desc = desc.replace(`target="_blank">`, " ");
        }

        this.timeout = setTimeout(() => {
            this.setState({commentsLoading: false, description: desc})
        }, 3000);

    }


    renderRow = (rowData) => {

        return(
            <ListItemComment rowData = {rowData} navigator = {this.props.navigator}/>
        )

    };


    renderPodcastInfo(){
        if(Variables.state.podcastsPlays == 1){
            if(Variables.state.likers.length > 1){
                return(
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.textLike}>{Variables.state.likers.length} likes</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.textLike}>{Variables.state.podcastsPlays} listen</Text>
                            </View>
                        </View>
                )
            }
            else{
                return(
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.textLike}>{Variables.state.likers.length} like</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.textLike}>{Variables.state.podcastsPlays} listen</Text>
                            </View>
                        </View>
                )
            }
        }
        else{
            if(Variables.state.likers.length > 1){
                return(
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.textLike}>{Variables.state.likers.length} likes</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.textLike}>{Variables.state.podcastsPlays} listens</Text>
                            </View>
                        </View>
                )
            }
            else{
                return(
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex:1}}>
                                <Text style={styles.textLike}>{Variables.state.likers.length} like</Text>
                            </View>
                            <View style={{flex:1}}>
                                <Text style={styles.textLike}>{Variables.state.podcastsPlays} listens</Text>
                            </View>
                        </View>
                )
            }
        }
    }

    renderComments(){
        if(this.state.commentsLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style={{paddingVertical: height/15, alignSelf:'center'}} color='#3e4164' size ="large" />
                </View>
            )
        }
        else{
            if(Variables.state.comments.length > 0){
                return(
                    <View style={{height: height/2.4}}>

                        <ListView
                            ref={ ( ref ) => this.scrollView = ref }
                            enableEmptySections
                            dataSource={this.state.dataSource}
                            renderRow={this.renderRow}
                            onContentSizeChange={ () => {
                                if(Variables.state.comments.length > 4){
                                    this.scrollView.scrollToEnd( { animated: true } )
                                }
                            }}
                        />
                        <View style={{height: 1.5, marginHorizontal: 20, backgroundColor: '#2A2A3060',}} />

                    </View>

                )
            }
            else{
                return(
                    <Text style={styles.textEmpty}>Be the first to comment!</Text>
                )
            }
        }


    }


    renderDescription = () => {
        if(this.state.commentsLoading != ''){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style={{paddingVertical: height/15, alignSelf:'center'}} color='#3e4164' size ="large" />
                </View>
            )
        }
        else{
            return(
                <Text style={styles.textDescription}>{this.state.description}</Text>
            )
        }
    };


    render(){


        return(
            <View style={styles.container}>
            <View>

                <View style={{flexDirection: 'row', paddingVertical:5, paddingBottom: 15}}>
                    <View style={{alignItems: 'flex-start', justifyContent: 'center', marginTop: 20}}>
                        <TouchableOpacity onPress={() => {
                            Navigation.dismissModal();
                        }}>
                            <Icon style={{
                                textAlign:'left',marginLeft: 10, fontSize: 30,color:'#007aff',
                            }} name="ios-arrow-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex:1,justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={styles.header}>Info</Text>
                    </View>

                    <View>
                    </View>

                </View>



                <View style={{height: 1.5, marginHorizontal: 20, backgroundColor: '#2A2A3060',}} />
                <ScrollView style={styles.descriptionBox}>
                    {this.renderDescription()}
                </ScrollView>

                {this.renderPodcastInfo()}

                <Text style={styles.title2}>Comments</Text>
                <View style={{height: 1.5, marginHorizontal: 20, backgroundColor: '#2A2A3060',}} />

                {this.renderComments()}


            </View>

                <KeyboardAvoidingView  behavior='padding' style={styles.commentContainer}>
                    <TextInput
                        ref='input'
                        style ={styles.input}
                        placeholder = "Write a Comment..."
                        placeholderTextColor='#656575'
                        returnKeyType='send'
                        label="Comment"
                        value={this.state.comment}
                        onChangeText={text => this.setState({comment: text})}
                        maxLength={500}
                        onSubmitEditing={(event) => {
                            if(this.state.comment != ''){

                                const {currentUser} = firebase.auth();
                                const user = currentUser.uid;
                                const comment = this.state.comment;

                                firebase.database().ref(`podcasts/${Variables.state.podcastID}/comments`).push({user, comment}).then((snap) => {
                                    const ref = snap.ref;
                                    const id = snap.key;
                                    ref.update({id});

                                });

                                firebase.database().ref(`users/${currentUser.uid}/activity`).push({action: 'comment', id: Variables.state.podcastID, user: currentUser.uid, time: firebase.database.ServerValue.TIMESTAMP});
                                var ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}/stats`);
                                ref.once("value", function(snapshot) {
                                    if(snapshot.val()){
                                        if(snapshot.val().comments){
                                            ref.update({comments: snapshot.val().comments + 1})
                                        }
                                        else{
                                            ref.update({comments: 1})
                                        }
                                    }
                                    else{
                                        ref.update({comments: 1})
                                    }
                                });

                                Analytics.logEvent('writeComment', {
                                    'user_id': user
                                });

                                this.setState({comment: ''});

                            }



                        }}
                    />
                </KeyboardAvoidingView>


            </View>


        )






    }


}




const styles = StyleSheet.create({

    container:{
        flex: 1,
        backgroundColor: '#FFF'
    },

    commentContainer:{
        flex: 1,
        backgroundColor: '#fff',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: 2,
        borderColor: '#656575',
        borderRadius: 10,
        marginHorizontal: width/12.5,
    },

    header: {
        marginTop: height/26.68,
        marginLeft: -(width/15),
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/23.44,
        backgroundColor: 'transparent',

    },


    title2:{
        color: '#3e4164',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/23.44,
        backgroundColor: 'transparent',
        marginTop: height/33.35,
        marginBottom: height/66.7
    },

    textDescription:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        backgroundColor: 'transparent',
        marginBottom: height/33.35,
        marginHorizontal: width/18.75,
        paddingBottom: height/33.35,
    },

    textEmpty:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily:  'Montserrat-SemiBold',
        fontSize: width/23.44,
        backgroundColor: 'transparent',
        marginBottom: height/33.35,
        marginHorizontal: width/18.75,
        marginTop: height/66.7,
    },

    textLike:{
        color: '#506dcf',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily:  'Montserrat-Bold',
        fontSize: width/26.79,
        backgroundColor: 'transparent',
        marginTop: height/66.7,
        marginHorizontal: width/18.75,
    },
    textComment:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/26.79,
        backgroundColor: 'transparent',
        marginVertical: height/133.4,
        marginHorizontal: width/75,
    },
    textCommentName:{
        color: '#3e4164',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/26.79,
        backgroundColor: 'transparent',
        marginVertical: height/133.4,
        marginHorizontal: width/75,
    },
    descriptionBox:{
        backgroundColor: '#fff',
        marginHorizontal: width/37.5,
        paddingVertical: height/60,
        height: height/3.81,
    },

    input: {
        height: height/16.68,
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold',
        color: '#3e4164',
        paddingHorizontal: width/37.5,
        fontSize: width/23.44,
    },

});


export default PlayerInfo;