import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    TextInput,
    KeyboardAvoidingView,
    Dimensions, ActivityIndicator, Linking
} from 'react-native';
import Variables from "./Variables";
import firebase from 'firebase';
import ListItemComment from "./ListItemComment";
var Analytics = require('react-native-firebase-analytics');
import HTML from 'react-native-render-html';


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
            if(Variables.state.likers.length == 1){
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
            else{
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
        }
        else{
            if(Variables.state.likers.length == 1){
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
            else{
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
        }
    }

    renderComments(){
        if(this.state.commentsLoading){
            return(
                <View style={styles.container}>
                    <ActivityIndicator style={{paddingVertical: height/10, alignSelf:'center'}} color='#3e4164' size ="large" />
                </View>
            )
        }
        else{
            if(Variables.state.comments.length > 0){
                return(
                    <View style={{flex: 1}}>

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
                        <View style={{height: 1.5, marginHorizontal: width/18.75, backgroundColor: '#2A2A3020',}} />

                    </View>

                )
            }
            else{
                return(
                    <View style={{flex: 1}}>
                        <Text style={styles.textEmpty}>Be the first to comment!</Text>
                    </View>
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
                <HTML html={this.state.description}
                      containerStyle={{backgroundColor: 'transparent', marginTop: height/66.7, marginHorizontal: width/18.75, paddingBottom: height/33.35,}}
                      baseFontStyle={{fontSize: width/27, color: '#656575', fontFamily: 'Montserrat-SemiBold'}}
                      onLinkPress={(evt, href) => {
                          Linking.canOpenURL(href).then(supported => {
                              if (supported) {
                                  Linking.openURL(href);
                              } else {
                                  console.warn("Don't know how to open URI: " + href);
                              }
                          });
                      }}
                />
            )
        }
    };


    render(){


        return(
            <View style={styles.container}>
            <View>

                {this.renderPodcastInfo()}
                <Text style={styles.title2}>Episode Info</Text>


                {this.renderDescription()}


                <Text style={styles.title2}>Comments</Text>

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

                {this.renderComments()}


            </View>


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
        borderWidth: 2,
        borderColor: '#656575',
        borderRadius: 10,
        marginHorizontal: width/12.5,
    },

    header: {
        marginTop: height/26.68,
        marginLeft: -(width/15),
        color: '#3e4164',
        textAlign: 'left',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/23.44,
        backgroundColor: 'transparent',

    },

    title2:{
        color: '#3e4164',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/20,
        backgroundColor: 'transparent',
        marginLeft: height/33.35,
        marginTop: height/28,
        marginBottom: height/66.7
    },

    textDescription:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'left',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/27,
        backgroundColor: 'transparent',
        marginBottom: height/60,
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
        flex: 1,
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