/**
 * Created by nickruspantini on 6/29/17.
 */
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';



class NewPodcasts extends Component{


    render() {
        return (
            <ScrollView style={styles.container}>


                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#888784' }} name="md-albums">
                        <Text style={styles.title} >    New</Text>
                    </Icon>
                </TouchableOpacity>





            </ScrollView>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'transparent',
        marginTop: 0,
    },

    title: {
        color: '#804cc8',
        marginTop: 20,
        flex:1,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

});

export default NewPodcasts;