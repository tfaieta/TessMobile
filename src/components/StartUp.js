/**
 * Created by nickruspantini on 6/6/17.
 */
import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity, StatusBar} from 'react-native';
import { Actions } from 'react-native-router-flux';
import AppIntro from 'react-native-app-intro';
import Icon from 'react-native-vector-icons/Ionicons';



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
                    dotColor='#b9bad1'
                    activeDotColor='#9787FF'
            >

                <View style={styles.slide1}>
                    <View style={styles.linearGradient} level={0}>
                    </View>
                    <Image
                        style={{width: 315, height:310, position: 'absolute', alignSelf: 'flex-end', opacity: 1}}
                        source={require('tess/src/images/woman-listening-music.png')}
                    />

                    <View level = {-20} style={styles.textContainer}>
                        <View style={{marginLeft:10}}>
                        <Text style={styles.textforSlide1}>Ready to Create?</Text>
                        </View>
                        <View style={{marginLeft:10}}>
                        <Text style={styles.smallText}>We make it easy for anyone to record high-quality audio.</Text>
                        </View>
                    </View>
                </View>



                <View style={styles.slide2}>
                    <View level = {20}>
                        <Icon style={{textAlign:'center', fontSize: 80,color:'#9787FF' }} name="md-microphone">
                        </Icon>
                    </View>
                    <View level={-20}>
                    <Text style={styles.smallText}>Tess is a podcast platform</Text>
                    </View>
                </View>


                <View style={styles.slide3}>
                    <View level = {20}>
                        <Icon style={{textAlign:'center', fontSize: 80,color:'#9787FF' }} name="md-headset">
                        </Icon>
                    </View>
                    <View level = {-20}>
                    <Text style={styles.smallText}>A place to easily listen to or create podcasts</Text>
                    </View>
                </View>


                <View style={styles.slide4}>
                    <View level = {20}>
                        <Icon style={{textAlign:'center', fontSize: 80,color:'#9787FF' }} name="ios-radio-button-on">
                        </Icon>
                    </View>
                    <View level = {-20}>
                    <Text style={styles.smallText}>Record with the touch of a button</Text>
                    </View>
                </View>






            </AppIntro>
                </View>



                <View style={{flex:1, flexDirection: 'row', alignItems: 'flex-end'}}>

                    <View style={{flex:1, marginRight: 10 , marginBottom: 10 , flexDirection: 'column', alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={this._handleButtonPressLogin} style = {{ width: 75, height: 75, backgroundColor: 'rgba(151,135,255,0.16)',borderRadius: 40, borderColor:  'rgba(151,135,255,0)', borderWidth: 2.5, alignItems: 'center'}}>
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
        marginTop:10
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
        paddingTop: 0,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide2: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide3: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    slide4: {
        flex: 1,
        paddingTop: 150,
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    textforSlide1: {
        color: '#2A2A30',
        fontSize: 42,
        textAlign: 'left',
        fontFamily: 'HiraginoSans-W3',
        marginLeft: 30,
        marginRight: 30,
        paddingTop: 20,
        marginHorizontal: -250,
    },
    smallText: {
        color: '#828393',
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'HiraginoSans-W3',
        marginLeft: 30,
        marginRight: 30,
        marginTop:10
    },


});