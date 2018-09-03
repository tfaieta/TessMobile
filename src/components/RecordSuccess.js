import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import Variables from './Variables';
import LinearGradient from "react-native-linear-gradient/index.android";
import PlayerBottom from "./PlayerBottom";

var {height, width} = Dimensions.get('window');




class RecordSuccess extends Component{

  static navigatorStyle = {
        statusBarHidden: false,
        navBarHidden: true,
        statusBarTextColorScheme: 'light',
        statusBarColor: '#3e279b',
    };


    state = {
        title: Variables.state.podcastTitle,
        description: Variables.state.podcastDescription,
    };


    RecordAgain = () => {

        this.props.navigator.popToRoot({
            animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        });

    };



    preview = () =>  {

        Variables.play();
        Variables.state.isPlaying = true;

    };

    finished = () => {

        this.props.navigator.popToRoot({
            animated: true, // does the popToRoot have transition animation or does it happen immediately (optional)
            animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the popToRoot have different transition animation (optional)
        });


    };



    render() {
        return (
            <LinearGradient

                colors={['#3e279b', '#5d539c' ]}
                start={{x: 0.0, y: 0.0}} end={{x: 0, y: 0.75}}
                style={styles.container}>



                <View style={styles.buttonContainer}>


                    <Text  style={styles.title}> Upload Successful</Text>


                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.preview}>
                            <Text  style={styles.contentTitle}>Play "{this.state.title}"</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonMore} onPress={this.finished}>
                        <Text  style={styles.contentTitle}>Done</Text>
                    </TouchableOpacity>


                </View>


                <PlayerBottom navigator={this.props.navigator}/>


            </LinearGradient>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: height/66.7,
    },

    title: {
        color: '#fff',
        fontSize: width/15,
        paddingBottom: height/33.35,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-SemiBold',
    },

    contentTitle: {
        color: '#fff',
        fontSize: width/18.75,
        paddingBottom: height/33.35,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',

    },


    buttonPreview: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginHorizontal: width/25,
        marginTop: height/66.7,
    },

    buttonMore: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingTop: height/66.7,
        marginHorizontal: width/25,
        marginTop: height/66.7,
    },

    buttonContainer: {
        marginTop: height/8.34,
    }

});

export default RecordSuccess;