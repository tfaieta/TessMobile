/**
 * Created by nickruspantini on 6/6/17.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, Dimensions, StatusBar} from 'react-native';
import AppIntro from 'react-native-app-intro';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient/index.android";






// start up page for tess -> takes users to login or create account



var {height, width} = Dimensions.get('window');


export  default class Login extends Component{

    _handleButtonPressLogin = () => {
        this.props.navigator.push({
            screen: 'Login',
            animated: true,
            animationType: 'fade',
        });
    };




    render() {
        return (
            <View >
                <StatusBar hidden={true} />

            <View >
            <AppIntro
                horizontal={false}
                    showsButtons={false}
                    autoplay={true}
                    autoplayTimeout={5}
                    loop={false}
                    showsPagination={false}
                      showDoneButton={false}
                      showDots={true}
                      showSkipButton={false}
                    dotColor='#838394'
                    activeDotColor='#fff'
            >

                <View style={styles.slide1} level = {width/30}>
                    <LinearGradient

                        colors={['#5555ff', '#9687ff' ]}
                        start={{x: 0.0, y: 0.0}} end={{x: 0, y: 1}}
                        style={{height: height, width: width}}>

                        <Image
                            style={{width: height/4.45, height: height/3.97, borderColor: '#b9bad1', alignSelf: 'center', opacity: 1, marginTop: height / 6,}}
                            source={require('tess/src/images/White_Logo.png')}
                        />

                    <View style={styles.textContainer}>
                        <View style={{marginLeft:10}} >
                        <Text style={styles.textforSlide1}>Let Your Voice Be Heard</Text>
                        </View>
                        <View style={{marginLeft:10}} >
                        <Text style={styles.smallText1}>LET'S GET STARTED!</Text>
                        </View>
                    </View>


                    </LinearGradient>
                </View>



                <View style={styles.slide2} level = {width/30}>

                    <Image
                        style={{width: width, height: height, borderColor: '#b9bad1', alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/woman-listening-music.png')}
                    >

                    <View level = {20}>
                        <Icon style={{textAlign:'center', marginTop: height/4, fontSize: 80,color:'#fff', backgroundColor: 'transparent'}} name="md-microphone">
                        </Icon>
                    </View>
                    <View level={-20}>
                    <Text style={styles.smallText}>Tess is a podcast platform</Text>
                    </View>

                    </Image>
                </View>


                <View style={styles.slide3} level = {width/30}>

                    <Image
                        style={{width: width, height: height, borderColor: '#ffffff70', alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/woman-listening2.png')}
                    >

                    <View level = {20}>
                        <Icon style={{textAlign:'center',  marginTop: height/4, fontSize: 80,color:'#fff', backgroundColor: 'transparent' }} name="md-headset">
                        </Icon>
                    </View>
                    <View level = {-20}>
                    <Text style={styles.smallText}>A place to easily listen to or create podcasts</Text>
                    </View>

                    </Image>

                </View>


                <View style={styles.slide4} level = {width/30}>

                    <Image
                        style={{width: width, height: height, borderColor: '#ffffff70', alignSelf: 'center', opacity: 1}}
                        source={require('tess/src/images/man-recording.png')}
                    >


                    <View level = {20}>
                        <Icon style={{textAlign:'center', marginTop: height/4, fontSize: 80,color:'#fff', backgroundColor: 'transparent' }} name="ios-radio-button-on">
                        </Icon>
                    </View>
                    <View level = {-20}>
                    <Text style={styles.smallText}>Record with the touch of a button anywhere, anytime</Text>
                    </View>

                    </Image>

                </View>






            </AppIntro>
                </View>



                <View style={{flex:1, flexDirection: 'row', alignItems: 'flex-end'}}>

                    <View style={{flex:1, marginRight: 20 , marginBottom: 60 , flexDirection: 'column', alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={this._handleButtonPressLogin} style = {{ width: 75, height: 75, backgroundColor: '#ffffff50',borderRadius: 40, borderColor:  'rgba(151,135,255,0)', borderWidth: 2.5, alignItems: 'center'}}>
                            <Image
                                style={styles.logo}
                                source={require('tess/src/images/Circle-button.png')}
                            />
                        </TouchableOpacity>
                    </View>


                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    linearGradient: {
        width: 315,
        height: 310,
        alignSelf: 'flex-end',
        backgroundColor: 'transparent'
    },
    textContainer: {
        flex: 1,
    },
    logo: {
        marginRight:10,
        marginTop: 11,
        width: 49,
        height: 49,
        position: 'absolute',
    },
    title: {
        color: '#ffffff',
        marginTop: -10,
        width: 200,
        textAlign: 'center',
        opacity: 2,
        fontStyle: 'normal',
        fontFamily: 'Hiragino Sans',
        fontSize: 25,
        backgroundColor: 'transparent'
    },

    slide1: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide2: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide3: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide4: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    textforSlide1: {
        color: '#fff',
        fontSize: height/14.5,
        textAlign: 'left',
        fontFamily: 'AvenirNext-Bold',
        marginLeft: 30,
        marginRight: 30,
        marginHorizontal: -400,
        marginTop: 60,
        backgroundColor: 'transparent'
    },
    smallText1: {
        color: '#fff',
        fontSize: height/55.58,
        textAlign: 'left',
        fontFamily: 'Avenir-Light',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        backgroundColor: 'transparent'
    },
    smallText: {
        color: '#fff',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center',
        fontFamily: 'HiraginoSans-W3',
        marginHorizontal: 30,
        backgroundColor: 'transparent'
    },


});