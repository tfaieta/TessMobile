import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text} from 'react-native';


class Categories extends Component{
    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 18, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-SemiBold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: true,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: true,
            topBarShadowColor: '#000',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
        });
    }


    pressCategory = (category) => {
        this.props.navigator.push({
            screen: 'Category',
            title: category,
            passProps: {category},
        });
    };


    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}} onPress={() => this.pressCategory('Current Events')}>
                    <Image
                        style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/currEvents-cat.png')}
                    />
                    <Text style={styles.text}>Current Events</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: 10}} onPress={() => this.pressCategory('Fitness')}>
                    <Image
                        style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/fitness-cat.png')}
                    />
                    <Text style={styles.text}>Fitness</Text>
                </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingVertical: 10}} onPress={() => this.pressCategory('Society & Culture')}>
                    <Image
                        style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/politics-cat.png')}
                    />
                    <Text style={styles.text}>Society & Culture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: 10}} onPress={() => this.pressCategory('Religion & Spirituality')}>
                    <Image
                        style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/religionSpirit-cat.png')}
                    />
                    <Text style={styles.text}>Religion & Spirituality</Text>
                </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}} onPress={() => this.pressCategory('Comedy')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/comedy-cat.png')}
                        />
                        <Text style={styles.text}>Comedy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}} onPress={() => this.pressCategory('Lifestyle')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/lifestyle-cat.png')}
                        />
                        <Text style={styles.text}>Lifestyle</Text>
                    </TouchableOpacity>
                </View>



                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}} onPress={() => this.pressCategory('Science & Nature')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/scienceNature-cat.png')}
                        />
                        <Text style={styles.text}>Science & Nature</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}} onPress={() => this.pressCategory('Travel')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/travel-cat.png')}
                        />
                        <Text style={styles.text}>Travel</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}} onPress={() => this.pressCategory('Learn Something')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/learnSomething-cat.png')}
                        />
                        <Text style={styles.text}>Learn Something</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}} onPress={() => this.pressCategory('Storytelling')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/storytelling-cat.png')}
                        />
                        <Text style={styles.text}>Storytelling</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10,}} onPress={() => this.pressCategory('Sports')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/sports-cat.png')}
                        />
                        <Text style={styles.text}>Sports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}} onPress={() => this.pressCategory('Entertainment')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/entertainment-cat.png')}
                        />
                        <Text style={styles.text}>Entertainment</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: 10}} onPress={() => this.pressCategory('Music')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/music-cat.png')}
                        />
                        <Text style={styles.text}>Music</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: 10}} onPress={() => this.pressCategory('Tech')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/tech-cat.png')}
                        />
                        <Text style={styles.text}>Tech</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: 10, paddingBottom: 125}} onPress={() => this.pressCategory('Gaming')}>
                        <Image
                            style={{ width: 130, height:130, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/gaming-cat.png')}
                        />
                        <Text style={styles.text}>Gaming</Text>
                    </TouchableOpacity>
                </View>


            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        paddingTop: 60,
        flex: 1,
        backgroundColor: 'transparent',

    },

    text: {
        marginTop: 10, fontFamily: 'Montserrat-SemiBold', alignSelf:'center', color: '#3e4164',
    }


});


export default Categories;