import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,} from 'react-native';
import { volume } from './Home';
import Variables from './Variables';
import LinearGradient from "react-native-linear-gradient/index.android";
import PlayerBottom from "./PlayerBottom";



class RecordSuccess extends Component{

    state = {
        title: Variables.state.podcastTitle,
        description: Variables.state.podcastDescription,
    };


    RecordAgain = () => {

        this.props.navigator.resetTo({
            screen: 'Record',
            title: undefined,
            passProps: {},
            animated: true,
            animationType: 'fade',
            navigatorStyle: {},
            navigatorButtons: {}
        });

    };



    preview = () =>  {

        Variables.play();
        Variables.state.isPlaying = true;

    };

    finished = () => {

        this.props.navigator.push({
            screen: 'RecordFirst',
            title: undefined,
            passProps: {},
            animated: true,
            animationType: 'fade',
            backButtonTitle: undefined,
            backButtonHidden: true,

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

                    <TouchableOpacity style={styles.buttonMore} onPress={this.RecordAgain}>
                        <Text  style={styles.contentTitle}>Record More</Text>
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
        paddingTop: 10,
    },

    title: {
        color: '#fff',
        fontSize: 25,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
    },

    contentTitle: {
        color: '#fff',
        fontSize: 20,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',

    },

    input: {
        height: 40,
        backgroundColor: 'rgba(170,170,170,0.4)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10,
    },

    input2: {
        height: 120,
        backgroundColor: 'rgba(170,170,170,0.4)',
        marginBottom: 10,
        color:'#FFF',
        paddingHorizontal: 10,
    },

    buttonPreview: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop:10,
    },

    buttonMore: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        paddingTop: 10,
        marginHorizontal: 15,
        marginTop:10,
    },

    buttonContainer: {
        marginTop: 80,
    }

});

export default RecordSuccess;