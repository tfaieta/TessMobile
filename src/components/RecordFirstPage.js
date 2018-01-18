import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PlayerBottom from './PlayerBottom';
import { Navigation } from 'react-native-navigation';


class RecordFirstPage extends Component{

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

        Navigation.showModal({
            screen: 'Record',
            animationType: 'slide-up'
        });
    };


    render() {
        var {height, width} = Dimensions.get('window');

        return (
            <View
                style={styles.container}>



                <View style={{flexDirection: 'row', paddingVertical:5, paddingBottom: 12, marginBottom: 10, shadowOffset:{  width: 0,  height: 6}, shadowOpacity: 0.2, shadowRadius: 10}}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginLeft: 30, flex:10, marginTop:20}}>
                        <Text style={styles.header}>Create a Podcast</Text>
                    </View>

                    <View style={{justifyContent: 'center', alignItems: 'flex-end', marginTop: 26, marginRight: 15, flex:1}}>
                        <TouchableOpacity onPress={this.info} >
                            <Icon style={{
                                textAlign: 'right',
                                fontSize: 28,
                                color: '#5757FF'
                            }} name="md-information-circle">
                            </Icon>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity style = {{marginTop: height / 4}} onPress={this.recordNewPodcast}>
                    <Icon style={{
                        textAlign:'center',fontSize: 45,color:'#5757FF'
                    }} name="md-add">
                    </Icon>
                        <Text style= {styles.text} >Create a New Podcast</Text>
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
        marginTop:10,
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