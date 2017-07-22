/**
 * Created by nickruspantini on 6/29/17.
 */
import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,StatusBar, ScrollView, TouchableOpacity, Slider} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


class Categories extends Component{


    render() {
        return (
            <ScrollView style={styles.container}>


                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="md-bookmarks">
                        <Text style={styles.title} >  Current Events</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="ios-body">
                        <Text style={styles.title} >  Fitness</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="md-megaphone">
                        <Text style={styles.title} >  Politics</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="md-game-controller-b">
                        <Text style={styles.title} >  Gaming</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="ios-football">
                        <Text style={styles.title} >  Sports</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="ios-musical-notes">
                        <Text style={styles.title} >  Entertainment</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="md-people">
                        <Text style={styles.title} >  Life</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="ios-shirt">
                        <Text style={styles.title} >  Fashion</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="md-trending-up">
                        <Text style={styles.title} >  Trends</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="ios-car">
                        <Text style={styles.title} >  Cars</Text>
                    </Icon>
                </TouchableOpacity>

                <TouchableOpacity style={styles.container} >
                    <Icon style={{textAlign:'left', marginLeft: 20,fontSize: 60,color:'#804cc8' }} name="md-code-working">
                        <Text style={styles.title} >  Misc</Text>
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
        marginLeft: 20,
        flex:1,
        textAlign: 'left',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Futura',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

});

export default Categories;