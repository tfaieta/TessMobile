import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Actions } from 'react-native-router-flux';
import { volume } from './Home';
import PlayerBottom from './PlayerBottom';

class Library extends Component{


    GoToQueue = () => {
        Actions.Queue();
    };

    constructor(props) {
        super(props);
        this.state = { volume}
    }

    render() {
        return (
            <View
                style={styles.container}>






                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.GoToQueue}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#FFF'}} name="ios-bookmark">
                            <Text  style={styles.contentTitle}>  Saved</Text>
                        </Icon>
                    </TouchableOpacity>



                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.GoToQueue}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#FFF' }} name="md-time">
                            <Text  style={styles.contentTitle}>  Recently Played</Text>
                        </Icon>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.GoToQueue}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color:'#FFF' }} name="ios-checkmark-circle">
                            <Text  style={styles.contentTitle}>  Followed Content</Text>
                        </Icon>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.buttonPreview}  onPress={this.GoToQueue}>
                        <Icon style={{textAlign:'center', marginTop: 5, fontSize: 35,color: '#FFF' }} name="md-person">
                            <Text  style={styles.contentTitle}>  My Content</Text>
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
        color: '#FFF',
        fontSize: 25,
        paddingBottom: 20,
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Futura',

    },

    buttonPreview: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingBottom: 15,
    },

    buttonUpload: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonCancel: {
        backgroundColor: '#804cc8',
        alignItems: 'center',
        paddingTop: 15,
    },

    buttonContainer: {
        marginTop: 50,
    },

});

export default Library;