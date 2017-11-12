import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';



class Categories extends Component{


    pressFitness(){
        Actions.Fitness();
    }
    pressCurrEvents(){
        Actions.CurrentEvents();
    }
    pressGaming(){
        Actions.Gaming();
    }
    pressSports(){
        Actions.Sports();
    }
    pressEntertainment(){
        Actions.Entertainment();
    }
    pressSci(){
        Actions.ScienceNature();
    }
    pressTravel(){
        Actions.Travel();
    }
    pressLearn(){
        Actions.LearnSomething();
    }
    pressStory(){
        Actions.StoryTelling();
    }
    pressComedy(){
        Actions.Comedy();
    }
    pressLife(){
        Actions.LifeStyle();
    }
    pressSociety(){
        Actions.SocietyCulture();
    }
    pressTech(){
        Actions.Tech();
    }


    render() {
        return (
            <ScrollView style={styles.container}>



                <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}} onPress={this.pressCurrEvents}>
                    <Image
                        style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/currEvents-cat.png')}
                    />
                    <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: 10}} onPress={this.pressFitness}>
                    <Image
                        style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/fitness-cat.png')}
                    />
                    <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Fitness</Text>
                </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingVertical: 10}} onPress={this.pressSociety}>
                    <Image
                        style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/politics-cat.png')}
                    />
                    <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Society & Culture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: 10}} onPress={this.pressGaming}>
                    <Image
                        style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/gaming-cat.png')}
                    />
                    <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Gaming</Text>
                </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}} onPress={this.pressComedy}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/comedy-cat.png')}
                        />
                        <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Comedy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}} onPress={this.pressLife}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/lifestyle-cat.png')}
                        />
                        <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Lifestyle</Text>
                    </TouchableOpacity>
                </View>



                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}} onPress={this.pressSci}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/scienceNature-cat.png')}
                        />
                        <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Science & Nature</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}} onPress={this.pressTravel}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/travel-cat.png')}
                        />
                        <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Travel</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}} onPress={this.pressLearn}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/learnSomething-cat.png')}
                        />
                        <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Learn Something</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}} onPress={this.pressStory}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/storytelling-cat.png')}
                        />
                        <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Storytelling</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10,}} onPress={this.pressSports}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/sports-cat.png')}
                        />
                        <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Sports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}} onPress={this.pressEntertainment}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/entertainment-cat.png')}
                        />
                        <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Entertainment</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10,  paddingBottom: 150}} onPress={this.pressTech}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/tech-cat.png')}
                        />
                        <Text style={{marginTop: 5, fontFamily: 'HiraginoSans-W6', alignSelf:'center'}}>Tech</Text>
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