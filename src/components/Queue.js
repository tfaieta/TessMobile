import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import PlayerBottom from './PlayerBottom';


class Queue extends Component{


    render() {
        return (
            <View
                style={styles.container}>
                <ScrollView>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 35,color:'#804cc8' }} name="ios-play">
                            <Text style={styles.title} >  Play Podcast</Text>
                        </Icon>
                    </TouchableOpacity>


                </ScrollView>



                <PlayerBottom/>


            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        paddingTop: 70,
    },

    title: {
        color: '#804cc8',
        marginTop: 70,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

    contentTitle: {
        color: 'rgba(1,170,170,1)',
        fontSize: 25,
        paddingBottom: 20,
        marginLeft: 20,

    },

});

export default Queue;