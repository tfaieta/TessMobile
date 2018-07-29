import React, { Component } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView, Platform, TouchableHighlight} from 'react-native';
var {height, width} = Dimensions.get('window');



// 2nd page of onboard process, containes all inquiries

class OnboardInquiry extends Component{

    constructor(props) {
        super(props);

        this.props.navigator.setStyle({
            statusBarHidden: false,
            statusBarTextColorScheme: 'light',
            navBarHidden: true,
            tabBarHidden: true,
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
            drawUnderNavBar: Platform.OS === 'ios',
            navBarTranslucent: Platform.OS === 'ios',
            navBarNoBorder: true,

        });

    }


    render() {

        return (
            <View style={styles.container}>

                <ScrollView>
                    <Text style={styles.title}>What kind of podcasts are you interested in?</Text>

                    <View style={{flexDirection: 'row', marginHorizontal: width/37.5}}>
                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'news';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'News',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>news</Text>
                        </TouchableHighlight>
                        </View>

                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'business';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Business',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>business</Text>
                        </TouchableHighlight>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal: width/37.5}}>
                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'inspo';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Inspiration',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>inspo</Text>
                        </TouchableHighlight>
                        </View>

                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'learning';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Learning',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>learning</Text>
                        </TouchableHighlight>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal: width/37.5}}>
                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'comedy';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Comedy',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>comedy</Text>
                        </TouchableHighlight>
                        </View>

                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'health';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Health',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>health</Text>
                        </TouchableHighlight>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal: width/37.5}}>
                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'spiritual';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Spiritual',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>spiritual</Text>
                        </TouchableHighlight>
                        </View>

                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'philosophy';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Philosophy',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>philosophy</Text>
                        </TouchableHighlight>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal: width/37.5}}>
                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'sports';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Sports',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>sports</Text>
                        </TouchableHighlight>
                        </View>

                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'tech';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Tech',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>tech</Text>
                        </TouchableHighlight>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal: width/37.5}}>
                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'travel';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Travel',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>travel</Text>
                        </TouchableHighlight>
                        </View>

                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'music';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Music',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>music</Text>
                        </TouchableHighlight>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row', marginHorizontal: width/37.5}}>
                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'science';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Science',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>science</Text>
                        </TouchableHighlight>
                        </View>

                        <View style={styles.smallContainer} >
                        <TouchableHighlight underlayColor='#fff' onPress={() => {
                            const interest = 'gaming';
                            this.props.navigator.push({
                                screen: 'OnboardInterest',
                                title: 'Gaming',
                                passProps: {interest}
                            });
                        }}>
                            <Text style={styles.text}>gaming</Text>
                        </TouchableHighlight>
                        </View>
                    </View>

                    <View style={styles.smallContainer}>
                    <TouchableHighlight underlayColor='#fff' onPress={() =>{
                       // finished, go to home
                    }} >
                        <Text style={styles.text}>Next</Text>
                    </TouchableHighlight>
                    </View>

                    <View>
                    <TouchableHighlight underlayColor='#fff' onPress={() =>{
                        this.props.navigator.push({
                            screen: 'OnboardSearch',
                            title: 'Search',
                        });
                    }} >
                        <Text style={styles.titleSmall} >Search Instead?</Text>
                    </TouchableHighlight>
                    </View>
                </ScrollView>


            </View>

        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#e5f3f3',
    },
    smallContainer:{
        flex: 1,
        backgroundColor: '#7f00ff',
        marginHorizontal: width/28,
        marginVertical: height/66.7,
        paddingHorizontal: width/37.5
    },
    title: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/23.44,
    },
    titleSmall: {
        color: '#3e4164',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Regular',
        fontSize: width/50,
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontStyle: 'normal',
        fontFamily: 'Montserrat-Bold',
        fontSize: width/28,
    },

});


export default OnboardInquiry;
