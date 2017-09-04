import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import PlayerBottom from './PlayerBottom';




class RecordFirstPage extends Component{

recordNewPodcast(){
    Actions.Record();
}

uploadPodcast(){

}

    render() {
        return (
            <View
                style={styles.container}>






                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.recordNewPodcast}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#804cc8' }} name="md-microphone">
                            <Text  style={styles.contentTitle}>  Record New Podcast</Text>
                        </Icon>
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.uploadPodcast}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#804cc8' }} name="md-add">
                            <Text  style={styles.contentTitle}>  Upload Podcast</Text>
                        </Icon>
                    </TouchableOpacity>



                </View>





                <PlayerBottom/>

            </View>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#804cc8',
        paddingTop: 140,
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
        color: '#FFF',
        fontSize: 25,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',

    },

    buttonPreview: {
        backgroundColor: '#e8952f',
        alignItems: 'center',
        paddingBottom: 15,
    },

    buttonUpload: {
        backgroundColor: '#657ed4',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonCancel: {
        backgroundColor: '#69bbd9',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonContainer: {
        marginTop: 50,
    },


});

export default RecordFirstPage;