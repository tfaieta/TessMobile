import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';
import { Navigation } from 'react-native-navigation';
import {AudioUtils} from 'react-native-audio';
import RNFetchBlob from 'react-native-fetch-blob';





// Initial Record Page

let podFile = AudioUtils.DocumentDirectoryPath + '/test.aac';

var {height, width} = Dimensions.get('window');

class RecordFirstPage extends Component{

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 18, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
            drawUnderTabBar: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
        });

        this.state={
            fileExists: false
        };


        this.interval = setInterval(() => {
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
        } , 1000)

    }

    componentWillUnmount(){
        clearInterval(this.interval);
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

    _pressBack = () => {
        Navigation.dismissModal({

        })
    };



    render() {

        return (
            <View
                style={styles.container}>

                <TouchableOpacity style = {{marginTop: height / 7}} onPress={this.recordNewPodcast}>
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
        marginTop: 25,
        marginLeft: -12,
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
        fontSize: width/23.44,
        backgroundColor: 'transparent',
    },

    text: {
        backgroundColor: 'transparent',
        color: '#2A2A30',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        paddingVertical: 15,
    },


});

export default RecordFirstPage;