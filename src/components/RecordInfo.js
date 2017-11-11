import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import {podTime, totalTime} from './Record';
import Variables from './Variables';
import { connect } from 'react-redux';
import { podcastUpdate} from '../actions';
import {AudioUtils} from 'react-native-audio';
import firebase from 'firebase';
import {podcastCreate} from "../actions/PodcastActions";
import SimplePicker from 'react-native-simple-picker';
import DropdownAlert from 'react-native-dropdownalert';
import LinearGradient from "react-native-linear-gradient/index.android";
import {
    Player,
} from 'react-native-audio-toolkit';


let podFile = AudioUtils.DocumentDirectoryPath + '/test.aac';


const labels = ['Current Events', 'Fitness', 'Politics', 'Gaming', 'Sports', 'Entertainment', 'Life', 'Fashion', 'Trends', 'Cars', 'Misc'];
const options = ['Current Events', 'Fitness', 'Politics', 'Gaming', 'Sports', 'Entertainment', 'Life', 'Fashion', 'Trends', 'Cars', 'Misc'];



class RecordInfo extends Component{

    constructor(props) {
        const {currentUser} = firebase.auth();
        let userID = currentUser.uid;
        super(props);
        props = {
            podcastTitle: Variables.state.podcastTitle,
            podcastDescription: Variables.state.podcastDescription,
            podcastCategory: Variables.state.podcastCategory,
            podcastArtist: userID
        };
    }

    state = {
        totalTime: totalTime,
        podcastCategory: 'Select a Category',
    };

    componentWillMount(){
        const {currentUser} = firebase.auth();
        let userID = currentUser.uid;
        this.props.podcastUpdate({prop: 'podcastArtist', value: userID});
        this.player = null;
    }


    Cancel = () => {
        Actions.RecordFirstPage();
    };


    Upload = () => {

        Variables.setPodcastFile(podFile);
        Variables.state.podcastTitle = this.props.podcastTitle;
        Variables.state.podcastDescription = this.props.podcastDescription;
        Variables.state.podcastCategory = this.props.podcastCategory;



        const { podcastTitle, podcastDescription, podcastCategory, podcastArtist} = this.props;

        if(podcastTitle == '' || podcastDescription == '' || podcastCategory == ''){
            if(podcastTitle == ''){
                this.dropdown.alertWithType("custom", "", "Please enter a Title.")
            }
            else if(podcastDescription == ''){
                this.dropdown.alertWithType("custom", "", "Please enter a Description.")
            }
            else if(podcastCategory == ''){
                this.dropdown.alertWithType("custom", "", "Please select a Category.")
            }
        }else {

            this.props.podcastCreate({podcastTitle, podcastDescription, podcastCategory, podcastArtist});
        }
    };



    preview = () =>  {

        this.player = new Player(podFile, {
            autoDestroy: false
        });
        console.warn(podFile);


        Variables.state.podcastTitle = this.props.podcastTitle;
        Variables.state.podcastDescription = this.props.podcastDescription;
        Variables.state.podcastCategory = this.props.podcastCategory;

        setTimeout(() => {
           this.player.prepare();
            console.warn("preparing...");

            setTimeout(() => {
                this.player.play();
                console.warn("Playing....");
                console.warn(this.player);
            }, 100);
        }, 100);

    };

    _renderTime(){
        var num = (this.state.totalTime / 60).toString();
        num = num.slice(0,1);
        Number(num);
        var num2 = (this.state.totalTime % 60).toString();
        num2 = num2.slice(0,2);
        Number(num2);
            if(this.state.totalTime < 10){
            return (
                <Text style={styles.progressText}>{num2.slice(0,1)}s</Text>
            )
        }
        else if (this.state.totalTime < 60){
            return (
                <Text style={styles.progressText}>{num2}s</Text>
            )
        }
        else {
            return(
                <Text style={styles.progressText}>{num}m {num2}s</Text>
            )
        }
    }




    render() {

        return (
            <LinearGradient

                colors={['#3e279b', '#5d539c' ]}
                style={styles.container}>



                <View style={{flexDirection: 'row',   }}>
                    <View style={{marginTop: 30, alignItems: 'flex-start'}}>
                        <TouchableOpacity onPress={this.Cancel}>
                            <Icon style={{
                                textAlign: 'right',
                                fontSize: 30,
                                marginLeft: 15,
                                color: '#fff',
                                backgroundColor: 'transparent'
                            }} name="md-arrow-round-back">
                            </Icon>
                        </TouchableOpacity>
                    </View>
                    <View style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={styles.header}>Upload Podcast</Text>
                    </View>
                </View>



                    <View style={{flexDirection: 'row', paddingBottom: 30, marginTop: 20  }}>
                        <View style={{marginTop: 15, alignItems: 'flex-start'}}>
                            <TouchableOpacity onPress={this.preview}>
                                <Icon style={{
                                    textAlign: 'right',
                                    fontSize: 25,
                                    marginLeft: 40,
                                    color: '#fff',
                                    backgroundColor: 'transparent',
                                }} name="ios-play">
                                </Icon>
                            </TouchableOpacity>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'center',}}>
                            <Image
                                style={{width: 188, height:31, alignSelf: 'center', opacity: 1, marginLeft: 30, marginTop: 8}}
                                source={require('tess/src/images/preview-icon.png')}
                            />
                        </View>
                        <View style={{justifyContent: 'center', alignItems: 'flex-end',}}>
                            <Text  style={styles.contentTime}>{this._renderTime()}</Text>
                        </View>
                    </View>





