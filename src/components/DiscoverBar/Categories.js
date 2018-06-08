import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Text, Dimensions} from 'react-native';

var {height, width} = Dimensions.get('window');


// a component that lists all of the categories, on Browse

class Categories extends Component{
    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: false,
            navBarTextColor: '#3e4164', // change the text color of the title (remembered across pushes)
            navBarTextFontSize: 22, // change the font size of the title
            navBarTextFontFamily: 'Montserrat-Bold', // Changes the title font
            drawUnderTabBar: false,
            navBarHideOnScroll: false,
            navBarBackgroundColor: '#fff',
            topBarElevationShadowEnabled: false,
            topBarShadowColor: 'transparent',
            topBarShadowOpacity: 0.1,
            topBarShadowOffset: 3,
            topBarShadowRadius: 5,
            statusBarColor: '#fff',
            drawUnderNavBar: true,
            navBarTranslucent: true,
            navBarNoBorder: true

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
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingVertical: height/66.7}} onPress={() => this.pressCategory('News')}>
                    <Image
                        style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/currEvents-cat.png')}
                    />
                    <Text style={styles.text}>News</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: height/66.7}} onPress={() => this.pressCategory('Fitness')}>
                    <Image
                        style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/fitness-cat.png')}
                    />
                    <Text style={styles.text}>Fitness</Text>
                </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-start', paddingVertical: height/66.7}} onPress={() => this.pressCategory('Society & Culture')}>
                    <Image
                        style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/politics-cat.png')}
                    />
                    <Text style={styles.text}>Society & Culture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: height/66.7}} onPress={() => this.pressCategory('Religion & Spirituality')}>
                    <Image
                        style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/religionSpirit-cat.png')}
                    />
                    <Text style={styles.text}>Religion & Spirituality</Text>
                </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Comedy')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/comedy-cat.png')}
                        />
                        <Text style={styles.text}>Comedy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Lifestyle')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/lifestyle-cat.png')}
                        />
                        <Text style={styles.text}>Lifestyle</Text>
                    </TouchableOpacity>
                </View>



                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Science & Nature')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/scienceNature-cat.png')}
                        />
                        <Text style={styles.text}>Science & Nature</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Travel')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/travel-cat.png')}
                        />
                        <Text style={styles.text}>Travel</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Learn Something')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/learnSomething-cat.png')}
                        />
                        <Text style={styles.text}>Learn Something</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Storytelling')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/storytelling-cat.png')}
                        />
                        <Text style={styles.text}>Storytelling</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Sports')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/sports-cat.png')}
                        />
                        <Text style={styles.text}>Sports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Entertainment')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/entertainment-cat.png')}
                        />
                        <Text style={styles.text}>Entertainment</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', flex:1}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Music')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/music-cat.png')}
                        />
                        <Text style={styles.text}>Music</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Tech')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/tech-cat.png')}
                        />
                        <Text style={styles.text}>Tech</Text>
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection: 'row', flex: 1, paddingBottom: height/5.336}}>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-start',paddingVertical: height/66.7}} onPress={() => this.pressCategory('Business')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
                            source={require('tess/src/images/iconMoney.png')}
                        />
                        <Text style={styles.text}>Business</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, alignItems: 'flex-end', paddingVertical: height/66.7}} onPress={() => this.pressCategory('Gaming')}>
                        <Image
                            style={{ width: width/2.88, height: width/2.88, alignSelf: 'center', opacity: 1}}
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
        paddingTop: height/11.12,
        flex: 1,
        backgroundColor: 'transparent',

    },

    text: {
        marginTop: height/66.7, fontFamily: 'Montserrat-SemiBold', alignSelf:'center', color: '#3e4164',
    }


});


export default Categories;