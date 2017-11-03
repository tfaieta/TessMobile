import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';



class Categories extends Component{


    pressFitness(){
        Actions.Fitness();
    }


    render() {
        return (
            <ScrollView style={styles.container}>



                <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}}>
                    <Image
                        style={{ width: 130, height:154, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/currEvents-cat.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: 10}} onPress={this.pressFitness}>
                    <Image
                        style={{ width: 128, height:154, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/fitness-cat.png')}
                    />
                </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingVertical: 10}}>
                    <Image
                        style={{ width: 130, height:154, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/politics-cat.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: 10}}>
                    <Image
                        style={{ width: 128, height:154, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/gaming-cat.png')}
                    />
                </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10, paddingBottom: 150}}>
                        <Image
                            style={{ width: 128, height:154, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/sports-cat.png')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}}>
                        <Image
                            style={{ width: 130, height:154, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/entertainment-cat.png')}
                        />
                    </TouchableOpacity>
                </View>



            </ScrollView>




        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 10,
        flex: 1,
        backgroundColor: 'transparent',

    },


});

export default Categories;