                    <Text style={styles.boxHeader}>PODCAST TITLE:</Text>
                <TextInput
                    ref='input1'
                    style ={styles.input}
                    placeholder = ""
                    placeholderTextColor='#FFF'
                    returnKeyType='next'
                    label="Title"
                    value={this.props.podcastTitle}
                    onChangeText={text => this.props.podcastUpdate({prop: 'podcastTitle', value: text})}
                    maxLength={50}
                    onSubmitEditing={(event) => {
                        this.refs.input2.focus();
                    }}
                />


                    <Text style={styles.boxHeader}>DESCRIPTION:</Text>
                <TextInput
                    ref='input2'
                    style ={styles.input2}
                    placeholder = ""
                    placeholderTextColor='#FFF'
                    returnKeyType='done'
                    label="Description"
                    blurOnSubmit={true}
                    value={this.props.podcastDescription}
                    onChangeText={text => this.props.podcastUpdate({prop: 'podcastDescription', value: text})}
                    multiline={true}
                    maxLength={500}
                />




                    <Text style={styles.boxHeader}>SELECT A CATEGORY:</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={{
                            textAlign: 'left',
                            fontSize: 20,
                            marginLeft: 10,
                            marginTop:10,
                            color: '#BBBCCD',
                            backgroundColor: 'transparent',
                        }} name="md-folder">
                        </Icon>
                        <Text style={{ color: '#fff', marginTop: 10, fontSize: 18, marginLeft: 15, fontFamily: 'Hiragino Sans', }}>Categories</Text>
                        <Text
                            style={{ color: '#BBBCCD', marginTop: 10, fontSize: 18, marginLeft: 50, fontFamily: 'Hiragino Sans', }}
                            onPress={() => {
                                this.refs.picker1.show();
                            }}
                        >
                            {this.state.podcastCategory}
                        </Text>
                        <Icon style={{
                            flex:1,
                            textAlign: 'right',
                            fontSize: 18,
                            marginRight: 10,
                            marginTop:10,
                            color: '#fff',
                            backgroundColor: 'transparent',
                        }} name="ios-arrow-forward"
                              onPress={() => {
                                  this.refs.picker1.show();
                              }}>
                        </Icon>
                    </View>


                    <SimplePicker
                    ref={'picker1'}
                    options={options}
                    labels={labels}
                    itemStyle={{
                        fontSize: 22,
                        color: 'black',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontFamily: 'Hiragino Sans',
                    }}
                    onSubmit={itemValue => {
                        this.props.podcastUpdate({prop: 'podcastCategory', value: itemValue});
                        this.setState({podcastCategory: itemValue})
                    }}
                    />

                    <View style={{height:1, marginVertical: 25, backgroundColor: '#fff', marginHorizontal:15, borderRadius:10, borderWidth:0.1}}/>




                <View style={styles.buttonContainer}>



                <TouchableOpacity style={styles.buttonUpload} onPress={this.Upload}>
                <Text  style={styles.contentTitle}>Upload</Text>
                </TouchableOpacity>



                <TouchableOpacity style={styles.buttonCancel} onPress={this.Cancel}>
                    <Text  style={styles.contentTitle}>Cancel</Text>
                </TouchableOpacity>
                </View>



                <DropdownAlert titleStyle={{color:'#fff'}} messageStyle={{color: '#fff'}} containerStyle={{backgroundColor: '#ee5865'}} ref={ref => this.dropdown = ref} showCancel={true} />
            </LinearGradient>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 10,
    },

    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: '#FFF',
        fontSize: 18,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',

    },

    contentTime: {
        color: '#FFF',
        fontSize: 25,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        marginLeft: 20,
        marginTop: 10

    },

    input: {
        height: 40,
        backgroundColor: 'transparent',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
    },

    input2: {
        height: 120,
        backgroundColor: 'transparent',
        marginBottom: 10,
        color:'#FFF',
        paddingHorizontal: 10,
        fontSize: 18,
    },

    buttonPreview: {
        backgroundColor: '#e8952f',
        alignItems: 'center',
        paddingBottom: 15,
    },

    buttonUpload: {
        backgroundColor: '#5757FF',
        alignItems: 'center',
        paddingTop: 15,
        marginHorizontal: 15,
        borderWidth:0.1,
        borderRadius: 10,
        marginBottom:10
    },

    buttonCancel: {
        backgroundColor: '#ee617c',
        alignItems: 'center',
        paddingTop: 15,
        marginHorizontal: 15,
        borderWidth:0.1,
        borderRadius: 10,
        marginBottom: 10
    },

    buttonContainer: {
        marginTop: 0,
    },

    timeContainer: {
        flex:1,
        alignItems: 'center',
    },

    progressText: {
        marginTop: 0,
        fontSize: 20,
        fontFamily: 'Hiragino Sans',
        color: "#FFF",
    },

    header: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 18,
        backgroundColor: 'transparent',
        marginTop: 30,
        marginLeft: 98,

    },
    boxHeader:{
        color: '#fff',
        textAlign: 'left',
        marginLeft: 15,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 12,
        backgroundColor: 'transparent',
    }

});

const mapStateToProps = (state) => {
  const { podcastTitle, podcastDescription, podcastCategory, podcastArtist} = state.podcastForm;

  return { podcastTitle, podcastDescription, podcastCategory, podcastArtist}
};


export default connect(mapStateToProps, { podcastUpdate, podcastCreate })(RecordInfo);