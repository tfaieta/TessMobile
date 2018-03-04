import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';
import { Navigation } from 'react-native-navigation';
import {AudioUtils} from 'react-native-audio';
import RNFetchBlob from 'react-native-fetch-blob';





// Initial Record Page (Tab)

let podFile = AudioUtils.DocumentDirectoryPath + '/test.aac';

var {height, width} = Dimensions.get('window');

class RecordFirstPage extends Component{

    static navigatorStyle = {
        tabBarHidden: false,
        statusBarHidden: false,
        navBarHidden: true
    };

    constructor(props) {
        super(props);
        this.state={
            fileExists: false
        };

    }



    info = () =>{
        Navigation.showLightBox({
            screen: 'InfoDiagram',
            style: {
                tapBackgroundToDismiss: true,
                backgroundColor: "#53249080",
                backgroundBlur: "light",
            }

        })

    };

    recordNewPodcast =() => {

        this.props.navigator.push({
            screen: 'Record',
            animated: true,
            animationType: 'fade',
        });

    };


    prevPodcast =() => {

        this.props.navigator.push({
            screen: 'RecordInfo',
            animated: true,
            animationType: 'fade',
        });

    };

    _renderPrevPodcast = () => {

        RNFetchBlob.fs.stat(podFile)
            .then((stats) => {
                if(stats.size > 0){
                this.setState({
                    fileExists: true
                })
                }
                else{
                    this.setState({
                        fileExists: false
                    })
                }
            });

        if(this.state.fileExists){
            return(
                <TouchableOpacity style = {{marginTop: height/16.675}} onPress={this.prevPodcast}>
                    <Icon style={{
                        textAlign:'center',fontSize: 45,color:'#5757FF'
                    }} name="md-undo">
                    </Icon>
                    <Text style= {styles.text} >Last recorded podcast</Text>
                </TouchableOpacity>
            )
        }
    };


    render() {

            return (
                <View
                    style={styles.container}>


                        <View style={{flexDirection: 'row', paddingVertical:5, paddingBottom: 15, shadowOffset:{  width: 0,  height: 6}, shadowOpacity: 0.2, shadowRadius: 10}}>
                            <View style={{flex:1,justifyContent: 'center', alignItems: 'center', marginTop:5}}>
                                <Text style={styles.header}>Create a Podcast</Text>
                            </View>
                        </View>

                        <TouchableOpacity style = {{marginTop: height / 9}} onPress={this.recordNewPodcast}>
                            <Icon style={{
                                textAlign:'center',fontSize: 45,color:'#5757FF'
                            }} name="md-add">
                            </Icon>
                            <Text style= {styles.text} >Record a New Podcast</Text>
                        </TouchableOpacity>

                        {this._renderPrevPodcast()}

                        <TouchableOpacity style = {{marginTop: height/16.675}} onPress={this.info} >
                            <Icon style={{
                                textAlign: 'center',
                                fontSize: 45,
                                color: '#5757FF'
                            }} name="md-help-circle">
                            </Icon>
                            <Text style= {styles.text}>Help</Text>
                        </TouchableOpacity>



                    <PlayerBottom navigator={this.props.navigator}/>

                </View>


            );

    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        marginTop:25,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W6',
        fontSize: 16,
        backgroundColor: 'transparent',

    },

    text: {
        backgroundColor: 'transparent',
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'HiraginoSans-W3',
        fontSize: 18,
        paddingVertical: 15,
    },


});

export default RecordFirstPage;