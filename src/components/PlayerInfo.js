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
    Dimensions,
} from 'react-native';
import Variables from "./Variables";
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

import { Navigation } from 'react-native-navigation';
import ListItemComment from "./ListItemComment";




var {height, width} = Dimensions.get('window');


class PlayerInfo extends Component {

static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true
    };

    componentWillMount(){

        firebase.database().ref(`podcasts/${Variables.state.podcastID}/comments`).on("value", function (snap) {
            Variables.state.comments = [];
            snap.forEach(function (data) {
                if (data.val()) {
                    Variables.state.comments.push(data.val());
                }
            });
        });

    }


    componentWillUnmount(){
        clearInterval(this.interval);
    }


    constructor(props){
        super(props);
        var dataSource= new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state ={
            comment: '',
            dataSource: dataSource.cloneWithRows(Variables.state.comments),
        };

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

        }, 1000)

    }


    renderRow = (rowData) => {

        return(
            <ListItemComment rowData = {rowData} />
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
                                <Text style={styles.textLike}>{Variables.state.podcastsPlays} play</Text>
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
                                <Text style={styles.textLike}>{Variables.state.podcastsPlays} play</Text>
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
                                <Text style={styles.textLike}>{Variables.state.podcastsPlays} plays</Text>
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
                                <Text style={styles.textLike}>{Variables.state.podcastsPlays} plays</Text>
                            </View>
                        </View>
                )
            }
        }
    }

    renderComments(){
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
                    <Text style={styles.textDescription}>{Variables.state.podcastDescription}</Text>
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
        marginHorizontal: 30,
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

    },

    title:{
        color: '#2A2A30',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',
        marginTop: 30,
        marginBottom: 10
    },

    title2:{
        color: '#2A2A30',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',
        marginTop: 20,
        marginBottom: 10
    },

    textDescription:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginHorizontal: 20,
    },

    textEmpty:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',
        marginBottom: 20,
        marginHorizontal: 20,
        marginTop: 10
    },

    textLike:{
        color: '#506dcf',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginTop: 10,
        marginHorizontal: 20,
    },
    textComment:{
        color: '#656575',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginVertical: 5,
        marginHorizontal: 5,
    },
    textCommentName:{
        color: '#2A2A30',
        flexDirection: 'column',
        textAlign: 'center',
        opacity: 1,
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 14,
        backgroundColor: 'transparent',
        marginVertical: 5,
        marginHorizontal: 5,
    },
    descriptionBox:{
        backgroundColor: '#fff',
        marginHorizontal: 10,
        paddingVertical: 30,
        height: 175,
    },

    input: {
        height: 40,
        backgroundColor: 'transparent',
        fontStyle: 'normal',
        textAlign: 'center',
        fontFamily: 'HiraginoSans-W6',
        color: '#2A2A30',
        paddingHorizontal: 10,
        fontSize: 16,
    },

});


export default PlayerInfo;